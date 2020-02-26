<template>
  <div class="a-file">
    <time
      class="a-file__time a-file__time--receiver"
      v-if="!isSender"
    >
      {{ formattedTime }}
    </time>
    <div class="a-file__cnt">
      <div
        v-if="isSender"
        class="a-file__thumb"
        :style="`background-image: url(${avatarUrl});`"
      />
      <div class="a-file__wrap">
        <a
          :href="`${fileUrl}`"
          target="_blank"
          class="a-file__anchor"
        >
          <span class="a-file__anchorTag">添付ファイル</span>
          <div class="a-file__anchorCnt">
            <i class="a-file__anchorIcon fas fa-file-alt" />
            <p class="a-file__anchorTxt">
              {{ fileTitle }}
            </p>
          </div>
          <div class="a-file__hover">
            <i class="a-file__hoverIcon fas fa-cloud-download-alt" />
            <p class="a-file__hoverTxt">
              ダウンロード
            </p>
          </div>
        </a>
      </div>
    </div>
    <time
      class="a-file__time a-file__time--sender"
      v-if="isSender"
    >
      {{ formattedTime }}
    </time>
  </div>
</template>

<script>
import formatDformatUnixTimeToJPtime from '~/utils/chat/format_time';

export default {
  props: {
    type: {
      type: String,
      default: '',
    },
    timestamp: {
      type: Number,
      default: 0,
    },
    fileUrl: {
      type: String,
      default: '',
    },
    fileTitle: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
  },
  computed: {
    formattedTime() {
      return formatDformatUnixTimeToJPtime(this.timestamp);
    },
    isSender() {
      return this.type === 'sender';
    },
  },
};
</script>

<style scoped lang="scss">
.a-file {
  @include a-file;
}
</style>
