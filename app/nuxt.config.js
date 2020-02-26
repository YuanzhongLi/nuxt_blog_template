import path from 'path';
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
    title: 'title',
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
        content: '...',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '...',
      },
      {
        property: 'og:title',
        content: '...',
      },
      {
        property: 'og:description',
        content:
          '...',
      },
      {
        property: 'og:image',
        content:
          '...',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: '...',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:image',
        content:
          '...',
      },
      {
        name: 'twitter:site',
        content: '...',
      },
      {
        name: 'twitter:title',
        content: 'title',
      },
      {
        name: 'twitter:url',
        content: 'https://.../',
      },
      {
        name: 'twitter:description',
        content:
          '...',
      },
      {
        'http-equiv': 'X-UA-Compatible',
        'content': 'IE=edge',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'canonical',
        href: 'https://...',
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
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  env: AppConfig,
  styleResources: {
    sass: [path.resolve(__dirname, 'src', 'assets', 'scss', 'style.scss')],
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    {
      src: '~/plugins/axios',
      ssr: true,
    },
    {
      src: '~plugins/font-awesome',
      ssr: false,
    },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/axios'],
    ['@nuxtjs/proxy'],
    ['@nuxtjs/moment', ['ja']],
    ['@nuxtjs/style-resources'],
  ],
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
    transpile: [/^element-ui/],
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
};
