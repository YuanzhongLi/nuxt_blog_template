<template>
  <div
    class="m-popularArea"
    :class="{'m-popularArea--sp': device.isMobile}"
  >
    <h2 class="m-popularArea__ttl">
      人気のエリア
    </h2>
    <ul class="m-popularArea__list">
      <li
        class="m-popularArea__item"
        v-for="(list, index) in lists"
        :key="`list${index}`"
      >
        <a
          href="#"
          @click.prevent="transferLink(list.path)"
          class="m-popularArea__anchor"
        >
          <div
            class="m-popularArea__thumb"
            :style="`background-image: url('${list.imageUrl}');`"
          />
          <h3 class="m-popularArea__name">
            {{ list.area }}
          </h3>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    lists: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState(['device']),
  },
  methods: {
    transferLink(path) {
      this.$store.dispatch('search/loadStorage');
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.m-popularArea {
  @include m-popularArea;
}
</style>
