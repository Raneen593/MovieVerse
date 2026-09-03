<template>
    <div class="favorite-card">
        <div class="card-image">
            <img
                :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                :alt="movie.title"
                loading="lazy"
            />
        </div>
        <div class="card-content">
            <h4>{{ movie.title }}</h4>
            <div class="movie-meta">
                <span class="rating">⭐ {{ movie.vote_average?.toFixed(1) || 'N/A' }}</span>
                <span class="year">{{ movie.release_date?.slice(0, 4) || '' }}</span>
            </div>
            <button @click="$emit('remove', movie.id)" class="btn-remove">
                ❌ Remove
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FavoriteCard',
    
    props: {
        movie: {
            type: Object,
            required: true
        }
    },
    
    emits: ['remove']
};
</script>

<style scoped>
.favorite-card {
    background: var(--primary-color);
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 10px 10px 20px rgb(24, 24, 26);
}

.favorite-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(255, 215, 0, 0.15);
}

.card-image {
    overflow: hidden;
}

.card-image img {
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: contain;
    transition: transform 0.3s;
    background: #151515;
}

.favorite-card:hover .card-image img {
    transform: scale(1.05);
}

.card-content {
    padding: 12px;
    text-align: center;
}

.card-content h4 {
    color: var(--white);
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.movie-meta {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 10px;
}

.movie-meta .rating {
    color: var(--rating-color);
    font-size: 12px;
    font-weight: 500;
}

.movie-meta .year {
    color: #888;
    font-size: 12px;
}

.btn-remove {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 6px 16px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;
    width: 100%;
}

.btn-remove:hover {
    background: #c0392b;
    transform: scale(1.02);
}
</style>