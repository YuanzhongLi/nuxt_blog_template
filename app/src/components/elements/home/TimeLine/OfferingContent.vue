<template>
  <div
    class="a-offeringContent"
    @click="clicked"
  >
    <div class="a-offeringContent__info">
      <div
        class="a-offeringContent__thumb"
        :style="`background-image: url(${data.avatarUrl});`"
      />
      <div class="a-offeringContent__infoCnt">
        <p class="a-offeringContent__agentCompany">
          {{ data.companyName }}
        </p>
        <p class="a-offeringContent__agentName">
          {{ data.name }}
        </p>
        <time class="a-offeringContent__time">
          {{ timeAgo }}
        </time>
      </div>
      <a
        :href="url"
        class="a-offeringContent__download"
        target="_blank"
        @click="createDownloadLog"
      >
        <i class="a-offeringContent__downloadIcon far fa-file-pdf" />
        PDFを見る
      </a>
    </div>
    <span
      v-if="data.isMatched"
      class="a-offeringContent__status a-offeringContent__status--match"
    >
      マッチ済み
    </span>
    <span
      v-if="!data.isMatched"
      class="a-offeringContent__status a-offeringContent__status--new"
    >
      新規
    </span>
    <!-- eslint-disable -->
    <p v-if="data.agentComment" class="a-offeringContent__message">{{ data.agentComment }}</p>
    <!-- eslint-enable -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import log from '~/utils/log';
import notification from '~/mixins/notification';

export default {
  props: {
    type: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(['device']),
    timeAgo() {
      return moment(this.data.updatedAt).fromNow();
    },
  },
  methods: {
    createDownloadLog() {
      this.$emit('create-download-log', this.data.id);
    },
    clicked(e) {
      if (e.target.tagName !== 'A' && !this.device.isMobile) {
        this.$router.push(`/tenant/message?roomId=${this.data.talkRoomId}`);
      }
    },
  },
  mixins: [notification],
  data() {
    return {
      url: '',
    };
  },
  created() {
    const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
    client
      .post('tenant/s3_signed_url', {
        id: this.data.id,
        type: 'tenant',
      })
      .then((res) => {
        this.url = res.data;
      })
      .catch((err) => {
        log.error(err);
      });
  },
};
</script>

<style scoped lang="scss">
.a-offeringContent {
  @include a-offeringContent;
}
</style>
