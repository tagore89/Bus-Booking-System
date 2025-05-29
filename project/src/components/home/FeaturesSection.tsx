import React from 'react';
import { Clock, CreditCard, MapPin, ArrowLeftRight, Shield, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: <Clock className="w-10 h-10 text-primary-500" />,
    title: 'Quick Booking',
    description: 'Book your bus tickets in less than 5 minutes with our streamlined booking process.'
  },
  {
    icon: <CreditCard className="w-10 h-10 text-primary-500" />,
    title: 'Secure Payments',
    description: 'Multiple payment options with secure, encrypted transactions for worry-free booking.'
  },
  {
    icon: <MapPin className="w-10 h-10 text-primary-500" />,
    title: 'Wide Coverage',
    description: 'Extensive network of bus routes covering major cities and destinations nationwide.'
  },
  {
    icon: <ArrowLeftRight className="w-10 h-10 text-primary-500" />,
    title: 'Flexible Options',
    description: 'Choose from various bus types, timings, and seat preferences to suit your needs.'
  },
  {
    icon: <Shield className="w-10 h-10 text-primary-500" />,
    title: 'Safe Travel',
    description: 'All our partner buses follow strict safety protocols and sanitization procedures.'
  },
  {
    icon: <HeadphonesIcon className="w-10 h-10 text-primary-500" />,
    title: '24/7 Support',
    description: 'Round-the-clock customer service to assist you with any queries or issues.'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose TravelEase</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We provide a seamless bus booking experience with a range of features designed to make your journey comfortable and hassle-free.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;