<template>
  <a
    class="a-fileCell"
    :href="fileData.fileUrl"
    target="_blank"
  >
    <div class="a-fileCell__thumb">
      <span>
        <i class="a-fileCell__thumbIcon far fa-file-pdf" />
        <p>Attached<br>File</p>
      </span>
    </div>
    <div class="a-fileCell__info">
      <p
        v-if="fileData.fileTitle"
        class="a-fileCell__infoTtl"
      >
        {{ fileData.fileTitle }}
      </p>
      <time class="a-fileCell__infoTime">
        {{ updatedAtDate }}
      </time>
    </div>
  </a>
</template>

<script>
import formatUnixTimeToJPtime from '~/utils/chat/format_time';

export default {
  props: {
    fileData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    updatedAtDate() {
      const { updatedAt } = this.fileData;
      return formatUnixTimeToJPtime(updatedAt);
    },
  },
};
</script>

<style scoped lang="scss">
.a-fileCell {
  @include a-fileCell;
}
</style>
