import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Truck, Calendar, ArrowRight } from 'lucide-react';
import { Route } from '../../types';
import Button from '../common/Button';
import { format } from 'date-fns';

interface BusListProps {
  routes: Route[];
  loading: boolean;
}

const BusList: React.FC<BusListProps> = ({ routes, loading }) => {
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        <p className="mt-4 text-gray-500">Searching for buses...</p>
      </div>
    );
  }
  
  if (routes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No buses found</h3>
        <p className="text-gray-600 mb-4">
          We couldn't find any buses for the selected route and date.
        </p>
        <p className="text-gray-500">
          Please try different dates or routes.
        </p>
      </div>
    );
  }
  
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'EEE, MMM d, yyyy');
  };
  
  const calculateDuration = (departure: string, arrival: string) => {
    const departureTime = new Date(departure).getTime();
    const arrivalTime = new Date(arrival).getTime();
    const durationMs = arrivalTime - departureTime;
    
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };
  
  return (
    <div className="space-y-4">
      {routes.map((route) => (
        <div 
          key={route._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-semibold text-gray-800">{route.bus.busName}</h3>
                <p className="text-gray-500">{route.bus.busNumber} • {route.bus.busType}</p>
              </div>
              
              <div className="bg-gray-50 px-4 py-2 rounded-md inline-flex items-center text-sm text-gray-600">
                <Truck size={16} className="mr-1 text-gray-500" />
                <span>{route.availableSeats.length} seats available</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <div className="flex items-center text-gray-500 mb-1">
                  <Clock size={16} className="mr-1" />
                  <span>Departure</span>
                </div>
                <div className="text-lg font-semibold">{formatTime(route.departureTime)}</div>
                <div className="text-gray-500">{route.source}</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-sm text-gray-500 mb-1">{calculateDuration(route.departureTime, route.arrivalTime)}</div>
                <div className="relative w-full flex items-center justify-center">
                  <div className="border-t-2 border-gray-300 border-dashed flex-grow"></div>
                  <ArrowRight size={20} className="text-primary-500 mx-2" />
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  <Calendar size={14} className="inline mr-1" />
                  {formatDate(route.departureTime)}
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center text-gray-500 mb-1">
                  <Clock size={16} className="mr-1" />
                  <span>Arrival</span>
                </div>
                <div className="text-lg font-semibold">{formatTime(route.arrivalTime)}</div>
                <div className="text-gray-500">{route.destination}</div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col-reverse md:flex-row md:items-center md:justify-between">
              <div className="mt-4 md:mt-0">
                <div className="flex items-end">
                  <span className="text-2xl font-bold text-gray-800">${route.fare}</span>
                  <span className="text-gray-500 ml-1">per seat</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">All taxes included</div>
              </div>
              
              <Button 
                onClick={() => navigate(`/booking/${route._id}`)}
                variant="primary"
              >
                View Seats & Book
              </Button>
            </div>
          </div>
          
          {route.bus.amenities && route.bus.amenities.length > 0 && (
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {route.bus.amenities.map((amenity, index) => (
                  <span 
                    key={index}
                    className="bg-white text-xs text-gray-600 px-2 py-1 rounded-full border border-gray-200"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BusList;