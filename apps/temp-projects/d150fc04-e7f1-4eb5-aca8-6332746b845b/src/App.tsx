import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieList from './components/MovieList';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';

export interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  image: string;
  description: string;
  showtimes: string[];
  price: number;
}

export interface BookingData {
  movie: Movie;
  showtime: string;
  seats: string[];
  totalPrice: number;
}

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingData[]>([]);

  const movies: Movie[] = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      genre: "Sci-Fi, Adventure",
      duration: "3h 12m",
      rating: "PG-13",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      description: "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.",
      showtimes: ["10:00 AM", "2:00 PM", "6:00 PM", "9:30 PM"],
      price: 12.99
    },
    {
      id: 2,
      title: "Top Gun: Maverick",
      genre: "Action, Drama",
      duration: "2h 17m",
      rating: "PG-13",
      image: "https://images.unsplash.com/photo-1489599162810-1e666bfbecf9?w=400&h=600&fit=crop",
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.",
      showtimes: ["11:00 AM", "3:00 PM", "7:00 PM", "10:00 PM"],
      price: 11.99
    },
    {
      id: 3,
      title: "Black Panther: Wakanda Forever",
      genre: "Action, Adventure",
      duration: "2h 41m",
      rating: "PG-13",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
      showtimes: ["12:00 PM", "4:00 PM", "8:00 PM", "11:00 PM"],
      price: 13.99
    },
    {
      id: 4,
      title: "The Batman",
      genre: "Action, Crime",
      duration: "2h 56m",
      rating: "PG-13",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
      showtimes: ["1:00 PM", "5:00 PM", "9:00 PM"],
      price: 12.49
    },
    {
      id: 5,
      title: "Spider-Man: No Way Home",
      genre: "Action, Adventure",
      duration: "2h 28m",
      rating: "PG-13",
      image: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=400&h=600&fit=crop",
      description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
      showtimes: ["10:30 AM", "2:30 PM", "6:30 PM", "10:30 PM"],
      price: 13.49
    },
    {
      id: 6,
      title: "Dune",
      genre: "Sci-Fi, Adventure",
      duration: "2h 35m",
      rating: "PG-13",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet.",
      showtimes: ["11:30 AM", "3:30 PM", "7:30 PM"],
      price: 11.49
    }
  ];

  const handleBookMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = (bookingData: BookingData) => {
    setBookings([...bookings, bookingData]);
    setIsBookingModalOpen(false);
    setSelectedMovie(null);
    alert('Booking confirmed! Check your email for tickets.');
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <MovieList movies={movies} onBookMovie={handleBookMovie} />
      {selectedMovie && (
        <BookingModal
          movie={selectedMovie}
          isOpen={isBookingModalOpen}
          onClose={handleCloseModal}
          onBookingComplete={handleBookingComplete}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;