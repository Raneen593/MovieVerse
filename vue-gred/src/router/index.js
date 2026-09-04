import { createRouter, createWebHistory } from "vue-router";

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
    {
    path: "/favorites",
    name: "Favorites",
    component: () => import("../views/FavoritesPage.vue"),
    },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/ProfilePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
