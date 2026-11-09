import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/home/index.vue"),
  },
  {
    path: "/courses",
    name: "courses",
    component: () => import("../pages/courses/index.vue"),
  },
  {
    path: "/students",
    name: "students",
    component: () => import("../pages/students/index.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../pages/profile/index.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
