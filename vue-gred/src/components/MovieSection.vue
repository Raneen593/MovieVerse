<script>
import Moviecard from './MovieCard.vue';
export default {
  data() {
    return {
      showall_movies: false
    }

  },
  components: {
    Moviecard,
  },
  props: ['title', 'subtitle', 'movies_api'],
}
</script>

<template>
  <section class=" container movie-section"  v-if="movies_api.length > 0">

    <div class="section-header">
      <h2 class="section-title">{{ title }}</h2>
      <p class="section-subtitle">{{ subtitle }}</p>
    </div>


    <div class="row justify-content-center gx-4 gy-4">
      <div v-for="each in (showall_movies ? movies_api : movies_api.slice(0, 12))" :key="each.id"
        class="col-6 col-sm-4 col-lg-2">
        <Moviecard class="card" :movies_api="each" />
      </div>
    </div>

    <button v-if="movies_api.length > 6 && !showall_movies" @click="showall_movies = true">
        Show More
  <i class="fa-solid fa-arrow-right"></i>
    </button>

  </section>
</template>


<style scoped>

.movie-section {
  padding-top: 90px;
  padding-bottom: 30px;

  
}

.section-header {
  margin-bottom: 25px;
  padding-left: 5px;
}

.section-title {
  color: var(--white);
  font-size: 26px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.3px;
}

.section-subtitle {
  color: #8f8f8f;
  font-size: 13px;
  font-weight: 400;
  margin: 6px 0 0;
}

@keyframes apperance {
  from {
    opacity: 0;
    transform: translateY(20px)
  }

  to {
    opacity: 1;
    transform: translateY(0px)
  }
}

.card,
.section-title,
.section-subtitle
{
  animation: apperance 0.9s ease;
   
}
button{
  margin-top: 20px;
  padding:15px;
  display: block;
  font-size: 14px;
  background-color:transparent;
  color: rgb(159, 155, 155);
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.4s ease;
}
button:hover{
   background-color:#3e3e3c;
}
</style>