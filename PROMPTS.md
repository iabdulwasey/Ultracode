# Ultracode Prompt Engineering Guide

## Core Prompt Templates

### 1. Project Initialization Prompts

#### Landing Page Template
```
Create a modern landing page with the following:
- Hero section with headline "{headline}" and subheading "{subheading}"
- Features section showcasing {features}
- Responsive design using Tailwind CSS
- Dark mode support
- Smooth scroll animations
- Mobile-first approach
```

#### SaaS Application Template
```
Build a SaaS application for {purpose} with:
- User authentication (email/password and social login)
- Dashboard showing {metrics}
- Subscription management with Stripe
- Admin panel for user management
- API endpoints for {endpoints}
- PostgreSQL database with proper schema
```

#### E-commerce Template
```
Create an e-commerce platform for {product_type} including:
- Product catalog with search and filters
- Shopping cart functionality
- Checkout process with payment integration
- Order tracking system
- Admin dashboard for inventory management
- Customer reviews and ratings
```

### 2. Feature-Specific Prompts

#### Authentication System
```
Implement a complete authentication system with:
- Secure user registration with email verification
- Login with JWT tokens
- Password reset functionality
- OAuth integration for {providers}
- Role-based access control for {roles}
- Session management with refresh tokens
```

#### Database Schema Generation
```
Design a PostgreSQL schema for {application_type} that includes:
- Tables for {entities}
- Proper relationships and foreign keys
- Indexes for optimal query performance
- Row-level security policies
- Audit fields (created_at, updated_at)
- Sample seed data
```

#### API Development
```
Create a RESTful API for {resource} with:
- CRUD operations (GET, POST, PUT, DELETE)
- Input validation and error handling
- Pagination for list endpoints
- Filtering and sorting capabilities
- Authentication middleware
- OpenAPI/Swagger documentation
```

### 3. UI Component Prompts

#### Form Components
```
Build a {form_type} form component with:
- Field validation for {fields}
- Real-time error messages
- Loading states during submission
- Success/error notifications
- Accessibility features (ARIA labels, keyboard navigation)
- Mobile-responsive layout
```

#### Data Visualization
```
Create a {chart_type} chart to display {data_type} with:
- Interactive tooltips
- Responsive design
- Custom color scheme matching brand
- Export functionality (PNG/CSV)
- Real-time data updates
- Accessibility features
```

#### Navigation Components
```
Implement a {nav_type} navigation with:
- Responsive mobile menu
- Active state indicators
- Dropdown submenus for {sections}
- Search functionality
- User profile menu
- Smooth transitions
```

## Prompt Engineering Best Practices

### 1. Context Setting

Always provide clear context about:
- The application's purpose
- Target audience
- Technical constraints
- Design preferences
- Performance requirements

Example:
```
Context: Building a project management tool for remote teams.
Tech stack: React, TypeScript, Tailwind CSS, Supabase
Requirements: Real-time collaboration, file sharing, task tracking
```

### 2. Specificity Guidelines

#### DO:
- Specify exact component names
- Define data structures clearly
- List all required features
- Mention edge cases to handle
- Include performance targets

#### DON'T:
- Use vague terms like "modern" without details
- Assume default behaviors
- Skip error handling requirements
- Forget about mobile responsiveness
- Ignore accessibility needs

### 3. Progressive Enhancement

Start with basic functionality, then add complexity:

```
Step 1: Create a basic todo list with add/remove functionality
Step 2: Add persistence using localStorage
Step 3: Implement drag-and-drop reordering
Step 4: Add categories and filtering
Step 5: Integrate with Supabase for multi-device sync
```

## Advanced Prompt Patterns

### 1. The Specification Pattern

```
Specification for {component_name}:

Purpose: {clear_description}

Inputs:
- {input_1}: {type} - {description}
- {input_2}: {type} - {description}

Outputs:
- {output_1}: {type} - {description}

Behavior:
1. When {condition}, then {action}
2. If {edge_case}, handle by {solution}

Constraints:
- Performance: {requirement}
- Accessibility: {standard}
- Browser support: {versions}
```

### 2. The Example-Driven Pattern

```
Create a component similar to {reference} but with these modifications:
- Change {feature_1} to {new_feature_1}
- Add {additional_feature}
- Remove {unwanted_feature}
- Style using {design_system}

Example usage:
<ComponentName
  prop1="value1"
  prop2={variable}
  onEvent={handler}
/>
```

### 3. The Test-Driven Pattern

```
Create {feature} that passes these test cases:
1. Given {setup}, when {action}, then {expected_result}
2. Given {edge_case}, when {action}, then {error_handling}
3. Given {performance_scenario}, complete within {time_limit}

Include unit tests using Jest and React Testing Library
```

