<script>
import Herosection from '../components/HeroSection.vue';
import Moviesection from '../components/MovieSection.vue';
import movieapi from '../services/movieApi';


export default {
    components: {
        Herosection,
        Moviesection

    },

    data() {
        return {
            trending: [],
            popular: [],
            top_rated: [],

            loading: true,
            selectedMovie: null
        }

    },
    async mounted() {

        this.trending = (await movieapi.getTrendingMovies()).results;

        this.popular = (await movieapi.getPopularMovies()).results;

        this.top_rated = (await movieapi.getTopRatedMovies()).results;
        this.loading = false

    },
    methods: {
        handleTrailer(movie) {
            this.trailerMovie = movie
        },

        handleFavorite(movie) {
            this.favoriteMovie = movie
        }
    }
}

</script>

<template>
    <div class="home">
        <div v-if="loading" class="loading">
            <i class="fa-solid fa-spinner"></i>
        </div>

        <div v-else>

            <Herosection :movies_api="trending" @watch-trailer="handleTrailer" @add-favorite="handleFavorite" />

            <Moviesection title="Trending Now" subtitle="What everyone is watching this week" :movies_api="trending" />

            <Moviesection title="Popular Now" subtitle="Crowd favourites across every genre" :movies_api="popular" />

            <Moviesection title="Top Rated Movies" subtitle="The highest scored films on CineVerse"
                :movies_api="top_rated" />

        </div>
    </div>
</template>

<style scoped>
.loading {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 30px;
}

.home {
    background: var(--background-color);
}
</style>