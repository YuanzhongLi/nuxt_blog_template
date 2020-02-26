<template>
  <div>
    <SPBuildingDetail
      v-if="device.isMobile"
      :building="building"
      :avatar-url="avatarUrl"
      :is-logged-in="isLoggedIn"
      :similar-buildings="similarBuildings"
      @asking-like-by-id="askingLikeById"
      @asking-dislike-by-id="askingDislikeById"
    />
    <PCBuildingDetail
      v-else
      :building="building"
      :is-logged-in="isLoggedIn"
      :avatar-url="avatarUrl"
      :similar-buildings="similarBuildings"
      @asking-like-by-id="askingLikeById"
      @asking-dislike-by-id="askingDislikeById"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import siteinfo from '~/mixins';
import notification from '~/mixins/notification';
import webpush from '~/mixins/webpush';
import tenantEmailSignup from '~/mixins/tenantEmailSignup';

import { isValidPositiveInteger } from '~/utils/validation';
import PCBuildingDetail from '~/components/templates/tenant_pc/building-detail';
import SPBuildingDetail from '~/components/templates/tenant_sp/building-detail';
import log from '~/utils/log';

export default {
  layout: ctx => (ctx.isMobile ? 'tenant_sp' : 'tenant_pc'),
  components: {
    PCBuildingDetail,
    SPBuildingDetail,
  },
  mixins: [siteinfo, notification, tenantEmailSignup, webpush],
  middleware: ['injectTenant', 'injectDevice'],
  validate({ params }) {
    if (!params.id) {
      return false;
    }

    // 整数かつ正の数のみ
    if (!isValidPositiveInteger(params.id)) {
      log.warn(`指定された ID が不正: ${params.id}`);
      return false;
    }
    return true;
  },
  async asyncData({
    app, store, params, error,
  }) {
    try {
      const client = app.$axios.withAccessToken(store.state.tenantToken);

      const [
        building,
        similarBuildings,
      ] = await Promise.all([
        client.$get(`/buildings/search/${params.id}`),
        client.$get('/askings/similar', {
          params: {
            'buildingId': `${params.id}`,
          },
        }),
      ]);
      if (!building) {
        return error({
          statusCode: 404,
          message: 'Not Found',
        });
      }
      return {
        building: building.building,
        similarBuildings: similarBuildings.listing,
      };
    } catch (err) {
      log.error(err);
      return error({ statusCode: 500, message: 'サーバーエラーです。' });
    }
  },
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  computed: {
    ...mapState(['device', 'tenant', 'layout']),
    isLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
  },
  data() {
    return {
      avatarUrl: '',
    };
  },
  methods: {
    timestamp() {
      return JSON.stringify(Date.now());
    },
    async getBuildingById() {
      let err = false;
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const building = await client
        .$get(`/buildings/search/${this.building.id}`)
        .catch((e) => {
          log.error(e);
          err = false;
        });
      if (err) {
        this.closeLoadingModal();
        this.setNotificationMessage('error', 'サーバーエラーです');
        return '';
      }
      return building;
    },
    async getSimilarBuildingsByBuildingId() {
      let err = false;
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const similarBuildings = await client
        .$get('/askings/similar', {
          params: {
            'buildingId': `${this.building.id}`,
          },
        })
        .catch((e) => {
          log.error(e);
          err = false;
        });
      if (err) {
        this.closeLoadingModal();
        this.setNotificationMessage('error', 'サーバーエラーです');
        return '';
      }
      return similarBuildings.listing;
    },
    async askingLikeById(askingId) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      const likeStatus = 1;
      const error = await this.handleLikeAPIById(askingId, likeStatus);
      if (error) {
        this.setNotificationMessage('error', '興味ありに失敗しました');
        this.closeLoadingModal();
        return '';
      }
      const getBuilding = await this.getBuildingById();
      this.building = getBuilding.building;
      this.setNotificationMessage('success', '興味ありに登録しました');
      this.closeLoadingModal();
      return '';
    },
    async askingDislikeById(askingId) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      const likeStatus = 0;
      const error = await this.handleLikeAPIById(askingId, likeStatus);
      if (error) {
        this.setNotificationMessage('error', '興味なしに失敗しました');
        this.closeLoadingModal();
        return '';
      }
      const getBuilding = await this.getBuildingById();
      const getSimilarBuildings = await this.getSimilarBuildingsByBuildingId();
      this.building = getBuilding.building;
      this.similarBuildings = getSimilarBuildings;
      this.setNotificationMessage('success', '興味なしに登録しました');
      this.closeLoadingModal();
      return '';
    },
    async handleLikeAPIById(askingId, isLike) {
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const requestBody = {
        askingId,
        isLike,
      };
      const { error } = await client.$post('askings/like', requestBody);
      return error;
    },
  },
  head() {
    return {
      title: this.getHeadTitle(`${this.building.name}`),
      meta: [{ name: 'robots', content: 'noindex' }],
    };
  },
};
</script>