## Prompt Optimization Techniques

### 1. Token Efficiency

Optimize prompts for minimal token usage while maintaining clarity:

#### Before (156 tokens):
```
I need you to create a user registration form that has fields for email, password, and confirm password. The form should validate that the email is in the correct format and that the passwords match. It should also show error messages when validation fails and display a success message when the form is submitted successfully. Make it look nice with Tailwind CSS.
```

#### After (89 tokens):
```
Create a user registration form:
- Fields: email, password, confirm password
- Validation: email format, password match
- Show error/success messages
- Style with Tailwind CSS
```

### 2. Context Preservation

Maintain context across multiple prompts:

```
Initial context: Building a task management app with React and Supabase

Prompt 1: Create the task list component
[Previous context implied]

Prompt 2: Add drag-and-drop to reorder tasks
[Builds on Prompt 1 result]

Prompt 3: Integrate real-time updates when tasks change
[Extends Prompt 2 functionality]
```

### 3. Error Recovery Prompts

When the AI makes mistakes, use corrective prompts:

```
The previous implementation has an issue with {specific_problem}.
Please fix it by:
1. {correction_step_1}
2. {correction_step_2}
Keep all other functionality intact.
```

## Domain-Specific Templates

### 1. Financial Applications

```
Create a {financial_feature} that:
- Handles currency with proper decimal precision
- Formats numbers according to {locale}
- Implements {calculation_method}
- Shows {visualizations}
- Exports data in {formats}
- Complies with {regulations}
```

### 2. Healthcare Applications

```
Build a {healthcare_feature} ensuring:
- HIPAA compliance for data handling
- Audit logging for all actions
- Role-based access (Doctor, Nurse, Patient, Admin)
- Encrypted data storage
- Appointment scheduling with timezone support
- Integration with {ehr_system}
```

### 3. Educational Platforms

```
Develop a {learning_feature} with:
- Progress tracking for students
- Quiz/assessment functionality
- Video content delivery
- Discussion forums
- Grading system
- Certificate generation
- Mobile app support
```

## Prompt Debugging Guide

### Common Issues and Solutions

#### Issue: Generated code is too complex
**Solution**: Break down the prompt into smaller, specific tasks

#### Issue: Missing error handling
**Solution**: Explicitly request error handling for each operation

#### Issue: Poor performance
**Solution**: Specify performance requirements and constraints

#### Issue: Inconsistent styling
**Solution**: Provide a style guide or reference existing components

#### Issue: Security vulnerabilities
**Solution**: Include security requirements in the initial prompt

## Prompt Library Management

### 1. Categorization System

```
/prompts
  /initialization
    - landing-page.md
    - saas-app.md
    - ecommerce.md
  /features
    - authentication.md
    - payments.md
    - analytics.md
  /ui-components
    - forms.md
    - navigation.md
    - data-display.md
  /integrations
    - supabase.md
    - stripe.md
    - github.md
```

### 2. Version Control

Track prompt effectiveness:

```yaml
prompt_id: auth_001
version: 1.2
success_rate: 0.89
average_tokens: 245
last_updated: 2024-01-15
improvements:
  - Added OAuth providers
  - Improved error handling
  - Reduced token usage by 15%
```

### 3. A/B Testing Prompts

Test different prompt variations:

```
Variant A: "Create a login form with email and password"
Variant B: "Build user authentication: email/password login, remember me option, forgot password link"

Metrics to track:
- Code quality score
- Token usage
- User satisfaction
- Implementation time
```

## Integration with Ultracode

### 1. Prompt Enhancement Pipeline

```typescript
interface PromptEnhancement {
  originalPrompt: string;
  context: ProjectContext;
  templates: PromptTemplate[];
  
  enhance(): EnhancedPrompt {
    // 1. Analyze intent
    // 2. Match templates
    // 3. Add context
    // 4. Optimize tokens
    // 5. Return enhanced prompt
  }
}
```

### 2. Dynamic Prompt Generation

```typescript
function generatePrompt(userInput: string, project: Project): string {
  const context = analyzeContext(project);
  const intent = detectIntent(userInput);
  const template = selectTemplate(intent);
  
  return compilePrompt({
    template,
    userInput,
    context,
    constraints: project.constraints,
    previousCode: project.files
  });
}
```

### 3. Prompt Feedback Loop

Continuously improve prompts based on:
- User feedback
- Code quality metrics
- Generation success rate
- Token efficiency
- Error frequency

## Conclusion

Effective prompt engineering is crucial for Ultracode's success. This guide provides the foundation for creating high-quality, efficient prompts that generate excellent code. Regular updates based on user feedback and AI model improvements will ensure optimal performance.