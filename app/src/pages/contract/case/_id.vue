<template>
  <div
    class="p-article"
    :class="{'p-article--sp': device.isMobile}"
  >
    <div
      class="p-article__head"
      :style="`background-image: url(${contractCase.headerImageUrl});`"
    >
      <div class="p-article__headCnt">
        <h1 class="p-article__headTtl">
          {{ contractCase.title }}
        </h1>
        <ul class="p-article__headList">
          <li class="p-article__headItem">
            <i class="p-article__headItemIcon fas fa-tag" />成約事例
          </li>
          <li class="p-article__headItem">
            <i class="p-article__headItemIcon fas fa-clock" />{{ contractCase.createdAt | moment('LTS') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="p-article__body">
      <div class="p-article__bodyWrap">
        <div
          class="p-article__bodyLeft"
          v-html="contractCase.article"
        />
        <div class="p-article__bodyRight">
          <div class="p-article__login">
            <h1 class="p-article__loginTtl">
              最短2分で登録完了<br>様々な物件オファーを受け取ろう！
            </h1>
            <ul class="p-article__loginList">
              <li class="p-article__loginItem">
                <nuxt-link
                  class="p-article__loginItemAnchor p-article__loginItemAnchor--signup"
                  :to="'/tenant/signup'"
                >
                  新規登録
                </nuxt-link>
              </li>
              <li class="p-article__loginItem">
                <nuxt-link
                  class="p-article__loginItemAnchor p-article__loginItemAnchor--login"
                  :to="'/tenant/login'"
                >
                  ログイン
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="p-article__building">
            <div class="p-article__buildingHead">
              <h1 class="p-article__buildingTtl">
                おすすめ物件
              </h1>
              <nuxt-link
                :to="'/office/e-map'"
                class="p-article__buildingMore"
              >
                もっと見る
              </nuxt-link>
            </div>
            <ul class="p-article__buildingList">
              <li
                class="p-article__buildingItem"
                v-for="(recommend, index) of recommendList"
                :key="`recommend${index}`"
              >
                <n-link
                  class="p-article__buildingAnchor"
                  :to="`/article/page/${recommend.id}`"
                >
                  <div
                    class="p-article__buildingThumb"
                    :style="`background-image: url(${recommend.buildingImgUrl1});`"
                  />
                  <div class="p-article__buildingInfo">
                    <h1 class="p-article__buildingLabel">
                      {{ recommend.name }}
                    </h1>
                    <p class="p-article__buildingSub">
                      <i class="p-article__buildingSubIcon fas fa-subway" />{{ recommend.nearestStation }}徒歩{{ recommend.timeRequired }}分
                    </p>
                  </div>
                </n-link>
              </li>
            </ul>
          </div>
          <nuxt-link
            v-if="!device.isMobile"
            :to="'/office/e-map'"
            class="p-article__emap"
          >
            <img
              class="p-article__emapImg"
              src="~assets/images/article/emap.png"
            >
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  filters: {
    moment(date) {
      return moment(date).format('YYYY/MM/DD');
    },
  },
  layout: ctx => (ctx.isMobile ? 'cms_sp' : 'cms_pc'),
  async asyncData({ app, params, error }) {
    const { id } = params;
    if (!id) {
      return error({
        statusCode: 404,
        message: 'Not Found',
      });
    }

    const e = {};
    const contractCase = await app.$axios
      .$get(`/contentful/contract/case/${id}`)
      .catch((err) => {
        e.statusCode = Number(err.message.split(' ').slice(-1)[0]);
        e.message = err.message;
        return null;
      });
    if (!contractCase) {
      return error(e);
    }
    const recommendList = await app.$axios
      .$get(`tenant/get_listing_offers/${5}`);
    return {
      contractCase,
      recommendList,
    };
  },
  middleware: 'injectDevice',
  computed: {
    ...mapState(['device']),
  },
};
</script>

<style lang="scss" scoped>
.p-article {
  @include p-article;
}
</style>
