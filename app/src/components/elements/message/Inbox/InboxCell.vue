<template>
  <!-- 既読はis-doneを付けてください -->
  <a
    @click="switchTalkRoom"
    class="a-inboxCell"
  >
    <div
      class="a-inboxCell__thumb"
      :style="`background-image: url(${talkRoom.avatarUrl});`"
    >
      <span
        v-if="talkRoom.unreadNumber > 0"
        class="a-inboxCell__notification"
      >
        {{ talkRoom.unreadNumber }}
      </span>
    </div>
    <div class="a-inboxCell__cnt">
      <div class="a-inboxCell__cntHead">
        <span class="a-inboxCell__cntHeadLabel">
          <em
            v-if="isAgent"
            class="a-inboxCell__cntHeadId"
          >
            ID：{{ talkRoom.user2Id }}
          </em>
          <em class="a-inboxCell__cntHeadCompany">
            {{ isAgentAndInactive ? '非公開' : talkRoom.companyName }}
          </em>
        </span>
        <time class="a-inboxCell__cntTime">
          {{ formattedDate }}
        </time>
      </div>
      <p class="a-inboxCell__cntName">
        {{ isAgentAndInactive ? '' : talkRoom.name }}
      </p>
      <p class="a-inboxCell__cntBody">
        {{ latestContent }}
      </p>
    </div>
  </a>
</template>

<script>
import { userTypeEnum } from '~/utils/enums';
import formatDformatUnixTimeToJPtime from '~/utils/chat/format_time';

export default {
  props: {
    talkRoom: {
      type: Object,
      required: true,
    },
    userType: {
      type: Number,
      required: true,
    },
  },
  methods: {
    switchTalkRoom() {
      this.$emit('switch-talk-room', this.talkRoom);
    },
  },
  computed: {
    isAgent() {
      const { userType } = this;
      return userType === userTypeEnum.AGENT;
    },
    isAgentAndInactive() {
      const { talkRoom } = this;
      return !talkRoom.isActive && this.isAgent;
    },
    formattedDate() {
      return formatDformatUnixTimeToJPtime(this.talkRoom.updatedAt);
    },
    latestContent() {
      const { talkRoom } = this;
      const content = talkRoom.contents[talkRoom.contents.length - 1];
      if (content.fileTitle) {
        return content.fileTitle;
      }
      if (content.content) {
        return content.content;
      }
      return this.isAgent ? 'オファーPDFを送信しました' : 'オファーPDFを受信しました';
    },
  },
};
</script>

<style scoped lang="scss">
.a-inboxCell {
  @include a-inboxCell;
}
</style>
