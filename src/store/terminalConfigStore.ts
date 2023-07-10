import { defineStore } from "pinia";

export const useTerminalConfigStore = defineStore("terminalConfig", {
  state: () => {
    return {
      // eslint-disable-next-line prettier/prettier
      background: "black",
    };
  },
  getters: {},
  persist: {
    key: "terminalConfig",
    storage: window.sessionStorage,
  },
  actions: {
    /**
     * @description: 设置终端背景
     * @param {string} url
     * @return {*}
     */
    setBackground(url: string) {
      if (url) {
        this.background = url;
      }
    },
  },
});
