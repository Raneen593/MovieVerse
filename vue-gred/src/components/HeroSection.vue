<script>
export default {
  props: ["movies_api"],
};
</script>

<template>
  <section v-if="movies_api.length > 3" class="hero-section">
    <div
      class="hero-background"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movies_api[2].backdrop_path})`,
      }"
    ></div>

    <div class="hero-overlay"></div>

    <div
      class="container hero-content d-flex align-items-center justify-content-center"
    >
      <div class="hero-info">
        <p class="hero-label">Featured Tonight</p>
        <p class="hero-title">{{ movies_api[2].title }}</p>
        <div class="d-flex align-items-center gap-2 hero-details">
          <p class="hero-rating">
            <i class="fa-solid fa-star"></i>{{ movies_api[2].vote_average }}
          </p>
          <p class="hero-dot">•</p>
          <p class="hero-date">{{ movies_api[2].release_date }}</p>
        </div>
        <p class="hero-overview">{{ movies_api[2].overview }}</p>

        <div class="d-flex align-items-center gap-4 hero-buttons">
          <button
            class="hero-trailer"
            @click="$emit('watch-trailer', movies_api[2])"
          >
            Watch Trailer
          </button>
          <button
            class="hero-favorites"
            @click="$emit('add-favorite', movies_api[2])"
          >
            Add to Favorits
          </button>
        </div>
      </div>

      <div class="hero-image">
        <img
          :src="'https://image.tmdb.org/t/p/w500' + movies_api[2].poster_path"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

/* hero-background */
@keyframes back-ground {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
}

.hero-background {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  animation-name: back-ground;
  animation-duration: 13s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-delay: 1.2s;
  position: absolute;
  z-index: 0;
}

/* .hero-overlay */
.hero-overlay {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to top,
      var(--background-color) 0%,
      rgba(7, 8, 12, 0.8) 15%,
      rgba(7, 8, 12, 0) 50%
    ),
    linear-gradient(
      to right,
      var(--background-color) 0%,
      rgba(7, 8, 12, 0.4) 35%,
      rgba(7, 8, 12, 0) 70%
    );
}

/* hero content */
.hero-content {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 2;
  gap: 400px;
}

/* hero-info */

@keyframes info_appearance {
  from {
    transform: translateX(30px) translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0px) translateY(0px);
    opacity: 1;
  }
}

.hero-info {
  color: var(--white);
  max-width: 650px;
  animation: info_appearance 1.2s ease-out;
}
.hero-label {
  color: var(--secondary-color);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 15px;
}

.hero-title {
  color: var(--white);
  font-size: 80px;
  font-weight: 900;
  line-height: 0.95;
  text-transform: uppercase;
}

.hero-details {
  margin-top: 20px;
  color: #d0d0d0;
  font-size: 14px;
}

.hero-rating {
  color: var(--white);
  font-weight: 700;
}

.hero-rating i {
  color: var(--rating-color);
  margin-right: 5px;
}

.hero-dot {
  color: #777;
}

.hero-date {
  color: #d0d0d0;
}

.hero-overview {
  width: 550px;
  margin-top: 20px;
  color: #c7c7c7;
  font-size: 15px;
  line-height: 1.7;
}
.hero-buttons {
  margin-top: 40px;
}
.hero-trailer {
  background-color: var(--secondary-color);
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 12px 22px;
  border-radius: 8px;
  border: none;
  transition: 1s;
}

.hero-favorites {
  background-color: rgba(255, 255, 255, 0.08);
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 12px 22px;
  border-radius: 8px;
  border: 1px solid rgb(84, 83, 83);
  transition: 1s;
}
.hero-trailer:hover {
  transform: scale(1.1);
}

.hero-favorites:hover {
  transform: scale(1.1);
}

/* hero-image */

@keyframes image_appearance {
  from {
    transform: translateX(70px) rotate(4deg);
    opacity: 0;
  }

  to {
    transform: translateX(0) rotate(0);
    opacity: 1;
  }
}

@keyframes image_movement {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
}

.hero-image {
  animation: image_appearance 1.2s ease-out;
}

.hero-image img {
  width: 250px;
  border-radius: 10px;
  animation: image_movement 5s ease-in-out 1.2s infinite;
  box-shadow: 10px 10px 20px rgb(28, 28, 28);
}

/*Responsive*/

@media (max-width: 1399.98px) {
  .hero-content {
    gap: 150px;
  }

  .hero-info {
    max-width: 550px;
  }

  .hero-title {
    font-size: 70px;
  }

  .hero-overview {
    width: 500px;
  }
}

@media (max-width: 991.98px) {
  .hero-image {
    display: none;
  }

  .hero-content {
    justify-content: center;
    gap: 0;
  }

  .hero-info {
    width: 100%;
    max-width: 700px;
    text-align: center;
  }

  .hero-title {
    font-size: 60px;
  }

  .hero-overview {
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-details {
    justify-content: center;
  }

  .hero-buttons {
    justify-content: center;
  }
}

@media (max-width: 767.98px) {
  .hero-content {
    padding: 80px 20px 40px;
  }

  .hero-title {
    font-size: 45px;
  }

  .hero-overview {
    max-width: 100%;
    font-size: 14px;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 12px !important;
    width: 100%;
  }

  .hero-trailer,
  .hero-favorites {
    width: 100%;
  }
}

@media (max-width: 575.98px) {
  .hero-title {
    font-size: 38px;
  }

  .hero-overview {
    font-size: 13px;
  }
}
</style>
