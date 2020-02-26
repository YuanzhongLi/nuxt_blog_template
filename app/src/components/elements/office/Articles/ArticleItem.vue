<template>
  <n-link
    class="a-articleItem"
    :class="{'a-articleItem--sp': device.isMobile}"
    :to="`/article/page/${article.articleId}`"
    target="_blank"
  >
    <div class="a-articleItem__thumb">
      <div
        class="a-articleItem__thumbImg"
        :style="`background-image: url(${ article.articleImageUrl });`"
      />
    </div>
    <div class="a-articleItem__info">
      <h1 class="a-articleItem__infoTtl">
        {{ article.title }}
      </h1>
      <div
        class="a-articleItem__infoTxt"
        v-html="article.summary"
      />
      <time class="a-articleItem__infoTime">
        {{ article.createdAt | moment('LTS') }}
      </time>
    </div>
  </n-link>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(['device']),
  },
  filters: {
    moment(date) {
      return moment(date).format('YYYY/MM/DD');
    },
  },
};
</script>

<style scoped lang="scss">
.a-articleItem {
  @include a-articleItem;
}
</style>
