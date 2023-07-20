import { commandMap } from "@/core/CommandRegister";
import { defineAsyncComponent, markRaw } from "vue";
import CommandType = Command.CommandType;
import ComponentOutputType = Tterminal.ComponentOutputType;
const helpCommand: CommandType = {
  func: "help",
  name: "查看帮助",
  options: [],
  params: [
    {
      key: "commandName",
      desc: "命令英文名称",
    },
  ],
  action(options, terminal, parentCommand) {
    const { _ } = options;
    // 表示输出整个组件
    if (_.length < 1) {
      const output: ComponentOutputType = {
        type: "component",
        component: markRaw(defineAsyncComponent(() => import("./helpBox.vue"))),
      };
      terminal.writeResult(output);
      return;
    }
    const commandName = _[0];
    const command = commandMap[commandName];
    console.log(command);

    if (!command) {
      terminal.writeTextErrorResult("没有找到该命令！");
    }
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./CommandHelpBox.vue")),
      props: {
        command,
        parentCommand,
      },
    };
    terminal.writeResult(output);
  },
};

export default helpCommand;
