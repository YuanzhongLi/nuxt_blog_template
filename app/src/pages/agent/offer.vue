<template>
  <div>
    <AgentPCOffer @send="send" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import log from '~/utils/log';

import siteinfo from '~/mixins';
import notification from '~/mixins/notification';
import webpush from '~/mixins/webpush';
import AgentPCOffer from '~/components/templates/agent_pc/offer';

export default {
  layout: 'agent_pc',
  components: {
    AgentPCOffer,
  },
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  middleware: ['injectAgent', 'agentAuthenticated'],
  mixins: [siteinfo, notification, webpush],
  computed: {
    ...mapState(['device', 'agent']),
  },
  methods: {
    async send(tenantId, comment, pdf) {
      if (!tenantId || !comment || !pdf) {
        this.setNotificationMessage('error', '入力していない項目があります。');
        return;
      }
      if (pdf.size > 10 * 1024 * 1024) {
        this.setNotificationMessage('error', '画像は10MB以下をアップロードしてください');
        return;
      }
      const pdfFileName = pdf.name;
      const fileName = `${this.timestamp()}_${pdfFileName}`;
      const formData = new FormData();
      formData.append('fileName', fileName);
      formData.append('pdfContent', pdf);
      formData.append('tenantId', tenantId);
      formData.append('agentComment', comment);

      this.openLoadingModal();
      const client = this.$axios.withAccessToken(this.$store.state.agentToken);
      const { error } = await client.$post('agent/send_offer', formData)
        .catch((err) => {
          log.error(err);
          return { error: '送信に失敗しました。' };
        });
      if (error) {
        this.setNotificationMessage('error', error);
        this.closeLoadingModal();
        return;
      }
      this.closeLoadingModal();
      this.setNotificationMessage('success', '送信に成功しました。');
    },
    timestamp() {
      return JSON.stringify(Date.now());
    },
  },
};
</script>

<style lang="scss" scoped>
.p-offer {
  @include p-offer;
}
</style>
