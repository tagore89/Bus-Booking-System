import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { busAPI } from '../api';
import BusList from '../components/buses/BusList';
import { Route } from '../types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MapPin, Calendar, Search } from 'lucide-react';
import Button from '../components/common/Button';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState(searchParams.get('source') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [date, setDate] = useState<Date | null>(
    searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date()
  );
  
  const fetchBuses = async () => {
    setLoading(true);
    try {
      const dateString = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      
      const res = await busAPI.searchBuses({
        source,
        destination,
        date: dateString
      });
      
      setRoutes(res.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
      setRoutes([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (source && destination && date) {
      fetchBuses();
    }
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (source && destination && date) {
      const dateString = date.toISOString().split('T')[0];
      
      setSearchParams({
        source,
        destination,
        date: dateString
      });
      
      fetchBuses();
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Find Your Bus</h2>
        
        <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:flex md:space-x-4">
          <div className="relative flex-grow">
            <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Departure City"
                className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="relative flex-grow">
            <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Arrival City"
                className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="relative flex-grow">
            <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholderText="Select Date"
                required
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <Button type="submit">
              <Search size={18} className="mr-1" />
              Search
            </Button>
          </div>
        </form>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {loading 
            ? 'Searching buses...' 
            : routes.length > 0 
              ? `${routes.length} buses found from ${source} to ${destination}` 
              : 'Search Results'}
        </h2>
        <p className="text-gray-600">
          {date && `For ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`}
        </p>
      </div>
      
      <BusList routes={routes} loading={loading} />
    </div>
  );
};

export default SearchPage;