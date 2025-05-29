import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from '../api';
import { Booking } from '../types';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { format } from 'date-fns';

const BookingHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await bookingAPI.getMyBookings();
        setBookings(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load your bookings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);
  
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'EEE, MMM d, yyyy');
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'Cancelled':
        return <XCircle size={18} className="text-red-500" />;
      case 'Pending':
        return <AlertCircle size={18} className="text-amber-500" />;
      default:
        return null;
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        <p className="mt-4 text-gray-500">Loading your bookings...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Error</h3>
        <p className="text-gray-600 mb-4">
          {error}
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </div>
    );
  }
  
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Found</h3>
        <p className="text-gray-600 mb-6">
          You haven't made any bookings yet. Start by searching for a bus.
        </p>
        <Button variant="primary" onClick={() => navigate('/search')}>
          Search Buses
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
      
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div 
            key={booking._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="mb-2 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {booking.route.bus.busName}
                  </h3>
                  <p className="text-gray-600">
                    {booking.route.bus.busNumber} • {booking.route.bus.busType}
                  </p>
                </div>
                
                <div className="flex items-center">
                  {getStatusIcon(booking.bookingStatus)}
                  <span className={`ml-1 font-medium ${
                    booking.bookingStatus === 'Confirmed' ? 'text-green-600' :
                    booking.bookingStatus === 'Cancelled' ? 'text-red-600' : 
                    'text-amber-600'
                  }`}>
                    {booking.bookingStatus}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-start">
                  <MapPin size={18} className="mr-2 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Route</div>
                    <div className="font-medium">{booking.route.source} to {booking.route.destination}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar size={18} className="mr-2 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Date</div>
                    <div className="font-medium">{formatDate(booking.route.departureTime)}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={18} className="mr-2 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Time</div>
                    <div className="font-medium">{formatTime(booking.route.departureTime)}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-gray-200 pt-4">
                <div className="mb-3 md:mb-0">
                  <div className="text-sm text-gray-500 mb-1">Booking Reference</div>
                  <div className="font-mono text-gray-800">{booking._id.substring(0, 8).toUpperCase()}</div>
                </div>
                
                <div className="mb-3 md:mb-0">
                  <div className="text-sm text-gray-500 mb-1">Seats</div>
                  <div className="font-medium">{booking.seats.join(', ')}</div>
                </div>
                
                <div className="mb-3 md:mb-0">
                  <div className="text-sm text-gray-500 mb-1">Amount Paid</div>
                  <div className="text-lg font-bold text-gray-800">${booking.totalAmount}</div>
                </div>
                
                <div>
                  <Button 
                    variant="primary"
                    onClick={() => navigate(`/bookings/${booking._id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistoryPage;