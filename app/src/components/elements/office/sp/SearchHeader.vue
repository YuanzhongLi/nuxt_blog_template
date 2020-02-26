<template>
  <div class="o-searchHeader o-searchHeader--sp">
    <h1 class="o-searchHeader__ttl">
      とっておきのオフィスを<br>見つけましょう
    </h1>
    <a
      href="#"
      @click.prevent="openModal"
      class="o-searchHeader__btn"
    >
      <i class="o-searchHeader__btnIcon fas fa-search" />検索条件を入力
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['device']),
  },
  methods: {
    openModal() {
      this.$emit('open-modal');
    },
  },
};
</script>

<style lang="scss" scoped>
.o-searchHeader {
  @include o-searchHeader;
}
</style>
