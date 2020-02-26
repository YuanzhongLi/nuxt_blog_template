<template>
  <nav
    v-show="count > 1"
    class="a-pagination a-pagination--emap"
  >
    <ul class="a-pagination__list">
      <li class="a-pagination__item a-pagination__item--prev">
        <span
          v-if="this.page === 1"
          class="a-pagination__anchor a-pagination__anchor--disabled"
        >
          <i class="fas fa-chevron-left" />
        </span>
        <a
          v-else
          class="a-pagination__anchor"
          @click="prev"
        >
          <i class="fas fa-chevron-left" />
        </a>
      </li>
      <li
        class="a-pagination__item a-pagination__item--fraction"
      >
        {{ page }}/{{ numPage }}
      </li>
      <li class="a-pagination__item a-pagination__item--next">
        <span
          v-if="this.page === numPage"
          class="a-pagination__anchor a-pagination__anchor--disabled"
        >
          <i class="fas fa-chevron-right" />
        </span>
        <a
          v-else
          class="a-pagination__anchor"
          @click="next"
        >
          <i class="fas fa-chevron-right" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    search: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapState({
      count: state => state.search.count,
      buildingPerPage: state => state.search.conditions.buildingPerPage,
      page: state => state.search.conditions.page,
    }),
    numPage() {
      return Math.ceil(this.count / this.buildingPerPage);
    },
  },
  methods: {
    ...mapMutations('search', [
      'setPage',
    ]),
    next() {
      this.setPage(this.page + 1);
      this.search();
    },
    prev() {
      this.setPage(this.page - 1);
      this.search();
    },
  },
};
</script>

<style lang="scss" scoped>
.a-pagination {
  @include a-pagination;
}
</style>
