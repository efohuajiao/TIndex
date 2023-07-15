import { defineStore } from "pinia";

export const useTerminalConfigStore = defineStore("terminalConfig", {
  state: () => {
    return {
      // eslint-disable-next-line prettier/prettier
      // 背景
      background: "black",
      // 输入提示
      isShowHint: true,
      // 欢迎语句
      welcomeText: [] as string[],
    };
  },
  getters: {},
  persist: {
    key: "terminalConfig",
    storage: window.localStorage,
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

    /**
     * @description: 是否打开提示
     * @param {string} hint 表示hint命令后面跟的子命令是on还是off
     * @return {*}
     */
    setToggleHint(hint: string): boolean {
      if (!hint) {
        this.isShowHint = !this.isShowHint;
        return this.isShowHint;
      }
      if (hint === "on") {
        this.isShowHint = true;
      } else if (hint === "off") {
        this.isShowHint = false;
      }
      return this.isShowHint;
    },
    // 设置欢迎语句
    setWelcomeText(text: string[]) {
      this.welcomeText = text;
    },
    // 重置
    reset() {
      this.$reset();
    },
  },
});
