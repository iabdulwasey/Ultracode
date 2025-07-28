import React from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Heart,
  ArrowUp
} from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: "Destinations",
      links: [
        "Tokyo",
        "Kyoto", 
        "Osaka",
        "Hiroshima",
        "Nara",
        "Mount Fuji"
      ]
    },
    {
      title: "Experiences",
      links: [
        "Cultural Tours",
        "Food Experiences", 
        "Temple Visits",
        "Cherry Blossom Tours",
        "Traditional Crafts",
        "Hot Springs"
      ]
    },
    {
      title: "Travel Info",
      links: [
        "Travel Tips",
        "Transportation",
        "Accommodation", 
        "Language Guide",
        "Currency",
        "Weather"
      ]
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Contact",
        "Blog",
        "Careers",
        "Press",
        "Partners"
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <footer className="bg-gradient-to-br from-japan-navy to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 cherry-blossom-bg opacity-5" />
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-japan-red to-japan-gold rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Exploring Japan</h3>
                  <p className="text-japan-cherry text-sm">Land of the Rising Sun</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Your trusted companion for discovering the magic of Japan. From ancient temples to modern marvels, 
                we help you create unforgettable memories in the Land of the Rising Sun.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-japan-cherry" />
                  <span className="text-gray-300">hello@exploringjapan.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-japan-cherry" />
                  <span className="text-gray-300">+81 3-1234-5678</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-japan-cherry mt-0.5" />
                  <span className="text-gray-300">Tokyo, Japan</span>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-semibold mb-4 text-white">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href="#"
                            className="text-gray-300 hover:text-japan-cherry transition-colors duration-200 text-sm"
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
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-gray-700 pt-12 mt-12">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-2xl font-bold mb-4">Stay Connected</h4>
              <p className="text-gray-300 mb-6">
                Follow us for daily inspiration, travel tips, and the latest updates from Japan
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-6 mb-8">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-japan-red hover:scale-110 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5 text-gray-300 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-300 text-sm mb-4 md:mb-0">
                <span>© 2024 Exploring Japan. Made with</span>
                <Heart className="w-4 h-4 text-japan-red fill-japan-red" />
                <span>in Tokyo</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-gray-300 hover:text-japan-cherry transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-300 hover:text-japan-cherry transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-300 hover:text-japan-cherry transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-japan-red to-japan-gold rounded-full flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-white group-hover:translate-y-[-2px] transition-transform" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;