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
export default {
  props: {
    count: {
      type: Number,
      default: () => 1,
    },
    buildingPerPage: {
      type: Number,
      default: () => 1,
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    numPage() {
      return Math.ceil(this.count / this.buildingPerPage);
    },
  },
  methods: {
    next() {
      this.page += 1;
      this.setPage();
    },
    prev() {
      this.page = this.page - 1;
      this.setPage();
    },
    setPage() {
      this.$emit('change-page', this.page);
    },
  },
};
</script>

<style lang="scss" scoped>
.a-pagination {
  @include a-pagination;
}
</style>
