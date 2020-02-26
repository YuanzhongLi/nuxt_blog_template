<template>
  <div class="m-otherBuildingSwiper">
    <h3 class="m-otherBuildingSwiper__ttl">
      おすすめ物件
    </h3>
    <div class="m-otherBuildingSwiper__wrap">
      <div
        v-swiper:listingBuildingSwiper="swiperOption"
        class="swiper-container"
      >
        <ul class="swiper-wrapper">
          <li
            v-for="similarBuilding in similarBuildings"
            :key="similarBuilding.id"
            class="swiper-slide"
          >
            <OtherBuildingMultiSwiperItem
              :similar-building="similarBuilding"
              :is-logged-in="isLoggedIn"
              @asking-like-by-id="askingLikeById"
              @asking-dislike-by-id="askingDislikeById"
            />
          </li>
        </ul>
      </div>
      <div
        class="m-otherBuildingSwiper__btn m-otherBuildingSwiper__btn--multi  m-otherBuildingSwiper__btn--multi--prev"
        slot="button-prev"
      >
        <i class="m-otherBuildingSwiper__btnIcon fas fa-chevron-left" />
      </div>
      <div
        class="m-otherBuildingSwiper__btn m-otherBuildingSwiper__btn--multi  m-otherBuildingSwiper__btn--multi--next"
        slot="button-next"
      >
        <i class="m-otherBuildingSwiper__btnIcon fas fa-chevron-right" />
      </div>
    </div>
  </div>
</template>

<script>
import OtherBuildingMultiSwiperItem from '~/components/elements/buildingDetail/pc/OtherBuildingMultiSwiperItem';

export default {
  components: {
    OtherBuildingMultiSwiperItem,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 16,
        navigation: {
          nextEl: '.m-otherBuildingSwiper__btn--multi--next',
          prevEl: '.m-otherBuildingSwiper__btn--multi--prev',
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
.a-buildingCard {
  @include a-buildingCard;
}

.m-otherBuildingSwiper {
  @include m-otherBuildingSwiper;
}
</style>
