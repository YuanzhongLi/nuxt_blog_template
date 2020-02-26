<template>
  <div class="a-listingPopup">
    <div
      class="a-listingPopup__thumb"
      :style="`background-image: url(${building.imageUrls && Object.values(building.imageUrls).length > 0 ? Object.values(building.imageUrls)[0] : noImgUrl});`"
    />
    <div class="a-listingPopup__info">
      <n-link
        :to="`/office/building-detail/${building.id}`"
        class="a-listingPopup__infoAnchor"
        target="_blank"
      >
        {{ building.name }}
      </n-link>
      <ul class="a-listingPopup__infoSub">
        <li class="a-listingPopup__infoSubItem">
          <i class="a-listingPopup__infoSubItemIcon fas fa-subway" />
          {{ concatAndAddWords(building.stationName, building.timeRequired) }}
        </li>
        <li class="a-listingPopup__infoSubItem">
          <i class="a-listingPopup__infoSubItemIcon fas fa-yen-sign" />
          <span>
            {{ (building.askings[0] && building.askings[0].askingRent ? `${building.askings[0].askingRent.toLocaleString()}円/坪` : false) || (building.eRent ? `${building.eRent.toLocaleString()} ~ ${(building.eRent+5000).toLocaleString()}円/坪` : false ) || 'agentにお問い合わせください' }}
          </span>
        </li>
        <li class="a-listingPopup__infoSubItem">
          <i class="a-listingPopup__infoSubItemIcon fas fa-expand-arrows-alt" />
          {{ askingArea.toLocaleString() }}坪
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
    return {
      noImgUrl,
    };
  },
  computed: {
    askingArea() {
      return (this.building.askings.length && this.building.askings[0].askingArea) ? this.building.askings[0].askingArea : '募集なし';
    },
  },
  props: {
    building: {
      type: Object,
      default: () => {},
    },
  },
};

</script>
<style scoped lang="scss">
.a-listingPopup {
  @include a-listingPopup;
}
</style>
