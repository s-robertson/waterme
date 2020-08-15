import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import appAuth from "@/store/services/auth";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/add-plant",
    name: "Add Plant",
    component: () =>
      import(/* webpackChunkName: "addPlant" */ "../views/AddPlant.vue")
  },
  {
    path: "/edit-plant/:id",
    name: "Edit Plant",
    component: () =>
      import(/* webpackChunkName: "editPlant" */ "../views/EditPlant.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isGuardedPage =
    ["Register", "Login"].findIndex(route => route === to.name) === -1;

  if (isGuardedPage && !store.state.loading && !appAuth.isLoggedIn()) {
    next({ name: "Login" });
    return;
  }

  next();
});

export default router;
