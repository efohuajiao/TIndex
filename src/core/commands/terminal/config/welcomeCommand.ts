import CommandType = Command.CommandType;
import { useTerminalConfigStore } from "@/store/terminalConfigStore";

const welcomeCommand: CommandType = {
  func: "welcome",
  name: "自定义终端欢迎语",
  desc: "用于设置终端开头的欢迎语句",
  params: [
    {
      key: "texts",
      desc: "终端提示文本（支持多个值，不填则无欢迎语）",
      required: false,
    },
  ],
  options: [],
  action(option, terminal) {
    const { _ } = option;
    let welcomeText = _;
    const { setWelcomeText } = useTerminalConfigStore();
    setWelcomeText(welcomeText);
    terminal.writeTextSuccessResult("设置成功，刷新页面即可呈现");
  },
};
export default welcomeCommand;
