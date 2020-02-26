<template>
  <nav class="a-timelineTab">
    <ul class="a-timelineTab__list">
      <li class="a-timelineTab__item">
        <a
          class="a-timelineTab__anchor"
          href="#"
          :class="newestTabClass"
          @click.prevent="switcher(1)"
        >
          新着情報
        </a>
      </li>
      <li class="a-timelineTab__item">
        <a
          class="a-timelineTab__anchor"
          href="#"
          :class="suggestedTabClass"
          @click.prevent="switcher(2)"
        >
          オファー物件一覧
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  props: {
    isOfferExist: {
      type: Boolean,
      default: false,
    },
    activeTab: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    newestTabClass() {
      return (this.activeTab === 1) ? 'is-active' : '';
    },
    suggestedTabClass() {
      if (this.isOfferExist) {
        return (this.activeTab === 2) ? 'is-active' : '';
      }
      return 'is-disabled';
    },
  },
  methods: {
    switcher(num) {
      if (this.isOfferExist) {
        this.$emit('change-tab', num);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.a-timelineTab {
  @include a-timelineTab;
}
</style>
