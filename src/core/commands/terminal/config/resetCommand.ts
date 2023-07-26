import { useTerminalConfigStore } from "@/store/terminalConfigStore";
import CommandType = Command.CommandType;

const resetCommand: CommandType = {
  func: "reset",
  name: "重置终端",
  options: [],
  action(options, terminal) {
    const { reset } = useTerminalConfigStore();
    reset();
    terminal.writeTextSuccessResult("终端重置成功！");
  },
};

export default resetCommand;
