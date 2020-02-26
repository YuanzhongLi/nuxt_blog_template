<template>
  <div class="p-message">
    <aside class="p-message__inbox">
      <Inbox
        :talk-rooms="talkRooms"
        :user-type="userType"
        @switch-talk-room="switchTalkRoom"
      />
    </aside>
    <section
      class="p-message__cnt"
      :class="{'p-message__cnt--empty': isDefaultPage}"
    >
      <MessageEmpty v-if="isDefaultPage" />
      <div
        v-else
        class="p-message__cntChat"
      >
        <ChatHeader
          class="p-message__cntChatHead"
          @close="openFile"
          :is-open="isOpen"
          :company-name="currentTalkRoom.companyName"
          :name="currentTalkRoom.name"
          :avatar-url="currentTalkRoom.avatarUrl"
        />
        <ChatBox
          class="p-message__cntChatStream"
          :contents="currentTalkRoom.contents"
          :user-id="userId"
          :user-type="userType"
          @update-offer="updateOffer"
        />
        <SendBox
          v-if="currentTalkRoom.isActive"
          class="p-message__cntChatSend"
          @send-message="sendMessage"
        />
        <StartChatBox
          v-else
          :start-chat="() => startChat(currentTalkRoom)"
        />
      </div>
      <FileList
        v-if="isOpen"
        class="p-message__cntFile"
        :current-talk-room-offers="currentTalkRoomOffers"
      />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Inbox from '~/components/elements/message/Inbox';
import ChatHeader from '~/components/elements/message/ChatHeader';
import ChatBox from '~/components/elements/message/ChatBox';
import SendBox from '~/components/elements/message/SendBox';
import StartChatBox from '~/components/elements/message/StartChatBox';
import FileList from '~/components/elements/message/FileList';
import MessageEmpty from '~/components/elements/message/MessageEmpty';

export default {
  components: {
    Inbox,
    ChatHeader,
    ChatBox,
    SendBox,
    FileList,
    MessageEmpty,
    StartChatBox,
  },
  props: {
    talkRooms: {
      type: Array,
      required: true,
    },
    currentTalkRoom: {
      type: Object,
      required: true,
    },
    currentTalkRoomOffers: {
      type: Array,
      default: () => [],
    },
    isDefaultPage: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Number,
      required: true,
    },
    userType: {
      type: Number,
      required: true,
    },
    updateOffer: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    openFile() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$emit('get-file-list');
      }
    },
    switchTalkRoom(targetTalkRoom) {
      this.isOpen = false;
      this.$emit('switch-talk-room', targetTalkRoom);
    },
    sendMessage(msg) {
      this.$emit('send-message', msg);
    },
    startChat(currentTalkRoom) {
      this.$emit('start-chat', currentTalkRoom);
    },
  },
  computed: {
    ...mapState(['device', 'tenant']),
  },
};
</script>

<style lang="scss" scoped>
.p-message {
  @include p-message;
}
</style>
