<template>
  <nav
    v-show="count > 1"
    class="a-pagination"
  >
    <ul class="a-pagination__list">
      <li class="a-pagination__item a-pagination__item--prev">
        <span
          v-if="this.minPage == 1"
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
        v-for="p in Array.from(Array(numPage), (v, k) => k+minPage)"
        :key="p"
        class="a-pagination__item"
      >
        <span
          v-if="p === page"
          class="a-pagination__anchor a-pagination__anchor--disabled"
        >
          {{ p }}
        </span>
        <a
          v-else
          class="a-pagination__anchor"
          @click="setPage(p);search();"
        >
          {{ p }}
        </a>
      </li>
      <li class="a-pagination__item a-pagination__item--next">
        <span
          v-if="this.minPage + maxNumPage > Math.ceil(this.count / this.buildingPerPage)"
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
  data() {
    return {
      left: 1,
      maxNumPage: 10,
    };
  },
  computed: {
    ...mapState({
      count: state => state.search.count,
      buildingPerPage: state => state.search.conditions.buildingPerPage,
      page: state => state.search.conditions.page,
    }),
    numPage() {
      return Math.min(Math.ceil(this.count / this.buildingPerPage), this.maxNumPage);
    },
    minPage() {
      return Math.min(this.page, this.left);
    },
  },
  methods: {
    ...mapMutations('search', [
      'setPage',
    ]),
    next() {
      this.left = Math.min(this.minPage + this.maxNumPage, Math.ceil(this.count / this.buildingPerPage) - this.maxNumPage + 1);
      this.setPage(this.left);
      this.search();
    },
    prev() {
      this.left = Math.max(this.minPage - this.maxNumPage, 1);
      this.setPage(this.left + this.maxNumPage - 1);
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
