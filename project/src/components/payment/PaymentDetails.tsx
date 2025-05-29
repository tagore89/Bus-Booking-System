import React from 'react';
import { CreditCard } from 'lucide-react';
import Button from '../common/Button';

interface PaymentDetailsProps {
  bookingDetails: {
    routeInfo: {
      source: string;
      destination: string;
      departureTime: string;
      busName: string;
    };
    selectedSeats: number[];
    totalAmount: number;
  };
  processing: boolean;
  onPaymentSubmit: () => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  bookingDetails,
  processing,
  onPaymentSubmit
}) => {
  const { routeInfo, selectedSeats, totalAmount } = bookingDetails;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h3>
        
        <div className="mb-6 p-4 bg-primary-50 rounded-md">
          <h4 className="font-medium text-gray-700 mb-2">Booking Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Bus:</span>
              <span className="font-medium">{routeInfo.busName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Route:</span>
              <span className="font-medium">{routeInfo.source} to {routeInfo.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Departure:</span>
              <span className="font-medium">{new Date(routeInfo.departureTime).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Seats:</span>
              <span className="font-medium">{selectedSeats.join(', ')}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-700 font-medium">Total Amount:</span>
              <span className="text-lg font-bold text-primary-600">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-4">Payment Method</h4>
          
          <div className="border border-gray-300 rounded-md p-4 flex items-start space-x-3">
            <input 
              type="radio" 
              id="card-payment" 
              name="payment-method" 
              className="mt-1"
              checked 
              readOnly
            />
            <div className="flex-grow">
              <label htmlFor="card-payment" className="font-medium text-gray-700 block mb-1">Credit/Debit Card</label>
              <p className="text-gray-500 text-sm">Make a secure payment using your credit or debit card.</p>
              <div className="mt-3 flex items-center space-x-2">
                <CreditCard size={20} className="text-gray-400" />
                <span className="text-gray-600 text-sm">
                  Secured by Stripe Payment Gateway
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md mb-6">
          <div className="flex items-start space-x-3">
            <input 
              type="checkbox" 
              id="terms" 
              className="mt-1"
              checked 
              readOnly
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms & Conditions and Privacy Policy. I understand that my booking is subject to the cancellation and refund policies.
            </label>
          </div>
        </div>
        
        <Button 
          variant="primary" 
          fullWidth 
          size="lg"
          onClick={onPaymentSubmit}
          isLoading={processing}
        >
          Pay ${totalAmount.toFixed(2)}
        </Button>
        
        <p className="text-center text-xs text-gray-500 mt-4">
          By clicking the Pay button, you will be redirected to Stripe's secure payment page.
        </p>
      </div>
    </div>
  );
};

export default PaymentDetails;