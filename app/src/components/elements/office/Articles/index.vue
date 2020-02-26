<template>
  <div
    class="m-articles"
    :class="{'m-articles--sp': device.isMobile}"
  >
    <header class="m-articles__head">
      <h1 class="m-articles__headTtl">
        コラム
      </h1>
      <n-link
        to="/article"
        class="m-articles__headAnchor"
        target="_blank"
      >
        すべて見る
      </n-link>
    </header>
    <ul class="m-articles__list">
      <li
        class="m-articles__item"
        v-for="(article, index) in articles"
        :key="`article${index}`"
      >
        <ArticleItem :article="article" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ArticleItem from './ArticleItem';

export default {
  components: {
    ArticleItem,
  },
  computed: {
    ...mapState(['device']),
  },
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.m-articles {
  @include m-articles;
}
</style>
