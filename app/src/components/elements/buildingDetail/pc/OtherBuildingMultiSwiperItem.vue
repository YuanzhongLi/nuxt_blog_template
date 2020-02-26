<template>
  <div>
    <div class="a-buildingCard">
      <nuxt-link
        class="a-buildingCard__wrap"
        :to="`/office/building-detail/${similarBuilding.id}`"
      >
        <div class="a-buildingCard__thumb">
          <div
            class="a-buildingCard__thumbImg"
            :style="`background-image: url(${this.firstImageUrl});`"
          />
          <h3 class="a-buildingCard__thumbTtl">
            {{ similarBuilding.name }}
          </h3>
        </div>
        <dl class="a-buildingCard__list">
          <dt class="a-buildingCard__listTtl">
            所在地
          </dt>
          <dd class="a-buildingCard__listCnt">
            <i class="a-buildingCard__listIcon fas fa-map-marked-alt" />
            <p class="a-buildingCard__listTxt">
              {{ similarBuilding.address }}
            </p>
          </dd>
          <dt class="a-buildingCard__listTtl">
            最寄駅
          </dt>
          <dd class="a-buildingCard__listCnt">
            <i class="a-buildingCard__listIcon fas fa-subway" />
            <p class="a-buildingCard__listTxt">
              {{ concatAndAddWords(similarBuilding.stationName, similarBuilding.timeRequired) }}
            </p>
          </dd>
          <dt class="a-buildingCard__listTtl">
            賃料
          </dt>
          <dd class="a-buildingCard__listCnt">
            <i class="a-buildingCard__listIcon fas fa-yen-sign" />
            <span class="a-buildingCard__listTxt">
              {{ formatAskingRent(firstAsking.askingRent) }}
            </span>
          </dd>
          <dt class="a-buildingCard__listTtl">
            面積
          </dt>
          <dd class="a-buildingCard__listCnt">
            <i class="a-buildingCard__listIcon fas fa-expand-arrows-alt" />
            <p class="a-buildingCard__listTxt">
              {{ formatArea(firstAsking.askingArea) }}
            </p>
          </dd>
        </dl>
      </nuxt-link>
      <!-- まだ一般ユーザー向けのlike dislikeができていないので -->
      <ul
        class="a-buildingCard__action"
      >
        <li class="a-buildingCard__actionItem">
          <a
            class="a-buildingCard__actionAnchor a-buildingCard__actionAnchor--fav"
            @click="askingLikeById(firstAsking.id)"
          >
            <i class="a-buildingCard__actionIcon fas fa-heart" />
            興味あり
          </a>
        </li>
        <li class="a-buildingCard__actionItem">
          <a
            class="a-buildingCard__actionAnchor a-buildingCard__actionAnchor--dismiss"
            @click="askingDislikeById(firstAsking.id)"
          >
            <i class="a-buildingCard__actionIcon fas fa-times" />
            興味なし
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { noImgUrl } from '~/utils/building';
import stationFilter from '~/mixins/stationFilter';

export default {
  mixins: [stationFilter],
  data() {
    let firstImageUrl = noImgUrl;
    if (this.similarBuilding.imageUrls) {
      firstImageUrl = this.similarBuilding.imageUrls['1'];
    }
    const firstAsking = this.similarBuilding.askings[0];

    return {
      firstImageUrl,
      firstAsking,
    };
  },
  props: {
    similarBuilding: {
      type: Object,
      required: true,
      default: () => [],
    },
    isLoggedIn: {
      type: Boolean,
      require: true,
    },
  },
  methods: {
    formatAskingRent(askingRent) {
      if (!askingRent) {
        return '非公開';
      }
      return `${askingRent.toLocaleString()}円/坪`;
    },
    formatArea(askingArea) {
      return `${(Math.round(askingArea * 100) / 100).toLocaleString()}坪 （${(Math.round(askingArea * 3.30579 * 100) / 100).toLocaleString()}㎡）`;
    },
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
