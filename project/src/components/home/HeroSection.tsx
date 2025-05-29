import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CalendarDays } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../common/Button';

const popularDestinations = [
  { source: 'New York', destination: 'Boston' },
  { source: 'Los Angeles', destination: 'San Francisco' },
  { source: 'Chicago', destination: 'Detroit' },
  { source: 'Miami', destination: 'Orlando' },
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [source, setSource] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [date, setDate] = React.useState<Date | null>(new Date());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (source && destination && date) {
      const searchParams = new URLSearchParams({
        source,
        destination,
        date: date.toISOString().split('T')[0],
      });
      
      navigate(`/search?${searchParams.toString()}`);
    }
  };

  const handleQuickSearch = (source: string, destination: string) => {
    setSource(source);
    setDestination(destination);
    
    const searchParams = new URLSearchParams({
      source,
      destination,
      date: new Date().toISOString().split('T')[0],
    });
    
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white"></div>
        <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-white"></div>
      </div>
      
      <div className="relative px-6 py-12 md:py-20 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
            Travel Comfortably with <span className="text-accent-400">TravelEase</span>
          </h1>
          <p className="text-gray-100 text-lg mb-8 text-center md:text-left">
            Book bus tickets online, choose your seats, and enjoy hassle-free travel experiences
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-500 hover:scale-[1.01]">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium mb-2">From</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Departure City"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium mb-2">To</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Arrival City"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Date</label>
                  <div className="relative">
                    <CalendarDays size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      minDate={new Date()}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholderText="Select Date"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button type="submit" fullWidth variant="primary" size="lg">
                  Search Buses
                </Button>
              </div>
            </form>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Popular Routes:</p>
              <div className="flex flex-wrap gap-2">
                {popularDestinations.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(item.source, item.destination)}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    {item.source} to {item.destination}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;