<template>
  <div
    class="a-buildingSwiperItem"
    :class="{'is-favorite':isFavorite}"
  >
    <div
      class="a-buildingSwiperItem__thumb"
    >
      <div
        class="a-buildingSwiperItem__thumbImg"
        :style="`background-image: url(${building.imageUrls && Object.values(building.imageUrls).length > 0 ? Object.values(building.imageUrls)[0] : noImgUrl});`"
      />
      <ul class="a-buildingSwiperItem__thumbAction">
        <li class="a-buildingSwiperItem__thumbActionItem">
          <a
            class="a-buildingSwiperItem__thumbActionAnchor a-buildingSwiperItem__thumbActionAnchor--fav"
            href="#"
            @click.prevent="like($event)"
          >
            <i class="fas fa-heart" />
          </a>
        </li>
        <li
          class="a-buildingSwiperItem__thumbActionItem"
          href="#"
        >
          <a
            class="a-buildingSwiperItem__thumbActionAnchor a-buildingSwiperItem__thumbActionAnchor--dismiss"
            href="#"
            @click.prevent="dismiss($event)"
          >
            <i class="fas fa-times" />
          </a>
        </li>
      </ul>
    </div>
    <div class="a-buildingSwiperItem__info">
      <nuxt-link
        :to="`/office/building-detail/${building.id}`"
        class="a-buildingSwiperItem__infoTtl"
        target="_blank"
      >
        {{ building.name }}
      </nuxt-link>
      <ul class="a-buildingSwiperItem__infoSub">
        <li class="a-buildingSwiperItem__infoSubItem">
          <i class="a-buildingSwiperItem__infoSubItemIcon fas fa-subway" />
          {{ building.nearestStation }} 徒歩{{ building.timeRequired }}分
        </li>
        <li class="a-buildingSwiperItem__infoSubItem">
          <i class="a-buildingSwiperItem__infoSubItemIcon fas fa-yen-sign" />
          <span>
            {{ (asking.askingRent ? `${asking.askingRent.toLocaleString()}円/坪` : false) || (building.eRent ? `${building.eRent.toLocaleString()} ~ ${(building.eRent+5000).toLocaleString()}円/坪` : false ) || 'agentにお問い合わせください' }}
          </span>
        </li>
        <li class="a-buildingSwiperItem__infoSubItem">
          <i class="a-buildingSwiperItem__infoSubItemIcon fas fa-expand-arrows-alt" />
          {{ askingArea.toLocaleString() }}坪
        </li>
      </ul>
    </div>
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
    building: {
      type: Object,
      default: () => {},
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    askingArea() {
      return (this.asking.askingArea) ? this.asking.askingArea : '募集なし';
    },
    isFavorite() {
      return this.asking.isLike === 1;
    },
    asking() {
      return this.building.askings.length > 0 ? this.building.askings[0] : {};
    },
  },
  methods: {
    like(e) {
      e.stopPropagation();
      const { id } = this.asking;
      if (this.asking.isLike !== 1) {
        this.$emit('like', id);
      }
    },
    dismiss(e) {
      e.stopPropagation();
      const { id } = this.asking;
      if (this.asking.isLike !== 0) {
        this.$emit('dismiss', id);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.a-buildingSwiperItem {
  @include a-buildingSwiperItem;
}
</style>
