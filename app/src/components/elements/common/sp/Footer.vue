<template>
  <footer class="m-mobileFooter">
    <div class="m-mobileFooter__cnt">
      <nav>
        <div>
          <ul class="m-mobileFooter__list">
            <li class="m-mobileFooter__item">
              <nuxt-link
                class="m-mobileFooter__anchor"
                to="/"
              >
                ホーム
              </nuxt-link>
            </li>
            <li class="m-mobileFooter__item">
              <a
                class="m-mobileFooter__anchor"
                href="https://www.estie.co.jp/"
                target="_blank"
              >
                運営会社
              </a>
            </li>
            <li class="m-mobileFooter__item">
              <nuxt-link
                class="m-mobileFooter__anchor"
                to="/terms"
                target="_blank"
              >
                利用規約
              </nuxt-link>
            </li>
            <li class="m-mobileFooter__item">
              <nuxt-link
                class="m-mobileFooter__anchor"
                to="/privacy"
                target="_blank"
              >
                プライバシーポリシー
              </nuxt-link>
            </li>
            <li class="m-mobileFooter__item">
              <a
                class="m-mobileFooter__anchor"
                href="mailto:info@estie.co.jp"
              >
                お問い合わせ
              </a>
            </li>
            <li
              v-if="userType==1 || userType==2"
              class="m-mobileFooter__item"
            >
              <nuxt-link
                class="m-mobileFooter__anchor"
                :to="logoutLink"
              >
                ログアウト
              </nuxt-link>
            </li>
          </ul>
          <ul class="m-mobileFooter__list">
            <li class="m-mobileFooter__item">
              <a
                class="m-mobileFooter__sns"
                href="https://twitter.com/estiejp"
                target="_blank"
              >
                <i class="fab fa-twitter" />
              </a>
            </li>
            <li class="m-mobileFooter__item">
              <a
                class="m-mobileFooter__sns"
                href="https://www.instagram.com/estie.jp/?hl=ja"
                target="_blank"
              >
                <i class="fab fa-instagram" />
              </a>
            </li>
            <li class="m-mobileFooter__item">
              <a
                class="m-mobileFooter__sns"
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.estie.jp/"
                target="_blank"
              >
                <i class="fab fa-facebook" />
              </a>
            </li>
            <li class="m-mobileFooter__item">
              <a
                class="m-mobileFooter__sns"
                href="http://line.me/R/msg/text/?https://www.estie.jp/"
                target="_blank"
              >
                <i class="fab fa-line" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <small class="m-mobileFooter__copy">© estie Inc.</small>
  </footer>
</template>

<script>

export default {
  props: {
    userType: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    logoutLink() {
      const { userType } = this;
      if (userType === 1) return '/agent/logout';
      if (userType === 2) return '/tenant/logout';
      return '';
    },
  },
};
</script>

<style scoped lang="scss">
.m-mobileFooter {
  @include m-mobileFooter;
}
</style>
