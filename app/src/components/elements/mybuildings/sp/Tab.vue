<template>
  <ul class="a-tab">
    <li class="a-tab__item">
      <a
        href="#"
        class="a-tab__anchor"
        :class="{ 'is-active': activeNum === selectedEnum.OFFER }"
        @click.prevent="switcher(selectedEnum.OFFER)"
      >
        オファー物件
      </a>
    </li>
    <li class="a-tab__item">
      <a
        href="#"
        class="a-tab__anchor"
        :class="{ 'is-active': activeNum === selectedEnum.ASKING }"
        @click.prevent="switcher(selectedEnum.ASKING)"
      >
        興味あり物件
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    const selectedEnum = {
      OFFER: 1,
      ASKING: 2,
    };
    return {
      activeNum: selectedEnum.OFFER,
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
.a-tab {
  @include a-tab;
}
</style>
