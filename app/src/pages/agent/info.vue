<template>
  <div>
    <AgentSPInfo
      v-if="device.isMobile"
      :upload-img="uploadImg"
      :avatar-url="avatarUrl"
      :current-agent="currentAgent"
      :update-account="updateAccount"
    />
    <AgentPCInfo
      v-else
      :upload-img="uploadImg"
      :avatar-url="avatarUrl"
      :current-agent="currentAgent"
      :update-account="updateAccount"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import notification from '~/mixins/notification';
import webpush from '~/mixins/webpush';
import AgentPCInfo from '~/components/templates/agent_pc/info';
import AgentSPInfo from '~/components/templates/agent_sp/info';
import log from '~/utils/log';

export default {
  layout: ctx => (ctx.isMobile ? 'agent_sp' : 'agent_pc'),
  components: {
    AgentPCInfo,
    AgentSPInfo,
  },
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  middleware: ['injectDevice', 'injectAgent', 'agentAuthenticated'],
  mixins: [notification, webpush],
  computed: {
    ...mapState(['device']),
    currentAgent() {
      return this.$store.state.agent.agent;
    },
  },
  data() {
    return {
      avatarUrl: this.$store.state.agent.agent.avatarUrl,
    };
  },
  methods: {
    timestamp() {
      return JSON.stringify(Date.now());
    },
    async uploadImg(file) {
      this.resetNotificationMessage();
      if (file.size > 1000 * 1024) {
        this.setNotificationMessage('error', '画像は1MB以下をアップロードしてください');
        return;
      }
      const fileType = file.name.split('.').slice(-1)[0];
      const { agentId } = this.$store.state.agent;

      const client = this.$axios.withAccessToken(this.$store.state.agentToken);

      const fileName = `agentid_${agentId}_avatar_${this.timestamp()}_.${fileType}`;
      const formData = new FormData();
      formData.append('fileName', fileName);
      formData.append('image', file);

      this.openLoadingModal();
      const { imgUrl, error } = await client.$post('/agent/upload_img_to_s3', formData)
        .catch((err) => {
          log.error(err);
          return { error: 'アップロードに失敗しました' };
        });

      this.closeLoadingModal();
      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }

      if (!imgUrl) {
        return;
      }
      this.avatarUrl = imgUrl;
    },
    async updateAccount(name, company) {
      const client = this.$axios.withAccessToken(this.$store.state.agentToken);
      const { avatarUrl } = this;
      const { agentId } = this.$store.state.agent;
      if (name === this.currentAgent.name && company === this.currentAgent.company && avatarUrl === this.currentAgent.avatarUrl) {
        this.setNotificationMessage('error', '変更されていません');
        return;
      }

      this.openLoadingModal();

      const { error } = await client.$post('/agent/update_info', {
        name,
        company,
        avatarUrl,
      }).catch((err) => {
        log.error(err);
        return { error: '変更に失敗しました' };
      });

      this.closeLoadingModal();

      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }

      this.$store.commit('agent/setAgentData', {
        agentId,
        isLoggedIn: true,
        agent: { name, company, avatarUrl },
      });

      this.setNotificationMessage('success', 'アカウントの変更に成功しました');
    },
  },
};
</script>

<style lang="scss" scoped>
.p-info {
  @include p-info;
}
</style>
