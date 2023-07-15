import { Ref, ref } from "vue";
import CommandOutputType = Tterminal.CommandOutputType;
import CommandInputType = Tterminal.CommandInputType;

const useHistory = (
  commandList: CommandOutputType[],
  inputCommand: Ref<CommandInputType>
) => {
  // 定义当前查看命令的位置，等于命令列表的长度，此时指针指向待输入行
  const commandHistoryPos = ref(commandList.length);

  /**
   * @description: 获取命令列表
   * @return {*} commandList
   */
  const listCommandHistory = () => {
    return commandList;
  };

  /**
   * @description: 查看前一条历史命令
   * @return {*}
   */
  const showPreCommand = () => {
    // 如果当前查看命令的值大于等于1，说明指针仍处于命令列表中，则将其减1
    if (commandHistoryPos.value >= 1) {
      commandHistoryPos.value--;
      inputCommand.value.text = commandList[commandHistoryPos.value].text;
    }
  };

  /**
   * @description: 查看下一条历史命令
   * @return {*}
   */
  const showNextCommand = () => {
    if (commandHistoryPos.value < commandList.length - 1) {
      /* 触发条件：指针指向命令列表最后一项之前的项时，此时指针长度小于命令列表长度，将其加1
         最后一次触发时：指针指向命令列表最后一项，此时指针长度等于命令列表长度减1
         因为指针先加1，再获取命令列表对应的值的
      */
      commandHistoryPos.value++;
      inputCommand.value.text = commandList[commandHistoryPos.value].text;
    } else if (commandHistoryPos.value === commandList.length - 1) {
      // 触发条件：指针指向命令列表最后一项时再点一次↓箭头，此时指针长度超过命令列表长度，输入命令文本置为空
      commandHistoryPos.value++;
      inputCommand.value.text = "";
    }
  };

  return {
    commandHistoryPos,
    listCommandHistory,
    showNextCommand,
    showPreCommand,
  };
};
export default useHistory;
