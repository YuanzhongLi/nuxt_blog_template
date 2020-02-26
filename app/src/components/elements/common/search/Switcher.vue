<template>
  <ul class="a-switcher">
    <li class="a-switcher__item">
      <a
        href="#"
        class="a-switcher__anchor"
        :class="{ 'is-active': activeNum === selectedEnum.FLOORAREA }"
        @click.prevent="switcher(selectedEnum.FLOORAREA)"
      >
        面積
      </a>
    </li>
    <li class="a-switcher__item">
      <a
        href="#"
        class="a-switcher__anchor"
        :class="{ 'is-active': activeNum === selectedEnum.RENT }"
        @click.prevent="switcher(selectedEnum.RENT)"
      >
        賃料
      </a>
    </li>
    <li class="a-switcher__item">
      <a
        href="#"
        class="a-switcher__anchor"
        :class="{ 'is-active': activeNum === selectedEnum.WALKINGTIME }"
        @click.prevent="switcher(selectedEnum.WALKINGTIME)"
      >
        駅徒歩
      </a>
    </li>
    <li class="a-switcher__item">
      <a
        href="#"
        class="a-switcher__anchor"
        :class="{ 'is-active': activeNum === selectedEnum.BUILDINGYEAR }"
        @click.prevent="switcher(selectedEnum.BUILDINGYEAR)"
      >
        築年数
      </a>
    </li>
    <li class="a-switcher__item">
      <a
        href="#"
        class="a-switcher__anchor"
        :class="{ 'is-active': activeNum === selectedEnum.MOVEINTERM }"
        @click.prevent="switcher(selectedEnum.MOVEINTERM)"
      >
        入居可能時期
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    const selectedEnum = {
      FLOORAREA: 1,
      RENT: 2,
      WALKINGTIME: 3,
      BUILDINGYEAR: 4,
      MOVEINTERM: 5,
    };
    return {
      activeNum: selectedEnum.FLOORAREA,
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
