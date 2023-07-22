<template>
  <!-- 最外层包裹 -->
  <div
    class="Tterminal-wrapper"
    :style="wrapperStyle"
    @click="handleClickWrapper"
  >
    <div ref="terminalRef" class="Tterminal" :style="mainStyle">
      <!-- 已输出命令 -->
      <a-collapse
        v-model:activeKey="activeKeys"
        :bordered="false"
        expand-icon-position="right"
      >
        <template v-for="(output, index) in outputList" :key="index">
          <!-- 可折叠的命令 -->
          <a-collapse-panel
            v-if="output.collapsible"
            :key="index"
            class="terminal-row"
          >
            <template #header>
              <span style="user-select: none; margin-right: 10px">{{
                prompt
              }}</span>
              <span>
                {{ output.text }}
              </span>
            </template>
            <div
              v-for="(result, idx) in output.resultList"
              :key="idx"
              class="terminal-row"
            >
              <content-output :output="result" />
            </div>
          </a-collapse-panel>
          <!-- 不可折叠的命令 -->
          <template v-else>
            <!-- 是命令的话需要保留输入的命令 -->
            <template v-if="output.type === 'command'">
              <div class="terminal-row">
                <span style="user-select: none; margin-right: 10px">{{
                  prompt
                }}</span>
                <span>{{ output.text }}</span>
              </div>
              <div
                v-for="(result, idx) in output.resultList"
                :key="idx"
                class="terminal-row"
              >
                <contentOutput :output="result" />
              </div>
            </template>
            <!-- 不是命令直接输出文本 -->
            <template v-else>
              <div class="terminal-row">
                <content-output :output="output" />
              </div>
            </template>
          </template>
        </template>
      </a-collapse>
      <!-- 输入框 -->
      <div class="terminal-row">
        <a-input
          ref="commandInputRef"
          v-model:value="InputCommand.text"
          :placeholder="InputCommand.placeholder"
          :disabled="isRunning"
          autofocus
          :bordered="false"
          class="command-input"
          @press-enter="doSubmitCommand"
        >
          <template #addonBefore>
            <span class="command-input-prompt">{{ prompt }}</span>
          </template>
        </a-input>
      </div>
      <!-- 输入提示-->
      <div v-if="hint && !isRunning" class="terminal-row" style="color: #bbb">
        hint：{{ hint }}
      </div>
      <div style="margin-bottom: 16px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, StyleValue, toRefs, onMounted, watchEffect } from "vue";
import ContentOutput from "./ContentOutput.vue";

//引入默认用户
import { LOCAL_USER } from "@/core/commands/user/userDefault";
import { UserType } from "@/core/commands/user/type"; // 引用用户类型声明

//引入store
import { useTerminalConfigStore } from "@/store/terminalConfigStore";

// 引入提示hook
import useHint from "@/hooks/hint";
// 引入快捷键hook
import { shortcutRegister } from "@/hooks/shortcut";
// 引入历史记录hook
import useHistory from "@/hooks/history";
//引入终端类型声明
import CommandInputType = Tterminal.CommandInputType;
import OutputType = Tterminal.OutputType;
import CommandOutputType = Tterminal.CommandOutputType;
import OutputStatusType = Tterminal.OutputStatusType;
import TextOutputType = Tterminal.TextOutputType;
import TerminalType = Tterminal.TerminalType;
//定义Props类型
interface TnTerminalProps {
  height?: string | number; //高度
  fullScreen?: boolean; //是否全屏
  user?: UserType;
  // eslint-disable-next-line vue/require-default-prop
  onSubmitCommand?: (inputText: string) => void; //提交命令
}

const activeKeys = ref<number[]>([]); //折叠框是否折叠

// terminalRef
const terminalRef = ref();

//初始化命令
const initCommand: CommandInputType = {
  text: "",
  placeholder: "",
};

const InputCommand = ref<CommandInputType>({
  //输入命令
  ...initCommand,
});

const outputList = ref<OutputType[]>([]); //已输出命令集，用于在上面展示
let currentNewCommand: CommandOutputType; //记录当前执行的命令

const commandList = ref<CommandOutputType[]>([]); // 命令列表
const commandInputRef = ref(); //绑定输入框

const isRunning = ref(false); // 命令是否运行

// 给props设置默认值
const props = withDefaults(defineProps<TnTerminalProps>(), {
  height: "400px",
  fullScreen: false,
  user: LOCAL_USER as any,
});
const { user } = toRefs(props); // toRefs能将所给对象的第一层的节点设置为响应式，而toRef是将所给对象的所有节点设置为响应式
// 用户名
const prompt = computed(() => {
  return `[${user.value?.username}]$`;
});

// 获取提示
const { hint, setHint, deBounceSetHint } = useHint();
watchEffect(() => {
  deBounceSetHint(InputCommand.value.text);
});

const {
  commandHistoryPos,
  showNextCommand,
  showPreCommand,
  listCommandHistory,
} = useHistory(commandList.value, InputCommand);
// 使用pinia
const configStore = useTerminalConfigStore();

//提交命令
const doSubmitCommand = async () => {
  isRunning.value = true;
  setHint("");
  let inputText = InputCommand.value.text;
  //定义命令数组
  const newCommand: CommandOutputType = {
    type: "command",
    text: inputText,
    resultList: [],
  };
  currentNewCommand = newCommand; //将新命令赋值给当前命令
  await props.onSubmitCommand?.(inputText); //?.是可选操作符，如果onSubmitCommand存在则运行，不存在返回undefined不会报错

  // 添加输出，换行也输出
  outputList.value.push(newCommand);
  // 不为空的命令才算有效命令
  if (inputText) {
    commandList.value.push(newCommand);
    commandHistoryPos.value = commandList.value.length;
  }
  InputCommand.value = { ...initCommand };
  activeKeys.value.push(outputList.value.length - 1);
  // 自动滚到底部
  setTimeout(() => {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
  }, 50);
  isRunning.value = false;
};

