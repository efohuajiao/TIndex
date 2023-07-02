<template>
  <!-- 最外层包裹 -->
  <div class="Tterminal-wrapper" @click="handleClickWrapper">
    <div class="Tterminal" :style="mainStyle">
      <!-- 已输出命令 -->
      <a-collapse
        v-model:activeKey="activeKey"
        :bordered="false"
        expand-icon-position="right"
      >
        <template v-for="(output, index) in outputList" :key="index">
          <a-collapse-panel class="terminal-row">
            <template #header>
              <span style="user-select: none; margin-right: 10px"
                >[local]$</span
              >
              <span>
                {{ output.text }}
              </span>
            </template>
          </a-collapse-panel>
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
            <span class="command-input-prompt">[local]$</span>
          </template>
        </a-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, StyleValue } from "vue";
//引入终端类型声明
import CommandInputType = Tterminal.CommandInputType;
import OutputType = Tterminal.OutputType;
import CommandOutputType = Tterminal.CommandOutputType;
//定义Props类型
interface TnTerminalProps {
  height?: string | number; //高度
  fullScreen?: boolean; //是否全屏
  // eslint-disable-next-line vue/require-default-prop
  onSubmitCommand?: (inputText: string) => void; //提交命令
}

const activeKey = ref(["1"]);
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

const isRunning = ref(false); // 命令是否运行
const commandInputRef = ref(); //绑定输入框
const props = withDefaults(defineProps<TnTerminalProps>(), {
  height: "400px",
  fullScreen: false,
});

//提交命令
const doSubmitCommand = async () => {
  isRunning.value = true;
  let inputText = InputCommand.value.text;
  //定义命令数组
  const newCommand: CommandOutputType = {
    type: "command",
    text: inputText,
    resultList: [],
  };
  await props.onSubmitCommand?.(inputText); //?.是可选操作符，如果onSubmitCommand存在则运行，不存在返回undefined不会报错
  outputList.value.push(newCommand);

  InputCommand.value = { ...initCommand };
  isRunning.value = false;
};
//输入框聚焦
const inputFocus = () => {
  commandInputRef.value.focus();
};
//终端主样式
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

// 点击空白聚焦输入框
const handleClickWrapper = (event: Event): void => {
  //@ts-ignore
  if (event.target.className == "Tterminal") {
    inputFocus();
  }
};
</script>

<style lang="less" scoped>
.Tterminal-wrapper {
  background-color: black;
}
.Tterminal {
  background: rgba(0, 0, 0);
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
