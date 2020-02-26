<template>
  <nav class="m-mobileTab">
    <ul class="m-mobileTab__list">
      <li class="m-mobileTab__item">
        <n-link
          to="/agent"
          class="m-mobileTab__anchor"
          :class="{ 'is-active': type === 1 }"
        >
          <span class="m-mobileTab__icon m-mobileTab__icon--list" />
          リスト
        </n-link>
      </li>
      <li class="m-mobileTab__item">
        <n-link
          @click="chatButton"
          to="/agent/message"
          class="m-mobileTab__anchor"
          :class="{ 'is-active': type === 2 }"
        >
          <span class="m-mobileTab__icon m-mobileTab__icon--message" />
          チャット {{ spMessageType }}
        </n-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    spMessageType: {
      type: Number,
      required: true,
    },
  },
  methods: {
    chatButton() {
      this.$emit('chat-button');
    },
  },
  computed: {
    type() {
      const path = this.$store.state.lastVisitedPath;
      switch (true) {
        case path === '/agent':
          return 1;
        case path === '/agent/message':
          return 2;
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
