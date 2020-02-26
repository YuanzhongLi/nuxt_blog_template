<template>
  <main class="p-main">
    <Loading
      v-if="showLoadingModal"
    />
    <Notification
      v-if="errorMessage"
      icon="fas fa-exclamation-triangle"
      type="error"
      :close-message="this.resetNotificationMessage"
    >
      {{ errorMessage }}
    </Notification>
    <Notification
      v-if="successMessage"
      icon="fas fa-check-circle"
      type="success"
      :close-message="this.resetNotificationMessage"
    >
      {{ successMessage }}
    </Notification>
    <section class="o-cntSection m-unsubscribe">
      <h1 class="m-unsubscribe__ttl">
        退会
      </h1>
      <p class="m-unsubscribe__txt">
        本当に退会しますか？
      </p>
      <div class="m-unsubscribe__wrap">
        <nuxt-link
          class="m-unsubscribe__anchor m-unsubscribe__anchor--cancel"
          to="/tenant"
        >
          戻る
        </nuxt-link>
        <a
          class="m-unsubscribe__anchor m-unsubscribe__anchor--submit"
          @click="stopSubscription"
        >
          退会する
        </a>
      </div>
    </section>
  </main>
</template>

<script>
import siteinfo from '~/mixins';
import notification from '~/mixins/notification';

import log from '~/utils/log';

import Notification from '~/components/elements/common/Notification';
import Loading from '~/components/elements/common/Loading';

export default {
  components: {
    Notification,
    Loading,
  },
  mixins: [siteinfo, notification],
  middleware: ['injectTenant', 'tenantAuthenticated'],
  data() {
    return {
      showLoadingModal: false,
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async stopSubscription() {
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);

      const { error } = await client
        .$post('/tenant/unsubscribe')
        .catch((err) => {
          log.error(err);
          return {
            error: 'エラーが発生しました。info@estie.co.jpまで直接お問い合わせください。',
          };
        });

      this.showLoadingModal = false;

      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }

      this.$router.push({
        path: '/',
      });
    },
  },
  head() {
    return {
      title: this.getHeadTitle('退会'),
      meta: [{ name: 'robots', content: 'noindex' }],
    };
  },
};
</script>
