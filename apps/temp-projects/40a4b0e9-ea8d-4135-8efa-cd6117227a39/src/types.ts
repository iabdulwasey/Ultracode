export interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string;
  duration: string;
  rating: string;
  description: string;
  showtimes: string[];
}

export interface BookingDetails {
  movieId: number;
  movieTitle: string;
  showtime: string;
  seats: string[];
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isOccupied: boolean;
  isSelected: boolean;
}