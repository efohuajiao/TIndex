<template>
  <div>
    <div>
      ⭐️ 使用 [help 命令英文名] 可以查询某命令的具体用法，如：help search
    </div>
    <div v-for="(command, index) in commandList" :key="index">
      <a-row :gutter="16">
        <a-col :span="4">{{ command.func }}</a-col>
        <a-col :span="4">{{ command.name }}</a-col>
        <a-col :span="4">{{ command.desc }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { commandList } from "@/core/CommandRegister";
</script>

<style lang=""></style>
