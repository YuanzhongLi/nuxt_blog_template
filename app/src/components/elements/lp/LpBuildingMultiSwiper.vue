<template>
  <div
    v-swiper:listingBuildingSwiper="swiperOption"
    class="swiper-container m-lpBuildingMultiSwiper"
  >
    <ul class="swiper-wrapper">
      <li class="swiper-slide m-lpBuildingMultiSwiper__cnt">
        <ul class="m-lpBuildingMultiSwiper__list">
          <li
            v-for="(listingItem, index) of firstRecommendList"
            class="m-lpBuildingMultiSwiper__listItem"
            :key="index"
          >
            <LpBuildingCard
              :listing-item="listingItem"
            />
          </li>
        </ul>
      </li>
      <li
        v-if="secondRecommendList.length"
        class="swiper-slide m-lpBuildingMultiSwiper__cnt"
      >
        <ul class="m-lpBuildingMultiSwiper__list">
          <li
            v-for="(listingItem, index) of secondRecommendList"
            class="m-lpBuildingMultiSwiper__listItem"
            :key="index"
          >
            <LpBuildingCard
              :listing-item="listingItem"
            />
          </li>
        </ul>
      </li>
      <li
        v-if="thirdRecommendList.length"
        class="swiper-slide m-lpBuildingMultiSwiper__cnt"
      >
        <ul class="m-lpBuildingMultiSwiper__list">
          <li
            v-for="(listingItem, index) of thirdRecommendList"
            class="m-lpBuildingMultiSwiper__listItem"
            :key="index"
          >
            <LpBuildingCard
              :listing-item="listingItem"
            />
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="m-lpBuildingMultiSwiper__btn m-lpBuildingMultiSwiper__btn--prev"
      slot="button-prev"
    >
      <i class="m-lpBuildingMultiSwiper__btnIcon fas fa-chevron-left" />
    </div>
    <div
      class="m-lpBuildingMultiSwiper__btn m-lpBuildingMultiSwiper__btn--next"
      slot="button-next"
    >
      <i class="m-lpBuildingMultiSwiper__btnIcon fas fa-chevron-right" />
    </div>
  </div>
</template>
<script>
import LpBuildingCard from './LpBuildingCard';

export default {
  components: {
    LpBuildingCard,
  },
  props: {
    firstRecommendList: {
      type: Array,
      default: () => [],
    },
    secondRecommendList: {
      type: Array,
      default: () => [],
    },
    thirdRecommendList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        navigation: {
          nextEl: '.m-lpBuildingMultiSwiper__btn--next',
          prevEl: '.m-lpBuildingMultiSwiper__btn--prev',
        },
      },
    };
  },
};
</script>
<style scoped lang="scss">
.m-lpBuildingMultiSwiper {
  @include m-lpBuildingMultiSwiper;
}
</style>
