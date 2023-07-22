import CommandType = Command.CommandType;

const githubCommand: CommandType = {
  func: "github",
  name: "github搜索",
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
      desc: "是否在当前页打开",
      alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
  ],

  action(options, terminal) {
    const { _, self } = options;
    const word = _.length > 0 ? _[0] : "";
    const targetLink = `https://github.com/search?q=${word}`;
    if (self) {
      window.location.href = targetLink;
    } else {
      window.open(targetLink);
    }
  },
};

export default githubCommand;
