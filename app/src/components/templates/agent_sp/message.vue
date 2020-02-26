<template>
  <section class="p-message--sp">
    {{ spMessageType }}
    <Inbox
      v-if="spMessageType===1"
      :talk-rooms="talkRooms"
      :user-type="userType"
      @switch-talk-room="switchTalkRoom"
    />
    <div
      v-else
    >
      個別トークルームページ
      {{ spMessageType }}
    </div>
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
    spMessageType: {
      type: Number,
      required: true,
    },
  },
  methods: {
    switchTalkRoom(targetTalkRoom) {
      this.isOpen = false;
      this.$emit('switch-talk-room', targetTalkRoom);
    },
  },
};
</script>

<style lang="scss" scoped>
.p-message {
  @include p-message;
}
</style>
