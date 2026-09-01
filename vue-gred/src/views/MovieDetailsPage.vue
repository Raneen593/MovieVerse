<template>
  <div class="movie-details-page">
    <div v-if="loading" class="state-message">
      <div class="loader"></div>
      <p>Loading movie details...</p>
    </div>

    <div v-else-if="error" class="state-message error-message">
      <h2>Something went wrong</h2>
      <p>{{ error }}</p>

      <button class="back-button" @click="goBack">Back to Movies</button>
    </div>

    <div v-else-if="movie" class="movie-content">
      <div class="backdrop" :style="{ backgroundImage: backdropImage }">
        <div class="backdrop-overlay"></div>
      </div>

      <main class="details-container">
        <button class="back-button" @click="goBack">← Back to Movies</button>

        <section class="movie-hero">
          <div class="poster-container">
            <img
              v-if="movie.poster_path"
              :src="getImageUrl(movie.poster_path, 'w500')"
              :alt="movie.title"
              class="poster"
            />

            <div v-else class="image-placeholder poster-placeholder">
              No poster available
            </div>
          </div>

          <div class="movie-summary">
            <h1>{{ movie.title }}</h1>

            <p v-if="movie.tagline" class="tagline">“{{ movie.tagline }}”</p>

            <div class="quick-info">
              <span class="rating">
                ★ {{ formatRating(movie.vote_average) }}
              </span>

              <span v-if="releaseYear">
                {{ releaseYear }}
              </span>

              <span v-if="movie.runtime">
                {{ formatRuntime(movie.runtime) }}
              </span>
            </div>

            <div v-if="movie.genres && movie.genres.length" class="genres">
              <span v-for="genre in movie.genres" :key="genre.id" class="genre">
                {{ genre.name }}
              </span>
            </div>

            <div class="overview">
              <h2>Overview</h2>

              <p>
                {{
                  movie.overview || "No overview is available for this movie."
                }}
              </p>
            </div>

            <button
              v-if="trailerKey"
              class="trailer-button"
              @click="showTrailer = true"
            >
              ▶ Watch Trailer
            </button>
          </div>
        </section>

        <section class="content-section">
          <h2 class="section-title">Movie Info</h2>

          <div class="info-grid">
            <article class="info-card">
              <span class="info-label">Status</span>
              <strong>{{ movie.status || "Not available" }}</strong>
            </article>

            <article class="info-card">
              <span class="info-label">Original Language</span>
              <strong>{{ originalLanguage }}</strong>
            </article>

            <article class="info-card">
              <span class="info-label">Release Date</span>
              <strong>{{ formatDate(movie.release_date) }}</strong>
            </article>

            <article class="info-card">
              <span class="info-label">Runtime</span>

              <strong>
                {{
                  movie.runtime ? formatRuntime(movie.runtime) : "Not available"
                }}
              </strong>
            </article>

            <article class="info-card">
              <span class="info-label">Budget</span>
              <strong>{{ formatMoney(movie.budget) }}</strong>
            </article>

            <article class="info-card">
              <span class="info-label">Revenue</span>
              <strong>{{ formatMoney(movie.revenue) }}</strong>
            </article>

            <article class="info-card companies-card">
              <span class="info-label">Production Companies</span>
              <strong>{{ productionCompanies }}</strong>
            </article>
          </div>
        </section>

        <section v-if="cast.length" class="content-section">
          <h2 class="section-title">Top Cast</h2>

          <div class="cast-grid">
            <article
              v-for="person in cast"
              :key="person.cast_id || person.credit_id"
              class="cast-card"
            >
              <img
                v-if="person.profile_path"
                :src="getImageUrl(person.profile_path, 'w300')"
                :alt="person.name"
                class="cast-image"
              />

              <div v-else class="cast-placeholder">
                <span>👤</span>
              </div>

              <div class="cast-details">
                <h3>{{ person.name }}</h3>

                <p>
                  {{ person.character || "Character not available" }}
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <div v-if="showTrailer" class="trailer-modal" @click.self="closeTrailer">
        <div class="trailer-content">
          <button
            class="close-button"
            aria-label="Close trailer"
            @click="closeTrailer"
          >
            ×
          </button>

          <div class="video-container">
            <iframe
              :src="trailerUrl"
              :title="`${movie.title} trailer`"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import movieApi from "@/services/movieApi";

