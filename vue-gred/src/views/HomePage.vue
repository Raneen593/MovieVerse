<script>
import Herosection from "../components/HeroSection.vue";
import Moviesection from "../components/MovieSection.vue";
import movieapi from "../services/movieApi";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Herosection,
    Moviesection,
  },

    computed: {
    ...mapGetters("favorites", ["getFavorites"]),
  },

  data() {
    return {
      trending: [],
      popular: [],
      top_rated: [],

      loading: true,
      error: null,
      selectedMovie: null,
    };
  },

  async mounted() {
    try {
      this.trending = (await movieapi.getTrendingMovies()).results;
      this.popular = (await movieapi.getPopularMovies()).results;
      this.top_rated = (await movieapi.getTopRatedMovies()).results;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    ...mapActions("favorites", ["toggleFavorite", "loadFavorites"]),
    handleTrailer(movie) {
      this.$router.push(`/movie/${movie.id}`);
    },

   handleFavorite(movie) {
  this.toggleFavorite(movie);

  const isFavorite = this.$store.getters["favorites/isFavorite"](movie.id);

  if (isFavorite) {
    alert(`✅ "${movie.title}" added to favorites!`);
  }
},
  },
};
</script>

<template>
  <div class="home">
    <div class="loading" v-if="loading">Loading Movies ...</div>
    <div class="error" v-else-if="error">{{ error }}</div>
    <div
      class="no-results"
      v-else-if="
        trending.length === 0 && popular.length === 0 && top_rated.length === 0
      "
    >
      <h2>No Movies Found</h2>
      <p>Try searching for another movie.</p>
    </div>

    <div v-else>
      <Herosection
        :movies_api="trending"
        @watch-trailer="handleTrailer"
        @add-favorite="handleFavorite"
      />

      <Moviesection
        title="Trending Now"
        subtitle="What everyone is watching this week"
        :movies_api="trending"
      />

      <Moviesection
        title="Popular Now"
        subtitle="Crowd favourites across every genre"
        :movies_api="popular"
      />

      <Moviesection
        title="Top Rated Movies"
        subtitle="The highest scored films on CineVerse"
        :movies_api="top_rated"
      />
    </div>
  </div>
</template>

<style scoped>
.loading,
.error,
.no-results {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading {
  color: #aaa;
  font-size: 20px;
}

.error {
  font-size: 18px;
  color: #ff6b6b;
}
.no-results {
  flex-direction: column;
  color: #888;
}
.no-results h2 {
  font-size: 28px;
  margin-bottom: 12px;
}
.no-results p {
  font-size: 16px;
}

.home {
  background: var(--background-color);
}
</style>
