<template>
  <footer class="m-pcFooter">
    <div class="m-pcFooter__cnt">
      <nav>
        <div>
          <ul class="m-pcFooter__list">
            <li class="m-pcFooter__item">
              <nuxt-link
                class="m-pcFooter__anchor"
                to="/"
              >
                ホーム
              </nuxt-link>
            </li>
            <li class="m-pcFooter__item">
              <a
                class="m-pcFooter__anchor"
                href="https://www.estie.co.jp/"
                target="_blank"
              >
                運営会社
              </a>
            </li>
            <li class="m-pcFooter__item">
              <nuxt-link
                class="m-pcFooter__anchor"
                to="/terms"
                target="_blank"
              >
                利用規約
              </nuxt-link>
            </li>
            <li class="m-pcFooter__item">
              <nuxt-link
                class="m-pcFooter__anchor"
                to="/privacy"
                target="_blank"
              >
                プライバシーポリシー
              </nuxt-link>
            </li>
            <li class="m-pcFooter__item">
              <a
                class="m-pcFooter__anchor"
                href="mailto:info@estie.co.jp"
              >
                お問い合わせ
              </a>
            </li>
          </ul>
          <ul class="m-pcFooter__list">
            <li class="m-pcFooter__item">
              <a
                class="m-pcFooter__sns"
                href="https://twitter.com/estiejp"
                target="_blank"
              >
                <i class="fab fa-twitter" />
              </a>
            </li>
            <li class="m-pcFooter__item">
              <a
                class="m-pcFooter__sns"
                href="https://www.instagram.com/estie.jp/?hl=ja"
                target="_blank"
              >
                <i class="fab fa-instagram" />
              </a>
            </li>
            <li class="m-pcFooter__item">
              <a
                class="m-pcFooter__sns"
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.estie.jp/"
                target="_blank"
              >
                <i class="fab fa-facebook" />
              </a>
            </li>
            <li class="m-pcFooter__item">
              <a
                class="m-pcFooter__sns"
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
    <small class="m-pcFooter__copy">© estie Inc.</small>
  </footer>
</template>

<style scoped lang="scss">
.m-pcFooter {
  @include m-pcFooter;
}
</style>