export default {
  name: "MovieDetailsPage",

  data() {
    return {
      movie: null,
      cast: [],
      trailerKey: "",
      loading: true,
      error: "",
      showTrailer: false,
    };
  },

  computed: {
    releaseYear() {
      if (!this.movie || !this.movie.release_date) {
        return "";
      }

      return this.movie.release_date.slice(0, 4);
    },

    backdropImage() {
      if (!this.movie || !this.movie.backdrop_path) {
        return "none";
      }

      return `url(${this.getImageUrl(this.movie.backdrop_path, "original")})`;
    },

    trailerUrl() {
      if (!this.trailerKey) {
        return "";
      }

      return `https://www.youtube.com/embed/${this.trailerKey}?autoplay=1`;
    },

    originalLanguage() {
      if (!this.movie || !this.movie.original_language) {
        return "Not available";
      }

      return this.movie.original_language.toUpperCase();
    },

    productionCompanies() {
      if (
        !this.movie ||
        !this.movie.production_companies ||
        !this.movie.production_companies.length
      ) {
        return "Not available";
      }

      return this.movie.production_companies
        .map((company) => company.name)
        .join(", ");
    },
  },

  watch: {
    "$route.params.id"() {
      this.loadMovie();
    },
  },

  mounted() {
    this.loadMovie();
  },

  methods: {
    async loadMovie() {
      const movieId = this.$route.params.id;

      this.loading = true;
      this.error = "";
      this.movie = null;
      this.cast = [];
      this.trailerKey = "";
      this.showTrailer = false;

      try {
        const [movieData, videosData, creditsData] = await Promise.all([
          movieApi.getMovieDetails(movieId),
          movieApi.getMovieVideos(movieId),
          movieApi.getMovieCredits(movieId),
        ]);

        this.movie = movieData;

        const videos = videosData.results || [];

        const officialTrailer = videos.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official
        );

        const anyTrailer = videos.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        const anyYoutubeVideo = videos.find(
          (video) => video.site === "YouTube"
        );

        const selectedVideo = officialTrailer || anyTrailer || anyYoutubeVideo;

        this.trailerKey = selectedVideo ? selectedVideo.key : "";

        const castMembers = creditsData.cast || [];

        this.cast = castMembers.slice(0, 10);
      } catch (error) {
        console.error("Movie details error:", error);

        this.error = "Unable to load the movie details. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    getImageUrl(path, size = "w500") {
      return `https://image.tmdb.org/t/p/${size}${path}`;
    },

    formatRating(rating) {
      if (!rating) {
        return "N/A";
      }

      return rating.toFixed(1);
    },

    formatRuntime(minutes) {
      if (!minutes) {
        return "Not available";
      }

      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      if (!hours) {
        return `${remainingMinutes}m`;
      }

      if (!remainingMinutes) {
        return `${hours}h`;
      }

      return `${hours}h ${remainingMinutes}m`;
    },

    formatMoney(value) {
      if (!value) {
        return "Not available";
      }

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value);
    },

    formatDate(date) {
      if (!date) {
        return "Not available";
      }

      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(`${date}T00:00:00`));
    },

    closeTrailer() {
      this.showTrailer = false;
    },

    goBack() {
      this.$router.push("/movies");
    },
  },
};
</script>

<style scoped>
.movie-details-page {
  position: relative;
  min-height: 100vh;
  background-color: #10141f;
  color: #ffffff;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 650px;
  background-size: cover;
  background-position: center top;
}

.backdrop-overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to bottom,
      rgba(16, 20, 31, 0.35),
      rgba(16, 20, 31, 0.92) 78%,
      #10141f 100%
    ),
    linear-gradient(to right, rgba(16, 20, 31, 0.92), rgba(16, 20, 31, 0.3));
}

.details-container {
  position: relative;
  z-index: 1;
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
  padding: 40px 0 70px;
}

.back-button {
  padding: 11px 18px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  background: rgba(16, 20, 31, 0.75);
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s ease;
}

.back-button:hover {
  background: #ffffff;
  color: #10141f;
}

.movie-hero {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 45px;
  align-items: center;
  min-height: 520px;
  padding-top: 35px;
}

.poster-container {
  width: 100%;
}

.poster {
  display: block;
  width: 100%;
  border-radius: 14px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #202938;
  color: #a7b0c0;
  text-align: center;
}

.poster-placeholder {
  min-height: 450px;
  border-radius: 14px;
}

.movie-summary h1 {
  margin: 0;
  font-size: clamp(38px, 6vw, 70px);
  line-height: 1.05;
}

