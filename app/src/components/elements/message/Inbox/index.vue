<template>
  <div class="m-inbox">
    <p
      v-if="!hasTalkRoom"
      class="m-inbox__empty"
    >
      メッセージがありません
    </p>
    <ul
      v-if="hasTalkRoom"
    >
      <li
        class="m-inbox__item"
        v-for="(talkRoom, index) in talkRooms"
        :key="`talkRoomHead${index}`"
      >
        <InboxCell
          :talk-room="talkRoom"
          :user-type="userType"
          @switch-talk-room="switchTalkRoom"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import InboxCell from './InboxCell';

export default {
  components: {
    InboxCell,
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
  methods: {
    switchTalkRoom(targetTalkRoom) {
      this.$emit('switch-talk-room', targetTalkRoom);
    },
  },
  computed: {
    hasTalkRoom() {
      return this.talkRooms.length > 0;
    },
  },
};
</script>

<style scoped lang="scss">
.m-inbox {
  @include m-inbox;
}
</style>
