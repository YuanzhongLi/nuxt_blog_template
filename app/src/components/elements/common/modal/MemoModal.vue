<template>
  <modal
    @left-func="save"
    @close="close"
  >
    <h2 slot="header">
      メモ欄
    </h2>
    <div slot="body">
      <TextAreaBox
        label="その他ご要望"
        :label-content="content"
        @input="content = $event"
        placeholder="ご自由にご記入ください"
      />
    </div>
    <span slot="leftButtonLabel">
      保存
    </span>
  </modal>
</template>

<script>
import Modal from './index';
import TextAreaBox from '~/components/elements/common/TextAreaBox';

export default {
  components: {
    Modal,
    TextAreaBox,
  },
  data() {
    return {
      content: this.currentContent,
    };
  },
  props: {
    currentContent: {
      type: String,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
  },
  methods: {
    save() {
      const { content } = this;
      this.$emit('save', content);
    },
  },
};
</script>

<style scoped lang="scss">
.m-Modal {
  @include m-Modal;
}
</style>
