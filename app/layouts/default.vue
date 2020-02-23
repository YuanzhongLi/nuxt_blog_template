<template>
  <div>
    <div class="l-header">

    </div>
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
import TheSidebar from '~components/TheSidebar.vue';
import TheFooter from '~components/TheFooter.vue';

export default {

}
</script>
