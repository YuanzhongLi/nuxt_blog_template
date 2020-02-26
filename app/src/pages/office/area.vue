<template>
  <div>
    <AreaSP
      v-if="device.isMobile"
      :ward="ward"
      :prefecture="prefecture"
      :dismiss="dismiss"
      :like="like"
      :search="search"
    />
    <AreaPC
      v-else
      :offered-listing="offeredListing"
      :dismiss="dismiss"
      :like="like"
      :ward="ward"
      :prefecture="prefecture"
      :search="search"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AreaPC from '~/components/templates/office_pc/area';
import AreaSP from '~/components/templates/office_sp/area';
import notification from '~/mixins/notification';

export default {
  components: {
    AreaPC,
    AreaSP,
  },
  layout: ctx => (ctx.isMobile ? 'tenant_sp' : 'tenant_pc'),
  middleware: ['injectDevice', 'injectTenant'],
  mixins: [notification],
  computed: {
    ...mapState(['device']),
  },
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  async asyncData(
    {
      app,
      store,
      params,
      error,
    },
  ) {
    try {
      const client = app.$axios.withAccessToken(store.state.tenantToken);
      const offeredListing = await client.$get('askings/recommend');
      const { prefectureName, wardName } = params;
      const { prefecture } = prefectureName ? await client.$get(`prefectures/name/${prefectureName}`) : {};
      const { ward } = wardName ? await client.$get(`wards/name/${wardName}`) : {};
      if (ward) {
        store.commit('search/addLocation', { target: 'ward', value: Object.assign(ward, { type: 'ward' }) });
      } else if (prefecture) {
        store.commit('search/addLocation', { target: 'prefecture', value: Object.assign(prefecture, { type: 'prefecture' }) });
      }
      return {
        offeredListing: offeredListing.listing,
        prefecture,
        ward,
      };
    } catch (e) {
      return error({ statusCode: 404, message: 'ページが見つかりません' });
    }
  },
  async created() {
    if (process.client) {
      this.openLoadingModal();
      await this.$store.dispatch('search/search');
      this.closeLoadingModal();
    }
  },
  methods: {
    async search() {
      this.openLoadingModal();
      let path;
      if (this.conditions.prefectures.length + this.conditions.wards.length === 1) {
        if (this.conditions.prefectures.length === 1) {
          const res = await this.$axios.get(`/prefectures/${this.conditions.prefectures[0].id}`);
          path = `/office/${res.data.prefecture.enName}/result`;
        } else {
          const wardRes = await this.$axios.get(`/wards/${this.conditions.wards[0].id}`);
          const prefectureRes = await this.$axios.get(`/prefectures/${wardRes.data.ward.prefectureId}`);
          path = `/office/${prefectureRes.data.prefecture.enName}/${wardRes.data.ward.enName}/result`;
        }
        if (path === this.$route.path) {
          await this.$store.dispatch('search/search');
        } else {
          this.$router.push(path);
        }
      } else {
        await this.$store.dispatch('search/search');
      }
      this.closeLoadingModal();
    },
    async handleLikeAPI(askingId, isLike) {
      const { tenantId } = this.$store.state.tenant;
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const requestbody = {
        tenantId,
        askingId,
        isLike,
      };
      const { error } = await client.$post('/askings/like', requestbody);
      return error;
    },
    async like(id) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const isLike = 1;
      try {
        await this.handleLikeAPI(id, isLike);
        this.setNotificationMessage('success', '興味ありに登録しました');
        const [offeredListing] = await Promise.all([
          client.$get('askings/recommend'),
        ]);
        this.offeredListing = offeredListing.listing;
      } catch (error) {
        this.setNotificationMessage('error', '興味ありに失敗しました');
        this.closeLoadingModal();
      }
      this.closeLoadingModal();
    },
    async dismiss(id) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      try {
        const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
        const isLike = 0;
        await this.handleLikeAPI(id, isLike);
        const [offeredListing] = await Promise.all([
          client.$get('askings/recommend'),
        ]);
        this.setNotificationMessage('success', '興味なしに登録しました');
        this.offeredListing = offeredListing.listing;
      } catch (error) {
        this.setNotificationMessage('error', '興味なしに失敗しました');
      }
      this.closeLoadingModal();
    },
  },
};
</script>
