import CommandType = Command.CommandType;
import myDayjs from "@/plugins/myDayjs";

/**
 * @description: 日期命令
 * @return {*}
 */
const dateCommand: CommandType = {
  func: "date",
  name: "日期",
  desc: "获取当前日期",
  params: [],
  options: [],
  action(options, terminal): void {
    const dateStr = myDayjs().format("YYYY-MM-DD HH:mm:ss"); //获取当前时间
    const output = `当前时间:${dateStr}`; //拼接成需要输出的字符串
    terminal.writeTextResult(output); //通过terminal调用writeTextResult
  },
};
export default dateCommand;
