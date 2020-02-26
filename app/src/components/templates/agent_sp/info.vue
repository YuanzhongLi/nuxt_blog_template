<template>
  <div class="p-info">
    <AgentAccountInfo
      :avatar-url="avatarUrl"
      :upload-img="uploadImg"
      :current-agent="currentAgent"
      @update-account="updateAccount"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AgentAccountInfo from '~/components/elements/info/sp/AgentAccountInfo';

export default {
  components: {
    AgentAccountInfo,
  },
  middleware: ['injectAgent', 'agentAuthenticated'],
  computed: {
    ...mapState(['device', 'agent']),
  },
  props: {
    uploadImg: {
      type: Function,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    currentAgent: {
      type: Object,
      default: () => {},
    },
    updateAccount: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.p-info {
  @include p-info;
}
</style>
