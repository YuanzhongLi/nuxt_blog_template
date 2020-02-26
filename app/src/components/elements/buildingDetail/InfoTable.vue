<template>
  <table
    class="a-infoTable"
    :class="{'a-infoTable--sp': device.isMobile}"
  >
    <tbody>
      <tr>
        <th class="a-infoTable__head">
          最寄り駅
        </th>
        <td class="a-infoTable__table">
          {{ concatAndAddWords(station.stationName, station.timeRequired) }}
        </td>
      </tr>
      <tr>
        <th class="a-infoTable__head">
          竣工年月
        </th>
        <td class="a-infoTable__table">
          {{ this.completed }}
        </td>
      </tr>
      <tr>
        <th class="a-infoTable__head">
          規模
        </th>
        <td class="a-infoTable__table">
          {{ info.story }}
        </td>
      </tr>
      <tr>
        <th class="a-infoTable__head">
          延床面積
        </th>
        <td
          v-if="info.grossFloorArea"
          class="a-infoTable__table"
        >
          {{ info.grossFloorArea }}坪
        </td>
      </tr>
      <tr>
        <th class="a-infoTable__head">
          基準階面積
        </th>
        <td
          v-if="info.standardFloorArea"
          class="a-infoTable__table"
        >
          {{ info.standardFloorArea }}坪
        </td>
      </tr>
      <tr>
        <th class="a-infoTable__head">
          天井高
        </th>
        <td
          v-if="info.floorHeight"
          class="a-infoTable__table"
        >
          {{ info.floorHeight }}mm
        </td>
      </tr>
      <tr>
        <th class="a-infoTable__head">
          その他説明
        </th>
        <td class="a-infoTable__table">
          {{ info.explanation }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from 'vuex';
import stationFilter from '~/mixins/stationFilter';

export default {
  mixins: [stationFilter],
  props: {
    station: {
      type: Object,
      default: () => [],
    },
    info: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(['device']),
    completed() {
      const strCompletedOn = String(this.info.completedOn);
      return `${strCompletedOn.slice(0, 4)}年${strCompletedOn.slice(4, 6)}月`;
    },
  },
};
</script>

<style scoped lang="scss">
.a-infoTable {
  @include a-infoTable;
}
</style>
