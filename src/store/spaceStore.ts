import { defineStore } from "pinia";

interface SpaceType {
  [dir: string]: SpaceItemType;
}
interface SpaceItemType {
  name: string;
  link?: string;
  // 所属目录
  dir: string;
  type: "dir" | "link";
}
const useSpaceStore = defineStore("space-store", {
  // 状态
  state: () => {
    return {
      space: {
        "/": {
          name: "/",
          dir: "/",
          type: "dir",
        },
      } as SpaceType,
      currentDir: "/",
    };
  },
  getters: {},
  persist: {
    key: "space-store",
    storage: window.localStorage,
  },
  actions: {
    // 获取单条目
    getItem(key: string) {
      const fullpath = getFullPath(this.currentDir, key);
      return this.space[fullpath];
    },
    // 添加条目
    addItem(item: SpaceItemType) {
      const fullpath = getFullPath(item.dir, item.name);
      // 目录不存在
    },
  },
});
export default useSpaceStore;
// 获取条目全路径
const getFullPath = (dir: string, name: string): string => {
  if (name.startsWith("/")) {
    return name;
  }
  return dir + (dir === "/" ? "" : "/") + name;
};
