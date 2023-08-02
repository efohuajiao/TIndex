import { getMusicApi } from "@/api";
import { markRaw, defineAsyncComponent } from "vue";
import CommandType = Command.CommandType;
import ComponentOutputType = Tterminal.ComponentOutputType;
const musicCommand: CommandType = {
  func: "music",
  name: "获取音乐",
  options: [],
  params: [
    {
      key: "keywords",
      desc: "音乐名",
      required: true,
    },
  ],
  async action(options, terminal) {
    const { _ } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("请输入想要搜索的音乐名!");
      return;
    }
    const musicName = _[0];

    try {
      const music = await getMusicApi(musicName);
      const output: ComponentOutputType = {
        type: "component",
        component: markRaw(
          defineAsyncComponent(() => import("./musicBox.vue"))
        ),
        props: {
          name: music,
        },
      };
      terminal.writeResult(output);
    } catch (e: any) {
      terminal.writeTextErrorResult(e);
    }
  },
};
export default musicCommand;
