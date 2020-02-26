<template>
  <div
    class="a-notification"
    :class="'a-notification--' + type"
    @click="resetNotificationMessage"
  >
    <i
      class="a-notification__icon"
      :class="icon"
    />
    <slot />
    <span
      class="a-notification__close"
      @click="resetNotificationMessage"
    >
      <i class="fas fa-times-circle" />
    </span>
  </div>
</template>

<script>
import notification from '~/mixins/notification';

export default {
  mixins: [notification],
  props: {
    icon: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  mounted() {
    setTimeout(() => this.resetNotificationMessage(), 5000);
  },
};
</script>

<style scoped lang="scss">
.a-notification {
  @include a-notification;
}
</style>
