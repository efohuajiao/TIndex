import axios from "axios";
import { useTerminalConfigStore } from "@/store/terminalConfigStore";
import CommandType = Command.CommandType;

export const backgroundCommand: CommandType = {
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
  action(options, terminal) {
    const terminalConfig = useTerminalConfigStore();
    const { setBackground } = terminalConfig;
    axios
      .get("https://api.btstu.cn/sjbz/api.php?lx=dongman&format=json")
      .then((res) => {
        setBackground(res.data.imgurl);
      });
  },
};
