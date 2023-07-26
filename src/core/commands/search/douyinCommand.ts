import CommandType = Command.CommandType;

const douyinCommand: CommandType = {
  func: "douyin",
  name: "抖音搜索",
  params: [
    {
      key: "word",
      desc: "搜索内容",
      required: true,
    },
  ],
  options: [
    {
      key: "self",
      alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  action(options, terminla) {
    const { _, self } = options;
    const words = _.length > 0 ? _.join(" ") : "";
    const targetLink = `https://www.douyin.com/search/${words}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default douyinCommand;
