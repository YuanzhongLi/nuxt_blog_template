<template>
  <div
    class="p-article"
    :class="{'p-article--sp': device.isMobile}"
  >
    <div
      class="p-article__head"
      :style="`background-image: url(${article.articleImageUrl});`"
    >
      <div class="p-article__headCnt">
        <h1 class="p-article__headTtl">
          {{ article.title }}
        </h1>
        <ul class="p-article__headList">
          <li class="p-article__headItem">
            <i class="p-article__headItemIcon fas fa-tag" />{{ article.subCategory }}
          </li>
          <li class="p-article__headItem">
            <i class="p-article__headItemIcon fas fa-clock" />{{ article.createdAt | moment('LTS') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="p-article__body">
      <div class="p-article__bodyWrap">
        <div
          class="p-article__bodyLeft"
          v-html="article.content"
        />
        <div class="p-article__bodyRight">
          <div
            v-if="!isLoggedIn"
            class="p-article__login"
          >
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
                v-for="(building, index) of recommendList"
                :key="`recomend${index}`"
              >
                <n-link
                  class="p-article__buildingAnchor"
                  :to="`/office/building-detail/${building.id}`"
                >
                  <div
                    class="p-article__buildingThumb"
                    :style="`background-image: url(${building.imageUrls && Object.values(building.imageUrls).length > 0 ? Object.values(building.imageUrls)[0] : noImgUrl});`"
                  />
                  <div class="p-article__buildingInfo">
                    <h1 class="p-article__buildingLabel">
                      {{ building.name }}
                    </h1>
                    <p class="p-article__buildingSub">
                      <i class="p-article__buildingSubIcon fas fa-subway" />{{ building.stationName }}徒歩{{ building.timeRequired }}分
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
      <div class="p-article__recommend">
        <h1 class="p-article__recommendHead">
          新着記事
        </h1>
        <ul class="p-article__recommendList">
          <li
            class="p-article__recommendItem"
            v-for="(article, index) of limitCount"
            :key="`article${index}`"
          >
            <n-link
              class="p-article__recommendAnchor"
              :to="`/article/page/${article.articleId}`"
            >
              <div
                class="p-article__recommendThumb"
                :style="`background-image: url(${article.articleImageUrl});`"
              />
              <div class="p-article__recommendInfo">
                <h1 class="p-article__recommendTtl">
                  {{ article.title }}
                </h1>
                <p
                  class="p-article__recommendTxt"
                  v-html="article.summary"
                />
                <time class="p-article__recommendTime">
                  <i class="p-article__recommendTimeIcon far fa-clock" />
                  {{ article.createdAt | moment('LTS') }}
                </time>
              </div>
            </n-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import siteinfo from '../../../mixins';
import structuredData from '../../../mixins/structuredData';

export default {
  mixins: [siteinfo, structuredData],
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: this.sdScriptTagList,
      title: `${this.getHeadTitle(this.article.title)}`,
      meta: [
        {
          name: 'description',
          content: this.pageDescription,
          hid: 'description',
        },
        ...this.getOgpTagList({
          title: this.article.title,
          description: this.pageDescription,
          image: this.article.articleImageUrl,
        }),
      ],
      link: [
        {
          rel: 'canonical',
          href: this.getEstieProductUrl(`/page/${this.article.id}`),
        },
      ],
    };
  },
  async asyncData({ app, params, error }) {
    const { id } = params;
    if (!id) {
      return error({
        statusCode: 404,
        message: 'Not Found',
      });
    }

    const e = {};
    const article = await app.$axios
      .$get(`/contentful/article/page/${id}`)
      .catch((err) => {
        e.statusCode = Number(err.message.split(' ').slice(-1)[0]);
        e.message = err.message;
        return null;
      });

    if (!article) {
      return error(e);
    }

    const articles = await app.$axios
      .$get('/contentful/article/all_article_header')
      .then(response => response.sort((a, b) => (a.articleId > b.articleId ? -1 : 1)));
    const recommendList = await app.$axios
      .$get('askings/recommend');
    return {
      article,
      articles,
      recommendList: recommendList.listing,
    };
  },
  middleware: ['injectDevice', 'injectTenant'],
  computed: {
    ...mapState(['device']),
    isLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
    limitCount() {
      return this.articles.slice(0, 4);
    },
    articlePublished() {
      return new Date(this.article.createdAt);
    },
    articleModified() {
      return new Date(this.article.updatedAt);
    },
    // このページの説明文
    // メタディスクリプションに用いるなどする
    pageDescription() {
      return 'estieが提供する記事';
    },
    // 構造化データを用意する
    sdScriptTagList() {
      return this.sdGetScriptTagList({
        newsArticle: this.sdNewsArticle({
          headline: this.article.title,
          description: this.pageDescription,
          datePublished: this.articlePublished,
          dateModified: this.articleModified,
          path: `/article/page/${this.id}`,
          imageUrl: this.article.articleImageUrl,
        }),
        breadcrumbList: this.sdBreadcrumbList([
          {
            path: '/',
            name: this.siteFullName,
          },
          {
            path: '/article',
            name: 'estie 記事一覧',
          },
          {
            path: `/article/page/${this.article.id}`,
            name: this.article.title,
          },
        ]),
        organization: this.sdOrganization,
      });
    },
    // パンくずリストの内容
    breadItemList() {
      // もしも記事ページだったら
      // 親カテゴリ (-> 子カテゴリ) -> 記事 のようにする
      return [
        {
          text: '記事一覧',
          link: '/article',
        },
        {
          text: this.postTitle,
          link: `/article/page/${this.id}`,
        },
      ];
    },
  },
  filters: {
    moment(date) {
      return moment(date).format('YYYY/MM/DD');
    },
  },
  layout: ctx => (ctx.isMobile ? 'cms_sp' : 'cms_pc'),
};
</script>

<style lang="scss" scoped>
.p-article {
  @include p-article;
}
</style>
