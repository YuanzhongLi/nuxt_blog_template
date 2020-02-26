<template>
  <div class="m-sendBox m-sendBox--start">
    <div
      @click="startChat"
      class="m-sendBox--startBtn"
    >
      チャットを開始する
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startChat: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.m-sendBox {
  @include m-sendBox;
}
</style>
