<template>
  <div>
    <LpSpModalVideo
      v-if="isModalVideoOpen"
      @video-close="videoClose"
    />
    <a
      class="top__fixed"
      href="#"
      @click.prevent="videoModal"
    >
      <span class="top__videoBalloon">
        短時間で分かりやすい！
      </span>
      紹介動画を見る
      <span class="top__fixedThumb">
        <i class="top__fixedThumbIcon fas fa-play" />
      </span>
    </a>
    <header class="header">
      <div class="header__cnt">
        <h1 class="header__cntLogo">
          estie（エスティ）
        </h1>
        <div class="header__cntAnchor">
          <n-link
            class="header__anchor header__anchor--agent"
            to="/agent"
          >
            エージェントの方はこちら
          </n-link>
        </div>
      </div>
    </header>
    <section class="top">
      <div class="top__wrap">
        <div class="top__cnt">
          <div class="top__cntWrap">
            <div>
              <h1 class="top__ttl">
                オフィス探しをシンプルに。
              </h1>
              <p class="top__sub">
                希望条件にぴったりのオフィスがきっと見つかる<br>新しいオフィス探しプラットフォーム
              </p>
            </div>
            <SignUpEmail
              class="top__formSingle"
              @signupEmail="signupEmail"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="point">
      <h1 class="point__ttl">
        <p>3つのポイント</p>
      </h1>
      <ul class="point__list">
        <li class="point__item point__item--01">
          <h2 class="point__itemTtl">
            レコメンド
          </h2>
          <p class="point__itemTxt">
            気になった物件を興味ありにするだけで、レコメンドAIがあなたの好みを学習し、最適な物件のみレコメンドします
          </p>
        </li>
        <li class="point__item point__item--02">
          <h2 class="point__itemTtl">
            オファー
          </h2>
          <p class="point__itemTxt">
            興味ありにした物件の詳細情報がエージェントから届きます。膨大な物件情報の管理に苦しむ必要はもうありません
          </p>
        </li>
        <li class="point__item point__item--03">
          <h2 class="point__itemTtl">
            マッチング
          </h2>
          <p class="point__itemTxt">
            届いたオファーから希望条件にあった物件を選んでマッチング。圧倒的に短いリードタイムを実現します。（仲介手数料はマッチしたエージェントにご確認下さい）
          </p>
        </li>
      </ul>
    </section>
    <section class="video video--sp">
      <h1 class="video__ttl">
        <p>紹介動画</p>
      </h1>
      <div class="video__cnt">
        <InlineVideo />
      </div>
    </section>
    <section class="e-map">
      <div class=" e-map__cnt">
        <div class="e-map__panel">
          <h1 class="e-map__ttl">
            <p>e-Map</p>
          </h1>
          <h2 class="e-map__subTtl">
            希望条件 × レコメンドAIでオフィスが見つかる
          </h2>
          <p class="e-map__txt">
            登録いただいた希望条件をベースに、estie（エスティ）が開発したレコメンドAIがあなたにぴったりのオフィスを見つけます<br>estie（エスティ）のデータベースにある膨大なオフィス物件情報から、あなたとマッチ度の高い物件をレコメンドします
          </p>
          <nuxt-link
            to="/office/e-map"
            class="e-map__btn"
          >
            e-Mapを使ってみる
          </nuxt-link>
        </div>
        <LpBuildingSingleSwiper
          :first-recommend-list="firstRecommendList"
        />
      </div>
    </section>
    <section class="compare">
      <h1 class="compare__ttl">
        <p>新しいオフィス探し</p>
      </h1>
      <ul class="compare__lists">
        <li class="compare__item compare__item--before">
          <h2 class="compare__itemTtl">
            従来のオフィス探し
          </h2>
          <div class="compare__cnt compare__cnt--before">
            <img
              class="compare__img"
              src="~assets/images/lp/before_img.jpg"
              alt="従来のオフィス探しは不動産会社のページにある膨大なオフィス物件の中から自分で候補物件を探し、問い合わせる必要がありました。"
            >
            <p class="compare__txt">
              不動産会社のページにある膨大なオフィス物件の中から候補物件を探し、問い合わせる必要があります。ページ上では「入居募集中」となっているにも関わらず、問い合わせてみると「契約済み」なんてことも…
            </p>
          </div>
        </li>
        <li class="compare__item compare__item--after">
          <h2 class="compare__itemTtl">
            estieのオフィス探し
          </h2>
          <div class="compare__cnt compare__cnt--after">
            <img
              class="compare__img"
              src="~assets/images/lp/after_img.jpg"
              alt="あなたのオフィス希望条件を見て、複数の不動産エージェントが最新の物件情報を元に物件候補を選定し、ご提案します。"
            >
            <p class="compare__txt">
              あなたのオフィス希望条件を見て、複数の不動産エージェントが最新の物件情報を元に候補をご提案します。 条件を入力して待つだけでオファーが届くため、手軽に希望に沿ったオフィスを見つけることができます
            </p>
          </div>
        </li>
      </ul>
    </section>
    <LPColumn :articles="articles" />
    <section class="faq faq--sp">
      <div class="faq__cnt">
        <div class="faq__head">
          <h1 class="faq__headTtl">
            <p>よくある質問</p>
          </h1>
          <n-link
            to="/faq"
            target="_blank"
            class="faq__headAnchor"
          >
            すべて見る
          </n-link>
        </div>
        <ul class="faq__list">
          <li
            class="faq__item"
            v-for="(faq, index) in allFaq"
            :key="`faq${index}`"
          >
            <h2 class="faq__question">
              {{ faq.question }}
            </h2>
            <div
              class="faq__answer"
              v-html="faq.answer"
            />
          </li>
        </ul>
      </div>
    </section>
    <section class="media">
      <h1 class="media__ttl">
        <p>掲載メディア</p>
      </h1>
      <ul class="media__list">
        <li class="media__item">
          <img
            class="media__itemImg media__itemImg--01"
            src="~assets/images/lp/media01.png"
          >
        </li>
        <li class="media__item">
          <img
            class="media__itemImg media__itemImg--02"
            src="~assets/images/lp/media02.png"
          >
        </li>
      </ul>
    </section>
    <section class="register">
      <h1 class="register__ttl">
        オフィス探しをシンプルに。
      </h1>
      <p class="register__txt">
        あなたにピッタリのオフィスがきっと見つかる
      </p>
      <nuxt-link
        to="/tenant/signup"
        class="register__btn"
      >
        新規登録する
      </nuxt-link>
    </section>
    <MobileFooter />
  </div>
