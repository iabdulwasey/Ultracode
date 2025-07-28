import { MovieCategory } from '../types/Movie';

export const movieData: MovieCategory[] = [
  {
    id: 'trending',
    title: 'Trending Now',
    movies: [
      {
        id: '1',
        title: 'Stranger Things',
        description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
        image: 'https://images.unsplash.com/photo-1489599904472-84126c4b4673?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1489599904472-84126c4b4673?w=1920&h=1080&fit=crop',
        year: 2023,
        rating: 'TV-14',
        duration: '4 Seasons',
        genre: ['Sci-Fi', 'Horror', 'Drama'],
        cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'David Harbour'],
        director: 'The Duffer Brothers',
        isNetflixOriginal: true
      },
      {
        id: '2',
        title: 'The Crown',
        description: 'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
        year: 2023,
        rating: 'TV-MA',
        duration: '6 Seasons',
        genre: ['Drama', 'Biography', 'History'],
        cast: ['Claire Foy', 'Olivia Colman', 'Imelda Staunton'],
        director: 'Peter Morgan',
        isNetflixOriginal: true
      },
      {
        id: '3',
        title: 'Ozark',
        description: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.',
        image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop',
        year: 2022,
        rating: 'TV-MA',
        duration: '4 Seasons',
        genre: ['Crime', 'Drama', 'Thriller'],
        cast: ['Jason Bateman', 'Laura Linney', 'Sofia Hublitz'],
        director: 'Bill Dubuque',
        isNetflixOriginal: true
      },
      {
        id: '4',
        title: 'Wednesday',
        description: 'Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while navigating her years at Nevermore Academy.',
        image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=1920&h=1080&fit=crop',
        year: 2022,
        rating: 'TV-14',
        duration: '1 Season',
        genre: ['Comedy', 'Horror', 'Mystery'],
        cast: ['Jenna Ortega', 'Emma Myers', 'Enid Sinclair'],
        director: 'Tim Burton',
        isNetflixOriginal: true
      },
      {
        id: '5',
        title: 'Money Heist',
        description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop',
        year: 2021,
        rating: 'TV-MA',
        duration: '5 Seasons',
        genre: ['Crime', 'Drama', 'Mystery'],
        cast: ['Álvaro Morte', 'Úrsula Corberó', 'Itziar Ituño'],
        director: 'Álex Pina',
        isNetflixOriginal: true
      }
    ]
  },
  {
    id: 'netflix-originals',
    title: 'Netflix Originals',
    movies: [
      {
        id: '6',
        title: 'The Witcher',
        description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
        year: 2023,
        rating: 'TV-MA',
        duration: '3 Seasons',
        genre: ['Fantasy', 'Adventure', 'Drama'],
        cast: ['Henry Cavill', 'Anya Chalotra', 'Freya Allan'],
        director: 'Lauren Schmidt Hissrich',
        isNetflixOriginal: true
      },
      {
        id: '7',
        title: 'Squid Game',
        description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games for a tempting prize, but the stakes are deadly.',
        image: 'https://images.unsplash.com/photo-1611003229186-80e40cd54966?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1611003229186-80e40cd54966?w=1920&h=1080&fit=crop',
        year: 2021,
        rating: 'TV-MA',
        duration: '1 Season',
        genre: ['Thriller', 'Drama', 'Mystery'],
        cast: ['Lee Jung-jae', 'Park Hae-soo', 'Wi Ha-jun'],
        director: 'Hwang Dong-hyuk',
        isNetflixOriginal: true
      },
      {
        id: '8',
        title: 'Dark',
        description: 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
        year: 2020,
        rating: 'TV-MA',
        duration: '3 Seasons',
        genre: ['Sci-Fi', 'Mystery', 'Drama'],
        cast: ['Louis Hofmann', 'Oliver Masucci', 'Jördis Triebel'],
        director: 'Baran bo Odar',
        isNetflixOriginal: true
      },
      {
        id: '9',
        title: 'Bridgerton',
        description: 'Wealth, lust, and betrayal set in the backdrop of Regency era England, seen through the eyes of the powerful Bridgerton family.',
        image: 'https://images.unsplash.com/photo-1594736797933-d0d3a6e19201?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1594736797933-d0d3a6e19201?w=1920&h=1080&fit=crop',
        year: 2022,
        rating: 'TV-MA',
        duration: '2 Seasons',
        genre: ['Romance', 'Drama', 'Period'],
        cast: ['Nicola Coughlan', 'Jonathan Bailey', 'Adjoa Andoh'],
        director: 'Chris Van Dusen',
        isNetflixOriginal: true
      }
    ]
  },
  {
    id: 'action-thrillers',
    title: 'Action & Adventure',
    movies: [
      {
        id: '10',
        title: 'Extraction',
        description: 'A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.',
        image: 'https://images.unsplash.com/photo-1489599904472-84126c4b4673?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1489599904472-84126c4b4673?w=1920&h=1080&fit=crop',
        year: 2020,
        rating: 'R',
        duration: '116 min',
        genre: ['Action', 'Thriller'],
        cast: ['Chris Hemsworth', 'Rudhraksh Jaiswal', 'Randeep Hooda'],
        director: 'Sam Hargrave',
        isNetflixOriginal: true
      },
      {
        id: '11',
        title: 'Red Notice',
        description: 'An Interpol agent tracks the world\'s most wanted art thief.',
        image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop',
        year: 2021,
        rating: 'PG-13',
        duration: '118 min',
        genre: ['Action', 'Comedy', 'Crime'],
        cast: ['Dwayne Johnson', 'Ryan Reynolds', 'Gal Gadot'],
        director: 'Rawson Marshall Thurber',
        isNetflixOriginal: true
      },
      {
        id: '12',
        title: 'The Gray Man',
        description: 'When the CIA\'s most skilled operative-whose true identity is known to none-accidentally uncovers dark agency secrets, he becomes a primary target.',
        image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop',
        year: 2022,
        rating: 'PG-13',
        duration: '122 min',
        genre: ['Action', 'Thriller'],
        cast: ['Ryan Gosling', 'Chris Evans', 'Ana de Armas'],
        director: 'Anthony Russo',
        isNetflixOriginal: true
      }
    ]
  },
  {
    id: 'comedies',
    title: 'Comedies',
    movies: [
      {
        id: '13',
        title: 'The Good Place',
        description: 'A woman struggles to be a good person when she realizes she\'s been mistakenly sent to the Good Place instead of the Bad Place.',
        image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=1920&h=1080&fit=crop',
        year: 2020,
        rating: 'TV-PG',
        duration: '4 Seasons',
        genre: ['Comedy', 'Fantasy'],
        cast: ['Kristen Bell', 'Ted Danson', 'William Jackson Harper'],
        director: 'Michael Schur'
      },
      {
        id: '14',
        title: 'Emily in Paris',
        description: 'A young American woman from the Midwest is hired by a marketing firm in Paris to provide them with an American perspective on things.',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop',
        year: 2022,
        rating: 'TV-MA',
        duration: '3 Seasons',
        genre: ['Comedy', 'Romance', 'Drama'],
        cast: ['Lily Collins', 'Philippine Leroy-Beaulieu', 'Ashley Park'],
        director: 'Darren Star',
        isNetflixOriginal: true
      }
    ]
  },
  {
    id: 'documentaries',
    title: 'Documentaries',
    movies: [
      {
        id: '15',
        title: 'Our Planet',
        description: 'Experience our planet\'s natural beauty and examine how climate change impacts all living creatures in this ambitious documentary.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop',
        year: 2019,
        rating: 'TV-G',
        duration: '1 Season',
        genre: ['Documentary', 'Nature'],
        cast: ['David Attenborough'],
        director: 'Alastair Fothergill',
        isNetflixOriginal: true
      },
      {
        id: '16',
        title: 'Making a Murderer',
        description: 'Filmed over a 10-year period, this documentary follows Steven Avery, a DNA exoneree who, while in the midst of exposing corruption in local law enforcement, finds himself the prime suspect in a grisly new crime.',
        image: 'https://images.unsplash.com/photo-1611003229186-80e40cd54966?w=300&h=450&fit=crop',
        backdropImage: 'https://images.unsplash.com/photo-1611003229186-80e40cd54966?w=1920&h=1080&fit=crop',
        year: 2018,
        rating: 'TV-MA',
        duration: '2 Seasons',
        genre: ['Documentary', 'Crime', 'Mystery'],
        cast: ['Steven Avery', 'Dolores Avery', 'Brendan Dassey'],
        director: 'Laura Ricciardi',
        isNetflixOriginal: true
      }
    ]
  }
];