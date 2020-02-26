<template>
  <div class="a-buildingMapArea">
    <GmapMap
      :center="{ lat: latitude, lng: longitude }"
      :zoom="16"
      :options="cooprativeGmapOptions"
      map-type-id="roadmap"
      style="width: 100%; height: 500px;"
    >
      <GmapMarker
        :position="{ lat: latitude, lng: longitude }"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  computed: {
    cooprativeGmapOptions() {
      const cooprativeGmap = Object.assign({}, this.gMapOptions, { gestureHandling: 'cooperative' });
      return cooprativeGmap;
    },
  },
  props: {
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
  },
};

</script>

<style scoped lang="scss">
.a-buildingMapArea {
  @include a-buildingMapArea;
}
</style>
