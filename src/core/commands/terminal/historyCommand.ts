import CommandType = Command.CommandType;

const historyCommand: CommandType = {
  func: "history",
  name: "获取历史命令",
  options: [],
  action(options, terminal) {
    const commandList = terminal.listCommandHistory();
    terminal.writeTextResult(`⭐️ 输入 ![序号] 可以快速执行某条历史命令`);
    commandList.forEach((command, index) => {
      terminal.writeTextResult(`${index + 1} ${command.text}`);
    });
  },
};

export default historyCommand;
