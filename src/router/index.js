import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "processes",
  },
  {
    path: "/processes",
    name: "ProcessesPage",
    component: () => import("../views/ProcessesPage.vue"),
  },
  {
    path: "/solutions",
    name: "SolutionsPage",
    component: () => import("../views/SolutionsPage.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/AuthorizationPage.vue"),
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("../views/TaskPage.vue"),
  },
  {
    path: "/process-create",
    name: "CreateProcess",
    component: () => import("../views/CreateProcess.vue"),
  },
  {
    path: "/collegues",
    name: "ColleguesPage",
    component: () => import("../views/ColleaguesPage.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
