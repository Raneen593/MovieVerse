<template>
  <div class="movies-page">
    <div class="container">
      <div class="page-header">
        <h1>Explore Movies</h1>
        <p>Discover your next favorite movie.</p>
      </div>
      <div class="ser-fil">
        <!-- Search -->
        <SearchBar @Search="handleSearch" />
        <!-- Filter -->
        <FilterBar @filter-changed="handleFilter" :genres="genres" />
      </div>
      <div class="loading" v-if="loading">Loading Movies ...</div>
      <div class="error" v-else-if="error">{{ error }}</div>
      <div class="no-results" v-else-if="movies.length === 0">
        <h2>No Movies Found</h2>
        <p>Try searching for another movie.</p>
      </div>
      <div class="movies-grid" v-else>
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>
<script>
import SearchBar from "@/components/SearchBar.vue";
import MovieCard from "@/components/MovieCard.vue";
import FilterBar from "@/components/FilterBar.vue";
import movieApi from "@/services/movieApi.js";

export default {
  name: "MoviesPage",
  components: {
    SearchBar,
    MovieCard,
    FilterBar,
  },
  mounted() {
    this.fetchGenres();
    this.fetchMovies();
  },
  data() {
    return {
      movies: [],
      genres: [],
      loading: false,
      error: null,
      searchQuery: "",
      selectedGenre: "",
      selectedYear: "",
      selectedSort: "popularity.desc",
      currentPage: 1,
    };
  },
  methods: {
    async fetchGenres() {
      try {
        const data = await movieApi.getGenres();
        this.genres = data.genres;
      } catch (error) {
        this.error = error.message;
      }
    },
    async fetchMovies() {
      this.loading = true;
      this.error = null;

      try {
        let data;
        if (this.searchQuery) {
          const searchData = await movieApi.searchMovies(this.searchQuery);
          data = searchData;
        } else {
          const discoverData = await movieApi.discoverMovies({
            genre: this.selectedGenre,
            year: this.selectedYear,
            sort: this.selectedSort,
          });
          data = discoverData;
        }

        this.movies = data.results;
      } catch (error) {
        this.error = error.message || "Failed to load movies";
      } finally {
        this.loading = false;
      }
    },
    handleSearch(quary) {
      this.searchQuery = quary;
      this.currentPage = 1;
      this.fetchMovies();
    },
    handleFilter(filters) {
      this.selectedGenre = filters.genre;
      this.selectedYear = filters.year;
      this.selectedSort = filters.sort;
      this.currentPage = 1;
      this.fetchMovies();
    },
  },
};
</script>
<style scoped>
.movies-page {
  min-height: 100vh;
  background: #0d0d14;
  color: white;
  padding: 80px 20px;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
}
.ser-fil {
  background-color: #1f202b;
  border-radius: 12px;
}
.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 48px;
  margin-bottom: 10px;
}

.page-header p {
  color: #999;
  font-size: 18px;
}
.movies-grid {
  display: grid;

  grid-template-columns: repeat(5, 1fr);

  gap: 25px;
}

.loading {
  text-align: center;
  padding: 80px;
  color: #aaa;
  font-size: 20px;
}

.error {
  text-align: center;
  padding: 50px;
  color: #ff6b6b;
}

.no-results {
  text-align: center;
  padding: 80px 20px;
}
.no-results h2 {
  font-size: 28px;
}

.no-results p {
  color: #888;
  margin-bottom: 20px;
}

.no-results button {
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  background: #e50914;
  color: white;
  cursor: pointer;
}

.load-more-container {
  text-align: center;
  margin-top: 50px;
}
load-more-btn {
  padding: 13px 30px;
  border: none;
  border-radius: 25px;
  background: #e50914;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

@media (max-width: 1100px) {
  .movies-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 800px) {
  .movies-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .page-header h1 {
    font-size: 38px;
  }
}

@media (max-width: 550px) {
  .movies-grid {
    grid-template-columns: repeat(2, 1fr);

    gap: 15px;
  }

  .movies-page {
    padding: 50px 12px;
  }

  .page-header h1 {
    font-size: 32px;
  }
}
</style>
