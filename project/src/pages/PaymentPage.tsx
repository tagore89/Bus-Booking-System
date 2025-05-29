import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingAPI, paymentAPI } from '../api';
import PaymentDetails from '../components/payment/PaymentDetails';
import { toast } from 'react-toastify';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const PaymentPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) return;
      
      try {
        setLoading(true);
        const res = await bookingAPI.getBookingById(bookingId);
        
        // Prepare booking details for display
        setBookingDetails({
          routeInfo: {
            source: res.data.route.source,
            destination: res.data.route.destination,
            departureTime: res.data.route.departureTime,
            busName: res.data.route.bus.busName,
          },
          selectedSeats: res.data.seats,
          totalAmount: res.data.totalAmount,
        });
        
        // If payment is already completed, show success
        if (res.data.paymentStatus === 'Completed') {
          setPaymentSuccess(true);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookingDetails();
  }, [bookingId]);
  
  const handlePayment = async () => {
    if (!bookingId) return;
    
    setProcessing(true);
    try {
      // In a real app, we would create a payment intent and use Stripe Elements
      // For demo, we'll simulate a successful payment
      
      // Wait for 2 seconds to simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a fake payment ID
      const paymentId = `pi_${Math.random().toString(36).substr(2, 9)}`;
      
      // Confirm payment
      await paymentAPI.confirmPayment(bookingId, paymentId);
      
      setPaymentSuccess(true);
      toast.success('Payment successful!');
    } catch (err) {
      console.error('Payment failed:', err);
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        <p className="mt-4 text-gray-500">Loading payment details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <XCircle size={48} className="text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Error</h3>
        <p className="text-gray-600 mb-4">
          {error}
        </p>
        <Button variant="primary" onClick={() => navigate('/bookings')}>
          Go to My Bookings
        </Button>
      </div>
    );
  }
  
  if (paymentSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your booking has been confirmed and your tickets are ready.
        </p>
        <div className="space-y-3">
          <Button 
            variant="primary" 
            fullWidth
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            View Booking Details
          </Button>
          <Button 
            variant="outline" 
            fullWidth
            onClick={() => navigate('/bookings')}
          >
            Go to My Bookings
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-500 transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </button>
        
        <div className="ml-auto flex space-x-2">
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700">
            1. Select Seats
          </div>
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700">
            2. Passenger Details
          </div>
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-primary-500 text-white">
            3. Payment
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Payment</h2>
      
      {bookingDetails && (
        <PaymentDetails 
          bookingDetails={bookingDetails}
          processing={processing}
          onPaymentSubmit={handlePayment}
        />
      )}
    </div>
  );
};

export default PaymentPage;