declare namespace Tterminal {
  // 输出状态
  type OutputStatusType = "info" | "success" | "warning" | "error" | "system";
  //输出类型
  interface OutputType {
    type: "command" | "text" | "compinent"; //输出类型
    text?: string; //文本
    resultList?: OutputType[];
    component?: any; //组件
    status?: OutputStatusType; //输出状态
    props?: any; //参数
    collapsible?: boolean; //是否可折叠
  }

  //命令输出类型
  interface CommandOutputType extends OutputType {
    type: "command"; //输出类型是命令
    text: string; //文本
    resultList: OutputType[];
  }
  //命令输入类型
  interface CommandInputType {
    text: string;
    placeholder?: string;
  }
}
