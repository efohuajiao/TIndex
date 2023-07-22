import { useTodoStore } from "@/store/todoStore";

import CommandType = Command.CommandType;
import TaskType = Todo.TaskType;

const addCommand: CommandType = {
  func: "add",
  name: "添加待办事项",
  options: [
    {
      key: "name",
      desc: "任务名称",
      alias: ["n"],
      type: "string",
      required: true,
    },
  ],
  action(options, terminal) {
    const { name } = options;
    if (!name) {
      terminal.writeTextErrorResult("请输入任务名称");
      return;
    }
    const { addTask } = useTodoStore();
    const newTask = { name } as TaskType;
    const res = addTask(newTask);
    if (res) {
      terminal.writeTextSuccessResult("添加任务成功");
    } else {
      terminal.writeTextErrorResult("添加任务失败");
    }
  },
};

export default addCommand;
