<template>
  <div class="a-comment">
    <time
      class="a-comment__time a-comment__time--receiver"
      v-if="this.type==='receiver'"
    >
      {{ formattedTime }}
    </time>
    <div class="a-comment__cnt">
      <div
        v-if="this.type==='sender'"
        class="a-comment__thumb"
        :style="`background-image: url(${avatarUrl});`"
      />
      <div
        class="a-comment__txt"
        :class="type === 'receiver' ? 'a-comment__txt--receiver' : ''"
      >
        <p
          class="a-comment__txtCnt"
          v-for="(sentence, index) in formattedContent.normalContent.split(/\r?\n/g)"
          :key="index"
        >
          {{ sentence }}
        </p>
        <a
          v-if="formattedContent.quotation"
          class="a-comment__quote"
          @click="quotationButton"
        >
          <i class="fas fa-ellipsis-h" />
        </a>
        <p
          v-if="formattedContent.quotation && showQuotation"
          class="a-comment__email"
        >
          {{ formattedContent.quotation }}
        </p>
      </div>
    </div>
    <time
      class="a-comment__time a-comment__time--sender"
      v-if="this.type==='sender'"
    >
      {{ formattedTime }}
    </time>
  </div>
</template>

<script>
import formatDformatUnixTimeToJPtime from '~/utils/chat/format_time';
import formatContent from '~/utils/chat/format_content';

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
    avatarUrl: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    showQuotation: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    quotationButton() {
      this.showQuotation = !this.showQuotation;
    },
  },
  computed: {
    formattedTime() {
      return formatDformatUnixTimeToJPtime(this.timestamp);
    },
    formattedContent() {
      const { content } = this;
      return formatContent(content);
    },
  },
};
</script>

<style scoped lang="scss">
.a-comment {
  @include a-comment;
}
</style>
