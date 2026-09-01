<template>
  <div class="search-cont">
    <input
      type="text"
      placeholder="Search for a movie ..."
      class="searchtap"
      @input="Sendsearch"
      v-model="searchtext"
    />
    <button v-if="searchtext" @click="clearSearch" class="clear-btn">×</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchtext: "",
    };
  },
  methods: {
    Sendsearch() {
      this.$emit("Search", this.searchtext);
    },
    clearSearch() {
      (this.searchtext = ""), this.$emit("Search", "");
    },
  },
};
</script>
<style scoped>
.search-cont {
  display: flex;
  padding: 21px;
}
.searchtap {
  padding: 12px;
  width: 100%;
  background: #1c1c25;
  border-radius: 22px;
  border: none;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
  color: white;
}
.search-input {
  width: 100%;
  padding: 15px 45px 15px 20px;
  border: 1px solid #333;
  border-radius: 30px;
  background: #1c1c25;
  color: white;
  font-size: 16px;
  outline: none;
}

.search-input:focus {
  border-color: #e50914;
}

.search-input::placeholder {
  color: #777;
}

.clear-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #aaa;
  font-size: 25px;
  cursor: pointer;
}
</style>
