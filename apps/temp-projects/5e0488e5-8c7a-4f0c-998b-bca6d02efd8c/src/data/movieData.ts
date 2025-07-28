export interface Movie {
  id: number;
  title: string;
  image: string;
  rating: string;
  year: string;
  duration: string;
  description: string;
  genre: string[];
}

export interface MovieCategory {
  title: string;
  movies: Movie[];
}

export const movieData: MovieCategory[] = [
  {
    title: "Netflix Originals",
    movies: [
      {
        id: 1,
        title: "Stranger Things",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
        rating: "97",
        year: "2022",
        duration: "3 Seasons",
        description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
        genre: ["Sci-Fi", "Horror", "Drama"]
      },
      {
        id: 2,
        title: "The Crown",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        rating: "94",
        year: "2023",
        duration: "6 Seasons",
        description: "This drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
        genre: ["Drama", "History", "Biography"]
      },
      {
        id: 3,
        title: "Ozark",
        image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
        rating: "92",
        year: "2022",
        duration: "4 Seasons",
        description: "A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.",
        genre: ["Crime", "Drama", "Thriller"]
      },
      {
        id: 4,
        title: "Wednesday",
        image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=600&fit=crop",
        rating: "89",
        year: "2022",
        duration: "1 Season",
        description: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.",
        genre: ["Comedy", "Horror", "Mystery"]
      },
      {
        id: 5,
        title: "The Witcher",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        rating: "85",
        year: "2023",
        duration: "3 Seasons",
        description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
        genre: ["Fantasy", "Adventure", "Drama"]
      },
      {
        id: 6,
        title: "Dark",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
        rating: "96",
        year: "2020",
        duration: "3 Seasons",
        description: "A missing child causes four families to help each other for answers. What they could not imagine is that this mystery would be connected to innumerable other secrets of the small town.",
        genre: ["Sci-Fi", "Mystery", "Drama"]
      }
    ]
  },
  {
    title: "Trending Now",
    movies: [
      {
        id: 7,
        title: "Money Heist",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
        rating: "91",
        year: "2021",
        duration: "5 Seasons",
        description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
        genre: ["Crime", "Drama", "Thriller"]
      },
      {
        id: 8,
        title: "Squid Game",
        image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=600&fit=crop",
        rating: "95",
        year: "2021",
        duration: "1 Season",
        description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games for a tempting prize, but the stakes are deadly.",
        genre: ["Thriller", "Drama", "Horror"]
      },
      {
        id: 9,
        title: "Bridgerton",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        rating: "88",
        year: "2022",
        duration: "2 Seasons",
        description: "The eight close-knit siblings of the Bridgerton family look for love and happiness in London high society.",
        genre: ["Romance", "Drama", "Period"]
      },
      {
        id: 10,
        title: "The Queen's Gambit",
        image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=600&fit=crop",
        rating: "93",
        year: "2020",
        duration: "Limited Series",
        description: "In a 1950s orphanage, a young girl reveals an astonishing talent for chess and begins an unlikely journey to stardom while grappling with addiction.",
        genre: ["Drama", "Biography", "Sport"]
      },
      {
        id: 11,
        title: "Lupin",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
        rating: "87",
        year: "2023",
        duration: "3 Parts",
        description: "Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.",
        genre: ["Crime", "Mystery", "Drama"]
      },
      {
        id: 12,
        title: "Emily in Paris",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        rating: "82",
        year: "2022",
        duration: "3 Seasons",
        description: "When ambitious Chicago marketing exec Emily unexpectedly lands her dream job in Paris, she embraces a new life as she juggles work, friends and romance.",
        genre: ["Comedy", "Romance", "Drama"]
      }
    ]
  },
  {
    title: "Action & Adventure",
    movies: [
      {
        id: 13,
        title: "Extraction",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
        rating: "84",
        year: "2020",
        duration: "1h 56m",
        description: "A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.",
        genre: ["Action", "Thriller", "Drama"]
      },
      {
        id: 14,
        title: "The Old Guard",
        image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=600&fit=crop",
        rating: "79",
        year: "2020",
        duration: "2h 5m",
        description: "A covert team of immortal mercenaries are suddenly exposed and must now fight to keep their identity a secret just as an unexpected new member is discovered.",
        genre: ["Action", "Fantasy", "Thriller"]
      },
      {
        id: 15,
        title: "6 Underground",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
        rating: "76",
        year: "2019",
        duration: "2h 8m",
        description: "Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.",
        genre: ["Action", "Thriller", "Comedy"]
      },
      {
        id: 16,
        title: "Red Notice",
        image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=600&fit=crop",
        rating: "81",
        year: "2021",
        duration: "1h 58m",
        description: "An Interpol agent tracks the world's most wanted art thief.",
        genre: ["Action", "Comedy", "Thriller"]
      },
      {
        id: 17,
        title: "The Gray Man",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
        rating: "78",
        year: "2022",
        duration: "2h 2m",
        description: "When a shadowy CIA agent uncovers damning agency secrets, he's hunted across the globe by a sociopathic rogue operative who's put a bounty on his head.",
        genre: ["Action", "Thriller", "Crime"]
      },
      {
        id: 18,
        title: "Thunder Force",
        image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=600&fit=crop",
        rating: "73",
        year: "2021",
        duration: "1h 46m",
        description: "In a world where supervillains are commonplace, two estranged childhood best friends reunite after one devises a treatment that gives them powers to protect their city.",
        genre: ["Action", "Comedy", "Adventure"]
      }
    ]
  },
  {
    title: "Horror Movies",
    movies: [
      {
        id: 19,
        title: "Bird Box",
        image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=600&fit=crop",
        rating: "85",
        year: "2018",
        duration: "2h 4m",
        description: "Five years after an ominous unseen presence drives most of society to suicide, a mother and her two children make a desperate bid to reach safety.",
        genre: ["Horror", "Thriller", "Drama"]
      },
      {
        id: 20,
        title: "His House",
        image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=600&fit=crop",
        rating: "91",
        year: "2020",
        duration: "1h 33m",
        description: "A refugee couple makes a harrowing escape from war-torn South Sudan, but then they struggle to adjust to their new life in an English town that has an evil lurking beneath the surface.",
        genre: ["Horror", "Drama", "Thriller"]
      },
      {
        id: 21,
        title: "Fear Street Trilogy",
        image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=600&fit=crop",
        rating: "88",
        year: "2021",
        duration: "3 Movies",
        description: "A circle of teenage friends accidentally encounter the ancient evil responsible for a series of brutal murders that have plagued their town for over 300 years.",
        genre: ["Horror", "Mystery", "Thriller"]
      },
      {
        id: 22,
        title: "The Platform",
        image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=600&fit=crop",
        rating: "83",
        year: "2019",
        duration: "1h 34m",
        description: "A vertical prison with one cell per level. Two people per cell. One only food platform and two minutes per day to feed from up to down. An endless nightmare trapped in The Hole.",
        genre: ["Horror", "Sci-Fi", "Thriller"]
      },
      {
        id: 23,
        title: "Cam",
        image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=600&fit=crop",
        rating: "80",
        year: "2018",
        duration: "1h 34m",
        description: "Alice, an ambitious camgirl, wakes up one day to discover she's been replaced on her show with an exact replica of herself.",
        genre: ["Horror", "Mystery", "Thriller"]
      },
      {
        id: 24,
        title: "Velvet Buzzsaw",
        image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=600&fit=crop",
        rating: "77",
        year: "2019",
        duration: "1h 53m",
        description: "A satire set in the contemporary art world scene of Los Angeles, where big money artists and mega-collectors pay a high price when art collides with commerce.",
        genre: ["Horror", "Mystery", "Thriller"]
      }
    ]
  },
  {
    title: "Comedies",
    movies: [
      {
        id: 25,
        title: "The Kissing Booth",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        rating: "75",
        year: "2020",
        duration: "3 Movies",
        description: "A high school student is forced to confront her secret crush at a kissing booth.",
        genre: ["Comedy", "Romance", "Teen"]
      },
      {
        id: 26,
        title: "To All the Boys I've Loved Before",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        rating: "82",
        year: "2021",
        duration: "3 Movies",
        description: "A teenage girl's secret love letters are exposed and wreak havoc on her love life.",
        genre: ["Comedy", "Romance", "Teen"]
      },
      {
        id: 27,
        title: "The Good Place",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        rating: "94",
        year: "2020",
        duration: "4 Seasons",
        description: "A woman struggles to be a good person when she is placed in the afterlife's 'good place' by mistake.",
        genre: ["Comedy", "Fantasy", "Philosophy"]
      },
      {
        id: 28,
        title: "Space Force",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        rating: "78",
        year: "2022",
        duration: "2 Seasons",
        description: "A decorated pilot with dreams of running the Air Force is tasked with setting up the new Space Force.",
        genre: ["Comedy", "Sci-Fi", "Military"]
      },
      {
        id: 29,
        title: "Russian Doll",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        rating: "89",
        year: "2022",
        duration: "2 Seasons",
        description: "A young woman keeps dying and reliving her 36th birthday party. She's trapped in a time loop -- and staring down the barrel of her own mortality.",
        genre: ["Comedy", "Drama", "Mystery"]
      },
      {
        id: 30,
        title: "Never Have I Ever",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        rating: "86",
        year: "2023",
        duration: "4 Seasons",
        description: "The complicated life of a modern-day first-generation Indian American teenage girl, inspired by Mindy Kaling's own childhood.",
        genre: ["Comedy", "Drama", "Teen"]
      }
    ]
  }
];