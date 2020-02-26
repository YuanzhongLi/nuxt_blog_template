<template>
  <div class="m-fileList">
    <header class="m-fileList__head">
      <h1 class="m-fileList__headTtl">
        資料一覧
      </h1>
    </header>
    <ul class="m-fileList__body">
      <li
        class="m-fileList__bodyItem"
        v-for="(offer, index) in currentTalkRoomOffers"
        :key="`offer${index}`"
      >
        <FileCell
          :file-data="offer"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import FileCell from './FileCell';

export default {
  components: {
    FileCell,
  },
  props: {
    currentTalkRoomOffers: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.m-fileList {
  @include m-fileList;
}
</style>
