<template>
  <div class="a-articleContent">
    <div class="a-articleContent__info">
      <div class="a-articleContent__thumb" />
      <div class="a-articleContent__infoCnt">
        <p class="a-articleContent__infoTtl">
          estieからのお知らせ
        </p>
        <p class="a-articleContent__infoName">
          新しい記事を公開しました
        </p>
        <time class="a-articleContent__infoTime">
          {{ timeAgo }}
        </time>
      </div>
    </div>
    <nuxt-link
      class="a-articleContent__article"
      rel="noopener"
      :to="`/article/page/${data.articleId}`"
      target="_blank"
    >
      <div
        class="a-articleContent__articleThumb"
        :style="backgroundStyle"
      />
      <div class="a-articleContent__articleInfo">
        <h1 class="a-articleContent__articleInfoTtl">
          {{ data.title }}
        </h1>
        <p
          class="a-articleContent__articleInfoSummary"
          v-html="data.summary"
        />
        <time class="a-articleContent__articleInfoTime">
          {{ timeAgo }}
        </time>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    data: {
      type: Object,
      default: () => [],
    },
  },
  computed: {
    timeAgo() {
      return moment(this.data.updatedAt).fromNow();
    },
    backgroundStyle() {
      return {
        'background-image': `url(${this.data.articleImageUrl})`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.a-articleContent {
  @include a-articleContent;
}
</style>
