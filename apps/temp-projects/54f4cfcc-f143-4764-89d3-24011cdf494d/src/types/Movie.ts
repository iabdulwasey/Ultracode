export interface Movie {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  overview: string;
  releaseDate: string;
  rating: number;
  genre: string[];
  duration: string;
  cast: string[];
  director: string;
  isOriginal?: boolean;
}