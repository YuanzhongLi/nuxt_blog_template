<template>
  <nav class="m-mobileTab">
    <ul class="m-mobileTab__list">
      <li class="m-mobileTab__item">
        <n-link
          to="/tenant"
          class="m-mobileTab__anchor"
          :class="{ 'is-active': type === 1 }"
        >
          <span class="m-mobileTab__icon m-mobileTab__icon--home" />
          ホーム
        </n-link>
      </li>
      <li class="m-mobileTab__item">
        <n-link
          to="/tenant/message"
          class="m-mobileTab__anchor"
          :class="{ 'is-active': type === 2 }"
        >
          <span class="m-mobileTab__icon m-mobileTab__icon--message" />
          チャット
        </n-link>
      </li>
      <li class="m-mobileTab__item">
        <n-link
          to="/office"
          class="m-mobileTab__anchor"
          :class="{ 'is-active': type === 3 }"
        >
          <span class="m-mobileTab__icon m-mobileTab__icon--search" />
          検索
        </n-link>
      </li>
      <li class="m-mobileTab__item">
        <n-link
          to="/office/e-map"
          class="m-mobileTab__anchor"
          :class="{ 'is-active': type === 4 }"
        >
          <span class="m-mobileTab__icon m-mobileTab__icon--map" />
          e-Map
        </n-link>
      </li>
      <li class="m-mobileTab__item">
        <n-link
          to="/tenant/mybuildings"
          class="m-mobileTab__anchor"
          :class="{ 'is-active': type === 5 }"
        >
          <span class="m-mobileTab__icon m-mobileTab__icon--myBuildings" />
          物件管理
        </n-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    type() {
      const path = this.$store.state.lastVisitedPath;
      switch (true) {
        case path === '/tenant':
          return 1;
        case path === '/tenant/message':
          return 2;
        case path === '/office/e-map':
          return 4;
        case path.indexOf('/office') >= 0:
          return 3;
        case path === '/tenant/mybuildings':
          return 5;
        default:
          return 0;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.m-mobileTab {
  @include m-mobileTab;
}
</style>
