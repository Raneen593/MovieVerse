<template>
  <div class="profile-page">
    <h1>Profile</h1>
    <div class="profile-card">
      <img :src="user.avatar" alt="Profile" class="avatar" />
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
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
      }
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
</style>