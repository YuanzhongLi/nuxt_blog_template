<template>
  <div class="p-info">
    <div class="p-info__wrapper">
      <section class="p-info__cnt">
        <AgentAccountInfo
          :avatar-url="avatarUrl"
          :upload-img="uploadImg"
          :current-agent="currentAgent"
          @update-account="updateAccount"
        />
      </section>
    </div>
  </div>
</template>

<script>
import AgentAccountInfo from '~/components/elements/info/pc/AgentAccountInfo';

export default {
  components: {
    AgentAccountInfo,
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