</template>

<script>
import LpBuildingSingleSwiper from '~/components/elements/lp/LpBuildingSingleSwiper';
import LpSpModalVideo from '~/components/elements/lp/LpSpModalVideo';
import SignUpEmail from '~/components/elements/test/SignUpEmail';
import LPColumn from '~/components/elements/lp/LPColumn';
import InlineVideo from '~/components/elements/lp/sp/InlineVideo';
import MobileFooter from '~/components/elements/common/sp/Footer';

export default {
  data() {
    return {
      isModalVideoOpen: false,
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: this.isModalVideoOpen ? 'is-fixed' : '',
      },
    };
  },
  components: {
    LpBuildingSingleSwiper,
    LPColumn,
    SignUpEmail,
    LpSpModalVideo,
    InlineVideo,
    MobileFooter,
  },
  props: {
    firstRecommendList: {
      type: Array,
      required: true,
    },
    articles: {
      type: Array,
      default: () => [],
    },
    allFaq: {
      type: Array,
      default: () => [],
    },
    signupEmail: {
      type: Function,
      required: true,
    },
  },
  methods: {
    videoClose() {
      this.isModalVideoOpen = false;
    },
    videoModal() {
      this.isModalVideoOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  @include header;
}

.top {
  @include top;
}

.point {
  @include point;
}

.video {
  @include video;
}

.e-map {
  @include e-map;
}

.media {
  @include media;
}

.faq {
  @include faq;
}

.compare {
  @include compare;
}

.register {
  @include register;
}
</style>
