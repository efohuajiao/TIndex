import { RouteRecordRaw } from "vue-router";
import index from "../pages/IndexPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: index,
  },
];

export default routes;
