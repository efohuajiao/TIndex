import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

//引入路由
import * as VueRouter from "vue-router";
import routes from "./router";
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(), //使用哈希路由
  routes,
});
app.use(router);

//引入pinia
import { createPinia } from "pinia";
const pinia = createPinia();
app.use(pinia);

app.mount("#app");
