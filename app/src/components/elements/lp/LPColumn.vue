<template>
  <div class="column">
    <div class="column__cnt">
      <div class="column__head">
        <h1 class="column__headTtl">
          <p>オフィス移転お役立ちコラム</p>
        </h1>
        <n-link
          to="/article"
          target="_blank"
          class="column__headAnchor"
        >
          すべて見る
        </n-link>
      </div>
      <ul class="column__list">
        <li
          class="column__item"
          v-for="(article, index) in articles"
          :key="`article${index}`"
        >
          <n-link
            class="column__itemAnchor"
            :to="`/article/page/${article.articleId}`"
            target="_blank"
          >
            <div class="column__thumb">
              <div
                class="column__thumbImg"
                :style="`background-image: url(${ article.articleImageUrl });`"
              />
            </div>
            <div class="column__info">
              <div class="column__infoTtl">
                {{ article.title }}
              </div>
              <time class="column__infoTime">
                <span class="column__infoTimeTxt">{{ article.createdAt | moment('LTS') }}</span>
              </time>
            </div>
          </n-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  filters: {
    moment(date) {
      return moment(date).format('YYYY/MM/DD');
    },
  },
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  @include column;
}
</style>
