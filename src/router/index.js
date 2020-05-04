import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/AuthorizationView.vue"),
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("../views/TaskPage.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
