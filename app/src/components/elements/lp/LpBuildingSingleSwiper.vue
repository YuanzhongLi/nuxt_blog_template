<template>
  <div
    v-swiper:listingBuildingSwiper="swiperOption"
    class="swiper-container m-lpBuildingSingleSwiper"
  >
    <ul class="swiper-wrapper">
      <li
        v-for="(listingItem, index) of firstRecommendList"
        class="swiper-slide m-lpBuildingSingleSwiper__listItem"
        :key="index"
      >
        <LpBuildingCard
          :listing-item="listingItem"
        />
      </li>
    </ul>
    <div
      class="m-lpBuildingSingleSwiper__btn m-lpBuildingSingleSwiper__btn--prev"
      slot="button-prev"
    >
      <i class="m-lpBuildingSingleSwiper__btnIcon fas fa-chevron-left" />
    </div>
    <div
      class="m-lpBuildingSingleSwiper__btn m-lpBuildingSingleSwiper__btn--next"
      slot="button-next"
    >
      <i class="m-lpBuildingSingleSwiper__btnIcon fas fa-chevron-right" />
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
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.4,
        centeredSlides: true,
        spaceBetween: 12,
        navigation: {
          nextEl: '.m-lpBuildingSingleSwiper__btn--next',
          prevEl: '.m-lpBuildingSingleSwiper__btn--prev',
        },
      },
    };
  },
};
</script>
<style scoped lang="scss">
.m-lpBuildingSingleSwiper {
  @include m-lpBuildingSingleSwiper;
}
</style>
