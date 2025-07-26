import React, { useState, useEffect } from 'react';
import { Seat } from '../types';

interface SeatSelectionProps {
  selectedSeats: string[];
  onSeatSelect: (seats: string[]) => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ selectedSeats, onSeatSelect }) => {
  const [seats, setSeats] = useState<Seat[]>([]);

  // Generate seats layout
  useEffect(() => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    const generatedSeats: Seat[] = [];

    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        generatedSeats.push({
          id: seatId,
          row,
          number: i,
          isOccupied: Math.random() < 0.2, // 20% chance of being occupied
          isSelected: selectedSeats.includes(seatId)
        });
      }
    });

    setSeats(generatedSeats);
  }, [selectedSeats]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.isOccupied) return;

    const newSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter(id => id !== seatId)
      : [...selectedSeats, seatId];

    onSeatSelect(newSelectedSeats);
  };

  const getSeatClassName = (seat: Seat) => {
    if (seat.isOccupied) {
      return 'bg-red-500 cursor-not-allowed';
    }
    if (seat.isSelected) {
      return 'bg-primary text-primary-foreground';
    }
    return 'bg-muted hover:bg-muted/80 cursor-pointer';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Screen */}
      <div className="mb-8">
        <div className="h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-2"></div>
        <p className="text-center text-sm text-muted-foreground">SCREEN</p>
      </div>

      {/* Seats Grid */}
      <div className="space-y-3">
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((row) => (
          <div key={row} className="flex items-center justify-center space-x-2">
            <span className="w-6 text-sm font-medium text-center">{row}</span>
            <div className="flex space-x-1">
              {seats
                .filter(seat => seat.row === row)
                .map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id)}
                    className={`w-8 h-8 rounded-t-lg text-xs font-medium transition-colors ${getSeatClassName(seat)}`}
                    disabled={seat.isOccupied}
                    title={seat.isOccupied ? 'Occupied' : seat.id}
                  >
                    {seat.number}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-muted rounded-t"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary rounded-t"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded-t"></div>
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;