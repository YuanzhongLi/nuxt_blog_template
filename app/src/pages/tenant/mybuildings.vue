<template>
  <div>
    <mybuildingsSP
      v-if="device.isMobile"
      :offers="offers"
      :askings="askings"
      @offer-asking-like-by-id="offerAskingLikeById"
      @offer-asking-dislike-by-id="offerAskingDislikeById"
      @create-download-log="createDownloadLog"
      :dismiss="dismiss"
    />
    <mybuildingsPC
      v-else
      :offers="offers"
      :askings="askings"
      @offer-asking-like-by-id="offerAskingLikeById"
      @offer-asking-dislike-by-id="offerAskingDislikeById"
      @create-download-log="createDownloadLog"
      :dismiss="dismiss"
    />
  </div>
</template>

<script>
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import { mapState } from 'vuex';
import mybuildingsPC from '~/components/templates/tenant_pc/mybuildings';
import mybuildingsSP from '~/components/templates/tenant_sp/mybuildings';
import notification from '~/mixins/notification';
import log from '~/utils/log';


export default {
  layout: ctx => (ctx.isMobile ? 'tenant_sp' : 'tenant_pc'),
  components: {
    mybuildingsPC,
    mybuildingsSP,
  },
  computed: {
    ...mapState(['device', 'tenant']),
  },
  mixins: [notification],
  middleware: ['injectDevice', 'injectTenant', 'tenantAuthenticated'],
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  data() {
    return {
      offers: [],
      askings: [],
    };
  },
  async asyncData({ app, store }) {
    const client = app.$axios.withAccessToken(store.state.tenantToken);
    const [
      offers,
      askings,
    ] = await Promise.all([
      client.$get('offer_askings'),
      client.$get('askings/like'),
    ]);
    return {
      offers: offers.offers,
      askings: askings.askings,
    };
  },
  methods: {
    async offerAskingLikeById(offerAskingId) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      const likeStatus = 1;
      const error = await this.handleLikeAPIById(offerAskingId, likeStatus);
      if (error) {
        this.setNotificationMessage('error', '興味ありに失敗しました');
        this.closeLoadingModal();
        return '';
      }
      const getOffers = await this.getOfferAskings();
      this.offers = getOffers.offers;
      this.setNotificationMessage('success', '興味ありに登録しました');
      this.closeLoadingModal();
      return '';
    },
    async offerAskingDislikeById(offerAskingId) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      const likeStatus = 0;
      const error = await this.handleLikeAPIById(offerAskingId, likeStatus);
      if (error) {
        this.setNotificationMessage('error', '興味なしに失敗しました');
        this.closeLoadingModal();
        return '';
      }
      const getOffers = await this.getOfferAskings();
      this.offers = getOffers.offers;
      this.setNotificationMessage('success', '興味なしに登録しました');
      this.closeLoadingModal();
      return '';
    },
    async getOfferAskings() {
      let err = false;
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const offers = await client
        .$get('offer_askings')
        .catch((e) => {
          log.error(e);
          err = false;
        });
      if (err) {
        this.closeLoadingModal();
        this.setNotificationMessage('error', 'サーバーエラーです');
        return '';
      }
      return offers;
    },
    async handleLikeAPIById(offerAskingId, likeStatus) {
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const requestBody = {
        offerAskingId,
        likeStatus,
      };
      const { error } = await client.$put('offer_askings/like', requestBody);
      return error;
    },
    async dismiss(askingId) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const requestBody = {
        askingId,
        isLike: 0,
      };
      const { error } = await client.$post('askings/like', requestBody);
      if (!error) {
        const { askings } = await client.$get('askings/like');
        this.askings = askings;
      }
      this.setNotificationMessage('success', '興味なしに登録しました');
      this.closeLoadingModal();
      return error;
    },
    async createDownloadLog(pdfOfferId) {
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const { error } = await client.$post('/tenant/create_download_log', {
        offerId: pdfOfferId,
      })
        .catch((err) => {
          log.error(err);
          return { error: '変更に失敗しました' };
        });
      if (error) {
        this.setNotificationMessage('error', error);
      }
    },
  },
};
</script>