//输入框聚焦
const inputFocus = () => {
  commandInputRef.value.focus();
};

// 输入框是否聚焦
const isInputFocus = () => {
  return (
    (commandInputRef.value.input as HTMLInputElement) === document.activeElement
  );
};

/**
 * 设置命令是否可折叠
 * @param collapsible
 */
const setCommandCollapsible = (collapsible: boolean) => {
  currentNewCommand.collapsible = collapsible;
};

//清屏
const clear = () => {
  outputList.value = [];
};

// 快捷键补齐
const setTabPatching = () => {
  if (hint.value) {
    InputCommand.value.text = `${hint.value.split(" ")[0]}${
      hint.value.split(" ").length > 1 ? " " : ""
    }`;
  }
};

/*
  输出文本
  params
    text:文本
    status:状态
*/
const writeTextOutput = (text: string, status?: OutputStatusType) => {
  const newOutput: TextOutputType = {
    text,
    type: "text",
    status,
  };
  outputList.value.push(newOutput);
};

/**
 * @description: 写入文本错误状态结果
 * @param {*} text 文本
 * @return {*}
 */
const writeTextErrorResult = (text: string) => {
  writeTextResult(text, "error");
};

/**
 * @description: 写入文本成功状态结果
 * @param {*} text
 * @return {*}
 */
const writeTextSuccessResult = (text: string) => {
  writeTextResult(text, "success");
};

/**
 * @description: 输出文本
 * @param {*} text
 * @param {*} status
 * @return {*}
 */
const writeTextResult = (text: string, status?: OutputStatusType) => {
  const newOutput: TextOutputType = {
    text,
    status,
    type: "text",
  };
  currentNewCommand.resultList.push(newOutput);
};

/**
 * @description: 将命令执行的结果写入当前命令的resultList中
 * @param {*} output 输出结果
 * @return {*}
 */
const writeResult = (output: OutputType) => {
  currentNewCommand.resultList.push(output);
};

// 点击空白聚焦输入框
const handleClickWrapper = (event: Event): void => {
  //@ts-ignore
  if (event.target.className == "Tterminal") {
    inputFocus();
  }
};

// 终端主样式
const mainStyle = computed(() => {
  let fullScreenStyle: StyleValue = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  return props.fullScreen
    ? fullScreenStyle
    : {
        height: props.height,
      };
});
// 终端包装类样式
const wrapperStyle = computed(() => {
  const { background } = configStore;
  const style = { ...mainStyle.value };
  // console.log(background);

  if (background.startsWith("http")) {
    style.background = `url(${background})`;
  } else {
    style.background = background;
  }
  return style;
});

onMounted(() => {
  shortcutRegister(terminal);
  const { welcomeText } = configStore;
  if (welcomeText?.length > 0) {
    welcomeText.forEach((text) => {
      terminal.writeTextOutput(text);
    });
  } else {
    terminal.writeTextOutput(
      `Welcome to TIndex, coolest browser index for geeks!` +
        `<a href="https://github.com/efohuajiao/TIndex" target='_blank'> GitHub Open Source</a>`
    );
    terminal.writeTextOutput(
      `Author <a href="//docs.qq.com/doc/DUFFRVWladXVjeUxW" target="_blank">coder_truett</a>` +
        `: please input 'help' to enjoy`
    );
    terminal.writeTextOutput("<br/>");
  }
});

//操作终端的方法
const terminal: TerminalType = {
  inputFocus,
  isInputFocus,
  doSubmitCommand,
  clear,
  writeTextOutput,
  writeTextErrorResult,
  writeTextSuccessResult,
  writeResult,
  writeTextResult,
  showNextCommand,
  showPreCommand,
  listCommandHistory,
  setTabPatching,
  setCommandCollapsible,
};
defineExpose({
  //使用setup，父组件无法通过ref获取子组件的属性，需要通过defineEpose自行暴露
  terminal,
});
</script>

<style lang="less" scoped>
.Tterminal-wrapper {
  background-color: black;
}

.Tterminal {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  overflow: scroll;
}

// 清除滚动条
.Tterminal::-webkit-scrollbar {
  display: none;
}

.Tterminal
  :deep(
    .ant-collapse-icon-position-right
      > .ant-collapse-item
      > .ant-collapse-header
  ) {
  color: white;
  padding: 0;
}

.Tterminal :deep(.ant-collapse) {
  background: none;
}

.Tterminal :deep(.ant-collapse-borderless > .ant-collapse-item) {
  border: none;
}

.Tterminal :deep(.ant-collapse-content > .ant-collapse-content-box) {
  padding: 0;
}

// 输入框样式
.command-input {
  border: none;
  caret-color: white;
}

.command-input :deep(input) {
  color: white !important;
  font-size: 17px;
  padding: 0 10px;
}

.command-input :deep(.ant-input-group-addon) {
  background: none;
  border: none;
  padding: 0;
  font-size: 17px;
}

// 输入框前缀样式
.command-input-prompt {
  color: white;
}

// 命令行样式
.terminal-row {
  color: white;
  font-size: 17px;
  font-family: courier-new, courier, monospace;
}
</style>
