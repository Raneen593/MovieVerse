<template>
    <button
        @click="handleToggle"
        :class="['heart-btn', { active: isFavorite }]"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
    >
        {{ isFavorite ? '❤️' : '🤍' }}
    </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'FavoriteHeart',
    
    props: {
        movie: {
            type: Object,
            required: true
        }
    },

    computed: {
        ...mapGetters('favorites',{ isFavoriteGetter: 'isFavorite'}),
        
        isFavorite() {
            return this.isFavoriteGetter(this.movie.id);
        }
    },

    methods: {
        ...mapActions('favorites', ['toggleFavorite']),
        
        handleToggle() {
            this.toggleFavorite(this.movie);
        }
    }
};
</script>

<style scoped>
.heart-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    font-size: 1.3rem;
    cursor: pointer;
    transition: 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
}

.heart-btn:hover {
    transform: scale(1.15);
    border-color: #ffd700;
}

.heart-btn.active {
    border-color: #ff4757;
    background: rgba(255, 71, 87, 0.25);
    animation: heartPop 0.3s ease;
}

@keyframes heartPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
}
</style>