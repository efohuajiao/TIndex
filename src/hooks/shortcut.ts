import TerminalType = Tterminal.TerminalType;

/**
 * @description: 注册快捷键
 * @param {TerminalType} terminal
 * @return {*}
 */
export const shortcutRegister = (terminal: TerminalType) => {
  document.onkeydown = (e: KeyboardEvent) => {
    // console.log(e.key);
    let key = e.key; // 获取快捷键
    if (key >= "a" && key <= "z" && !e.metaKey && !e.shiftKey && !e.ctrlKey) {
      terminal.inputFocus();
      return;
    }
    let code = e.code;
    for (const shortcut of shortcutList) {
      if (
        code === shortcut.code &&
        e.ctrlKey === !!shortcut.ctrlKey &&
        e.shiftKey === !!shortcut.shiftKey &&
        e.metaKey === !!shortcut.metaKey
      ) {
        shortcut.action(e, terminal);
      }
    }
  };

  // 快捷键类型定义
  interface shortcut {
    code: string; // 按下的键对应的code
    desc?: string; // 案件描述
    keyDesc?: string; // 功能描述
    ctrlKey?: boolean; // 是否按下ctrl键
    shiftKey?: boolean; // 是否按下shift键
    metaKey?: boolean; // 是否按下meta键
    action: (e: KeyboardEvent, terminal: TerminalType) => void;
  }

  // 快捷键列表
  const shortcutList: shortcut[] = [
    {
      desc: "清屏",
      code: "KeyL",
      keyDesc: "Ctrl + L",
      ctrlKey: true,
      action(e, terminal) {
        e.preventDefault();
        terminal.clear();
      },
    },
    {
      desc: "查看上一条的命令",
      code: "ArrowUp",
      keyDesc: "↑",
      action(e, terminal) {
        e.preventDefault();
        terminal.showPreCommand();
      },
    },
    {
      desc: "查看下一条的命令",
      code: "ArrowDown",
      keyDesc: "↓",
      action(e, terminal) {
        e.preventDefault();
        terminal.showNextCommand();
      },
    },
    {
      desc: "回车执行命令后聚焦文本框",
      code: "Enter",
      action(e, terminal) {
        e.preventDefault();
        terminal.inputFocus();
      },
    },
    {
      code: "Backspace",
      action(e, terminal) {
        terminal.inputFocus();
      },
    },
  ];
};
