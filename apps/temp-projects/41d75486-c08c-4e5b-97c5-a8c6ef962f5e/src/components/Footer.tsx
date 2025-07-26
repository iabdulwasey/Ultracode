import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const footerLinks = {
    'Shop': [
      'All Products',
      'Straight Hair',
      'Wavy Hair',
      'Curly Hair',
      'Clip-In Extensions',
      'Hair Bundles',
    ],
    'Support': [
      'Contact Us',
      'Size Guide',
      'Care Instructions',
      'Returns & Exchanges',
      'Shipping Info',
      'FAQ',
    ],
    'Company': [
      'About Us',
      'Our Story',
      'Careers',
      'Press',
      'Blog',
      'Reviews',
    ],
  };

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold font-serif mb-4">MBeauty</h3>
              <p className="text-background/80 mb-6 leading-relaxed">
                Transform your look with our premium collection of 100% human hair extensions. 
                Quality, beauty, and confidence in every strand.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-background/80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-background/80">hello@mbeauty.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-background/80">123 Beauty St, NY 10001</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-lg mb-6">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-background/80 hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-background/20 py-8">
          <div className="text-center">
            <h4 className="font-semibold text-lg mb-2">Stay Beautiful</h4>
            <p className="text-background/80 mb-4">
              Get the latest hair trends and exclusive offers delivered to your inbox.
            </p>
            <div className="max-w-sm mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-lg bg-background/10 border border-background/20 placeholder-background/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-background/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/80 text-sm">
              © 2024 MBeauty. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-background/80 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/80 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-background/80 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;