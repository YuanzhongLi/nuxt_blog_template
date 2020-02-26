<template>
  <div class="a-buildingSingleImg">
    <div
      class="a-buildingSingleImg__cnt"
      :style="`background-image: url(${firstBuildingImgUrl || noImgUrl});`"
    />
  </div>
</template>

<script>
import { noImgUrl } from '~/utils/building';

export default {
  data() {
    return { noImgUrl };
  },
  props: {
    firstBuildingImgUrl: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
.a-buildingSingleImg {
  @include a-buildingSingleImg;
}
</style>
