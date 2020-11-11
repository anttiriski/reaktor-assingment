import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:category",
    name: "Home",
    component: Home,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
