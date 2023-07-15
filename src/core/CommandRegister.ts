// 引入命令
import dateCommand from "./commands/dateCommand";
import backgroundCommand from "./commands/terminal/config/backgroundCommand";
import hintCommnad from "./commands/terminal/config/HintCommand";
import welcomeCommand from "./commands/terminal/config/welcomeCommand";
import historyCommand from "./commands/terminal/historyCommand";
import CommandType = Command.CommandType;

//命令列表
const commandList: CommandType[] = [
  dateCommand,
  backgroundCommand,
  hintCommnad,
  welcomeCommand,
  historyCommand,
];

//命令字典
const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command; //将每个命令的func参数作为map的key，将整个command作为map的value
  command?.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };
