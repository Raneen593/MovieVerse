import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
