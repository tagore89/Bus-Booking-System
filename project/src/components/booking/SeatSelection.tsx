import React, { useState } from 'react';
import clsx from 'clsx';

interface SeatSelectionProps {
  availableSeats: number[];
  totalSeats: number;
  selectedSeats: number[];
  onSeatSelect: (seatNumber: number) => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  availableSeats,
  totalSeats,
  selectedSeats,
  onSeatSelect
}) => {
  // Calculate number of rows and columns for bus layout
  const seatsPerRow = 4; // 2 seats on each side with an aisle
  const numRows = Math.ceil(totalSeats / seatsPerRow);
  
  // Create a 2D representation of the bus
  const createBusLayout = () => {
    const layout = [];
    let seatCount = 1;
    
    for (let row = 0; row < numRows; row++) {
      const rowSeats = [];
      for (let col = 0; col < seatsPerRow; col++) {
        // Skip the aisle (positions 1 and 2 in a 4-seat row)
        if (col === 2) {
          rowSeats.push({ seatNumber: null, isAisle: true });
        } else {
          if (seatCount <= totalSeats) {
            rowSeats.push({ 
              seatNumber: seatCount, 
              isAvailable: availableSeats.includes(seatCount),
              isSelected: selectedSeats.includes(seatCount),
              isAisle: false
            });
            seatCount++;
          } else {
            rowSeats.push({ seatNumber: null, isAisle: false });
          }
        }
      }
      layout.push(rowSeats);
    }
    
    return layout;
  };
  
  const busLayout = createBusLayout();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Your Seats</h3>
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-200 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Booked</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-white border border-gray-300 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-primary-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Selected</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8 overflow-x-auto">
        <div className="bg-gray-100 p-3 w-64 mx-auto rounded-t-lg text-center">
          <span className="text-sm font-medium">Driver</span>
        </div>
        
        <div className="relative bg-gray-50 rounded-md p-4 pb-12 mx-auto" style={{ width: 'fit-content', minWidth: '280px' }}>
          {busLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-3">
              {row.map((seat, colIndex) => {
                if (seat.isAisle) {
                  return <div key={`aisle-${rowIndex}-${colIndex}`} className="w-6"></div>;
                }
                
                if (seat.seatNumber === null) {
                  return <div key={`empty-${rowIndex}-${colIndex}`} className="w-8 h-8 mx-1"></div>;
                }
                
                return (
                  <button
                    key={seat.seatNumber}
                    className={clsx(
                      'w-8 h-8 mx-1 rounded flex items-center justify-center text-xs transition-colors',
                      {
                        'bg-white border border-gray-300 hover:bg-gray-100 cursor-pointer': seat.isAvailable && !seat.isSelected,
                        'bg-primary-500 text-white cursor-pointer': seat.isSelected,
                        'bg-gray-200 cursor-not-allowed': !seat.isAvailable
                      }
                    )}
                    onClick={() => seat.isAvailable && onSeatSelect(seat.seatNumber!)}
                    disabled={!seat.isAvailable}
                  >
                    {seat.seatNumber}
                  </button>
                );
              })}
            </div>
          ))}
          
          {/* Entry/Exit door */}
          <div className="absolute bottom-0 right-2 border-t-2 border-r-2 border-gray-400 h-8 w-10 rounded-tr-md"></div>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          {selectedSeats.length === 0 
            ? 'Please select your seats to continue.' 
            : `You have selected ${selectedSeats.length} seat(s): ${selectedSeats.join(', ')}`}
        </p>
      </div>
    </div>
  );
};

export default SeatSelection;