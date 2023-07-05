// 引入终端类型声明
import TerminalType = Tterminal.TerminalType;

//执行命令
export const doCommandExecute = (inputText: string, terminal: TerminalType) => {
  if (!inputText) {
    //如果没有命令，进行返回
    return;
  }
  const command = getCommand(inputText);
};

//命令解析
const getCommand = (inputText: string, parentCommand) => {
  let func = inputText.split(" ")[0];
  console.log("command", func);
};
