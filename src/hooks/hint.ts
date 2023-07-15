import { ref } from "vue";
import { commandMap } from "@/core/CommandRegister";
import { useTerminalConfigStore } from "@/store/terminalConfigStore";
import _, { trim } from "lodash";
import { getUsageStr } from "@/core/commands/terminal/help/helpUtils";

const useHint = () => {
  let hint = ref("");
  let { isShowHint } = useTerminalConfigStore();

  const setHint = (inputText: string) => {
    // 如果没有开启提示，则返回
    if (!isShowHint) return;
    if (!inputText) {
      // 如果用户没有输入,则将提示值置为空字符串
      hint.value = "";
      return;
    }
    // 将用户输入的文本根据空格转换为数组
    const args = trim(inputText).split(" ");
    // 获取用户输入的命令,并将其改为小写，这样就可以实现无视大小写
    const func = args[0].toLocaleLowerCase();
    // 在命令map中搜索对应的第一条命令
    const likeKey = Object.keys(commandMap).filter((key) =>
      // 在命令字典中获取以func开头的命令关键字
      key.startsWith(func)
    )[0];
    // 获取对应的命令
    let command = commandMap[likeKey];
    if (!command) {
      hint.value = "";
      return;
    }
    // 将命令传入getUsageStr
    hint.value = getUsageStr(command);
  };

  // 防抖处理
  const deBounceSetHint = _.debounce(function (inputText: string) {
    setHint(inputText);
  }, 500);

  return {
    hint,
    setHint,
    deBounceSetHint,
  };
};
export default useHint;
