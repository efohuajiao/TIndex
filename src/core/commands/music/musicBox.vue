<template>
  <div>
    <iframe
      v-if="musicPath"
      frameborder="no"
      marginwidth="0"
      marginheight="0"
      width="330"
      height="86"
      :src="musicPath"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
interface musicType {
  data: {
    id: string;
  };
}
interface MusicBoxProps {
  name: musicType;
}
const props = withDefaults(defineProps<MusicBoxProps>(), {});
// eslint-disable-next-line vue/no-setup-props-destructure
const { name } = props;
const musicPath = ref();
onMounted(() => {
  console.log(name);

  musicPath.value = `//music.163.com/outchain/player?type=2&id=${name.data.id}&auto=1&height=66`;
});
</script>

<style lang=""></style>
