<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="header-left">
        <div class="avatar-circle">{{ initials }}</div>
        <div class="user-info">
          <h2>{{ user.name }}</h2>
          <p class="email">{{ user.email }}</p>
        </div>
      </div>
      <button class="edit-btn">Edit Profile</button>
    </div>

    <div class="stats-section">
      <div class="stat-card">
        <span class="stat-number">{{ favoritesCount }}</span>
        <span class="stat-label">Favorite Movies</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ stats.watched }}</span>
        <span class="stat-label">Movies Watched</span>
      </div>
      <div class="stat-card rating">
        <span class="stat-number rating">{{ stats.avgRating }}</span>
        <span class="stat-label">Average Rating</span>
      </div>
    </div>

    <div class="recent-section">
      <h3>Recently Saved</h3>

      <div v-if="!hasFavorites" class="empty-state">
        <span class="empty-icon">🎞️</span>
        <p>Your watchlist is feeling a little empty.</p>
        <router-link to="/movies" class="explore-btn"
          >Explore Movies</router-link
        >
      </div>

      <div v-else class="movies-grid">
        <div v-for="movie in recentFavorites" :key="movie.id" class="movie-card">
          <img
            v-if="movie.poster_path"
            :src="getPosterUrl(movie.poster_path)"
            :alt="movie.title"
            class="movie-poster"
          />
          <div v-else class="poster-placeholder">No image</div>
          <div class="movie-info">
            <h4>{{ movie.title }}</h4>
            <p class="movie-meta">
              <span class="rating">★ {{ formatRating(movie.vote_average) }}</span>
              • {{ getYear(movie.release_date) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ProfilePage",
  data() {
    return {
      user: {
        name: "User Name",
        email: "user@example.com",
      },
      stats: {
        watched: 0,
        avgRating: "0.0",
      },
    };
  },
  computed: {
    ...mapState("favorites", ["favorites"]),
    ...mapGetters("favorites", ["getFavoritesCount"]),

    favoritesCount() {
      return this.getFavoritesCount;
    },

    hasFavorites() {
      return this.favoritesCount > 0;
    },

    recentFavorites() {
      // بناخد آخر 5 أفلام بس من قائمة الـ Favorites
      return this.favorites.slice(0, 5);
    },

    initials() {
      return this.user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    },
  },
  methods: {
    ...mapActions("favorites", ["loadFavorites"]),

    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/w300${path}`;
    },

    formatRating(rating) {
      return rating ? rating.toFixed(1) : "N/A";
    },

    getYear(date) {
      return date ? date.slice(0, 4) : "";
    },
  },
  mounted() {
    this.loadFavorites();
  },
};
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding: 80px 20px;
  background: var(--background-color, #10141f);
  color: var(--white, #ffffff);
  font-family: inherit;
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto 30px;
  padding: 25px 30px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: var(--primary-color, #171e2b);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 18px;
}

.avatar-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: var(--white, #ffffff);
  background: var(--secondary-color, #e63956);
}

.user-info {
  text-align: left;
}

.user-info h2 {
  font-size: 20px;
  margin-bottom: 4px;
}

.email {
  color: #929cad;
  font-size: 14px;
}

.edit-btn {
  padding: 11px 22px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  background: rgba(8, 13, 20, 0.75);
  color: var(--white, #ffffff);
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s ease;
}

.edit-btn:hover {
  background: var(--white, #ffffff);
  color: var(--background-color, #10141f);
}

.stats-section {
  display: flex;
  justify-content: center;
  gap: 13px;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto 45px;
}

.stat-card {
  flex: 1;
  min-width: 150px;
  padding: 22px 20px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 10px;
  background: var(--primary-color, #171e2b);
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 28px;
  font-weight: bold;
  color: var(--secondary-color, #e63956);
}

.stat-number.rating {
  color: var(--rating-color, #f1cf39);
}

.stat-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: #929cad;
}

.recent-section {
  max-width: 1000px;
  margin: 0 auto;
}

.recent-section h3 {
  margin-bottom: 20px;
  font-size: 26px;
}

.empty-state {
  padding: 40px 20px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 10px;
  background: var(--primary-color, #171e2b);
  text-align: center;
}

.empty-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 12px;
  opacity: 0.7;
}

.empty-state p {
  color: #929cad;
  margin-bottom: 18px;
}

.explore-btn {
  display: inline-block;
  padding: 13px 23px;
  border-radius: 9px;
  background: var(--secondary-color, #e63956);
  color: var(--white, #ffffff);
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  transition: 0.2s ease;
}

.explore-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 18px;
}

.movie-card {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: var(--primary-color, #171e2b);
  transition: transform 0.2s ease;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-poster {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

.poster-placeholder {
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #929cad;
  font-size: 12px;
  background: #202938;
}

.movie-info {
  padding: 10px 12px;
  text-align: left;
}

.movie-info h4 {
  font-size: 14px;
  margin-bottom: 4px;
}

.movie-meta {
  font-size: 12px;
  color: #929cad;
}

.movie-meta .rating {
  color: var(--rating-color, #f1cf39);
}

@media (max-width: 650px) {
  .profile-page {
    padding: 50px 15px;
  }
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  .header-left {
    flex-direction: column;
  }
  .user-info {
    text-align: center;
  }
  .edit-btn {
    width: 100%;
  }
}
</style>