export interface Movie {
  id: string;
  title: string;
  description: string;
  image: string;
  backdropImage: string;
  year: number;
  rating: string;
  duration: string;
  genre: string[];
  cast: string[];
  director: string;
  isNetflixOriginal?: boolean;
  videoUrl?: string;
}

export interface MovieCategory {
  id: string;
  title: string;
  movies: Movie[];
}