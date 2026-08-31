const API_KEY = process.env.VUE_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default {
  async discoverMovies({
    genre = "",
    year = "",
    sort = "popularity.desc",
  } = {}) {
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sort}&page=1`;

    if (genre) {
      url += `&with_genres=${genre}`;
    }

    if (year) {
      url += `&primary_release_year=${year}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return await response.json();
  },

  async getPopularMovies() {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }

    return await response.json();
  },

  async searchMovies(query) {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1`
    );

    if (!response.ok) {
      throw new Error("Failed to search movies");
    }

    return await response.json();
  },

  async getMoviesByGenre(genreId) {
    return this.discoverMovies({ genre: genreId });
  },

  async getGenres() {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }

    return await response.json();
  },

  async getMovieDetails(movieId) {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    return await response.json();
  },

  async getMovieVideos(movieId) {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie videos");
    }

    return await response.json();
  },
};
