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
        <span class="stat-number">{{ stats.favorites }}</span>
        <span class="stat-label">Favorite Movies</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ stats.watched }}</span>
        <span class="stat-label">Movies Watched</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ stats.avgRating }}</span>
        <span class="stat-label">Average Rating</span>
      </div>
    </div>

    <div class="recent-section">
      <h3>Recently Saved</h3>

      <div v-if="recentMovies.length === 0" class="empty-state">
        <span class="empty-icon">🎞️</span>
        <p>Your watchlist is feeling a little empty.</p>
        <router-link to="/movies" class="explore-btn">Explore Movies</router-link>
      </div>

      <div v-else class="movies-grid">
        <div v-for="movie in recentMovies" :key="movie.id" class="movie-card">
          <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
          <div class="movie-info">
            <h4>{{ movie.title }}</h4>
            <p class="movie-meta">
              <span class="rating">★ {{ movie.rating }}</span>
              • {{ movie.year }} • {{ movie.genre }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
  data() {
    return {
      user: {
        name: "User Name",
        email: "user@example.com"
      },
      stats: {
        favorites: 0,
        watched: 0,
        avgRating: "0.0"
      },
      recentMovies: []
    };
  },
  computed: {
    initials() {
      return this.user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    }
  }
};
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding: 80px 20px;
  background: #10141f;
  color: #ffffff;
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
  background: #171e2b;
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
  color: white;
  background: #e50914;
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
  background: rgba(16, 20, 31, 0.75);
  color: #ffffff;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s ease;
}

.edit-btn:hover {
  background: #ffffff;
  color: #10141f;
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
  background: #171e2b;
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 28px;
  font-weight: bold;
  color: #e50914;
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
  background: #171e2b;
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
  background: #e50914;
  color: white;
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  transition: 0.2s ease;
}

.explore-btn:hover {
  background: #ff1f2a;
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
  background: #171e2b;
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

.rating {
  color: #ffd166;
}

/* Responsive */
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