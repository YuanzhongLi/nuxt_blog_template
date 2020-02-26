<template>
  <modal
    v-if="isOpen"
    @left-func="send"
    @close="close"
  >
    <h2 slot="header">
      テナントIdとパスワードを入力
    </h2>
    <div slot="body">
      <InputBox
        @input="tenantId = $event"
        :label-content="tenantId"
        input-type="number"
        placeholder="テナントId"
      />
      <InputBox
        @input="password = $event"
        :label-content="password"
        input-type="password"
        placeholder="password"
      />
    </div>
    <span slot="leftButtonLabel">
      送信
    </span>
  </modal>
</template>

<script>
import Modal from './index';
import InputBox from '~/components/elements/common/InputBox';

export default {
  components: {
    Modal,
    InputBox,
  },
  data() {
    return {
      tenantId: null,
      password: null,
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    send() {
      const { tenantId, password } = this;
      this.$emit('send', tenantId, password);
    },
    close() {
      this.tenantId = null;
      this.password = null;
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.m-Modal {
  @include m-Modal;
}
</style>
