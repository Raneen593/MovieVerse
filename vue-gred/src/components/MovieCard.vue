<script>
export default {
  props: ["movies_api"],
};
</script>

<template>
  <div class="card movie-card">
    <img
      :src="'https://image.tmdb.org/t/p/w500' + movies_api.poster_path"
      class="card-img-top image"
    />
    <router-link :to="'/movie/' + movies_api.id" class="details-btn">
      Details
    </router-link>
    <div class="card-body body">
      <p class="title">{{ movies_api.title }}</p>
      <div class="d-flex align-items-center gap-2 info">
        <p class="rate">
          <i class="fa-solid fa-star"></i>
          {{ movies_api.vote_average }}
        </p>

        <p class="dot">•</p>

        <p class="date">
          {{ movies_api.release_date.slice(0, 4) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  width: 100%;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  background-color: #171e2b;
  box-shadow: 10px 10px 20px #18181a;
  transition: 0.4s ease;
}

.movie-card:hover {
  transform: translate(8px, -10px);
}

.image {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: contain;
  display: block;
  transition: 0.9s ease;
}

.movie-card:hover .image {
  transform: scale(1.06);
  filter: brightness(0.6);
}

.body {
  padding: 10px;
}

.title {
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info p {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: #d0d0d0;
}

.info .rate {
  color: var(--rating-color);
  font-weight: 600;
}

.info .rate i {
  margin-right: 4px;
  font-size: 11px;
}

.details-btn {
  position: absolute;
  bottom: 85px;
  left: 50%;
  transform: translateX(-50%) translateY(15px);
  width: 90%;
  padding: 5px 0;

  background-color: var(--secondary-color);
  color: var(--white);
  border: none;
  border-radius: 50px;

  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  opacity: 0;
  transition: 0.4s ease;

  text-align: center;
  text-decoration: none;
  display: block;
}

.movie-card:hover .details-btn {
  opacity: 1;
  transform: translateX(-50%) translateY(5px);
}
</style>
