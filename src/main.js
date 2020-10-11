import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store.js";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: { key: "AIzaSyAUCnbEZ1icbujDB1nyyjqIEfZgFX-5mZk" }
});

Vue.mixin({
  data: () => ({ devMode: window.location.hostname === "localhost" }),
  methods: {
    rInt(max) {
      return Math.floor(Math.random() * max);
    }
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
