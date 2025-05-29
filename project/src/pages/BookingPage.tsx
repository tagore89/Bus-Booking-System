import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { busAPI, bookingAPI } from '../api';
import { Route, Passenger } from '../types';
import { ArrowLeft, Bus as BusIcon, MapPin, Calendar, Clock } from 'lucide-react';
import SeatSelection from '../components/booking/SeatSelection';
import PassengerForm from '../components/booking/PassengerForm';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const BookingPage: React.FC = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [bookingStep, setBookingStep] = useState<'seat-selection' | 'passenger-details'>('seat-selection');
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        setLoading(true);
        
        if (!routeId) {
          setError('Route ID is missing');
          return;
        }
        
        const res = await busAPI.getBusById(routeId);
        setRoute(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching route details:', err);
        setError('Failed to load route details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRouteDetails();
  }, [routeId]);
  
  useEffect(() => {
    // Initialize passengers array when seats are selected or deselected
    if (selectedSeats.length > 0) {
      const initialPassengers = selectedSeats.map(seat => ({
        name: '',
        age: 0,
        gender: '' as 'Male' | 'Female' | 'Other',
        seatNumber: seat
      }));
      setPassengers(initialPassengers);
    } else {
      setPassengers([]);
    }
  }, [selectedSeats]);
  
  const handleSeatSelect = (seatNumber: number) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatNumber)) {
        return prev.filter(seat => seat !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };
  
  const handleContinueToPassengerDetails = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    
    setBookingStep('passenger-details');
  };
  
  const handleProceedToPayment = async () => {
    if (!route) return;
    
    setSubmitting(true);
    
    try {
      // Create booking
      const totalAmount = route.fare * selectedSeats.length;
      
      const bookingData = {
        routeId: route._id,
        seats: selectedSeats,
        passengerDetails: passengers,
        totalAmount
      };
      
      const res = await bookingAPI.createBooking(bookingData);
      
      toast.success('Booking created successfully');
      
      // Navigate to payment page
      navigate(`/payment/${res.data._id}`);
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
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
  
  if (error || !route) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Error</h3>
        <p className="text-gray-600 mb-4">
          {error || 'Failed to load booking details'}
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
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => {
            if (bookingStep === 'passenger-details') {
              setBookingStep('seat-selection');
            } else {
              navigate(-1);
            }
          }}
          className="flex items-center text-gray-600 hover:text-primary-500 transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" />
          {bookingStep === 'passenger-details' ? 'Back to Seat Selection' : 'Back'}
        </button>
        
        <div className="ml-auto flex space-x-2">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            bookingStep === 'seat-selection' 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}>
            1. Select Seats
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            bookingStep === 'passenger-details' 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}>
            2. Passenger Details
          </div>
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700">
            3. Payment
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <BusIcon size={20} className="text-primary-500 mr-3 mt-1" />
              <div>
                <div className="text-sm text-gray-500">Bus</div>
                <div className="font-medium">{route.bus.busName} ({route.bus.busType})</div>
                <div className="text-sm text-gray-600">{route.bus.busNumber}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={20} className="text-primary-500 mr-3 mt-1" />
              <div>
                <div className="text-sm text-gray-500">Route</div>
                <div className="font-medium">{route.source} to {route.destination}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Calendar size={20} className="text-primary-500 mr-3 mt-1" />
              <div>
                <div className="text-sm text-gray-500">Date</div>
                <div className="font-medium">{formatDate(route.departureTime)}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock size={20} className="text-primary-500 mr-3 mt-1" />
              <div>
                <div className="text-sm text-gray-500">Time</div>
                <div className="font-medium">{formatTime(route.departureTime)} - {formatTime(route.arrivalTime)}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-primary-50 rounded-md text-primary-600">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-medium">Fare per seat:</span> ${route.fare}
            </div>
            <div>
              <span className="font-medium">Total fare:</span> ${route.fare * selectedSeats.length}
            </div>
          </div>
        </div>
      </div>
      
      {bookingStep === 'seat-selection' ? (
        <>
          <SeatSelection 
            availableSeats={route.availableSeats}
            totalSeats={route.totalSeats}
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelect}
          />
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="primary"
              onClick={handleContinueToPassengerDetails}
              disabled={selectedSeats.length === 0}
            >
              Continue to Passenger Details
            </Button>
          </div>
        </>
      ) : (
        <>
          <PassengerForm 
            selectedSeats={selectedSeats}
            passengers={passengers}
            setPassengers={setPassengers}
            onSubmit={handleProceedToPayment}
          />
        </>
      )}
    </div>
  );
};

export default BookingPage;