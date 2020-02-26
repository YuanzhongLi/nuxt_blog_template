<template>
  <!-- フォーカスしてるビルにはaタグにis-activeを付けてください -->
  <a
    class="a-buildingCell a-buildingCell--emap"
    :class="isFavorite?'is-favorite':{'is-active': isSelected }"
  >
    <div class="a-buildingCell__head">
      <div
        class="a-buildingCell__headThumb"
        :style="`background-image: url(${building.imageUrls && Object.values(building.imageUrls).length > 0 ? Object.values(building.imageUrls)[0] : noImgUrl});`"
      />
      <ul class="a-buildingCell__headAction">
        <li class="a-buildingCell__headActionItem">
          <a
            @click="onClickLike"
            class="a-buildingCell__headActionAnchor"
            :class="{'is-active': building.askings.length > 0 && building.askings[0].isLike === 1 }"
          >
            <i class="a-buildingCell__headActionIcon a-buildingCell__headActionIcon--fav fas fa-heart" />
          </a>
        </li>
        <li class="a-buildingCell__headActionItem">
          <a
            @click="onClickDismiss"
            :class="{'is-active': building.askings.length > 0 && building.askings[0].isLike === 0 }"
            class="a-buildingCell__headActionAnchor"
          >
            <i class="a-buildingCell__headActionIcon a-buildingCell__headActionIcon--dismiss fas fa-times" />
          </a>
        </li>
      </ul>
    </div>
    <div class="a-buildingCell__body">
      <nuxt-link
        class="a-buildingCell__bodyName"
        :to="`/office/building-detail/${building.id}`"
        target="_blank"
      >
        {{ building.name }}
      </nuxt-link>
      <dl class="a-buildingCell__bodyList">
        <dt class="a-buildingCell__bodyListTtl">
          最寄駅
        </dt>
        <dd class="a-buildingCell__bodyListCnt">
          <i class="a-buildingCell__bodyListIcon fas fa-subway" />
          <p class="a-buildingCell__bodyListTxt">
            {{ concatAndAddWords(building.stationName, building.timeRequired) }}
          </p>
        </dd>
        <dt class="a-buildingCell__bodyListTtl">
          賃料
        </dt>
        <dd class="a-buildingCell__bodyListCnt">
          <i class="a-buildingCell__bodyListIcon fas fa-yen-sign" />
          <p class="a-buildingCell__bodyListTxt">
            {{ (building.askings[0].askingRent ? `${building.askings[0].askingRent.toLocaleString()}円/坪` : false) || (building.eRent ? `${building.eRent.toLocaleString()} ~ ${(building.eRent+5000).toLocaleString()}円/坪` : false ) || 'agentにお問い合わせください' }}
          </p>
        </dd>
        <dt class="a-buildingCell__bodyListTtl">
          面積
        </dt>
        <dd class="a-buildingCell__bodyListCnt">
          <i class="a-buildingCell__bodyListIcon fas fa-expand-arrows-alt" />
          <p class="a-buildingCell__bodyListTxt">
            {{ askingArea.toLocaleString() }}坪
          </p>
        </dd>
      </dl>
    </div>
  </a>
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
    isSelected: {
      type: Boolean,
      default: false,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    like: {
      type: Function,
      required: true,
    },
    dismiss: {
      type: Function,
      required: true,
    },
  },
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
  methods: {
    onClickLike() {
      if (!(this.building.askings.length > 0 && this.building.askings[0].isLike !== 1)) {
        return;
      }
      this.like(this.building.askings[0].id);
    },
    onClickDismiss() {
      if (!(this.building.askings.length > 0 && this.building.askings[0].isLike !== 0)) {
        return;
      }
      this.dismiss(this.building.askings[0].id);
    },
  },
};
</script>
<style scoped lang="scss">
.a-buildingCell {
  @include a-buildingCell;
}
</style>
