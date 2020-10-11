import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { i18nNameKey: "home" },
    component: () => import(/* webpackChunkName: "views" */ "@/views/MapView.vue")
  },
  {
    path: "/*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
