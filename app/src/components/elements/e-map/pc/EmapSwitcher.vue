<template>
  <nav class="a-emapSwitcher">
    <ul class="a-emapSwitcher__list">
      <li class="a-emapSwitcher__item">
        <a
          href="#"
          class="a-emapSwitcher__anchor"
          :class="{ 'is-active': activeNum === selectedEnum.RECOMMEND }"
          @click.prevent="switcher(selectedEnum.RECOMMEND)"
        >
          レコメンド
        </a>
      </li>
      <li class="a-emapSwitcher__item">
        <a
          href="#"
          class="a-emapSwitcher__anchor"
          :class="{ 'is-active': activeNum === selectedEnum.SEARCH }"
          @click.prevent="switcher(selectedEnum.SEARCH)"
        >
          検索
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    activeNum: {
      type: Number,
      default: () => 1,
    },
  },
  data() {
    const selectedEnum = {
      RECOMMEND: 1,
      SEARCH: 2,
    };
    return {
      selectedEnum,
    };
  },
  methods: {
    switcher(num) {
      this.$emit('switch-cnt', num);
    },
  },
};
</script>

<style lang="scss" scoped>
.a-emapSwitcher {
  @include a-emapSwitcher;
}
</style>
