import express, { Router } from 'express';
import { z } from 'zod';
import Stripe from 'stripe';
import { query } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth.js';
import { validateRequest } from '../utils/validation.js';
import { logger } from '../utils/logger.js';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// All routes require authentication except webhook
router.use((req, res, next) => {
  if (req.path === '/webhook') {
    next();
  } else {
    authenticate(req, res, next);
  }
});

// Get current usage and billing info
router.get('/usage', async (req, res, next) => {
  try {
    const result = await query(
      `SELECT b.*, 
        (SELECT COUNT(*) FROM projects WHERE user_id = $1) as project_count,
        (SELECT COUNT(*) FROM deployments d JOIN projects p ON d.project_id = p.id WHERE p.user_id = $1) as deployment_count
       FROM billing b
       WHERE b.user_id = $1`,
      [req.user!.sub]
    );

    if (result.rows.length === 0) {
      throw new AppError('Billing information not found', 404);
    }

    const billing = result.rows[0];

    res.json({
      billing: {
        plan: billing.plan_type,
        creditsRemaining: billing.credits_remaining,
        creditsUsed: billing.credits_used,
        currentPeriodEnd: billing.current_period_end,
        usage: {
          projects: parseInt(billing.project_count),
          deployments: parseInt(billing.deployment_count),
          storageBytes: 0, // TODO: Calculate actual storage
          bandwidthBytes: 0, // TODO: Calculate actual bandwidth
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// Upgrade subscription
router.post('/upgrade', validateRequest(z.object({
  body: z.object({
    plan: z.enum(['lite', 'pro', 'enterprise']),
    paymentMethodId: z.string().optional(),
  }),
})), async (req, res, next) => {
  try {
    const { plan, paymentMethodId } = req.body;
    const userId = req.user!.sub;

    // Get user billing info
    const billingResult = await query(
      'SELECT * FROM billing WHERE user_id = $1',
      [userId]
    );

    if (billingResult.rows.length === 0) {
      throw new AppError('Billing information not found', 404);
    }

    const billing = billingResult.rows[0];

    // Get or create Stripe customer
    let customerId = billing.stripe_customer_id;
    
    if (!customerId) {
      const userResult = await query(
        'SELECT email FROM users WHERE id = $1',
        [userId]
      );
      
      const customer = await stripe.customers.create({
        email: userResult.rows[0].email,
        metadata: { userId },
      });
      
      customerId = customer.id;
      
      // Update billing record
      await query(
        'UPDATE billing SET stripe_customer_id = $1 WHERE user_id = $2',
        [customerId, userId]
      );
    }

    // Attach payment method if provided
    if (paymentMethodId) {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });
      
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    // Get price ID for plan
    const priceId = getPriceIdForPlan(plan);

    // Create or update subscription
    if (billing.stripe_subscription_id) {
      // Update existing subscription
      const subscription = await stripe.subscriptions.retrieve(
        billing.stripe_subscription_id
      );
      
      await stripe.subscriptions.update(billing.stripe_subscription_id, {
        items: [{
          id: subscription.items.data[0].id,
          price: priceId,
        }],
        proration_behavior: 'create_prorations',
      });
    } else {
      // Create new subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        expand: ['latest_invoice.payment_intent'],
      });
      
      // Update billing record
      await query(
        `UPDATE billing 
         SET stripe_subscription_id = $1, 
             plan_type = $2,
             subscription_status = $3,
             current_period_end = $4
         WHERE user_id = $5`,
        [
          subscription.id,
          plan,
          subscription.status,
          new Date(subscription.current_period_end * 1000),
          userId,
        ]
      );
    }

    // Update credits based on plan
    const credits = getCreditsForPlan(plan);
    await query(
      'UPDATE billing SET credits_remaining = credits_remaining + $1 WHERE user_id = $2',
      [credits, userId]
    );

    logger.info(`User ${userId} upgraded to ${plan} plan`);

    res.json({
      success: true,
      message: `Successfully upgraded to ${plan} plan`,
    });
  } catch (error) {
    next(error);
  }
});

// Cancel subscription
router.post('/cancel', async (req, res, next) => {
  try {
    const userId = req.user!.sub;

    const result = await query(
      'SELECT stripe_subscription_id FROM billing WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0 || !result.rows[0].stripe_subscription_id) {
      throw new AppError('No active subscription found', 404);
    }

    // Cancel at period end
    await stripe.subscriptions.update(result.rows[0].stripe_subscription_id, {
      cancel_at_period_end: true,
    });

    await query(
      "UPDATE billing SET subscription_status = 'cancelled' WHERE user_id = $1",
      [userId]
    );

    logger.info(`User ${userId} cancelled subscription`);

    res.json({
      success: true,
      message: 'Subscription will be cancelled at the end of the current period',
    });
  } catch (error) {
    next(error);
  }
});

// Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res, next) => {
  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await query(
          `UPDATE billing 
           SET subscription_status = $1,
               current_period_end = $2
           WHERE stripe_subscription_id = $3`,
          [
            subscription.status,
            new Date(subscription.current_period_end * 1000),
            subscription.id,
          ]
        );
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.subscription) {
          // Reset credits on successful payment
          const plan = getPlanFromPriceId(invoice.lines.data[0].price?.id || '');
          const credits = getCreditsForPlan(plan);
          
          await query(
            `UPDATE billing 
             SET credits_remaining = $1,
                 credits_used = 0
             WHERE stripe_customer_id = $2`,
            [credits, invoice.customer]
          );
        }
        break;
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        await query(
          `UPDATE billing 
           SET subscription_status = 'past_due'
           WHERE stripe_customer_id = $1`,
          [invoice.customer]
        );
        break;
      }
    }

    res.json({ received: true });
  } catch (error) {
    logger.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

// Helper functions
function getPriceIdForPlan(plan: string): string {
  switch (plan) {
    case 'lite':
      return process.env.STRIPE_LITE_PLAN_PRICE_ID!;
    case 'pro':
      return process.env.STRIPE_PRO_PLAN_PRICE_ID!;
    case 'enterprise':
      return process.env.STRIPE_ENTERPRISE_PLAN_PRICE_ID!;
    default:
      throw new Error('Invalid plan');
  }
}

function getPlanFromPriceId(priceId: string): string {
  switch (priceId) {
    case process.env.STRIPE_LITE_PLAN_PRICE_ID:
      return 'lite';
    case process.env.STRIPE_PRO_PLAN_PRICE_ID:
      return 'pro';
    case process.env.STRIPE_ENTERPRISE_PLAN_PRICE_ID:
      return 'enterprise';
    default:
      return 'free';
  }
}

function getCreditsForPlan(plan: string): number {
  switch (plan) {
    case 'lite':
      return 30;
    case 'pro':
      return 300;
    case 'enterprise':
      return 10000;
    default:
      return 5;
  }
}

export default router;