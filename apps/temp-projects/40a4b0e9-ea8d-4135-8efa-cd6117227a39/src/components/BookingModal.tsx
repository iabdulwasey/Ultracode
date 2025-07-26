import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CreditCard } from 'lucide-react';
import { Movie, BookingDetails, Seat } from '../types';
import SeatSelection from './SeatSelection';

interface BookingModalProps {
  movie: Movie;
  onSubmit: (booking: BookingDetails) => void;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ movie, onSubmit, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const TICKET_PRICE = 12;
  const totalPrice = selectedSeats.length * TICKET_PRICE;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const booking: BookingDetails = {
      movieId: movie.id,
      movieTitle: movie.title,
      showtime: selectedShowtime,
      seats: selectedSeats,
      totalPrice,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone
    };
    onSubmit(booking);
  };

  const canProceedStep1 = selectedShowtime !== '';
  const canProceedStep2 = selectedSeats.length > 0;
  const canSubmit = customerInfo.name && customerInfo.email && customerInfo.phone;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-card-foreground">Book Tickets</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Movie Info */}
          <div className="flex items-start space-x-4 mb-6 p-4 bg-muted rounded-lg">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-20 h-28 object-cover rounded"
            />
            <div>
              <h3 className="text-xl font-bold text-card-foreground">{movie.title}</h3>
              <p className="text-muted-foreground">{movie.genre} • {movie.duration}</p>
              <p className="text-sm text-muted-foreground mt-1">{movie.description}</p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= stepNumber
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        step > stepNumber ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Select Showtime */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Select Showtime
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {movie.showtimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedShowtime(time)}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      selectedShowtime === time
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <Clock className="h-4 w-4 mx-auto mb-1" />
                    <div className="font-semibold">{time}</div>
                    <div className="text-xs text-muted-foreground">Available</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Seats */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Select Seats
              </h3>
              <SeatSelection
                selectedSeats={selectedSeats}
                onSeatSelect={setSelectedSeats}
              />
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Selected Seats: {selectedSeats.join(', ') || 'None'}</span>
                  <span className="font-bold">Total: ${totalPrice}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Customer Info & Payment */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Customer Information
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg bg-background"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Movie:</span>
                      <span>{movie.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Showtime:</span>
                      <span>{selectedShowtime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seats:</span>
                      <span>{selectedSeats.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tickets:</span>
                      <span>{selectedSeats.length} × ${TICKET_PRICE}</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={step === 1 ? onClose : handleBack}
              className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            
            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !canProceedStep1) ||
                  (step === 2 && !canProceedStep2)
                }
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;