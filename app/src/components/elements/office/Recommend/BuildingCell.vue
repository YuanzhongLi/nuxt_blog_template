<template>
  <div
    class="a-buildingCell"
    :class="{'a-buildingCell--sp': device.isMobile}"
  >
    <div class="a-buildingCell__head">
      <div
        class="a-buildingCell__headThumb"
        :style="`background-image: url(${building.imageUrls && Object.values(building.imageUrls).length > 0 ? Object.values(building.imageUrls)[0] : noImgUrl});`"
      />
      <ul class="a-buildingCell__headAction">
        <li class="a-buildingCell__headActionItem">
          <a
            @click="likeById(asking.id)"
            class="a-buildingCell__headActionAnchor"
            :class="{'is-active': asking.isLike === 1 }"
          >
            <i class="a-buildingCell__headActionIcon a-buildingCell__headActionIcon--fav fas fa-heart" />
          </a>
        </li>
        <li class="a-buildingCell__headActionItem">
          <a
            @click="asking.isLike !== 0 ? dismissById(asking.id) : ''"
            :class="{'is-active': asking.isLike === 0 }"
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
            {{ (asking.askingRent ? `${asking.askingRent.toLocaleString()}円/坪` : false) || (building.eRent ? `${building.eRent.toLocaleString()} ~ ${(building.eRent+5000).toLocaleString()}円/坪` : false ) || 'agentにお問い合わせください' }}
          </p>
        </dd>
        <dt class="a-buildingCell__bodyListTtl">
          面積
        </dt>
        <dd class="a-buildingCell__bodyListCnt">
          <i class="a-buildingCell__bodyListIcon fas fa-expand-arrows-alt" />
          <p class="a-buildingCell__bodyListTxt">
            {{ askingArea }}坪
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
  },
  data() {
    return {
      noImgUrl,
    };
  },
  computed: {
    ...mapState(['device']),
    askingArea() {
      return this.asking.askingArea ? this.asking.askingArea : '募集なし';
    },
    asking() {
      return this.building.askings.length > 0 ? this.building.askings[0] : {};
    },
  },
  methods: {
    likeById(id) {
      if (this.asking.isLike === 1) {
        return;
      }
      this.$emit('like-by-id', id);
    },
    dismissById(id) {
      if (this.asking.isLike === 0) {
        return;
      }
      this.$emit('dismiss-by-id', id);
    },
  },
};
</script>

<style scoped lang="scss">
.a-buildingCell {
  @include a-buildingCell;
}
</style>
