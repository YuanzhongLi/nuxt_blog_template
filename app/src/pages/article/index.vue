<template>
  <div
    class="p-articleList"
    :class="{'p-articleList--sp': device.isMobile}"
  >
    <ul class="p-articleList__cnt">
      <li
        class="p-articleList__cntItem"
        v-for="(article, index) in articles"
        :key="`article${index}`"
      >
        <n-link
          class="p-articleList__cntAnchor"
          :to="`/article/page/${article.articleId}`"
        >
          <div
            class="p-articleList__cntThumb"
            :style="`background-image: url(${article.articleImageUrl});`"
          />
          <div class="p-articleList__cntInfo">
            <h1 class="p-articleList__cntTtl">
              {{ article.title }}
            </h1>
            <div
              class="p-articleList__cntTxt"
              v-html="article.summary"
            />
            <time class="p-articleList__cntTime">
              <i class="p-articleList__cntTimeIcon far fa-clock" />
              {{ article.createdAt | moment('LTS') }}
            </time>
          </div>
        </n-link>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  head() {
    return {
      title: 'オフィス移転お役立ちコラム｜estie（エスティ）',
    };
  },
  layout: ctx => (ctx.isMobile ? 'cms_sp' : 'cms_pc'),
  filters: {
    moment(date) {
      return moment(date).format('YYYY/MM/DD');
    },
  },
  middleware: 'injectDevice',
  computed: {
    ...mapState(['device']),
  },
  async asyncData({ app }) {
    const articles = await app.$axios
      .$get('/contentful/article/all_article_header')
      .then(response => response.sort((a, b) => (a.articleId > b.articleId ? -1 : 1)));
    return {
      articles,
    };
  },
};
</script>

<style lang="scss" scoped>
.p-articleList {
  @include p-articleList;
}
</style>
