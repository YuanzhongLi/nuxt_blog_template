<template>
  <div>
    <ChatBox
      :contents="currentTalkRoom.contents"
      :user-id="userId"
      :user-type="userType"
      @update-offer="updateOffer"
    />
    <SendBox
      class="p-message__cntChatSend"
      @send-message="sendMessage"
    />
  </div>
</template>

<script>
import ChatBox from '~/components/elements/message/ChatBox';
import SendBox from '~/components/elements/message/SendBox';

export default {
  components: {
    ChatBox,
    SendBox,
  },
};
</script>
