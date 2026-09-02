<template>
  <div class="profile-page">
    <h1>Profile</h1>

    <div class="profile-card">
      <img :src="user.avatar" alt="Profile" class="avatar" />
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <button class="edit-btn">Edit Profile</button>
    </div>

    <div class="favorites-section">
      <h3>My Favorite Movies</h3>
      <p v-if="favorites.length === 0" class="empty-text">
        You haven't added any favorites yet.
      </p>
      <div v-else class="favorites-list">
        <div v-for="movie in favorites" :key="movie.id" class="favorite-item">
          {{ movie.title }}
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
        email: "user@example.com",
        avatar: "https://via.placeholder.com/150"
      },
      favorites: []
    };
  }
};
</script>

<style scoped>
.profile-page {
  padding: 20px;
  text-align: center;
}

.profile-card {
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.edit-btn {
  margin-top: 10px;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.edit-btn:hover {
  background-color: #369870;
}

.favorites-section {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
}

.empty-text {
  color: #888;
}

.favorites-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.favorite-item {
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
</style>