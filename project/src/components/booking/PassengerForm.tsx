import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { Passenger } from '../../types';

interface PassengerFormProps {
  selectedSeats: number[];
  passengers: Passenger[];
  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
  onSubmit: () => void;
}

const PassengerForm: React.FC<PassengerFormProps> = ({
  selectedSeats,
  passengers,
  setPassengers,
  onSubmit
}) => {
  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengers(updatedPassengers);
  };

  const isFormValid = () => {
    if (passengers.length !== selectedSeats.length) return false;
    
    return passengers.every(passenger => 
      passenger.name.trim() !== '' && 
      passenger.age > 0 && 
      passenger.gender !== ''
    );
  };

  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Passenger Details</h3>
      
      {selectedSeats.length === 0 ? (
        <p className="text-gray-600">Please select seats to enter passenger details.</p>
      ) : (
        <>
          <div className="space-y-6">
            {selectedSeats.map((seatNumber, index) => (
              <div key={seatNumber} className="border rounded-md p-4 bg-gray-50">
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Passenger {index + 1} - Seat {seatNumber}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter passenger's full name"
                    value={passengers[index]?.name || ''}
                    onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                    required
                  />
                  
                  <Input
                    label="Age"
                    type="number"
                    placeholder="Enter age"
                    min="1"
                    max="120"
                    value={passengers[index]?.age || ''}
                    onChange={(e) => handlePassengerChange(index, 'age', parseInt(e.target.value))}
                    required
                  />
                </div>
                
                <div className="mt-3">
                  <Select
                    label="Gender"
                    options={genderOptions}
                    value={passengers[index]?.gender || ''}
                    onChange={(e) => handlePassengerChange(index, 'gender', e.target.value as 'Male' | 'Female' | 'Other')}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Button 
              variant="primary" 
              onClick={onSubmit}
              disabled={!isFormValid()}
              fullWidth
            >
              Continue to Payment
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PassengerForm;