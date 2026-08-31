<template>
  <main class="details-page">
    <div v-if="loading" class="message">
      <h2>Loading movie details...</h2>
    </div>

    <div v-else-if="error" class="message error">
      <h2>{{ error }}</h2>
      <button @click="goBack">Back to Movies</button>
    </div>

    <section v-else-if="movie" class="movie-hero" :style="backgroundStyle">
      <div class="overlay"></div>

      <div class="movie-content">
        <button class="back-button" @click="goBack">← Back to Movies</button>

        <div class="details-container">
          <img
            v-if="movie.poster_path"
            class="poster"
            :src="posterUrl"
            :alt="movie.title"
          />

          <div class="movie-info">
            <p class="tagline">{{ movie.tagline }}</p>

            <h1>{{ movie.title }}</h1>

            <div class="meta">
              <span>⭐ {{ rating }}</span>
              <span>{{ releaseYear }}</span>
              <span>{{ runtime }}</span>
            </div>

            <div class="genres">
              <span v-for="genre in movie.genres" :key="genre.id" class="genre">
                {{ genre.name }}
              </span>
            </div>

            <h3>Overview</h3>
            <p class="overview">
              {{ movie.overview || "No overview is available." }}
            </p>

            <button
              v-if="trailer"
              class="trailer-button"
              @click="showTrailer = true"
            >
              ▶ Watch Trailer
            </button>

            <p v-else class="no-trailer">Trailer is not available.</p>
          </div>
        </div>
      </div>
    </section>

    <div v-if="showTrailer" class="modal" @click.self="showTrailer = false">
      <div class="modal-content">
        <button class="close-button" @click="showTrailer = false">×</button>

        <iframe
          :src="trailerUrl"
          title="Movie trailer"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </main>
</template>

<script>
import movieApi from "../services/movieApi";

export default {
  name: "MovieDetailsPage",

  data() {
    return {
      movie: null,
      trailer: null,
      loading: true,
      error: "",
      showTrailer: false,
    };
  },

  computed: {
    posterUrl() {
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
    },

    backgroundStyle() {
      if (!this.movie.backdrop_path) {
        return {
          backgroundColor: "#0b0b12",
        };
      }

      return {
        backgroundImage: `url(https://image.tmdb.org/t/p/original${this.movie.backdrop_path})`,
      };
    },

    rating() {
      return this.movie.vote_average
        ? this.movie.vote_average.toFixed(1)
        : "N/A";
    },

    releaseYear() {
      return this.movie.release_date
        ? this.movie.release_date.slice(0, 4)
        : "Unknown";
    },

    runtime() {
      if (!this.movie.runtime) {
        return "Runtime unknown";
      }

      const hours = Math.floor(this.movie.runtime / 60);
      const minutes = this.movie.runtime % 60;

      return `${hours}h ${minutes}m`;
    },

    trailerUrl() {
      return this.trailer
        ? `https://www.youtube.com/embed/${this.trailer.key}?autoplay=1`
        : "";
    },
  },

  async created() {
    await this.loadMovie();
  },

  methods: {
    async loadMovie() {
      try {
        this.loading = true;
        this.error = "";

        const movieId = this.$route.params.id;

        const [movieData, videoData] = await Promise.all([
          movieApi.getMovieDetails(movieId),
          movieApi.getMovieVideos(movieId),
        ]);

        this.movie = movieData;

        this.trailer =
          videoData.results.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Trailer" &&
              video.official
          ) ||
          videoData.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
          ) ||
          null;
      } catch (error) {
        console.error(error);
        this.error = "Unable to load movie details.";
      } finally {
        this.loading = false;
      }
    },

    goBack() {
      this.$router.push("/movies");
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.details-page {
  min-height: 100vh;
  background-color: #0b0b12;
  color: white;
}

.movie-hero {
  position: relative;
  min-height: 100vh;
  background-position: center;
  background-size: cover;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(5, 5, 12, 0.98) 15%,
    rgba(5, 5, 12, 0.82) 55%,
    rgba(5, 5, 12, 0.55) 100%
  );
}

.movie-content {
  position: relative;
  z-index: 1;
  width: min(1200px, 92%);
  margin: auto;
  padding: 40px 0 80px;
}

.back-button {
  margin-bottom: 45px;
  padding: 11px 18px;
  border: 1px solid #ffffff4d;
  border-radius: 25px;
  background: #11121ccc;
  color: white;
  cursor: pointer;
}

.details-container {
  display: flex;
  align-items: center;
  gap: 55px;
}

.poster {
  width: 320px;
  border-radius: 18px;
  box-shadow: 0 25px 60px #000000b3;
}

.movie-info {
  max-width: 690px;
}

.tagline {
  margin: 0 0 8px;
  color: #bbb;
  font-style: italic;
}

h1 {
  margin: 0 0 20px;
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 22px;
  color: #ddd;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.genre {
  padding: 8px 14px;
  border: 1px solid #ffffff4d;
  border-radius: 20px;
  background: #ffffff1a;
}

h3 {
  margin-bottom: 10px;
  font-size: 22px;
}

.overview {
  color: #ddd;
  font-size: 18px;
  line-height: 1.8;
}

.trailer-button {
  margin-top: 25px;
  padding: 14px 25px;
  border: 0;
  border-radius: 30px;
  background: #e50914;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.25s;
}

.trailer-button:hover {
  background: #ff2632;
  transform: translateY(-2px);
}

.no-trailer {
  margin-top: 25px;
  color: #aaa;
}

.message {
  display: grid;
  min-height: 100vh;
  place-content: center;
  text-align: center;
}

.error {
  color: #ff6670;
}

.error button {
  padding: 12px 20px;
  border: 0;
  border-radius: 25px;
  cursor: pointer;
}

.modal {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: #000000e6;
}

.modal-content {
  position: relative;
  width: min(950px, 95vw);
}

.modal-content iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  border-radius: 12px;
}

.close-button {
  position: absolute;
  top: -45px;
  right: 0;
  border: 0;
  background: transparent;
  color: white;
  font-size: 38px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .movie-content {
    padding-top: 25px;
  }

  .details-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
  }

  .poster {
    width: min(280px, 100%);
    align-self: center;
  }

  .overlay {
    background: rgba(5, 5, 12, 0.88);
  }

  h1 {
    font-size: 42px;
  }
}
</style>
