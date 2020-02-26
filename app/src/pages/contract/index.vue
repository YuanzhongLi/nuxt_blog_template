<template>
  <div
    class="p-articleList"
    :class="{'p-articleList--sp': device.isMobile}"
  >
    <ul class="p-articleList__cnt">
      <li
        class="p-articleList__cntItem"
        v-for="(contractCase, index) in contractCases"
        :key="`contractCase${index}`"
      >
        <n-link
          class="p-articleList__cntAnchor"
          :to="`/contract/case/${contractCase.id}`"
        >
          <div
            class="p-articleList__cntThumb"
            :style="`background-image: url(${contractCase.headerImageUrl});`"
          />
          <div class="p-articleList__cntInfo">
            <h1 class="p-articleList__cntTtl">
              {{ contractCase.title }}
            </h1>
            <p
              class="p-articleList__cntTxt"
              v-html="contractCase.summary"
            />
            <time class="p-articleList__cntTime">
              <i class="p-articleList__cntTimeIcon far fa-clock" />
              {{ contractCase.createdAt | moment('LTS') }}
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
      title: '成約事例｜estie（エスティ）',
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
    const contractCases = await app.$axios
      .$get('/contentful/contract/all_case_header')
      .then(response => response.sort((a, b) => (a.id > b.id ? -1 : 1)));
    return {
      contractCases,
    };
  },
};
</script>

<style lang="scss" scoped>
.p-articleList {
  @include p-articleList;
}
</style>
