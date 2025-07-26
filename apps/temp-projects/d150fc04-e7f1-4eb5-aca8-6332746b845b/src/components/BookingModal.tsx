import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin } from 'lucide-react';
import { Movie, BookingData } from '../App';

interface BookingModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (bookingData: BookingData) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  movie,
  isOpen,
  onClose,
  onBookingComplete
}) => {
  const [selectedShowtime, setSelectedShowtime] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const seats = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
  ];

  const occupiedSeats = ['A1', 'A2', 'B5', 'C3', 'C4', 'D7', 'E1', 'E8'];

  const handleSeatClick = (seat: string) => {
    if (occupiedSeats.includes(seat)) return;
    
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = () => {
    if (!selectedShowtime || selectedSeats.length === 0 || !customerInfo.name || !customerInfo.email) {
      alert('Please fill in all required fields and select at least one seat.');
      return;
    }

    const bookingData: BookingData = {
      movie,
      showtime: selectedShowtime,
      seats: selectedSeats,
      totalPrice: selectedSeats.length * movie.price
    };

    onBookingComplete(bookingData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Book Tickets</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Movie Info */}
            <div>
              <div className="flex gap-4 mb-6">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-24 h-36 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{movie.title}</h3>
                  <p className="text-gray-600 mb-1">{movie.genre}</p>
                  <p className="text-gray-600 mb-1">{movie.duration}</p>
                  <p className="text-gray-600">{movie.rating}</p>
                </div>
              </div>

              {/* Showtime Selection */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Select Showtime
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {movie.showtimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedShowtime(time)}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        selectedShowtime === time
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Seat Selection */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Select Seats
              </h4>
              
              {/* Screen */}
              <div className="bg-gray-800 text-white text-center py-2 rounded-lg mb-6">
                SCREEN
              </div>

              {/* Seat Map */}
              <div className="space-y-2 mb-6">
                {seats.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-2">
                    {row.map((seat) => (
                      <button
                        key={seat}
                        onClick={() => handleSeatClick(seat)}
                        disabled={occupiedSeats.includes(seat)}
                        className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                          occupiedSeats.includes(seat)
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : selectedSeats.includes(seat)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 text-sm mb-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-primary-600 rounded mr-2"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
                  <span>Occupied</span>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-900 mb-2">Booking Summary</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Movie:</span>
                    <span>{movie.title}</span>
                  </div>
                  {selectedShowtime && (
                    <div className="flex justify-between">
                      <span>Showtime:</span>
                      <span>{selectedShowtime}</span>
                    </div>
                  )}
                  {selectedSeats.length > 0 && (
                    <div className="flex justify-between">
                      <span>Seats:</span>
                      <span>{selectedSeats.join(', ')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tickets:</span>
                    <span>{selectedSeats.length} × ${movie.price}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>${(selectedSeats.length * movie.price).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t">
            <button
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleBooking}
              className="flex-1 btn-primary"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;