<template>
  <div class="m-chatBox">
    <modal
      v-if="showModal"
      @close="closeModal"
      @left-func="updateOffer"
    >
      <h2 slot="header">
        {{ likeModalTitle }}
      </h2>
      <div
        slot="body"
      >
        <TextAreaBox
          label="コメントする（任意）"
          @input="comment = $event"
          :placeholder="likeModalTextAreaPlaceholder"
        />
      </div>
      <span slot="leftButtonLabel">
        OK
      </span>
    </modal>
    <ul ref="child">
      <template v-for="(content, index) in contents">
        <Divider
          v-if="content.showDivider"
          :key="`divider${index}`"
        >
          {{ formatDividerTime(content.sentAt) }}
        </Divider>
        <template v-if="isSender(content)">
          <li
            :key="`content${index}`"
            v-if="content.content"
            class="m-chatBox__item m-chatBox__item--sender"
          >
            <Comment
              class="m-chatBox__cnt"
              type="sender"
              :timestamp="content.sentAt"
              :avatar-url="content.avatarUrl"
              :content="content.content"
            />
          </li>
          <li
            :key="`content${index}`"
            v-else-if="content.fileType==='offer'"
            class="m-chatBox__item m-chatBox__item--sender"
          >
            <OfferFile
              class="m-chatBox__cnt"
              type="sender"
              :content="content"
              @open-modal="openModal"
            />
          </li>
          <li
            :key="`content${index}`"
            v-else-if="!content.fileType"
            class="m-chatBox__item m-chatBox__item--sender"
          >
            <File
              class="m-chatBox__cnt"
              type="sender"
              :avatar-url="content.avatarUrl"
              :file-url="content.fileUrl"
              :file-title="content.fileTitle"
              :timestamp="content.sentAt"
            />
          </li>
        </template>
        <template v-else>
          <li
            :key="`content${index}`"
            v-if="content.content"
            class="m-chatBox__item m-chatBox__item--receiver"
          >
            <Comment
              class="m-chatBox__cnt"
              type="receiver"
              :timestamp="content.sentAt"
              :content="content.content"
            />
          </li>
          <li
            :key="`content${index}`"
            v-else-if="content.fileType==='offer'"
            class="m-chatBox__item m-chatBox__item--receiver"
          >
            <OfferFile
              class="m-chatBox__cnt"
              type="receiver"
              :content="content"
            />
          </li>
          <li
            :key="`content${index}`"
            v-else-if="!content.fileType"
            class="m-chatBox__item m-chatBox__item--receiver"
          >
            <File
              class="m-chatBox__cnt"
              type="receiver"
              :file-url="content.fileUrl"
              :file-title="content.fileTitle"
              :timestamp="content.sentAt"
            />
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>

<script>
import Comment from './Comment';
import Divider from './Divider';
import File from './File';
import OfferFile from './OfferFile';
import Modal from '~/components/elements/common/modal/index';
import TextAreaBox from '~/components/elements/common/TextAreaBox';
import { likeStatusEnum } from '~/utils/enums';
import formatUnixtimeForDivider from '~/utils/chat/format_unixtime_for_divider';

export default {
  components: {
    Comment,
    Divider,
    File,
    OfferFile,
    Modal,
    TextAreaBox,
  },
  props: {
    contents: {
      type: Array,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    userType: {
      type: Number,
      required: true,
    },
  },
  computed: {
    likeModalTitle() {
      if (this.targetLikeStatus === likeStatusEnum.LIKE) return '物件情報を問い合わせましょう！';
      if (this.targetLikeStatus === likeStatusEnum.DISMISS) return '興味なしにします';
      return '';
    },
    likeModalTextAreaPlaceholder() {
      if (this.targetLikeStatus === likeStatusEnum.LIKE) return 'チャットを開始してどの物件が気になったかご記入下さい！';
      if (this.targetLikeStatus === likeStatusEnum.DISMISS) return '希望にマッチしなかった点や他に伝えたい要望をご記入下さい(チャットは開始されません)。';
      return '';
    },
  },
  data() {
    return {
      showModal: false,
      targetOfferId: null,
      comment: '',
      targetLikeStatus: likeStatusEnum.HOLD,
    };
  },
  methods: {
    isSender(content) {
      const { userId, userType } = this;

      return (content.userId !== userId || content.userType !== userType);
    },
    scrollBottom() {
      const { child } = this.$refs;

      // childが取得できなかったときのために念の為分岐
      if (child) {
        this.$el.scrollTo(0, child.clientHeight);
      }
    },
    formatDividerTime(unixtime) {
      return formatUnixtimeForDivider(unixtime);
    },
    updateOffer() {
      const { targetOfferId, targetLikeStatus, comment } = this;
      this.showModal = false;
      this.$emit('update-offer', targetOfferId, targetLikeStatus, comment);
    },
    openModal(offerId, likeStatus) {
      this.showModal = true;
      this.targetOfferId = offerId;
      this.comment = '';
      this.targetLikeStatus = likeStatus;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  mounted() {
    this.scrollBottom();
  },
  updated() {
    this.scrollBottom();
  },
};
</script>

<style scoped lang="scss">
.m-chatBox {
  @include m-chatBox;
}
</style>
