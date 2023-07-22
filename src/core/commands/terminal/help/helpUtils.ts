import CommandType = Command.CommandType;
import CommandOptionType = Command.CommandOptionType;

/**
 * @description: 获取对应命令的提示，比如命令的用途，对应的参数
 * @param {CommandType} command 对应的命令
 * @param {CommandType} parentCommand 父命令
 * @return {*} str 整理好的提示字符串
 */
export const getUsageStr = (
  command: CommandType,
  parentCommand?: CommandType
) => {
  if (!command) return "";
  let str = "";
  if (parentCommand) {
    str = parentCommand.func + " ";
  }
  str += command.func;
  if (command.params && command.params.length > 0) {
    const paramsStrList: string[] = command.params.map((param) => {
      // 如果option有desc，就将word赋值为desc，否则就是key
      let word = param.key;
      if (param.desc) {
        word = param.desc;
      }
      // 根据命令的param参数required是否为必须来决定命令的展示为<>还是[]
      if (param.required) {
        return `<${word}>`;
      } else {
        return `[${word}]`;
      }
    });
    str += " " + paramsStrList.join(" ");
  }

  if (command.options && command.options.length > 0) {
    const optionsStrList: string[] = command.options.map((option) => {
      // 如果option有desc，就将word赋值为desc，否则就是key
      let optionKey = getOptionKey(option);
      // 根据命令的option参数required是否为必须来决定命令的展示为<>还是[]
      if (option.type === "boolean") {
        let word = optionKey;
        if (option.desc) {
          word += ` ${option.desc}`;
        }
        if (option.required) {
          return `<${word}>`;
        } else {
          return `[${word}]`;
        }
      } else {
        let word = optionKey;
        if (option.desc) {
          word = option.desc;
        }
        if (option.required) {
          return `<${optionKey} ${word}>`;
        } else {
          return `[${optionKey} ${word}] `;
        }
      }
    });
    str += " " + optionsStrList;
  }

  if (
    command.params &&
    command.params.length === 0 &&
    command.options &&
    command.options.length === 0 &&
    command.desc
  ) {
    str += " " + command.desc;
  }
  return str;
};

/**
 * 获取选项关键词
 * @param option
 */
export const getOptionKey = (option: CommandOptionType) => {
  // 优先用简写
  if (option.alias && option.alias.length > 0) {
    return "-" + option.alias[0];
  }
  return "--" + option.key;
};

/**
 * 获取选项关键词列表
 * @param option
 */
export const getOptionKeyList = (option: CommandOptionType) => {
  const list = [];
  // 优先用简写
  if (option.alias && option.alias.length > 0) {
    list.push("-" + option.alias[0]);
  }
  list.push("--" + option.key);
  return list;
};
