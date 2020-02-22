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
  /*
  ** Headers of the page
  */
  proxy: proxySetting(),
  head: {
    title: 'じょんログ',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: '東京大学情報理工学系研究科創造情報学専攻でアーキテクチャやOSを研究している学生です！ 低レイヤー以外にもweb技術や創造情報のプログラミング試験についても共用できたらと思います！'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    {
      src: '~/plugins/axios',
      ssr: true,
    },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
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
  /*
  ** Build configuration
  */
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
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
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
    }
  }
}
