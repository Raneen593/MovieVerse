<template>
  <div class="movie-card" @click="openDetails">
    <div class="poster-container">
      <img
        v-if="movie.poster_path"
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        :alt="movie.title"
        class="movie-poster"
      />

      <div v-else class="no-poster">No Image</div>

      <button class="favorite-btn" @click.stop="toggleFavorite">
        {{ isFavorite ? "♥" : "♡" }}
      </button>

      <div class="movie-overlay">
        <button class="details-btn">View Details</button>
      </div>
    </div>

    <div class="movie-info">
      <h3>{{ movie.title }}</h3>

      <div class="movie-meta">
        <span>⭐ {{ formattedRating }}</span>

        <span v-if="movie.release_date">
          {{ movie.release_date.substring(0, 4) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isFavorite: false,
    };
  },

  computed: {
    formattedRating() {
      if (!this.movie.vote_average) {
        return "N/A";
      }

      return this.movie.vote_average.toFixed(1);
    },
  },

  methods: {
    openDetails() {
      this.$router.push("/movie/" + this.movie.id);
    },

    toggleFavorite() {
      this.isFavorite = !this.isFavorite;

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      if (this.isFavorite) {
        const exists = favorites.some((movie) => movie.id === this.movie.id);

        if (!exists) {
          favorites.push(this.movie);
        }
      } else {
        favorites = favorites.filter((movie) => movie.id !== this.movie.id);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));

      this.$emit("favorite-changed", this.movie);
    },
  },
};
</script>

<style scoped>
.movie-card {
  background: #17171f;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-8px);
}

.poster-container {
  position: relative;
  aspect-ratio: 2 / 3;
  overflow: hidden;
}

.movie-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.no-poster {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #252532;
  color: #aaa;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.65);
  color: white;
  font-size: 22px;
  cursor: pointer;
  z-index: 3;
}

.movie-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.movie-card:hover .movie-overlay {
  opacity: 1;
}

.details-btn {
  border: none;
  padding: 10px 18px;
  border-radius: 20px;
  background: #e50914;
  color: white;
  cursor: pointer;
}

.movie-info {
  padding: 12px;
}

.movie-info h3 {
  color: white;
  font-size: 16px;
  margin: 0 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-meta {
  display: flex;
  justify-content: space-between;
  color: #aaa;
  font-size: 14px;
}
</style>
