import { Movie } from '../types/Movie';

export const movieData = {
  trending: [
    {
      id: 1,
      title: "Stranger Things",
      poster: "https://images.unsplash.com/photo-1489599899954-11b8532d5b9b?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1489599899954-11b8532d5b9b?w=1920&h=1080&fit=crop",
      overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      releaseDate: "2016",
      rating: 8.7,
      genre: ["Drama", "Fantasy", "Horror"],
      duration: "51m",
      cast: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour"],
      director: "The Duffer Brothers",
      isOriginal: true
    },
    {
      id: 2,
      title: "The Crown",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
      overview: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
      releaseDate: "2016",
      rating: 8.6,
      genre: ["Biography", "Drama", "History"],
      duration: "58m",
      cast: ["Claire Foy", "Olivia Colman", "Matt Smith"],
      director: "Peter Morgan",
      isOriginal: true
    },
    {
      id: 3,
      title: "Money Heist",
      poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop",
      overview: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
      releaseDate: "2017",
      rating: 8.3,
      genre: ["Action", "Crime", "Mystery"],
      duration: "70m",
      cast: ["Álvaro Morte", "Itziar Ituño", "Pedro Alonso"],
      director: "Álex Pina",
      isOriginal: true
    },
    {
      id: 4,
      title: "Ozark",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop",
      overview: "A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.",
      releaseDate: "2017",
      rating: 8.4,
      genre: ["Crime", "Drama", "Thriller"],
      duration: "60m",
      cast: ["Jason Bateman", "Laura Linney", "Sofia Hublitz"],
      director: "Bill Dubuque",
      isOriginal: true
    },
    {
      id: 5,
      title: "The Witcher",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
      overview: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      releaseDate: "2019",
      rating: 8.2,
      genre: ["Action", "Adventure", "Drama"],
      duration: "60m",
      cast: ["Henry Cavill", "Anya Chalotra", "Freya Allan"],
      director: "Lauren Schmidt Hissrich",
      isOriginal: true
    },
    {
      id: 6,
      title: "Bridgerton",
      poster: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1920&h=1080&fit=crop",
      overview: "Wealth, lust, and betrayal set in the backdrop of Regency era England, seen through the eyes of the powerful Bridgerton family.",
      releaseDate: "2020",
      rating: 7.3,
      genre: ["Drama", "Romance"],
      duration: "60m",
      cast: ["Nicola Coughlan", "Jonathan Bailey", "Adjoa Andoh"],
      director: "Chris Van Dusen",
      isOriginal: true
    }
  ],
  originals: [
    {
      id: 7,
      title: "House of Cards",
      poster: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop",
      overview: "A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.",
      releaseDate: "2013",
      rating: 8.7,
      genre: ["Drama"],
      duration: "51m",
      cast: ["Kevin Spacey", "Robin Wright", "Michael Kelly"],
      director: "Beau Willimon",
      isOriginal: true
    },
    {
      id: 8,
      title: "Orange Is the New Black",
      poster: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&h=1080&fit=crop",
      overview: "A privileged New Yorker ends up in a women's prison when a past crime catches up with her in this Emmy-winning series.",
      releaseDate: "2013",
      rating: 8.1,
      genre: ["Comedy", "Crime", "Drama"],
      duration: "60m",
      cast: ["Taylor Schilling", "Kate Mulgrew", "Laura Prepon"],
      director: "Jenji Kohan",
      isOriginal: true
    }
  ],
  action: [
    {
      id: 9,
      title: "Extraction",
      poster: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop",
      overview: "A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.",
      releaseDate: "2020",
      rating: 6.7,
      genre: ["Action", "Thriller"],
      duration: "116m",
      cast: ["Chris Hemsworth", "Rudhraksh Jaiswal", "Randeep Hooda"],
      director: "Sam Hargrave",
      isOriginal: true
    },
    {
      id: 10,
      title: "6 Underground",
      poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=1080&fit=crop",
      overview: "Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.",
      releaseDate: "2019",
      rating: 6.1,
      genre: ["Action", "Thriller"],
      duration: "128m",
      cast: ["Ryan Reynolds", "Mélanie Laurent", "Manuel Garcia-Rulfo"],
      director: "Michael Bay",
      isOriginal: true
    }
  ],
  comedy: [
    {
      id: 11,
      title: "The Good Place",
      poster: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1920&h=1080&fit=crop",
      overview: "A woman struggles to be a good person when she is placed in the afterlife by mistake.",
      releaseDate: "2016",
      rating: 8.2,
      genre: ["Comedy", "Fantasy"],
      duration: "22m",
      cast: ["Kristen Bell", "Ted Danson", "William Jackson Harper"],
      director: "Michael Schur"
    },
    {
      id: 12,
      title: "Space Force",
      poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080&fit=crop",
      overview: "A decorated pilot with dreams of running the Air Force, is thrown together with an eccentric scientist to get the U.S. military's newest agency — Space Force — ready for lift-off.",
      releaseDate: "2020",
      rating: 6.7,
      genre: ["Comedy"],
      duration: "30m",
      cast: ["Steve Carell", "John Malkovich", "Ben Schwartz"],
      director: "Greg Daniels",
      isOriginal: true
    }
  ],
  horror: [
    {
      id: 13,
      title: "The Haunting of Hill House",
      poster: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=1920&h=1080&fit=crop",
      overview: "Flashing between past and present, a fractured family confronts haunting memories of their old home and the terrifying events that drove them from it.",
      releaseDate: "2018",
      rating: 8.6,
      genre: ["Drama", "Horror", "Mystery"],
      duration: "60m",
      cast: ["Michiel Huisman", "Carla Gugino", "Henry Thomas"],
      director: "Mike Flanagan",
      isOriginal: true
    },
    {
      id: 14,
      title: "Bird Box",
      poster: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=1920&h=1080&fit=crop",
      overview: "Five years after an ominous unseen presence drives most of society to suicide, a mother and her two children make a desperate bid to reach safety.",
      releaseDate: "2018",
      rating: 6.6,
      genre: ["Horror", "Sci-Fi", "Thriller"],
      duration: "124m",
      cast: ["Sandra Bullock", "Trevante Rhodes", "John Malkovich"],
      director: "Susanne Bier",
      isOriginal: true
    }
  ],
  romance: [
    {
      id: 15,
      title: "To All the Boys I've Loved Before",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
      overview: "A teenage girl's secret love letters are exposed and wreak havoc on her love life.",
      releaseDate: "2018",
      rating: 7.0,
      genre: ["Comedy", "Drama", "Romance"],
      duration: "99m",
      cast: ["Lana Condor", "Noah Centineo", "Janel Parrish"],
      director: "Susan Johnson",
      isOriginal: true
    },
    {
      id: 16,
      title: "The Kissing Booth",
      poster: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=450&fit=crop",
      backdrop: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&h=1080&fit=crop",
      overview: "A high school student is forced to confront her secret crush at a kissing booth.",
      releaseDate: "2018",
      rating: 6.0,
      genre: ["Comedy", "Romance"],
      duration: "105m",
      cast: ["Joey King", "Jacob Elordi", "Joel Courtney"],
      director: "Vince Marcello",
      isOriginal: true
    }
  ]
} as const;