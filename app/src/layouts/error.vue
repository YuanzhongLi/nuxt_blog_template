<template>
  <main class="p-error">
    <header class="header">
      <div class="header__cnt">
        <h1 class="header__cntLogo">
          estie
        </h1>
      </div>
    </header>
    <section
      class="p-error__cnt"
      :class="{ 'p-error__cnt--sp': device.isMobile }"
    >
      <h1
        class="p-error__cntTtl"
        v-if="isNotFound"
      >
        404: ページが見つかりません
      </h1>
      <h1
        class="p-error__cntTtl"
        v-else-if="isBadRequest"
      >
        400: リクエストの形式が間違っています
      </h1>
      <h1
        class="p-error__cntTtl"
        v-else-if="isForbiddenRequest"
      >
        403: 禁止されたアクセスです
      </h1>
      <h1
        class="p-error__cntTtl"
        v-else-if="isServerError"
      >
        {{ error.statusCode }}: サーバーエラーが発生しました
      </h1>
      <h1
        class="p-error__cntTtl"
        v-else
      >
        {{ error.statusCode }}: エラーが発生しました
      </h1>
      <nuxt-link
        class="p-error__cntAnchor"
        to="/"
      >
        ホーム
      </nuxt-link>
    </section>
    <MobileFooter v-if="device.isMobile" />
    <GlobalFooter v-else />
  </main>
</template>

<script>
import { mapState } from 'vuex';
import MobileFooter from '~/components/elements/common/sp/Footer';
import GlobalFooter from '~/components/elements/common/GlobalFooter';

export default {
  components: {
    MobileFooter,
    GlobalFooter,
  },
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(['device']),
    isNotFound() {
      return this.error.statusCode === 404;
    },
    isBadRequest() {
      return this.error.statusCode === 400;
    },
    isForbiddenRequest() {
      return this.error.statusCode === 403;
    },
    isServerError() {
      return this.error.statusCode >= 500;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  @include header;
}

.p-error {
  &__cnt {
    margin: 64px auto;
    padding: 64px;
    width: 1024px;
    background: #fff;
    border: 1px solid $element_border;
    border-radius: 4px;
    text-align: center;

    &--sp {
      margin: 64px 16px;
      padding: 64px 24px;
      width: auto;
    }

    &Ttl {
      margin-bottom: 32px;
      font-weight: bold;
      font-size: 2rem;
    }

    &Anchor {
      display: inline-block;
      padding: 16px 48px;
      background: #3e8bff;
      border: 0;
      border-radius: 4px;
      color: #fff;
      font-weight: 700;
      font-size: 1.4rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #3d7cda;
      }
    }
  }
}
</style>
