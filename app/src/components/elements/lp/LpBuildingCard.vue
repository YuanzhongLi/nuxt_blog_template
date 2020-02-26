<template>
  <div class="a-lpBuildingCard">
    <n-link
      :to="`/office/building-detail/${listingItem.id}`"
      target="_blank"
    >
      <div class="a-lpBuildingCard__thumb">
        <div
          class="a-lpBuildingCard__thumbImg"
          :style="`background-image: url(${listingItem.imageUrls && Object.values(listingItem.imageUrls).length > 0 ? Object.values(listingItem.imageUrls)[0] : noImgUrl});`"
        />
        <h3 class="a-lpBuildingCard__ttl">
          {{ listingItem.name }}
        </h3>
      </div>
      <ul class="a-lpBuildingCard__info">
        <li class="a-lpBuildingCard__infoItem">
          <i class="fas fa-map-marker-alt" />
          <p class="a-lpBuildingCard__infoTxt">
            {{ listingItem.address }}
          </p>
        </li>
        <li class="a-lpBuildingCard__infoItem">
          <i class="fas fa-subway" />
          <p class="a-lpBuildingCard__infoTxt">
            {{ listingItem.nearestStation }}&nbsp;徒歩{{ listingItem.timeRequired }}分
          </p>
        </li>
        <li class="a-lpBuildingCard__infoItem">
          <i class="fas fa-yen-sign" />
          <span class="a-lpBuildingCard__infoTxt">
            {{ (listingItem.askings[0] && listingItem.askings[0].askingRent ? `${listingItem.askings[0].askingRent.toLocaleString()}円/坪` : false) || (listingItem.eRent ? `${listingItem.eRent.toLocaleString()} ~ ${(listingItem.eRent+5000).toLocaleString()}円/坪` : false ) || 'agentにお問い合わせください' }}
          </span>
        </li>
        <li class="a-lpBuildingCard__infoItem">
          <i class="fas fa-expand-arrows-alt" />
          <p class="a-lpBuildingCard__infoTxt">
            {{ askingArea }}坪
          </p>
        </li>
      </ul>
    </n-link>
  </div>
</template>

<script>
import { noImgUrl } from '~/utils/building';

export default {
  data() {
    return {
      noImgUrl,
    };
  },
  props: {
    listingItem: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    askingArea() {
      return (this.listingItem.askings.length && this.listingItem.askings[0].askingArea) ? this.listingItem.askings[0].askingArea : '募集なし';
    },
  },
};
</script>

<style scoped lang="scss">
.a-lpBuildingCard {
  @include a-lpBuildingCard;
}
</style>
