<template>
  <div class="a-file">
    <time
      class="a-file__time a-file__time--receiver"
      v-if="!isSender"
    >
      {{ formattedTime }}
    </time>
    <div class="a-file__cnt">
      <div
        v-if="isSender"
        class="a-file__thumb"
        :style="`background-image: url(${content.avatarUrl});`"
      />
      <div class="a-file__wrap">
        <a
          :href="`${content.fileUrl}`"
          target="_blank"
          class="a-file__anchor"
        >
          <span class="a-file__anchorTag">添付ファイル</span>
          <div class="a-file__anchorCnt">
            <i class="a-file__anchorIcon fas fa-file-alt" />
            <p class="a-file__anchorTxt">
              {{ content.fileTitle }}
            </p>
          </div>
          <div class="a-file__hover">
            <i class="a-file__hoverIcon fas fa-cloud-download-alt" />
            <p class="a-file__hoverTxt">
              ダウンロード
            </p>
          </div>
        </a>
        <template v-if="isSender">
          <ul
            v-if="content.likeStatus === likeStatusEnum.HOLD"
            class="a-file__action"
          >
            <li class="a-file__actionItem">
              <a
                @click="openModal(likeStatusEnum.LIKE)"
                class="a-file__actionAnchor a-file__actionAnchor--fav"
              >
                <i class="a-file__actionIcon fas fa-heart" />
                興味あり
              </a>
            </li>
            <li class="a-file__actionItem">
              <a
                @click="openModal(likeStatusEnum.DISMISS)"
                class="a-file__actionAnchor a-file__actionAnchor--dismiss"
              >
                <i class="a-file__actionIcon fas fa-times" />
                興味なし
              </a>
            </li>
          </ul>
          <ul
            v-else-if="content.likeStatus === likeStatusEnum.LIKE"
            class="a-file__action"
          >
            <li class="a-file__actionWideItem">
              <a
                class="a-file__actionAnchor a-file__actionAnchor--fav"
              >
                <i class="a-file__actionIcon fas fa-heart" />
                興味ありにしました
              </a>
            </li>
          </ul>
          <ul
            v-else-if="content.likeStatus === likeStatusEnum.DISMISS"
            class="a-file__action"
          >
            <li class="a-file__actionWideItem">
              <a
                class="a-file__actionAnchor a-file__actionAnchor--dismiss"
              >
                <i class="a-file__actionIcon fas fa-times" />
                興味なしにしました
              </a>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul
            v-if="content.likeStatus === likeStatusEnum.HOLD"
            class="a-file__action"
          >
            <li class="a-file__actionWideItem">
              <a
                class="a-file__actionAnchor a-file__actionAnchor--dismiss"
              >
                テナントはまだ反応していません
              </a>
            </li>
          </ul>
          <ul
            v-else-if="content.likeStatus === likeStatusEnum.LIKE"
            class="a-file__action"
          >
            <li class="a-file__actionWideItem">
              <a
                class="a-file__actionAnchor a-file__actionAnchor--fav"
              >
                <i class="a-file__actionIcon fas fa-heart" />
                "興味あり"にされました！
              </a>
            </li>
          </ul>
          <ul
            v-else-if="content.likeStatus === likeStatusEnum.DISMISS"
            class="a-file__action"
          >
            <li class="a-file__actionWideItem">
              <a
                class="a-file__actionAnchor a-file__actionAnchor--dismiss"
              >
                <i class="a-file__actionIcon fas fa-times" />
                "興味なし"にされました
              </a>
            </li>
          </ul>
        </template>
      </div>
    </div>
    <time
      class="a-file__time a-file__time--sender"
      v-if="isSender"
    >
      {{ formattedTime }}
    </time>
  </div>
</template>

<script>
import formatDformatUnixTimeToJPtime from '~/utils/chat/format_time';
import { likeStatusEnum } from '~/utils/enums';

export default {
  props: {
    type: {
      type: String,
      default: '',
    },
    content: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedTime() {
      return formatDformatUnixTimeToJPtime(this.content.updatedAt);
    },
    isSender() {
      return this.type === 'sender';
    },
  },
  data() {
    return {
      likeStatusEnum,
    };
  },
  methods: {
    openModal(likeStatus) {
      this.$emit('open-modal', this.content.offerId, likeStatus);
    },
  },
};
</script>

<style scoped lang="scss">
.a-file {
  @include a-file;
}
</style>
