// ============================================
// Favorites Store Module
// ============================================

const STORAGE_KEY = 'movieVerse_favorites';

export default {
    namespaced: true,

    state: {
        favorites: []
    },

    getters: {
        getFavorites: (state) => state.favorites,
        
        getFavoritesCount: (state) => state.favorites.length,
        
        isFavorite: (state) => (movieId) => {
            return state.favorites.some(movie => movie.id === movieId);
        },
        
        getFavorite: (state) => (movieId) => {
            return state.favorites.find(movie => movie.id === movieId);
        }
    },

    mutations: {
        SET_FAVORITES(state, favorites) {
            state.favorites = favorites;
        },
        
        ADD_FAVORITE(state, movie) {
            const exists = state.favorites.some(fav => fav.id === movie.id);
            if (!exists) {
                state.favorites.push(movie);
            }
        },
        
        REMOVE_FAVORITE(state, movieId) {
            state.favorites = state.favorites.filter(movie => movie.id !== movieId);
        },
        
        CLEAR_FAVORITES(state) {
            state.favorites = [];
        }
    },

    actions: {
        loadFavorites({ commit }) {
            try {
                const data = localStorage.getItem(STORAGE_KEY);
                if (data) {
                    commit('SET_FAVORITES', JSON.parse(data));
                    console.log(`📊 Loaded ${JSON.parse(data).length} favorites`);
                } else {
                    commit('SET_FAVORITES', []);
                    console.log('📊 No favorites found');
                }
            } catch (error) {
                console.error('❌ Error loading favorites:', error);
                commit('SET_FAVORITES', []);
            }
        },

        saveFavorites({ state }) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
                console.log('💾 Favorites saved to localStorage');
                return true;
            } catch (error) {
                console.error('❌ Error saving favorites:', error);
                return false;
            }
        },

        toggleFavorite({ commit, state, dispatch }, movie) {
            if (!movie || !movie.id) {
                console.error('❌ Invalid movie object:', movie);
                return false;
            }

            const exists = state.favorites.some(fav => fav.id === movie.id);

            if (exists) {
                commit('REMOVE_FAVORITE', movie.id);
                console.log(`🗑️ Removed: ${movie.title}`);
            } else {
                commit('ADD_FAVORITE', movie);
                console.log(`❤️ Added: ${movie.title}`);
            }

            dispatch('saveFavorites');
            return true;
        },

        clearAllFavorites({ commit, dispatch }) {
            if (confirm('⚠️ Are you sure you want to clear all favorites?')) {
                commit('CLEAR_FAVORITES');
                dispatch('saveFavorites');
                console.log('🗑️ All favorites cleared');
                return true;
            }
            return false;
        }
    }
};