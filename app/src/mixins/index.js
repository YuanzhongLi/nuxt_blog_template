export default {
  methods: {
    getEstieProductUrl(url = '/') {
      return process.env.ESTIE_PRODUCT_URL;
    },
    getHeadTitle(prefix = '') {
      return `${prefix ? `${prefix}｜` : ''}${this.siteFullName}`;
    },
    /**
     * OGPのタグのリストを作成する
     * @param {String} title ページのタイトル
     * @param {String} type 'website', 'blog', 'article'のうちいずれか
     * @param {String} description ページの説明文
     * @param {String} url ページのURL(絶対パス)
     * @param {String} image ページの画像URL(絶対パス)
     * @return {Array} [{property: 'og:title', content: 'ページタイトル'},,,]
     */
    getOgpTagList({
      title,
      description,
      type,
      url,
      image,
    }) {
      const obj = {
        'og:title': title,
        'og:type': type,
        'og:description': description,
        'og:url': url,
        'og:image': image,
        'og:site_name': this.siteFullName,
      };

      return Object.keys(obj)
        .filter(key => obj[key])
        .map(key => ({
          property: key,
          content: obj[key],
        }));
    },
  },
  computed: {
    siteUrl() {
      return process.env.HOST_URL;
    },
    apiUrl() {
      return `${this.siteUrl}/api`;
    },
    siteName() {
      return 'estie（エスティ）';
    },
    siteFullName() {
      return `${this.siteName}`;
    },
    emailPlaceholder() {
      return 'info@estie.co.jp';
    },
  },
  mounted() {
    const {
      referer,
    } = this.$store.state;

    if (referer) {
      document.cookie = `referrer=${referer}`;
    }
  },
};
