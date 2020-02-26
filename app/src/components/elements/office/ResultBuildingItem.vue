<template>
  <div class="a-resultBuildingItem">
    <div
      class="a-resultBuildingItem__thumb"
      :style="`background-image: url(${building.imageUrls && Object.values(building.imageUrls).length > 0 ? Object.values(building.imageUrls)[0] : noImgUrl});`"
    />
    <div class="a-resultBuildingItem__info">
      <nuxt-link
        :to="`/office/building-detail/${building.id}`"
        class="a-resultBuildingItem__infoTtl"
        target="_blank"
      >
        {{ building.name }}
      </nuxt-link>
      <ul class="a-resultBuildingItem__infoList">
        <li class="a-resultBuildingItem__infoItem">
          <span class="a-resultBuildingItem__infoLabel">
            住　所
          </span>
          <p class="a-resultBuildingItem__infoName">
            {{ building.address }}
          </p>
        </li>
        <li class="a-resultBuildingItem__infoItem">
          <span class="a-resultBuildingItem__infoLabel">
            最寄駅
          </span>
          <p class="a-resultBuildingItem__infoName">
            {{ concatAndAddWords(building.stationName, building.timeRequired) }}
          </p>
        </li>
        <li class="a-resultBuildingItem__infoItem">
          <span class="a-resultBuildingItem__infoLabel">
            竣工年
          </span>
          <p class="a-resultBuildingItem__infoName">
            {{ `${String(building.completedOn).slice(0,4)}年${String(building.completedOn).slice(4,6)}月` }}
          </p>
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
  props: {
    building: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      noImgUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.a-resultBuildingItem {
  @include a-resultBuildingItem;
}
</style>
