import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingAPI } from '../api';
import { Booking } from '../types';
import { 
  Calendar, Clock, MapPin, User, Check, Download, 
  ArrowLeft, CheckCircle, XCircle, AlertCircle 
} from 'lucide-react';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const BookingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingBooking, setCancellingBooking] = useState(false);
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const res = await bookingAPI.getBookingById(id);
        setBooking(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookingDetails();
  }, [id]);
  
  const handleCancelBooking = async () => {
    if (!id || !booking) return;
    
    // Check if booking is already cancelled
    if (booking.bookingStatus === 'Cancelled') {
      toast.info('This booking is already cancelled');
      return;
    }
    
    // Check if departure time is in the past
    const departureTime = new Date(booking.route.departureTime);
    if (departureTime < new Date()) {
      toast.error('Cannot cancel bookings after departure time');
      return;
    }
    
    // Confirm cancellation
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    
    setCancellingBooking(true);
    try {
      const res = await bookingAPI.cancelBooking(id);
      setBooking(res.data.booking);
      toast.success('Booking cancelled successfully');
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error('Failed to cancel booking');
    } finally {
      setCancellingBooking(false);
    }
  };
  
  const handleDownloadTicket = () => {
    if (!booking) return;
    
    // In a real application, this would generate a PDF ticket
    // For demo, we'll just show a toast message
    toast.info('Ticket download functionality would be implemented here');
  };
  
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'EEE, MMM d, yyyy');
  };
  
  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), 'PPpp');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return (
          <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
            <CheckCircle size={16} className="mr-1" />
            {status}
          </div>
        );
      case 'Cancelled':
        return (
          <div className="flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full">
            <XCircle size={16} className="mr-1" />
            {status}
          </div>
        );
      case 'Pending':
        return (
          <div className="flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
            <AlertCircle size={16} className="mr-1" />
            {status}
          </div>
        );
      default:
        return null;
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        <p className="mt-4 text-gray-500">Loading booking details...</p>
      </div>
    );
  }
  
  if (error || !booking) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Error</h3>
        <p className="text-gray-600 mb-4">
          {error || 'Failed to load booking details'}
        </p>
        <Button variant="primary" onClick={() => navigate('/bookings')}>
          Go to My Bookings
        </Button>
      </div>
    );
  }
  
  const canCancelBooking = 
    booking.bookingStatus !== 'Cancelled' && 
    new Date(booking.route.departureTime) > new Date();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/bookings')}
          className="flex items-center text-gray-600 hover:text-primary-500 transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to My Bookings
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-600 text-white p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Booking Details</h2>
              <p className="text-primary-100">Booking ID: {booking._id}</p>
            </div>
            {getStatusBadge(booking.bookingStatus)}
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Journey Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar size={18} className="mr-3 text-primary-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Date</div>
                    <div className="font-medium">{formatDate(booking.route.departureTime)}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={18} className="mr-3 text-primary-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Time</div>
                    <div className="font-medium">
                      {formatTime(booking.route.departureTime)} - {formatTime(booking.route.arrivalTime)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={18} className="mr-3 text-primary-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">From</div>
                    <div className="font-medium">{booking.route.source}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={18} className="mr-3 text-primary-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">To</div>
                    <div className="font-medium">{booking.route.destination}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <User size={18} className="mr-3 text-primary-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Bus</div>
                    <div className="font-medium">{booking.route.bus.busName}</div>
                    <div className="text-sm text-gray-600">
                      {booking.route.bus.busNumber} • {booking.route.bus.busType}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3">Booking Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Date:</span>
                    <span>{formatDateTime(booking.bookingDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`${
                      booking.paymentStatus === 'Completed' ? 'text-green-600' :
                      booking.paymentStatus === 'Failed' ? 'text-red-600' :
                      booking.paymentStatus === 'Refunded' ? 'text-amber-600' :
                      'text-gray-600'
                    }`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold">${booking.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Passenger Details</h3>
              
              <div className="space-y-4">
                {booking.passengerDetails.map((passenger, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Passenger {index + 1}</h4>
                      <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                        Seat {booking.seats[index]}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span>{passenger.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span>{passenger.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span>{passenger.gender}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex flex-col space-y-3">
                {booking.bookingStatus === 'Confirmed' && (
                  <Button
                    onClick={handleDownloadTicket}
                    fullWidth
                  >
                    <Download size={18} className="mr-2" />
                    Download E-Ticket
                  </Button>
                )}
                
                {canCancelBooking && (
                  <Button
                    variant="danger"
                    onClick={handleCancelBooking}
                    isLoading={cancellingBooking}
                    fullWidth
                  >
                    <XCircle size={18} className="mr-2" />
                    Cancel Booking
                  </Button>
                )}
              </div>
              
              {booking.bookingStatus === 'Cancelled' && (
                <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-md">
                  <p className="text-sm">
                    This booking has been cancelled. If you made a payment, a refund will be processed according to our refund policy.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;