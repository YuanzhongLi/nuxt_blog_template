<template>
  <div
    class="p-faq"
    :class="{'p-faq--sp': device.isMobile}"
  >
    <div class="p-faq__head">
      <h1 class="p-faq__headTtl">
        FAQ
        <p class="p-faq__headSub">
          よくある質問
        </p>
      </h1>
    </div>
    <ul class="p-faq__list">
      <li
        class="p-faq__item"
        v-for="(faq, index) in allFaq"
        :key="`faq${index}`"
      >
        <h2 class="p-faq__question">
          {{ faq.question }}
        </h2>
        <div
          class="p-faq__answer"
          v-html="faq.answer"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  async asyncData({ app }) {
    const allFaq = await app.$axios
      .$get('/contentful/faq')
      .then(response => response.sort((a, b) => (a.id < b.id ? -1 : 1)));
    return {
      allFaq,
    };
  },
  head() {
    return {
      title: 'FAQ｜estie（エスティ）',
      mata: [{ name: 'robots', content: 'noindex' }],
    };
  },
  layout: ctx => (ctx.isMobile ? 'cms_sp' : 'cms_pc'),
  middleware: 'injectDevice',
  computed: {
    ...mapState(['device']),
  },
};
</script>

<style lang="scss" scoped>
.p-faq {
  @include p-faq;
}
</style>
