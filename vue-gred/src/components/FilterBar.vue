<template>
  <div class="filter-bar">
    <div>
      <p>Genre</p>
      <select v-model="selectGender" @change="sendFilter" class="hovercard">
        <option value="">All Genres</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>
    </div>
    <div>
      <p>Relase Year</p>
      <select v-model="selectYear" @change="sendFilter">
        <option value="">All Years</option>
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>
    <div>
      <p>Sorted By</p>
      <select v-model="selectsort" @change="sendFilter">
        <option value="popularity.desc">Popular</option>

        <option value="vote_average.desc">Top Rated</option>

        <option value="release_date.desc">Newest</option>

        <option value="release_date.asc">Oldest</option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    genres: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectGender: "",
      selectYear: "",
      selectsort: "popularity.desc",
    };
  },
  computed: {
    years() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = currentYear; year >= 2019; year--) {
        years.push(year);
      }
      return years;
    },
  },
  methods: {
    sendFilter() {
      this.$emit("filter-changed", {
        genre: this.selectGender,
        year: this.selectYear,
        sort: this.selectsort,
      });
    },
  },
};
</script>
<style scoped>
.filter-bar {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 35px;
  margin-top: 0px;
}

.filter-bar select {
  background-color: var(--primary-color);
  padding: 11px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  width: 400px;
  margin-bottom: 18px;
  transition: all 0.3s ease;
  border: 1px solid #353535;
}

.filter-bar select:focus {
  border-color: #e50914;
}
p {
  display: flex;
  color: #757575;
}

.filter-bar select:hover {
  border: 1px solid;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 1.5);
  transform: translateY(-2px);
  background-color: #24242f;
}
@media (max-width: 600px) {
  .filter-bar {
    flex-direction: column;
  }

  .filter-bar select {
    width: 100%;
  }
}
</style>
