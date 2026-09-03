import { createRouter, createWebHistory } from "vue-router";
import FavoritesPage from "../views/FavoritesPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/movies",
    name: "Movies",
    component: () => import("../views/MoviesPage.vue"),
  },

  {
    path: "/movie/:id",
    name: "MovieDetails",
    component: () => import("../views/MovieDetailsPage.vue"),
  },
<<<<<<< HEAD
  {
    path: "/favorites",
    name: "Favorites",
    component: FavoritesPage,
=======

  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/ProfilePage.vue"),
>>>>>>> 13e23897897571db1ec4b06729615691fb91cbb0
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;