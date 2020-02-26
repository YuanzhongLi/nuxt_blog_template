/**
 * <head> 内に出力する JSON-LD の出し分けをする mixin
 *
 */

export default {
  data() {
    return {
      sdOrganization: {
        '@context': 'http://schema.org',
        '@type': 'Organization',
        'url': process.env.ESTIE_PRODUCT_URL,
        'logo': process.env.ESTIE_PRODUCT_LOGO_URL,
        // 電話番号取得後にコメントアウトを外す
        // 'contactPoint': [{
        //   '@type': 'ContactPoint',
        //   'telephone': process.env.ESTIE_PHONE_NUMBER,
        //   'contactType': 'customer service',
        // }],
        'areaServed': 'JP',
      },
    };
  },
  computed: {
    sdPublisher() {
      return {
        '@type': 'Organization',
        'name': this.siteFullName,
        'logo': {
          '@type': 'ImageObject',
          'url': process.env.ESTIE_PRODUCT_LOGO_URL,
          'width': 332,
          'height': 60,
        },
      };
    },
    sdAuthor() {
      return {
        '@type': 'Organization',
        'name': this.siteFullName,
      };
    },
  },
  methods: {
    /**
     * 構造化データのWebPageオブジェクトを作成
     * @param {String} headline　(ex: 'estie')
     * @param {String} datePublished (ex: '2018-01-25T18:37:44+0000')
     * @param {String} dateModified (ex: '2018-09-18T12:31:32+0000')
     * @param {String} path (ex: '/', '/article')
     * @param {String} description (ex: 'estieとは~')
     * @param {String} imageUrl (ex: '~/xxx.jpg')
     * @return {Object} WebPageオブジェクト
     */
    sdWebPage({
      headline,
      datePublished,
      dateModified,
      path,
      description,
      imageUrl,
    }) {
      return {
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        headline,
        'datePublished': datePublished || '2018-01-25T00:00:00+0000',
        'dateModified': dateModified || '2018-09-18T00:00:00+0000',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `${process.env.ESTIE_PRODUCT_URL}${path}`,
        },
        'author': this.sdAuthor,
        'image': {
          '@type': 'ImageObject',
          // 画像が存在しない場合にはロゴの画像のURLを指定
          'url': imageUrl || process.env.ESTIE_PRODUCT_LOGO_URL,
        },
        'publisher': this.sdPublisher,
        description,
      };
    },

    /**
     * 構造化データのBreadcrumbListオブジェクトを作成
     * @param {Array} pathList
     * (ex:
     *    [
     *      { path: '/', name: 'estie' },
     *      { path: '/article', name: '記事' },
     *      ...
     *    ]
     *  )
     */
    sdBreadcrumbList(pathList) {
      const itemListElement = pathList.map((path, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'item': {
          '@id': `${process.env.ESTIE_PRODUCT_URL}${path.path}`,
          'name': path.name,
        },
      }));

      return {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement,
      };
    },

    /**
     * 構造化データのNewsArticleオブジェクトを作成
     * @param {String} headline　(ex: 'estie')
     * @param {String} datePublished (ex: '2018-01-25T18:37:44+0000')
     * @param {String} dateModified (ex: '2018-09-18T12:31:32+0000')
     * @param {String} path (ex: '/', '/currency')
     * @param {String} description (ex: 'estieとは~')
     * @param {String} imageUrl (ex: '~/xxx.jpg')
     * @return {Object} NewsArticleオブジェクト
     */
    sdNewsArticle({
      headline,
      datePublished,
      dateModified,
      path,
      description,
      imageUrl,
    }) {
      return {
        '@context': 'http://schema.org',
        '@type': 'NewsArticle',
        headline,
        datePublished,
        dateModified,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `${process.env.ESTIE_PRODUCT_URL}${path}`,
        },
        'author': this.sdAuthor,
        'image': {
          '@type': 'ImageObject',
          // 画像が存在しない場合にはロゴの画像のURLを指定
          'url': imageUrl || process.env.ESTIE_PRODUCT_LOGO_URL,
        },
        'publisher': this.sdPublisher,
        description,
      };
    },

    /**
     * @param {Object} obj
     * @return {Array} (ex:
     *   [
     *     { innerHTML: JSON.stringify(obj.webPage), type: 'application/ld+json' },
     *     { innerHTML: JSON.stringify(obj.organization), type: 'application/ld+json' },
     *   ],
     * )
     */
    sdGetScriptTagList(sdObj) {
      return Object.keys(sdObj).map(key => ({
        innerHTML: JSON.stringify(sdObj[key]),
        type: 'application/ld+json',
      }));
    },
  },
};
