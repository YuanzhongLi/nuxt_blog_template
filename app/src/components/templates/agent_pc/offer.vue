<template>
  <section class="p-offer">
    <div class="p-offer__cnt">
      <h1 class="p-offer__ttl">
        オファー
      </h1>
      <InputBox
        class="p-offer__item"
        icon="fas fa-user-circle"
        id="budget"
        label="テナントID"
        input-type="number"
        @input="tenantId = $event"
        :label-content="tenantId || ''"
        placeholder="例：1234"
        :is-required="true"
      />
      <PdfUpload
        class="p-offer__item"
        @input="pdf = $event"
        :upload-file="pdf"
      />
      <TextAreaBox
        class="p-offer__item"
        label="一言コメント"
        @input="comment = $event"
        :label-content="comment"
        :is-required="true"
        placeholder="ご自由にご記入ください"
      />
      <div class="p-offer__submit">
        <button
          class="p-offer__submitBtn"
          @click="send"
        >
          オファーする
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import PdfUpload from '~/components/elements/offer/PdfUpload';
import InputBox from '~/components/elements/common/InputBox';
import TextAreaBox from '~/components/elements/common/TextAreaBox';

export default {
  components: {
    InputBox,
    TextAreaBox,
    PdfUpload,
  },
  computed: {
    ...mapState(['device', 'agent']),
  },
  data() {
    return {
      tenantId: this.$route.query.id,
      comment: '',
      pdf: null,
    };
  },
  methods: {
    send() {
      const { tenantId, comment, pdf } = this;
      this.$emit('send', tenantId, comment, pdf);
      this.pdf = null;
      this.tenantId = 0;
      this.comment = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.p-offer {
  @include p-offer;
}
</style>
