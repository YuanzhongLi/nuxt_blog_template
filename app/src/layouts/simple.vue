<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import siteinfo from '~/mixins';

export default {
  middleware: 'injectDevice',
  mixins: [
    siteinfo,
  ],
  computed: {
    ...mapState(['device']),
  },
};
</script>

<style scoped>
html {
  font-size: 62.5%; /* default font size 10px */
  font-family: YakuHanJP, Helvetica, Arial, sans-serif !important;
}

body {
  margin: 0;
  background: #f4f6f9;
  color: #263442;
  font-size: 1.4rem;
  line-height: 1;
  -webkit-font-smoothing: subpixel-antialiased;
}
</style>
