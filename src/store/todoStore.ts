import { defineStore } from "pinia";
import TaskType = Todo.TaskType;
export const useTodoStore = defineStore("todoStore", {
  state: () => {
    return {
      // 任务列表
      taskList: [
        {
          name: "写下你想做的事",
          isFinished: false,
          createTime: new Date(),
        },
        {
          name: "已完成的事项",
          isFinished: true,
          createTime: new Date(),
        },
      ] as TaskType[],
    };
  },
  getters: {},
  persist: {
    key: "todoStore",
    storage: window.localStorage,
  },
  actions: {
    /**
     * 创建任务
     * @param task
     */
    addTask(task: TaskType) {
      if (!task || !task.name) {
        return false;
      }
      task.isFinished = false;
      task.createTime = new Date();
      this.taskList.push(task);
      return true;
    },
    /**
     * 删除任务
     * @param index
     */
    deleteTask(index: number) {
      if (index < 0 || index >= this.taskList.length) {
        return false;
      }
      this.taskList.splice(index, 1);
      return true;
    },
    /**
     * 更新任务
     * @param index
     * @param newTask
     */
    updateTask(index: number, newTask: TaskType) {
      if (index < 0 || index >= this.taskList.length) {
        return false;
      }
      this.taskList[index] = { ...this.taskList[index], ...newTask };
    },
  },
});
