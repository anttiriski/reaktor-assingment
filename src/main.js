import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store.js";

import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
