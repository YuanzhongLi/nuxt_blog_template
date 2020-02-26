<template>
  <div
    class="m-buildingHeader"
    :style="headerStyle"
    :class="{'m-buildingHeader--sp': device.isMobile}"
  >
    <div class="m-buildingHeader__wrap">
      <h2 class="m-buildingHeader__ttl">
        {{ name }}
      </h2>
      <dl class="m-buildingHeader__list">
        <dt class="m-buildingHeader__listTtl">
          所在地
        </dt>
        <dd class="m-buildingHeader__listItem">
          <i class="m-buildingHeader__listIcon fas fa-map-marked-alt" />
          {{ address }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { noImgUrl } from '~/utils/building';

export default {
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState(['device']),
    headerStyle() {
      const { imgUrl } = this;
      return {
        'background-image': `url(${imgUrl || noImgUrl})`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.m-buildingHeader {
  @include m-buildingHeader;
}
</style>
