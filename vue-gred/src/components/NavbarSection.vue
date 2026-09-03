<script></script>

<template>
  <nav class="navbar navbar-expand-lg nav">
    <div class="container">
      <RouterLink to="/" class="navbar-logo">
        <span class="logo-icon">
          <i class="fa-solid fa-film"></i>
        </span>

        <span> Cine<span class="logo-highlight">Verse</span> </span>
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span><i class="fa-solid fa-bars"></i></span>
      </button>

      <div
        class="collapse navbar-collapse nav-size"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav ms-lg-4 me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/movies" class="nav-link">Movies </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/favorites" class="nav-link">Favorites</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">Profile</router-link>
          </li>
        </ul>

        <div class="d-flex flex-column flex-lg-row gap-2">
          <a
            class="nav-link d-flex align-items-center justify-content-center icons"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </a>
          <router-link
            to="/favorites"
            class="nav-link d-flex align-items-center justify-content-center icons"
          >
            <i class="fa-solid fa-heart"></i>
          </router-link>

          <router-link
            to="/profile"
            class="nav-link d-flex align-items-center justify-content-center icons"
          >
            <i class="fa-regular fa-user"></i>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  height: 70px;
  background-color: transparent;
  padding: 0 30px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

/* Logo */
.navbar-logo {
  display: inline-flex;
  align-items: center;

  gap: 6px;

  color: #f5f5f7;

  text-decoration: none;

  font-size: 1.35rem;
  font-weight: 700;
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-image: linear-gradient(
    135deg,
    var(--secondary-color),
    var(--logo-secondary-color)
  );

  color: var(--white);

  font-size: 18px;
}

.logo-highlight {
  background-image: linear-gradient(
    to right,
    var(--secondary-color),
    var(--logo-secondary-color)
  );
  background-clip: text;
  color: transparent;
}

/* Navigation list */
.navbar-nav {
  gap: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
}

/* Links */
.nav-item .nav-link {
  color: #cfcfcf;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-item .nav-link:hover {
  color: var(--white);
}

/* Icons container */
.icons {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  color: var(--white);
  text-decoration: none;
  font-size: 17px;
}

.icons:hover {
  background-color: #474646;
  color: var(--white);
}

/* Navbar toggler */
.navbar-toggler {
  border: none;
  color: var(--white);
  padding: 6px 8px;
}

.navbar-toggler:focus {
  box-shadow: none;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    position: absolute;
    top: 70px;
    left: 30px;
    right: 30px;

    background-color: rgba(13, 17, 28, 0.85);
    padding: 20px;
    border-radius: 10px;
  }
}
</style>
