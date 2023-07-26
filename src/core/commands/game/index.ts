import { defineAsyncComponent, markRaw } from "vue";

import CommandType = Command.CommandType;
import CommponentOutputType = Tterminal.ComponentOutputType;

const moyuCommand: CommandType = {
  func: "game",
  name: "用来摸鱼的小游戏",
  options: [],
  collapsible: true,
  action(options, terminal) {
    const output: CommponentOutputType = {
      type: "component",
      component: markRaw(defineAsyncComponent(() => import("./MoYuBox.vue"))),
      props: {},
    };
    terminal.writeResult(output);
  },
};
export default moyuCommand;
