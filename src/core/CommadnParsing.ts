// 引入getopt对参数进行解析
import getopts, { ParsedOptions } from "getopts";
// 引入命令集
import { commandList, commandMap } from "./CommanRegister";

// 引入终端类型声明
import TerminalType = Tterminal.TerminalType;
import CommandType = Command.CommandType;
import CommandOptionType = Command.CommandOptionType;

/**
 * @description: 执行命令
 * @param inputText 输入文本
 * @param terminal 终端
 * @param parentCommand 父命令
 * @return {*}
 */
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
  const parsedOptions = doParse(inputText, command.options);
  await doAction(command, terminal, parsedOptions);
};

/**
 * @description: 获取命令
 * @param {string} text 命令文本
 * @param {CommandType} parentCommand 父命令
 * @return {*}
 */
const getCommand = (text: string, parentCommand?: CommandType): CommandType => {
  text = text.trim(); //取出命令前面的空格
  let func = text.split(" ")[0];
  const command = commandMap[func];
  return command;
};

/**
 * @description: 命令解析
 * @return {*}
 */
const doParse = (
  text: string,
  commandOptions: CommandOptionType[]
): getopts.ParsedOptions => {
  // 过滤关键词
  const args: string[] = text.split(" ").slice(1);
  const options: getopts.Options = {
    alias: {},
    default: {},
    string: [],
    boolean: [],
  };
  commandOptions.forEach((commandOption) => {
    const { alias, key, type, defaultValue } = commandOption;
    if (alias && options.alias) {
      options.alias[key] = alias;
    }
    options[type]?.push(key);
    if (defaultValue && options.default) {
      options.default[key] = defaultValue;
    }
  });
  const parsedOptions = getopts(args, options);
  return parsedOptions;
};

/**
 * @description: 调用command的action方法，执行命令
 * @param {CommandType} command
 * @param {TerminalType} terminal
 * @return {*}
 */
const doAction = async (
  command: CommandType,
  terminal: TerminalType,
  options: ParsedOptions
) => {
  await command.action(null, terminal);
};
