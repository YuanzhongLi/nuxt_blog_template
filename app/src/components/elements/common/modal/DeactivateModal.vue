<template>
  <modal
    v-if="isOpen"
    @left-func="deactivate"
    @close="close"
  >
    <h2 slot="header">
      パスワードを入力
    </h2>
    <div slot="body">
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
    deactivate() {
      const { password } = this;
      this.$emit('deactivate', password);
    },
    close() {
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
