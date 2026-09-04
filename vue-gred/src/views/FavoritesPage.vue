<template>
    <div class="favorites-page">
        <div class="favorites-header">
            <h1>⭐ My Favorites</h1>
            <div class="header-actions">
                <span class="favorites-count">{{ favoritesCount }} movies</span>
                <button
                    v-if="hasFavorites"
                    @click="clearAllFavorites"
                    class="btn-clear"
                >
                    🗑️ Clear All
                </button>
            </div>
        </div>

        <FavoritesList
            :favorites="favorites"
            @remove="removeMovie"
        />
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import FavoritesList from '@/components/FavoritesList.vue';

export default {
    name: 'FavoritesPage',
    
    components: {
        FavoritesList
    },

    computed: {
        ...mapState('favorites', ['favorites']),
        ...mapGetters('favorites', ['getFavoritesCount']),
        
        favoritesCount() {
            return this.getFavoritesCount;
        },
        
        hasFavorites() {
            return this.favoritesCount > 0;
        }
    },

    methods: {
        ...mapActions('favorites', ['clearAllFavorites', 'loadFavorites', 'toggleFavorite']),
        
        removeMovie(movieId) {
            const movie = this.favorites.find(m => m.id === movieId);
            if (movie) {
                this.toggleFavorite(movie);
            }
        }
    },

    mounted() {
        this.loadFavorites();
    }
};
</script>
<style scoped>
.favorites-page {
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    padding: 80px 40px 40px; /* padding جوا بس عشان المحتوى ميفضلش على الحافة */
    background: #0d111c;
    margin: 0;
}

/* ===== الهيدر ===== */
.favorites-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background: var(--primary-color, #1a1a2e);
    border-radius: 12px;
    margin-bottom: 30px;
    box-shadow: 10px 10px 20px rgb(24, 24, 26);
    width: 100%;
}

.favorites-header h1 {
    color: var(--white, #f5f5f7);
    font-size: 1.8rem;
    margin: 0;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 20px;
}

.favorites-count {
    color: #aaa;
    font-size: 14px;
}

.btn-clear {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;
}

.btn-clear:hover {
    background: #c0392b;
    transform: scale(1.05);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
    .favorites-page {
        padding: 70px 15px 30px;
    }
    
    .favorites-header {
        flex-direction: column;
        gap: 15px;
        padding: 20px;
        text-align: center;
    }
    
    .favorites-header h1 {
        font-size: 1.4rem;
    }
    
    .header-actions {
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }
    
    .btn-clear {
        width: 100%;
    }
}
</style>
