import path from 'path';
import axios from 'axios';
import AppConfig from './config';

const proxySetting = () => {
  // アプリケーションと同ホストならプロキシ設定は行わない
  if (AppConfig.API_HOST_URL.startsWith(AppConfig.HOST_URL)) {
    return {};
  }

  return {
    '/api': {
      target: AppConfig.API_HOST_URL,
      pathRewrite: {
        '^/api/': '/',
      },
    },
  };
};

export default {
  mode: 'universal',
  srcDir: 'src/',
  /*
   ** Headers of the page
   */
  proxy: proxySetting(),
  head: {
    title: 'estie（エスティ）｜賃貸オフィス・賃貸事務所をシンプルに検索',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      {
        name: 'keywords',
        content:
          'estie,エスティ,エスティー,オフィス賃貸,賃貸オフィス,オフィス,都内,東京',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'estie（エスティ）で快適でシンプルなオフィス探し体験を。希望条件を入力するだけで不動産のプロが物件候補を厳選・提案してくれます。これまでのような面倒なネット検索は不要。複数のエージェントが待機しているため、希望にぴったりの物件が手軽・スピーディに見つかります。',
      },
      {
        property: 'og:title',
        content: 'estie | オフィス探しをシンプルに。',
      },
      {
        property: 'og:description',
        content:
          '快適でシンプルなオフィス探し体験を。希望条件を入力するだけで不動産のプロが物件候補を厳選・提案してくれます。これまでのような面倒なネット検索は不要。複数のエージェントが待機しているため、希望にぴったりの物件が手軽・スピーディに見つかります。',
      },
      {
        property: 'og:image',
        content:
          'https://prd-estie.s3-ap-northeast-1.amazonaws.com/web/img/og.jpg',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://www.estie.jp',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:image',
        content:
          'https://prd-estie.s3-ap-northeast-1.amazonaws.com/web/img/og.jpg',
      },
      {
        name: 'twitter:site',
        content: '@estiejp',
      },
      {
        name: 'twitter:title',
        content: 'estie | オフィス探しをシンプルに。',
      },
      {
        name: 'twitter:url',
        content: 'https://www.estie.jp/',
      },
      {
        name: 'twitter:description',
        content:
          '快適でシンプルなオフィス探し体験を。希望条件を入力するだけで不動産のプロが物件候補を厳選・提案してくれます。これまでのような面倒なネット検索は不要。複数のエージェントが待機しているため、希望にぴったりの物件が手軽・スピーディに見つかります。',
      },
      {
        'http-equiv': 'X-UA-Compatible',
        'content': 'IE=edge',
      },
    ],
    script: [
      {
        src: 'https://cdn.polyfill.io/v2/polyfill.min.js',
      },
      {
        src: 'https://kit.fontawesome.com/f5ba474915.js',
        crossorigin: 'anonymous',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/yakuhanjp@3.2.0/dist/css/yakuhanjp.min.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.6/css/swiper.min.css',
      },
      {
        rel: 'canonical',
        href: 'https://www.estie.jp/',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff',
  },

  /*
   ** Global CSS
   */
  css: ['@/assets/scss/foundation/reset.css'],
  env: AppConfig,
  styleResources: {
    sass: [path.resolve(__dirname, 'src', 'assets', 'scss', 'style.scss')],
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
    src: '~/plugins/axios',
    ssr: true,
  },
  {
    src: '~/plugins/referrer.js',
    ssr: false,
  },
  {
    src: '~/plugins/element-ui.js',
    ssr: true,
  },
  {
    src: '~/plugins/lazyload.js',
    ssr: false,
  },
  {
    src: '~/plugins/vue2-editor.js',
    ssr: false,
  },
  {
    src: '~/plugins/swiper.js',
    ssr: false,
  },
  {
    src: '~/plugins/vue2-google-maps.js',
    ssr: true,
  },
  {
    src: '~/plugins/vue-ctk-date-time-picker',
    ssr: false,
  },
  {
    src: '~/plugins/vue-video-player',
    ssr: false,
  },
  {
    src: '~plugins/vue-slider-component.js',
    ssr: false,
  },
  {
    src: '~/plugins/infiniteloading',
    ssr: false,
  },
  {
    src: '~plugins/vue-multiselect.js',
    ssr: false,
  },
  '~/plugins/vue2-perfect-scrollbar',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/device',
    [
      '@nuxtjs/google-tag-manager',
      {
        id: AppConfig.GTM_CONTAINER_ID,
        pageTracking: true,
      },
    ],
    ['@nuxtjs/axios'],
    ['@nuxtjs/proxy'],
    ['@nuxtjs/moment', ['ja']],
    ['@nuxtjs/style-resources'],
    ['@nuxtjs/sitemap'],
    ['nuxt-robots-module'],
  ],
  sitemap: {
    path: '/sitemap.xml',
    defaults: {
      changefreq: 'weekly',
      priority: 0.9,
    },
    hostname: AppConfig.HOST_URL,
    cacheTime: 1000 * 60 * 15, // 15min毎に再作成するよう設定
    exclude: [
      // 除外するURL
      '/admin',
      '/admin/*',
      '/agent',
      '/agent/*',
      '/tenant',
    ],
    routes() {
      /* eslint-disable no-console */
      // 動的サイト情報の取得
      return Promise.all([
        axios.get(
          `${AppConfig.API_HOST_URL}/contentful/article/all_article_header`,
        ), // get article page
        axios.get(`${AppConfig.API_HOST_URL}/buildings/ids`), // building detail page
      ]).then((res) => {
        const articleUrls = res[0].data.map(article => ({
          url: `/article/page/${article.articleId}`,
          changefreq: 'weekly',
          priority: 0.5,
        }));
        const buildingDetailUrls = res[1].data.data.map(buidingId => ({
          url: `/office/building-detail/${buidingId}`,
          changefreq: 'daily',
          priority: 0.7,
        }));
        return articleUrls.concat(buildingDetailUrls);
      }).catch((err) => {
        console.log(err);
        return [];
      });
    },
  },
  robots: {
    UserAgent: '*',
    Disallow: ['/admin/', '/agent/', '/tenant/'],
    Allow: ['/tenant/building-detail/'],
    Sitemap: [`${AppConfig.ESTIE_PRODUCT_URL}/sitemap.xml`],
  },
  build: {
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            style: false,
          },
        ],
      ],
    },
    postcss: {
      plugins: {
        'postcss-preset-env': {
          autoprefixer: {
            grid: true,
          },
        },
      },
    },
    transpile: [/^vue2-google-maps($|\/)/],

    vendor: ['vue2-google-maps', 'vue-ctk-date-time-picker'],

    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        // Run ESLint on save
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            cache: true,
          },
        });

        // Run Stylelint on save
        // eslint-disable-next-line global-require, import/no-extraneous-dependencies
        const StylelintBarePlugin = require('stylelint-bare-webpack-plugin');
        config.plugins.push(
          new StylelintBarePlugin({
            configFile: '.stylelintrc.json',
            files: ['src/**/*.vue', 'src/**/*.scss'],
          }),
        );
      }
    },
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'prefecture_result',
        path: '/office/:prefectureName/result',
        component: '~/pages/office/result.vue',
      });
      routes.push({
        name: 'ward_result',
        path: '/office/:prefectureName/:wardName/result',
        component: '~/pages/office/result.vue',
      });
      routes.push({
        name: 'prefecture_area',
        path: '/office/:prefectureName',
        component: '~/pages/office/area.vue',
      });
      routes.push({
        name: 'ward_area',
        path: '/office/:prefectureName/:wardName',
        component: '~/pages/office/area.vue',
      });
    },
  },
  watchers: {
    webpack: {
      poll: true,
    },
  },
};
