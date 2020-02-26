<template>
  <footer
    class="m-formFooter"
    :class="{'m-formFooter--sp': device.isMobile}"
  >
    <ul class="m-formFooter__list">
      <li class="m-formFooter__item">
        <a
          class="m-formFooter__anchor"
          href="https://www.estie.co.jp/"
          target="_blank"
        >
          運営会社
        </a>
      </li>
      <li class="m-formFooter__item">
        <a
          class="m-formFooter__anchor"
          href="/terms"
          target="_blank"
        >
          利用規約
        </a>
      </li>
      <li class="m-formFooter__item">
        <a
          class="m-formFooter__anchor"
          href="/privacy"
          target="_blank"
        >
          プライバシーポリシー
        </a>
      </li>
      <li class="m-formFooter__item">
        <a
          class="m-formFooter__anchor"
          href="mailto:info@estie.co.jp"
        >
          お問い合わせ
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['device']),
  },
};
</script>

<style lang="scss" scoped>
.m-formFooter {
  @include m-formFooter;
}
</style>
