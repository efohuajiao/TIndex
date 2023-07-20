declare namespace Tterminal {
  // 输出状态
  type OutputStatusType = "info" | "success" | "warning" | "error" | "system";

  //输出类型
  interface OutputType {
    type: "command" | "text" | "component"; //输出类型
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

  //文本输出类型
  interface TextOutputType extends OutputType {
    type: "text"; //类型为文本
    text: string; //具体的text
  }

  // 输出组件
  interface ComponentOutputType extends OutputType {
    type: "component";
    component: any; // 组件
    props?: any;
  }
  //声明terminal中命令的类型,用来操作终端
  interface TerminalType {
    //清屏
    clear: () => void;

    //聚焦文本框
    inputFocus: () => void;

    // 文本框是否聚焦
    isInputFocus: () => boolean;
    //提交命令
    doSubmitCommand: () => void;

    //立即输出文本
    writeTextOutput: (text: string, status?: OutputStatusType) => void;

    //写入文本错误状态结果
    writeTextErrorResult: (text: string) => void;

    //写入文本成功状态结果
    writeTextSuccessResult: (text: string) => void;

    //写入文本结果
    writeTextResult: (text: string, status?: OutputStatusType) => void;

    //写入结果
    writeResult: (output: OutputType) => void;

    // 获取前一条历史记录
    showPreCommand: () => void;

    // 获取下一条历史记录
    showNextCommand: () => void;

    // 命令列表
    listCommandHistory: () => CommandOutputType[];

    // 快捷键补齐
    setTabPatching: () => void;
  }
}
