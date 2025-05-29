import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { busAPI } from '../api';
import { Route, Bus } from '../types';
import { Calendar, Clock, MapPin, Check, Info } from 'lucide-react';
import Button from '../components/common/Button';
import { format } from 'date-fns';

const BusDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bus, setBus] = useState<Bus | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        setLoading(true);
        
        if (!id) {
          setError('Bus ID is missing');
          return;
        }
        
        const busRes = await busAPI.getBusById(id);
        const routesRes = await busAPI.getBusRoutes(id);
        
        setBus(busRes.data);
        setRoutes(routesRes.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching bus details:', err);
        setError('Failed to load bus details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBusDetails();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        <p className="mt-4 text-gray-500">Loading bus details...</p>
      </div>
    );
  }
  
  if (error || !bus) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Error</h3>
        <p className="text-gray-600 mb-4">
          {error || 'Failed to load bus details'}
        </p>
        <Button variant="primary" onClick={() => navigate('/search')}>
          Go Back to Search
        </Button>
      </div>
    );
  }
  
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'EEE, MMM d, yyyy');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-600 text-white p-6">
          <h2 className="text-2xl font-bold">{bus.busName}</h2>
          <div className="flex items-center mt-2">
            <span className="bg-white text-primary-600 text-sm font-medium px-2 py-1 rounded-md mr-3">
              {bus.busNumber}
            </span>
            <span className="bg-white text-primary-600 text-sm font-medium px-2 py-1 rounded-md">
              {bus.busType}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Bus Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center text-gray-700 mb-2">
                  <Info size={18} className="mr-2 text-primary-500" />
                  <span className="font-medium">Type:</span>
                  <span className="ml-2">{bus.busType}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Info size={18} className="mr-2 text-primary-500" />
                  <span className="font-medium">Total Seats:</span>
                  <span className="ml-2">{bus.totalSeats}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-700 mb-2">Amenities:</h4>
                {bus.amenities && bus.amenities.length > 0 ? (
                  <ul className="space-y-1">
                    {bus.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Check size={16} className="mr-2 text-green-500" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No amenities listed</p>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Available Routes</h3>
            
            {routes.length === 0 ? (
              <p className="text-gray-500">No routes available for this bus at the moment.</p>
            ) : (
              <div className="space-y-4">
                {routes.map((route) => (
                  <div 
                    key={route._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="mb-2 md:mb-0">
                        <div className="flex items-center text-gray-700 mb-1">
                          <MapPin size={16} className="mr-1 text-primary-500" />
                          <span className="font-medium">Route:</span>
                          <span className="ml-2">{route.source} to {route.destination}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Calendar size={16} className="mr-1 text-primary-500" />
                          <span className="font-medium">Date:</span>
                          <span className="ml-2">{formatDate(route.departureTime)}</span>
                        </div>
                      </div>
                      
                      <div className="bg-primary-50 px-3 py-1 rounded-md text-primary-600 font-medium text-sm">
                        {route.availableSeats.length} seats available
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="grid grid-cols-2 gap-4 mb-4 md:mb-0">
                        <div>
                          <div className="text-xs text-gray-500">Departure</div>
                          <div className="text-lg font-semibold text-gray-800">
                            {formatTime(route.departureTime)}
                          </div>
                          <div className="text-sm text-gray-600">{route.source}</div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-500">Arrival</div>
                          <div className="text-lg font-semibold text-gray-800">
                            {formatTime(route.arrivalTime)}
                          </div>
                          <div className="text-sm text-gray-600">{route.destination}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="text-sm text-gray-500 mb-1">Fare per seat</div>
                        <div className="text-xl font-bold text-gray-800 mb-2">${route.fare}</div>
                        <Button
                          onClick={() => navigate(`/booking/${route._id}`)}
                          variant="primary"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetailsPage;