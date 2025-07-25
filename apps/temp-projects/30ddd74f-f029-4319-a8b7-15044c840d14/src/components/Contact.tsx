import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      description: "Call us for immediate assistance"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@mbeauty.com", "bookings@mbeauty.com"],
      description: "Send us your questions anytime"
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["123 Beauty Street", "New York, NY 10001"],
      description: "Visit our beautiful salon"
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 9AM-7PM", "Sat-Sun: 10AM-6PM"],
      description: "We're here when you need us"
    }
  ];

  const services = [
    "Clip-In Extensions",
    "Tape-In Extensions",
    "Keratin Bond Extensions",
    "Halo Extensions",
    "Ponytail Extensions",
    "Color Matching",
    "Consultation"
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your hair? Contact us today to book your consultation 
            or learn more about our premium hair extension services.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Book Your Consultation
            </h3>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700">Thank you! We'll contact you within 24 hours.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your hair goals, current hair condition, or any questions you have..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Or call us directly at{' '}
                <a href="tel:+15551234567" className="text-primary-600 font-semibold hover:text-primary-700">
                  (555) 123-4567
                </a>
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid gap-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-primary-100 to-gold-100 p-3 rounded-xl">
                        <IconComponent className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {info.title}
                        </h4>
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-900 font-medium">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Find Us</h4>
              <div className="aspect-w-16 aspect-h-10 bg-gradient-to-br from-primary-100 to-gold-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-2" />
                  <p className="text-gray-700 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500">123 Beauty Street, New York, NY</p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
              <h4 className="text-xl font-semibold mb-4">Need Immediate Help?</h4>
              <p className="mb-4">
                Our hair extension experts are standing by to answer your questions 
                and help you choose the perfect solution for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+15551234567"
                  className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-50 transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="mailto:info@mbeauty.com"
                  className="bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary-800 transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;