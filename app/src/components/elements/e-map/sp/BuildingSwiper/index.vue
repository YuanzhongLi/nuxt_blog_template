<template>
  <div class="m-listingBuildingSwiper">
    <div
      v-swiper:listingBuildingSwiper="swiperOption"
      class="swiper-container"
    >
      <ul class="swiper-wrapper m-listingBuildingSwiper__list">
        <li
          class="swiper-slide m-listingBuildingSwiper__item"
          v-for="data of offeredListing"
          :key="data.id"
          @click="selectItem(data)"
        >
          <BuildingSwiperItem
            :building="data"
            :is-selected="data.id===pinnedBuilding.id"
            @like="like"
            @dismiss="dismiss"
          />
        </li>
      </ul>
      <div
        class="m-listingBuildingSwiper__pagination"
        slot="pagination"
      />
      <div
        class="m-listingBuildingSwiper__btn m-listingBuildingSwiper__btn--prev"
        slot="button-prev"
      >
        <i class="m-listingBuildingSwiper__btnIcon fas fa-chevron-left" />
      </div>
      <div
        class="m-listingBuildingSwiper__btn m-listingBuildingSwiper__btn--next"
        slot="button-next"
      >
        <i class="m-listingBuildingSwiper__btnIcon fas fa-chevron-right" />
      </div>
    </div>
    <div
      class="m-listingBuildingSwiperEmpty"
      v-if="false"
    >
      <p class="m-listingBuildingSwiperEmpty__txt">
        条件に合致する物件が見つかりません。<br>ホームから登録条件を変更してください。
      </p>
      <n-link
        to="/tenant"
        class="m-listingBuildingSwiperEmpty__btn"
      >
        ホーム
      </n-link>
    </div>
  </div>
</template>

<script>
import BuildingSwiperItem from './BuildingSwiperItem';

export default {
  components: {
    BuildingSwiperItem,
  },
  props: {
    showAllBuildings: {
      type: Boolean,
      default: false,
    },
    offeredListing: {
      type: Array,
      default: () => [],
      required: true,
    },
    likedListing: {
      type: Array,
      default: () => [],
    },
    aveCoordinate: {
      type: Object,
      default: () => {},
    },
    pinnedBuilding: {
      type: Object,
      default: () => {},
    },
    pinClicked: {
      type: Boolean,
      default: false,
    },
    like: {
      type: Function,
      default: () => {},
    },
    dismiss: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    selectItem(data) {
      this.$emit('select-item', data);
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.2,
        centeredSlides: true,
        spaceBetween: 12,
        pagination: {
          el: '.m-listingBuildingSwiper__pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.m-listingBuildingSwiper__btn--next',
          prevEl: '.m-listingBuildingSwiper__btn--prev',
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">
.m-listingBuildingSwiper {
  @include m-listingBuildingSwiper;
}
</style>
