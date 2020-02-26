<template>
  <div v-if="device.isMobile">
    <SPComponent
      :first-recommend-list="firstRecommendList"
      :articles="sliceArticles"
      :all-faq="sliceFaq"
      :signup-email="signupEmail"
    />
  </div>
  <div v-else>
    <PCComponent
      :first-recommend-list="firstRecommendList"
      :second-recommend-list="secondRecommendList"
      :third-recommend-list="thirdRecommendList"
      :signup="signup"
      :signup-email="signupEmail"
      :upload-img="uploadImg"
      :avatar-url="avatarUrl"
      :stations="stations"
      :articles="sliceArticles"
      :all-faq="sliceFaq"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import log from '~/utils/log';
import siteinfo from '~/mixins';
import tenantSignup from '~/mixins/tenantSignup';
import tenantEmailSignup from '~/mixins/tenantEmailSignup';
import notification from '~/mixins/notification';
import webpush from '~/mixins/webpush';
import PCComponent from '~/components/templates/lp_pc';
import SPComponent from '~/components/templates/lp_sp';

export default {
  vue: {
    config: {
      devtools: true,
    },
  },
  layout: 'default',
  components: {
    PCComponent,
    SPComponent,
  },
  mixins: [siteinfo, notification, tenantSignup, tenantEmailSignup, webpush],
  middleware: ['injectAgent', 'injectTenant', 'injectDevice'],
  async asyncData({ app, store }) {
    const client = app.$axios.withAccessToken(store.state.tenantToken);
    const [stationsList, offeredListing] = await Promise.all([
      client.$get('stations'),
      client.$get('askings/recommend/?buildingPerPage=12'),
    ]);
    const recommendList = offeredListing.listing;
    const firstRecommendList = recommendList.slice(0, 4);
    const secondRecommendList = recommendList.slice(4, 8);
    const thirdRecommendList = recommendList.slice(8, 12);
    const articles = await app.$axios
      .$get('/contentful/article/all_article_header')
      .then(response => response.sort((a, b) => (a.articleId > b.articleId ? -1 : 1)));
    const allFaq = await app.$axios
      .$get('/contentful/faq')
      .then(response => response.sort((a, b) => (a.id < b.id ? -1 : 1)));
    return {
      firstRecommendList,
      secondRecommendList,
      thirdRecommendList,
      stations: stationsList.stations,
      articles,
      allFaq,
    };
  },
  computed: {
    ...mapState(['device']),
    sliceArticles() {
      return this.articles.slice(0, 4);
    },
    sliceFaq() {
      return this.allFaq.slice(0, 4);
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
    async uploadImg(file) {
      this.resetNotificationMessage();
      if (file.size > 1000 * 1024) {
        this.setNotificationMessage('error', '画像は1MB以下をアップロードしてください');
        return;
      }
      const fileType = file.name.split('.').slice(-1)[0];

      const fileName = `tenant_${this.timestamp()}_.${fileType}`;
      const formData = new FormData();
      formData.append('fileName', fileName);
      formData.append('image', file);

      this.openLoadingModal();
      const { imgUrl, error } = await this.$axios.$post('/auth/upload_img_to_s3/tenant', formData)
        .catch((err) => {
          log.error(err);
          return { error: 'アップロードに失敗しました' };
        });

      this.closeLoadingModal();
      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }

      if (!imgUrl) {
        return;
      }
      this.avatarUrl = imgUrl;
    },
  },
};
</script>
