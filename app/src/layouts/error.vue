<template>
  <main>
    <header>
      <div>
        <h1>
          error page
        </h1>
      </div>
    </header>
    <section>
      <h1
        v-if="isNotFound"
      >
        404: ページが見つかりません
      </h1>
      <h1
        v-else-if="isBadRequest"
      >
        400: リクエストの形式が間違っています
      </h1>
      <h1
        v-else-if="isForbiddenRequest"
      >
        403: 禁止されたアクセスです
      </h1>
      <h1
        v-else-if="isServerError"
      >
        {{ error.statusCode }}: サーバーエラーが発生しました
      </h1>
      <h1
        v-else
      >
        {{ error.statusCode }}: エラーが発生しました
      </h1>
      <nuxt-link
        to="/"
      >
        ホーム
      </nuxt-link>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex';

export default {
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
