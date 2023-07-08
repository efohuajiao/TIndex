// 引入命令集
import { commandList, commandMap } from "./CommanRegister";

// 引入终端类型声明
import TerminalType = Tterminal.TerminalType;
import CommandType = Command.CommandType;

//执行命令
export const doCommandExecute = async (
  inputText: string,
  terminal: TerminalType,
  parentCommand?: CommandType
) => {
  if (!inputText) {
    //如果没有命令，进行返回
    return;
  }
  // 通过getCommand解析文本获取命令
  const command: CommandType = getCommand(inputText, parentCommand);
  if (!command) {
    //如果没有找到命令，则返回
    terminal.writeTextErrorResult("未能找到命令");
    return;
  }

  await doAction(command, terminal);
};

//命令解析
const getCommand = (text: string, parentCommand?: CommandType): CommandType => {
  text = text.trim(); //取出命令前面的空格
  let func = text.split(" ")[0];
  const command = commandMap[func];

  return command;
};

const doAction = async (command: CommandType, terminal: TerminalType) => {
  await command.action(null, terminal);
};
