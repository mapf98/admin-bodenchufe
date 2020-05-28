import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AdminDashboard from "../views/AdminDashboard.vue";
import AdminLogin from "../views/AdminLogin.vue";
import AdminSignUp from "../views/AdminSignUp.vue";
import NotFound from "../views/NotFound.vue";
import AddPost from "../components/AddPost.vue";
import Provider from "../components/Provider.vue"
import { VueEasyJwt } from "vue-easy-jwt";
const jwt = new VueEasyJwt();

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
      requiresAuth: false,
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
    children: [
      {
        path: "addPost",
        name: "AddPost",
        component: AddPost,
        meta: {
          requiresAuth: true,
          hideBasicComponents: false,
        },
      },
      {
        path: "provider",
        name: "Provider",
        component: Provider,
        meta: {
          requiresAuth: true,
          hideBasicComponents: false,
        },
      },
    ],
  },
  {
    path: "/signup",
    name: "AdminSignUp",
    component: AdminSignUp,
    meta: {
      requiresAuth: false,
      hideBasicComponents: true,
      applyBackground: false,
    },
  },
  {
    path: "*",
    component: NotFound,
    meta: {
      requiresAuth: false,
      hideBasicComponents: true,
      applyBackground: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  to.matched.some((route) => {
    if (route.meta.requiresAuth) {
      const yourToken: any = localStorage.getItem("token");
      const tokenData: any = jwt.decodeToken(yourToken);
      const tokenExp = new Date(tokenData.exp);
      const actualDate = Date.now();
      if (tokenExp.getDate() > actualDate) {
        localStorage.clear();
        next({ path: "/login" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
