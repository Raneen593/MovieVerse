const API_KEY = process.env.VUE_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchData(url, errorMessage) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}

export default {
  async discoverMovies({
    genre = "",
    year = "",
    sort = "popularity.desc",
  } = {}) {
    let url =
      `${BASE_URL}/discover/movie` +
      `?api_key=${API_KEY}` +
      `&language=en-US` +
      `&sort_by=${sort}` +
      `&page=1`;

    if (genre) {
      url += `&with_genres=${genre}`;
    }

    if (year) {
      url += `&primary_release_year=${year}`;
    }

    return fetchData(url, "Failed to fetch movies");
  },

  async getMoviesByGenre(genreId) {
    return this.discoverMovies({
      genre: genreId,
    });
  },

  async getMoviesByYear(year) {
    return this.discoverMovies({
      year,
    });
  },

  async getPopularMovies() {
    const url =
      `${BASE_URL}/movie/popular` +
      `?api_key=${API_KEY}` +
      `&language=en-US` +
      `&page=1`;

    return fetchData(url, "Failed to fetch popular movies");
  },

  async getTrendingMovies() {
    const url =
      `${BASE_URL}/trending/movie/week` +
      `?api_key=${API_KEY}` +
      `&language=en-US`;

    return fetchData(url, "Failed to fetch trending movies");
  },

  async getTopRatedMovies() {
    const url =
      `${BASE_URL}/movie/top_rated` +
      `?api_key=${API_KEY}` +
      `&language=en-US` +
      `&page=1`;

    return fetchData(url, "Failed to fetch top rated movies");
  },

  async searchMovies(query) {
    const encodedQuery = encodeURIComponent(query);

    const url =
      `${BASE_URL}/search/movie` +
      `?api_key=${API_KEY}` +
      `&language=en-US` +
      `&query=${encodedQuery}` +
      `&page=1`;

    return fetchData(url, "Failed to search movies");
  },

  async getGenres() {
    const url =
      `${BASE_URL}/genre/movie/list` +
      `?api_key=${API_KEY}` +
      `&language=en-US`;

    return fetchData(url, "Failed to fetch genres");
  },

  async getMovieDetails(movieId) {
    const url =
      `${BASE_URL}/movie/${movieId}` +
      `?api_key=${API_KEY}` +
      `&language=en-US`;

    return fetchData(url, "Failed to fetch movie details");
  },

  async getMovieVideos(movieId) {
    const url =
      `${BASE_URL}/movie/${movieId}/videos` +
      `?api_key=${API_KEY}` +
      `&language=en-US`;

    return fetchData(url, "Failed to fetch movie videos");
  },

  async getMovieCredits(movieId) {
    const url =
      `${BASE_URL}/movie/${movieId}/credits` +
      `?api_key=${API_KEY}` +
      `&language=en-US`;

    return fetchData(url, "Failed to fetch movie credits");
  },
};