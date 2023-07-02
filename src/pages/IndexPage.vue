<template>
  <TnTerminal full-screen :on-submit-command="onSubmitCommand" />
</template>

<script setup lang="ts">
import { doCommandParsing } from "../core/CommadnParsing";
const onSubmitCommand = (inputText: string) => {
  doCommandParsing(inputText);
};
</script>

<style lang=""></style>
