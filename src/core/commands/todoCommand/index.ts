import { defineAsyncComponent, markRaw } from "vue";
import addCommand from "./subCommand/addCommand";
import CommandType = Command.CommandType;
import ComponentOutputType = Tterminal.ComponentOutputType;

const todoCommand: CommandType = {
  func: "todo",
  name: "待办事项",
  options: [],
  collapsible: true,
  subCommands: {
    add: addCommand,
  },
  action(options, terminal) {
    const { _ } = options;
    if (_.length < 1) {
      const output: ComponentOutputType = {
        type: "component",
        component: markRaw(defineAsyncComponent(() => import("./todoBox.vue"))),
      };
      terminal.writeResult(output);
    }
  },
};
export default todoCommand;
