import { getBackground } from "@/api";
import { useTerminalConfigStore } from "@/store/terminalConfigStore";
import CommandType = Command.CommandType;

const backgroundCommand: CommandType = {
  func: "background",
  name: "切换终端背景",
  alias: ["bg"],
  options: [],
  params: [
    {
      key: "url",
      desc: "图片地址（不填则随机）",
      required: false,
    },
  ],
  async action(options, terminal) {
    try {
      const terminalConfig = useTerminalConfigStore();
      const { setBackground } = terminalConfig;
      let res = await getBackground();
      setBackground(res.imgurl);
    } catch (e) {
      const text: string = e as string;
      terminal.writeTextResult(text);
    }
  },
};
export default backgroundCommand;
