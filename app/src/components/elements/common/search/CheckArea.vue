<template>
  <div
    class="a-checkArea"
    :class="[`${className}`, {'a-checkArea--sp': device.isMobile}]"
  >
    <RegionSwitcher @switch-cnt="switchCnt" />
    <template v-if="activeNum === selectedEnum.HOKKAIDO">
      <div class="a-checkArea__cnt">
        <h2 class="a-checkArea__ttl">
          北海道
        </h2>
        <ul class="a-checkArea__list">
          <li class="a-checkArea__item">
            <CheckBox>渋谷区</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>新宿区</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>台東区</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>墨田区</CheckBox>
          </li>
        </ul>
      </div>
    </template>
    <template v-else-if="activeNum === selectedEnum.TOHOKU">
      <div class="a-checkArea__cnt">
        <h2 class="a-checkArea__ttl">
          青森県
        </h2>
        <ul class="a-checkArea__list">
          <li class="a-checkArea__item">
            <CheckBox>横浜市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>川崎市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>厚木市</CheckBox>
          </li>
        </ul>
      </div>
      <div class="a-checkArea__cnt">
        <h2 class="a-checkArea__ttl">
          秋田県
        </h2>
        <ul class="a-checkArea__list">
          <li class="a-checkArea__item">
            <CheckBox>横浜市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>川崎市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>厚木市</CheckBox>
          </li>
        </ul>
      </div>
    </template>
    <template v-else-if="activeNum === selectedEnum.KANTO">
      <div class="a-checkArea__cnt">
        <h2 class="a-checkArea__ttl">
          神奈川県
        </h2>
        <ul class="a-checkArea__list">
          <li class="a-checkArea__item">
            <CheckBox>横浜市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>川崎市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>厚木市</CheckBox>
          </li>
        </ul>
      </div>
      <div class="a-checkArea__cnt">
        <h2 class="a-checkArea__ttl">
          東京都
        </h2>
        <ul class="a-checkArea__list">
          <li class="a-checkArea__item">
            <CheckBox>横浜市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>川崎市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>厚木市</CheckBox>
          </li>
        </ul>
      </div>
    </template>
    <template v-else-if="activeNum === selectedEnum.CHUBU">
      <div class="a-checkArea__cnt">
        <h2 class="a-checkArea__ttl">
          新潟県
        </h2>
        <ul class="a-checkArea__list">
          <li class="a-checkArea__item">
            <CheckBox>横浜市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>川崎市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>厚木市</CheckBox>
          </li>
        </ul>
      </div>
    </template>
    <template v-else-if="activeNum === selectedEnum.KINKI">
      <div class="a-checkArea__cnt">
        <h2 class="a-checkArea__ttl">
          三重県
        </h2>
        <ul class="a-checkArea__list">
          <li class="a-checkArea__item">
            <CheckBox>横浜市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>川崎市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>厚木市</CheckBox>
          </li>
        </ul>
      </div>
      <div class="a-checkArea__cnt">
        <h2 class="a-checkArea__ttl">
          奈良県
        </h2>
        <ul class="a-checkArea__list">
          <li class="a-checkArea__item">
            <CheckBox>横浜市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>川崎市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>厚木市</CheckBox>
          </li>
        </ul>
      </div>
      <div class="a-checkArea__cnt">
        <h2 class="a-checkArea__ttl">
          滋賀県
        </h2>
        <ul class="a-checkArea__list">
          <li class="a-checkArea__item">
            <CheckBox>横浜市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>川崎市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>厚木市</CheckBox>
          </li>
        </ul>
      </div>
    </template>
    <template v-else-if="activeNum === selectedEnum.CHUGOKU_SHIKOKU">
      <div class="a-checkArea__cnt">
        <h2 class="a-checkArea__ttl">
          岡山県
        </h2>
        <ul class="a-checkArea__list">
          <li class="a-checkArea__item">
            <CheckBox>横浜市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>川崎市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>厚木市</CheckBox>
          </li>
        </ul>
      </div>
    </template>
    <template v-else-if="activeNum === selectedEnum.KYUSYU">
      <div class="a-checkArea__cnt">
        <h2 class="a-checkArea__ttl">
          沖縄県
        </h2>
        <ul class="a-checkArea__list">
          <li class="a-checkArea__item">
            <CheckBox>横浜市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>川崎市</CheckBox>
          </li>
          <li class="a-checkArea__item">
            <CheckBox>厚木市</CheckBox>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import CheckBox from '~/components/elements/common/CheckBox';
import RegionSwitcher from '~/components/elements/common/search/RegionSwitcher';

export default {
  data() {
    const selectedEnum = {
      HOKKAIDO: 1,
      TOHOKU: 2,
      KANTO: 3,
      CHUBU: 4,
      KINKI: 5,
      CHUGOKU_SHIKOKU: 6,
      KYUSYU: 7,
    };
    return {
      selectedEnum,
      activeNum: selectedEnum.HOKKAIDO,
    };
  },
  props: {
    className: {
      type: String,
      default: '',
    },
  },
  components: {
    CheckBox,
    RegionSwitcher,
  },
  computed: {
    ...mapState(['device']),
  },
  methods: {
    switchCnt(num) {
      this.activeNum = num;
    },
  },
};
</script>

<style scoped lang="scss">
.a-checkArea {
  @include a-checkArea;
}
</style>
