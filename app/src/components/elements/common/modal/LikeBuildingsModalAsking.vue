<template>
  <n-link
    :to="`/office/building-detail/${building.id}`"
    target="_blank"
    class="m-likeBuildingsModal__anchor"
  >
    <div class="m-likeBuildingsModal__anchorThumb">
      <p class="m-likeBuildingsModal__anchorThumbTtl">
        {{ building.name }}{{ asking.askingFloor }}階
      </p>
      <div
        class="m-likeBuildingsModal__anchorThumbImg"
        :style="`background-image: url(${building.imageUrls && Object.values(building.imageUrls).length > 0 ? Object.values(building.imageUrls)[0] : noImgUrl});`"
      />
    </div>
    <ul class="m-likeBuildingsModal__anchorInfo">
      <li class="m-likeBuildingsModal__anchorInfoItem">
        <i class="m-likeBuildingsModal__anchorInfoItemIcon fas fa-subway" />
        <p class="m-likeBuildingsModal__anchorInfoItemTxt">
          {{ concatAndAddWords(building.stationName, building.timeRequired) }}
        </p>
      </li>
      <li class="m-likeBuildingsModal__anchorInfoItem">
        <i class="m-likeBuildingsModal__anchorInfoItemIcon fas fa-yen-sign" />
        <p class="m-likeBuildingsModal__anchorInfoItemTxt">
          {{ judgeAskingRentForAgent }}
        </p>
      </li>
      <li class="m-likeBuildingsModal__anchorInfoItem">
        <i class="m-likeBuildingsModal__anchorInfoItemIcon fas fa-expand-arrows-alt" />
        <p class="m-likeBuildingsModal__anchorInfoItemTxt">
          {{ asking.askingArea }}坪（{{ Math.round(asking.askingArea * 3.3) }}㎡）
        </p>
      </li>
    </ul>
  </n-link>
</template>

<script>
import { noImgUrl } from '~/utils/building';
import askingRent from '~/mixins/askingRent';
import stationFilter from '~/mixins/stationFilter';

export default {
  mixins: [stationFilter, askingRent],
  components: {
  },
  data() {
    return {
      noImgUrl,
      content: this.currentContent,
    };
  },
  props: {
    asking: {
      type: Object,
      required: true,
    },
    building: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.m-likeBuildingsModal {
  @include m-likeBuildingsModal;
}
</style>
