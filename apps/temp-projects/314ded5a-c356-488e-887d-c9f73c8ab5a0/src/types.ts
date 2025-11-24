export interface Destination {
  id: string;
  name: string;
  nameJapanese: string;
  description: string;
  image: string;
  prefecture: string;
  category: 'city' | 'nature' | 'temple' | 'cultural';
  highlights: string[];
  bestTime: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  price: string;
  category: 'cultural' | 'food' | 'nature' | 'adventure';
  location: string;
}

export interface TravelTip {
  id: string;
  title: string;
  content: string;
  category: 'transportation' | 'culture' | 'food' | 'accommodation' | 'general';
  icon: string;
}

export interface Season {
  name: string;
  nameJapanese: string;
  months: string;
  description: string;
  highlights: string[];
  temperature: string;
  image: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}