.tagline {
  margin: 15px 0;
  color: #bdc5d4;
  font-size: 18px;
  font-style: italic;
}

.quick-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  margin: 22px 0;
  color: #d7dbe3;
}

.rating {
  color: #ffd166;
  font-weight: 700;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;
}

.genre {
  padding: 7px 13px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 14px;
}

.overview {
  max-width: 760px;
}

.overview h2 {
  margin-bottom: 13px;
  font-size: 26px;
}

.overview p {
  color: #d0d5df;
  font-size: 16px;
  line-height: 1.8;
}

.trailer-button {
  margin-top: 18px;
  padding: 13px 23px;
  border: 0;
  border-radius: 9px;
  background: #e50914;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
}

.trailer-button:hover {
  background: #ff1f2a;
  transform: translateY(-2px);
}

.content-section {
  margin-top: 48px;
}

.section-title {
  margin: 0 0 20px;
  font-size: 26px;
}

/* Movie Info */

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;
}

.info-card {
  min-height: 70px;
  padding: 15px 17px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 10px;
  background: #171e2b;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-label {
  color: #929cad;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.7px;
}

.info-card strong {
  color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
}

.companies-card {
  grid-column: span 3;
}

/* Circular Cast */

.cast-grid {
  display: flex;
  gap: 22px;
  overflow-x: auto;
  padding: 8px 2px 18px;
  scroll-behavior: smooth;
}

.cast-grid::-webkit-scrollbar {
  height: 6px;
}

.cast-grid::-webkit-scrollbar-track {
  background: #171e2b;
  border-radius: 10px;
}

.cast-grid::-webkit-scrollbar-thumb {
  background: #465166;
  border-radius: 10px;
}

.cast-grid::-webkit-scrollbar-thumb:hover {
  background: #5d6980;
}

.cast-card {
  flex: 0 0 130px;
  border: none;
  background: transparent;
  text-align: center;
}

.cast-image,
.cast-placeholder {
  width: 115px;
  height: 115px;
  margin: 0 auto;
  border: 3px solid #2d3748;
  border-radius: 50%;
}

.cast-image {
  display: block;
  object-fit: cover;
  object-position: center top;
  transition: 0.25s ease;
}

.cast-card:hover .cast-image {
  transform: scale(1.06);
  border-color: #e50914;
}

.cast-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #202938;
}

.cast-card:hover .cast-placeholder {
  border-color: #e50914;
}

.cast-placeholder span {
  font-size: 35px;
}

.cast-details {
  padding: 11px 3px 0;
}

.cast-details h3 {
  margin: 0 0 5px;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.3;
}

.cast-details p {
  margin: 0;
  color: #9fa8b8;
  font-size: 12px;
  line-height: 1.4;
}

/* Loading and Error */

.state-message {
  min-height: 100vh;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.error-message p {
  color: #bdc5d4;
}

.error-message .back-button {
  margin-top: 15px;
}

.loader {
  width: 45px;
  height: 45px;
  border: 4px solid rgba(255, 255, 255, 0.15);
  border-top-color: #e50914;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Trailer */

.trailer-modal {
  position: fixed;
  z-index: 1000;
  inset: 0;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.88);
}

.trailer-content {
  position: relative;
  width: min(950px, 100%);
}

.close-button {
  position: absolute;
  z-index: 2;
  top: -45px;
  right: 0;
  border: 0;
  background: transparent;
  color: #ffffff;
  font-size: 38px;
  cursor: pointer;
}

.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  border-radius: 12px;
  background: #000000;
}

.video-container iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 950px) {
  .movie-hero {
    grid-template-columns: 230px 1fr;
    gap: 28px;
  }

  .info-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .companies-card {
    grid-column: span 2;
  }
}

@media (max-width: 650px) {
  .details-container {
    width: min(100% - 28px, 1200px);
    padding-top: 25px;
  }

  .backdrop {
    height: 500px;
  }

  .movie-hero {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-height: auto;
    padding-top: 30px;
  }

  .poster-container {
    width: min(230px, 70%);
    align-self: center;
  }

  .movie-summary h1 {
    font-size: 38px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .companies-card {
    grid-column: span 1;
  }

  .cast-grid {
    gap: 16px;
  }

  .cast-card {
    flex-basis: 110px;
  }

  .cast-image,
  .cast-placeholder {
    width: 95px;
    height: 95px;
  }

  .cast-details h3 {
    font-size: 13px;
  }

  .cast-details p {
    font-size: 11px;
  }
}
</style>
