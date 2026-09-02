<script>
import Navbar from "./components/NavbarSection.vue";
import Footer from "./components/FooterBar.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>
<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style></style>
