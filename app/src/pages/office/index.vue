<template>
  <div>
    <OfficeSP
      v-if="device.isMobile"
      :articles="sliceArticles"
      :lists="popularAreaList"
      :offered-listing="offeredListing"
      :dismiss="dismiss"
      :like="like"
      :search="search"
      :is-logged-in="isLoggedIn"
    />
    <OfficePC
      v-else
      :articles="sliceArticles"
      :lists="popularAreaList"
      :offered-listing="offeredListing"
      :dismiss="dismiss"
      :like="like"
      :search="search"
      :is-logged-in="isLoggedIn"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import OfficePC from '~/components/templates/office_pc';
import OfficeSP from '~/components/templates/office_sp';
import notification from '~/mixins/notification';

export default {
  layout: ctx => (ctx.isMobile ? 'tenant_sp' : 'tenant_pc'),
  components: {
    OfficePC,
    OfficeSP,
  },
  mixins: [notification],
  data() {
    const popularAreaList = [
      {
        area: '渋谷区',
        imageUrl: '/area/shibuya-ku.png',
        path: '/office/tokyo/shibuya-ku/result',
      },
      {
        area: '新宿区',
        imageUrl: '/area/shinjuku-ku.png',
        path: '/office/tokyo/shinjuku-ku/result',
      },
      {
        area: '千代田区',
        imageUrl: '/area/chiyoda-ku.png',
        path: '/office/tokyo/chiyoda-ku/result',
      },
      {
        area: '中央区',
        imageUrl: '/area/chuo-ku.png',
        path: '/office/tokyo/chuo-ku/result',
      },
      {
        area: '港区',
        imageUrl: '/area/minato-ku.png',
        path: '/office/tokyo/minato-ku/result',
      },
      {
        area: '品川区',
        imageUrl: '/area/shinagawa-ku.png',
        path: '/office/tokyo/shinagawa-ku/result',
      },
    ];
    return {
      popularAreaList,
      offeredListing: [],
    };
  },
  async asyncData({ app, store }) {
    const articles = await app.$axios
      .$get('/contentful/article/all_article_header')
      .then(response => response.sort((a, b) => (a.articleId > b.articleId ? -1 : 1)));
    const client = app.$axios.withAccessToken(store.state.tenantToken);
    const offeredListing = await client.$get('askings/recommend');
    return {
      articles,
      offeredListing: offeredListing.listing,
    };
  },
  middleware: ['injectDevice', 'injectTenant'],
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  created() {
    if (process.client) {
      this.$store.dispatch('search/setStorage');
    }
  },
  computed: {
    ...mapState(['device']),
    ...mapState('search', ['conditions']),
    sliceArticles() {
      return this.articles.slice(0, 8);
    },
    isLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
  },
  methods: {
    async search() {
      if (this.conditions.prefectures.length + this.conditions.wards.length === 1) {
        if (this.conditions.prefectures.length === 1) {
          const res = await this.$axios.get(`/prefectures/${this.conditions.prefectures[0].id}`);
          this.$router.push(`/office/${res.data.prefecture.enName}/result`);
        } else {
          const wardRes = await this.$axios.get(`/wards/${this.conditions.wards[0].id}`);
          const prefectureRes = await this.$axios.get(`/prefectures/${wardRes.data.ward.prefectureId}`);
          this.$router.push(`/office/${prefectureRes.data.prefecture.enName}/${wardRes.data.ward.enName}/result`);
        }
      } else {
        this.$router.push('/office/result');
      }
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
      }
      this.closeLoadingModal();
    },
    async dismiss(id) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const isLike = 0;
      try {
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
