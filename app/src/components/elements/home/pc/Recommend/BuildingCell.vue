<template>
  <div class="a-buildingCell">
    <div class="a-buildingCell__head">
      <div
        class="a-buildingCell__headThumb"
        :style="`background-image: url(${building.buildingImgUrl1 || noImgUrl});`"
      />
      <ul class="a-buildingCell__headAction">
        <li class="a-buildingCell__headActionItem">
          <a
            @click="like($event)"
            class="a-buildingCell__headActionAnchor"
            :class="{'is-active': isFavorite }"
          >
            <i class="a-buildingCell__headActionIcon a-buildingCell__headActionIcon--fav fas fa-heart" />
          </a>
        </li>
        <li
          v-if="!isFavorite"
          class="a-buildingCell__headActionItem"
        >
          <!-- ↓選択済みの時はis-activeをつけてください↓ -->
          <a
            @click="dismiss($event)"
            class="a-buildingCell__headActionAnchor"
          >
            <i class="a-buildingCell__headActionIcon a-buildingCell__headActionIcon--dismiss fas fa-times" />
          </a>
          <!-- ↑選択済みの時はis-activeをつけてください↑ -->
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
            {{ building.nearestStation }} 徒歩{{ building.timeRequired }}分
          </p>
        </dd>
        <dt class="a-buildingCell__bodyListTtl">
          賃料
        </dt>
        <dd class="a-buildingCell__bodyListCnt">
          <i class="a-buildingCell__bodyListIcon fas fa-yen-sign" />
          <p class="a-buildingCell__bodyListTxt">
            {{ showRent(building) }}
          </p>
        </dd>
        <dt class="a-buildingCell__bodyListTtl">
          面積
        </dt>
        <dd class="a-buildingCell__bodyListCnt">
          <i class="a-buildingCell__bodyListIcon fas fa-expand-arrows-alt" />
          <p class="a-buildingCell__bodyListTxt">
            {{ showRoomArea(building) }}
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { noImgUrl } from '~/utils/building';

export default {
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
  methods: {
    like(e) {
      e.stopPropagation();
      const { id } = this.building;
      this.$emit('like', id);
    },
    dismiss(e) {
      e.stopPropagation();
      const { id } = this.building;
      this.$emit('dismiss', id);
    },
    showRent(data) {
      if (data.askingMonthlyRent && data.askingRent) {
        return `${data.askingMonthlyRent.toLocaleString()}円/月 ${(Math.round(data.askingRent / 100) * 100).toLocaleString()}円/坪`;
      }
      if (data.askingMonthlyRent) {
        return `${data.askingMonthlyRent.toLocaleString()}円/月 非公表`;
      }
      if (data.askingRent) {
        return `非公表 ${(Math.round(data.askingRent / 100) * 100).toLocaleString()}円/坪`;
      }
      return '非公表';
    },
    showRoomArea(data) {
      if (data.askingRoomArea) {
        return `${(Math.round(data.askingRoomArea * 10) / 10).toLocaleString()}坪 （${(Math.round(data.askingRoomArea * 3.30579 * 10) / 10).toLocaleString()}㎡）`;
      }
      return '非公表';
    },
  },
};
</script>

<style scoped lang="scss">
.a-buildingCell {
  @include a-buildingCell;
}
</style>
