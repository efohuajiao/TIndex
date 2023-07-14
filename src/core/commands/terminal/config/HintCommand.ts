import { useTerminalConfigStore } from "@/store/terminalConfigStore";
import CommandType = Command.CommandType;

/**
 * @description: 提示
 * @return {*}
 */
const hintCommnad: CommandType = {
  func: "hint",
  name: "提示",
  options: [],
  params: [
    {
      key: "switch",
      desc: "开关：on 开启，off 关闭",
      defaultValue: "on",
    },
  ],
  action(options, terminal) {
    const { setToggleHint } = useTerminalConfigStore();
    const { _ } = options; // hint后面跟的子命令
    let newHint;
    if (["on", "off"].includes(_[0])) {
      newHint = _[0];
    }
    const res = setToggleHint(newHint);
    terminal.writeTextSuccessResult(
      `输入提示已${res ? "开启" : "关闭"}，刷新页面后生效`
    );
  },
};
export default hintCommnad;
