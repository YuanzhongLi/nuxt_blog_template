<template>
  <div class="m-otherBuildingSwiper m-otherBuildingSwiper--sp">
    <h3 class="m-otherBuildingSwiper__ttl">
      おすすめ物件
    </h3>
    <div class="m-otherBuildingSwiper__wrap">
      <div
        v-swiper:listingBuildingSwiper="swiperOption"
        class="swiper-container"
      >
        <!-- {{ similarBuildings }} -->
        <ul class="swiper-wrapper">
          <li
            v-for="(similarBuilding, index) in similarBuildings"
            :key="`similarBuilding${index}`"
            class="swiper-slide"
          >
            <OtherBuildingSingleSwiperItem
              :similar-building="similarBuilding"
              @asking-like-by-id="askingLikeById"
              @asking-dislike-by-id="askingDislikeById"
            />
          </li>
        </ul>
      </div>
      <div
        class="m-otherBuildingSwiper__btn m-otherBuildingSwiper__btn--single m-otherBuildingSwiper__btn--single--prev"
        slot="button-prev"
      >
        <i class="m-otherBuildingSwiper__btnIcon fas fa-chevron-left" />
      </div>
      <div
        class="m-otherBuildingSwiper__btn m-otherBuildingSwiper__btn--single m-otherBuildingSwiper__btn--single--next"
        slot="button-next"
      >
        <i class="m-otherBuildingSwiper__btnIcon fas fa-chevron-right" />
      </div>
    </div>
  </div>
</template>

<script>
import OtherBuildingSingleSwiperItem from '~/components/elements/buildingDetail/sp/OtherBuildingSingleSwiperItem';

export default {
  components: {
    OtherBuildingSingleSwiperItem,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.2,
        centeredSlides: true,
        spaceBetween: 16,
        navigation: {
          nextEl: '.m-otherBuildingSwiper__btn--single--next',
          prevEl: '.m-otherBuildingSwiper__btn--single--prev',
        },
      },
    };
  },
  props: {
    similarBuildings: {
      type: Array,
      required: true,
      default: () => [],
    },
    isLoggedIn: {
      type: Boolean,
      require: true,
    },
  },
  methods: {
    askingLikeById(id) {
      this.$emit('asking-like-by-id', id);
    },
    askingDislikeById(id) {
      this.$emit('asking-dislike-by-id', id);
    },
  },
};
</script>

<style scoped lang="scss">
.m-otherBuildingSwiper {
  @include m-otherBuildingSwiper;
}
</style>
