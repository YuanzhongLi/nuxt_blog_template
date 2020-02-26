<template>
  <div>
    <the-header />

    <div class="l-container">
      <div class="l-main">
        <nuxt />
      </div>
      <div class="l-sidebar">
        <the-sidebar />
      </div>
    </div>

    <the-footer />
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader';
import TheSidebar from '~/components/TheSidebar';
import TheFooter from '~/components/TheFooter';

export default {
  components: {
    TheHeader,
    TheSidebar,
    TheFooter,
  },
};
</script>

<style scoped lang="scss">
.l-container {
  padding-top: 80px;
  padding-bottom: 80px;
  overflow: hidden;
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
}
.l-main {
  width: calc(100% - 340px);
  float: left;
}
.l-sidebar {
  width: 320px;
  float: right;
}
</style>
