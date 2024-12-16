export interface ApiResponseMovies {
  status: Movie[]
}
export interface ApiResponseMovie {
  status: Movie
}

export interface Movie {
  imdb: Imdb
  _id: string
  title: string
  year: number
  director: string
  plot: string
  genres: string[]
  poster: string
}

export interface Imdb {
  rating: number
  votes: number
}

