import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AdminDashboard from "../views/AdminDashboard.vue";
import AdminLogin from "../views/AdminLogin.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "AdminLogin",
    component: AdminLogin,
    meta: {
      requiresAuth: true,
      hideBasicComponents: true,
      applyBackground: false,
    },
  },
  {
    path: "/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      hideBasicComponents: false,
      applyBackground: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
