
<template>
  <nav class="a-regionSwitcher">
    <ul class="a-regionSwitcher__list">
      <li class="a-regionSwitcher__item">
        <a
          href="#"
          class="a-regionSwitcher__anchor"
          :class="{ 'is-active': activeNum === selectedEnum.HOKKAIDO }"
          @click.prevent="switcher(selectedEnum.HOKKAIDO)"
        >
          北海道
        </a>
      </li>
      <li class="a-regionSwitcher__item">
        <a
          href="#"
          class="a-regionSwitcher__anchor"
          :class="{ 'is-active': activeNum === selectedEnum.TOHOKU }"
          @click.prevent="switcher(selectedEnum.TOHOKU)"
        >
          東北
        </a>
      </li>
      <li class="a-regionSwitcher__item">
        <a
          href="#"
          class="a-regionSwitcher__anchor"
          :class="{ 'is-active': activeNum === selectedEnum.KANTO }"
          @click.prevent="switcher(selectedEnum.KANTO)"
        >
          関東
        </a>
      </li>
      <li class="a-regionSwitcher__item">
        <a
          href="#"
          class="a-regionSwitcher__anchor"
          :class="{ 'is-active': activeNum === selectedEnum.CHUBU }"
          @click.prevent="switcher(selectedEnum.CHUBU)"
        >
          中部
        </a>
      </li>
      <li class="a-regionSwitcher__item">
        <a
          href="#"
          class="a-regionSwitcher__anchor"
          :class="{ 'is-active': activeNum === selectedEnum.KINKI }"
          @click.prevent="switcher(selectedEnum.KINKI)"
        >
          近畿
        </a>
      </li>
      <li class="a-regionSwitcher__item">
        <a
          href="#"
          class="a-regionSwitcher__anchor"
          :class="{ 'is-active': activeNum === selectedEnum.CHUGOKU_SHIKOKU }"
          @click.prevent="switcher(selectedEnum.CHUGOKU_SHIKOKU)"
        >
          中国・四国
        </a>
      </li>
      <li class="a-regionSwitcher__item">
        <a
          href="#"
          class="a-regionSwitcher__anchor"
          :class="{ 'is-active': activeNum === selectedEnum.KYUSYU }"
          @click.prevent="switcher(selectedEnum.KYUSYU)"
        >
          九州
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    const selectedEnum = {
      HOKKAIDO: 1,
      TOHOKU: 2,
      KANTO: 3,
      CHUBU: 4,
      KINKI: 5,
      CHUGOKU_SHIKOKU: 6,
      KYUSYU: 7,
    };
    return {
      activeNum: selectedEnum.HOKKAIDO,
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
.a-regionSwitcher {
  @include a-regionSwitcher;
}
</style>
