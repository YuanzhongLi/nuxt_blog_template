<template>
  <div
    class="a-buildingMultipleImg"
    :class="{'a-buildingMultipleImg--sp': device.isMobile}"
  >
    <div
      v-swiper:mySwiper="swiperOption"
      class="swiper-container"
    >
      <ul class="swiper-wrapper">
        <li
          v-for="(style, index) in imgStyleList"
          :key="'style' + index"
          class="swiper-slide"
        >
          <div
            class="swiper-img"
            :style="style"
          />
        </li>
      </ul>
      <div class="swiper-pagination" />
      <div class="swiper-button swiper-button-prev">
        <i class="swiper-button-icon swiper-button-prevIcon fas fa-chevron-left" />
      </div>
      <div class="swiper-button swiper-button-next">
        <i class="swiper-button-icon swiper-button-nextIcon fas fa-chevron-right" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    buildingImgUrls: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 50,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
      },
    };
  },
  computed: {
    ...mapState(['device']),
    imgStyleList() {
      const { buildingImgUrls } = this;
      const ret = [];
      Object.values(buildingImgUrls).forEach((imgUrl) => {
        if (imgUrl) {
          ret.push({
            'background-image': `url(${imgUrl})`,
          });
        }
      });
      return ret;
    },
  },
};
</script>

<style scoped lang="scss">
.a-buildingMultipleImg {
  @include a-buildingMultipleImg;
}
</style>
