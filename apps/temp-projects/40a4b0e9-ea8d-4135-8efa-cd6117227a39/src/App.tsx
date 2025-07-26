import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import { Movie, BookingDetails } from './types';

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Avengers: Endgame",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
    genre: "Action, Adventure",
    duration: "181 min",
    rating: "PG-13",
    description: "The Avengers assemble one final time to undo Thanos' actions and restore balance to the universe.",
    showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "https://images.unsplash.com/photo-1489599735734-79b4fc8c7cd3?w=400&h=600&fit=crop",
    genre: "Action, Crime, Drama",
    duration: "152 min",
    rating: "PG-13",
    description: "Batman faces his greatest challenge yet when the Joker wreaks havoc on Gotham City.",
    showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"]
  },
  {
    id: 3,
    title: "Inception",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    genre: "Sci-Fi, Thriller",
    duration: "148 min",
    rating: "PG-13",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    showtimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"]
  },
  {
    id: 4,
    title: "Interstellar",
    poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
    genre: "Sci-Fi, Drama",
    duration: "169 min",
    rating: "PG-13",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    showtimes: ["11:30 AM", "3:00 PM", "6:30 PM", "10:00 PM"]
  },
  {
    id: 5,
    title: "The Matrix",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    genre: "Sci-Fi, Action",
    duration: "136 min",
    rating: "R",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality.",
    showtimes: ["12:00 PM", "3:30 PM", "7:00 PM", "10:30 PM"]
  },
  {
    id: 6,
    title: "Pulp Fiction",
    poster: "https://images.unsplash.com/photo-1489599735734-79b4fc8c7cd3?w=400&h=600&fit=crop",
    genre: "Crime, Drama",
    duration: "154 min",
    rating: "R",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    showtimes: ["1:00 PM", "4:30 PM", "8:00 PM", "11:00 PM"]
  }
];

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingDetails[]>([]);

  const handleBookMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (bookingDetails: BookingDetails) => {
    setBookings([...bookings, bookingDetails]);
    setIsBookingModalOpen(false);
    setSelectedMovie(null);
    alert('Booking confirmed! Check your email for details.');
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Now Showing</h2>
          <MovieGrid movies={mockMovies} onBookMovie={handleBookMovie} />
        </section>
      </main>
      <Footer />
      
      {isBookingModalOpen && selectedMovie && (
        <BookingModal
          movie={selectedMovie}
          onSubmit={handleBookingSubmit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;