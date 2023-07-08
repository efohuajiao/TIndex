<template>
  <TnTerminal
    ref="terminalRef"
    full-screen
    :on-submit-command="onSubmitCommand"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { doCommandExecute } from "../core/CommadnParsing";
const terminalRef = ref();
const onSubmitCommand = (inputText: string) => {
  const terminal: Tterminal.TerminalType = terminalRef.value.terminal;
  doCommandExecute(inputText, terminal);
};
</script>

<style lang=""></style>
