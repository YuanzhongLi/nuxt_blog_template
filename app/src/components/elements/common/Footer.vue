<template>
  <footer class="a-footer">
    <ul class="a-footer__list">
      <li class="a-footer__item">
        <nuxt-link
          class="a-footer__anchor"
          to="/terms"
          target="_blank"
        >
          利用規約
        </nuxt-link>
      </li>
      <li class="a-footer__item">
        <nuxt-link
          class="a-footer__anchor"
          to="/privacy"
          target="_blank"
        >
          プライバシーポリシー
        </nuxt-link>
      </li>
      <li class="a-footer__item">
        <a
          class="a-footer__anchor"
          href="https://www.estie.co.jp/"
          target="_blank"
        >
          運営会社
        </a>
      </li>
    </ul>
    <p class="a-footer__copy">
      © estie Inc.
    </p>
  </footer>
</template>

<style scoped lang="scss">
.a-footer {
  @include a-footer;
}
</style>
