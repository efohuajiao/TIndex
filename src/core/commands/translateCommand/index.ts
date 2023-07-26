import { getTranslateResult } from "@/api";
import CommandType = Command.CommandType;

const translateCommand: CommandType = {
  func: "fanyi",
  name: "翻译",
  desc: "翻译一段话",
  params: [
    {
      key: "word",
      desc: "需要翻译的内容",
      required: true,
    },
  ],
  options: [
    {
      key: "from",
      alias: ["f"],
      desc: "翻译源语言",
      type: "string",
      defaultValue: "auto",
    },
    {
      key: "to",
      alias: ["t"],
      desc: "翻译目标语言",
      type: "string",
      defaultValue: "auto",
    },
  ],
  async action(options, terminal) {
    try {
      let { _, from, to } = options;
      if (_.length < 1) {
        terminal.writeTextErrorResult("请输入需要翻译的内容");
        return;
      }
      if (!from) {
        from = "auto";
      }
      if (!to) {
        to = "auto";
      }
      const keywords = _.join(" ");
      const res: any = await getTranslateResult(keywords, { from, to });
      if (res?.code === 200) {
        const { dst } = res.data.trans_result[0];
        terminal.writeTextOutput(`翻译结果：${dst}`);
      } else {
        terminal.writeTextErrorResult(res?.message ?? "翻译失败");
      }
    } catch (e) {}
  },
};

export default translateCommand;
