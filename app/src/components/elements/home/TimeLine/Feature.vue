<template>
  <div
    class="m-feature"
    :class="{'m-feature--sp': device.isMobile}"
  >
    <h1 class="m-feature__ttl">
      estie（エスティ）の特徴
    </h1>
    <ul class="m-feature__list">
      <li class="m-feature__item m-feature__item--offer">
        <h2 class="m-feature__subTtl">
          物件オファー
        </h2>
        <p class="m-feature__txt">
          待っているだけで、エージェントから登録いただいた条件にあった物件の提案が届きます
        </p>
      </li>
      <li class="m-feature__item m-feature__item--search">
        <h2 class="m-feature__subTtl">
          物件検索
        </h2>
        <p class="m-feature__txt">
          気になる条件を入力して物件を検索することができます。地図上にプロットもできます
        </p>
      </li>
      <li class="m-feature__item m-feature__item--recommend">
        <h2 class="m-feature__subTtl">
          レコメンド
        </h2>
        <p class="m-feature__txt">
          希望条件と「興味あり・なし」のデータを元に最適な物件をe-Mapでご提案します
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['device']),
  },
};
</script>

<style lang="scss" scoped>
.m-feature {
  @include m-feature;
}
</style>
