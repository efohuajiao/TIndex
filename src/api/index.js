import axios from "./myAxios";

export function getBackground() {
  return axios.get("https://api.btstu.cn/sjbz/api.php?lx=dongman&format=json");
}
