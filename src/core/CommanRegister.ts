// 引入命令
import dateCommand from "./commands/dateCommand";

import CommandType = Command.CommandType;

//命令列表
const commandList: CommandType[] = [dateCommand];

//命令字典
const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command; //将每个命令的func参数作为map的key，将整个command作为map的value
});

export { commandList, commandMap };
