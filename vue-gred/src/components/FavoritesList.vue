<template>
    <div class="favorites-grid">
        <!-- Empty State -->
        <div v-if="!favorites || favorites.length === 0" class="empty-state">
            <div class="empty-state-content">
                <div class="empty-icon">❤️</div>
                <h3>No favorites yet</h3>
                <p>Browse movies and click the heart ❤️ to add them!</p>
                <router-link to="/" class="btn-browse">🎬 Browse Movies</router-link>
            </div>
        </div>

        <!-- Favorite Cards -->
        <FavoriteCard
            v-for="movie in favorites"
            :key="movie.id"
            :movie="movie"
            @remove="$emit('remove', movie.id)"
        />
    </div>
</template>

<script>
import FavoriteCard from './FavoriteCard.vue';

export default {
    name: 'FavoritesList',
    
    components: {
        FavoriteCard
    },
    
    props: {
        favorites: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    
    emits: ['remove']
};
</script>

<style scoped>
.favorites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 25px;
    padding: 20px 0;
}

/* Empty State */
.empty-state {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
}

.empty-state-content {
    text-align: center;
    padding: 60px 40px;
    background: var(--primary-color);
    border-radius: 20px;
    max-width: 500px;
    width: 100%;
    border: 2px dashed #333;
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 20px;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.empty-state-content h3 {
    color: var(--white);
    font-size: 1.8rem;
    margin-bottom: 10px;
}

.empty-state-content p {
    color: #888;
    font-size: 1.1rem;
    margin-bottom: 25px;
    line-height: 1.6;
}

.btn-browse {
    background: var(--secondary-color);
    color: var(--white);
    padding: 12px 35px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: bold;
    transition: 0.3s;
    display: inline-block;
}

.btn-browse:hover {
    opacity: 0.85;
    transform: scale(1.05);
}

@media (max-width: 768px) {
    .favorites-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
    }
    
    .empty-state-content {
        padding: 30px 20px;
    }
    
    .empty-state-content h3 {
        font-size: 1.3rem;
    }
}

@media (max-width: 480px) {
    .favorites-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
}
</style>