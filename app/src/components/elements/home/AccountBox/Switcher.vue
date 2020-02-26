<template>
  <ul class="a-switcher">
    <li class="a-switcher__item">
      <a
        href="#"
        class="a-switcher__anchor"
        :class="{ 'is-active': activeNum === selectedEnum.BASIC }"
        @click.prevent="switcher(selectedEnum.BASIC)"
      >
        基本条件
      </a>
    </li>
    <li class="a-switcher__item">
      <a
        href="#"
        class="a-switcher__anchor"
        :class="{ 'is-active': activeNum === selectedEnum.ADDITIONAL }"
        @click.prevent="switcher(selectedEnum.ADDITIONAL)"
      >
        詳細条件
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    const selectedEnum = {
      BASIC: 1,
      ADDITIONAL: 2,
    };
    return {
      activeNum: selectedEnum.BASIC,
      selectedEnum,
    };
  },
  methods: {
    switcher(num) {
      this.activeNum = num;
      this.$emit('switch-cnt', num);
    },
  },
};
</script>

<style scoped lang="scss">
.a-switcher {
  @include a-switcher;
}
</style>
