<template>
  <section class="p-message--sp">
    <Inbox
      :talk-rooms="talkRooms"
      :user-type="userType"
      @switch-talk-room="switchTalkRoom"
    />
  </section>
</template>

<script>
import Inbox from '~/components/elements/message/Inbox';

export default {
  components: {
    Inbox,
  },
  props: {
    talkRooms: {
      type: Array,
      required: true,
    },
    userType: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.p-message {
  @include p-message;
}
</style>
