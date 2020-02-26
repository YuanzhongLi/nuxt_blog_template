<template>
  <div>
    <StationSelection
      :label-content="nearestStation"
      @select-station="nearestStation = $event"
      placeholder="例：「東京駅」「渋谷駅」など"
      filter-placeholder="駅名を入力してください"
      :is-required="true"
      :items="stationsList"
      :show-empty-item="true"
      :disabled="false"
      :ignore-case="true"
    />
    <div class="m-areaSelection__walk">
      <InputBox
        icon="fas fa-walking"
        label="徒歩"
        id="station"
        input-type="number"
        unit="分"
        placeholder="駅までの徒歩"
        :is-required="true"
        :label-content="timeRequired"
        v-model="timeRequired"
      />
      <a
        class="m-areaSelection__add"
        @click="addAreaCondition"
      >
        <i class="fas fa-plus" />
        <span v-if="displayAddText">
          追加
        </span>
      </a>
    </div>
    <ul
      v-if="area.length > 0"
      class="m-areaSelection__station"
    >
      <li
        class="m-areaSelection__stationItem"
        v-for="(c, index) in area"
        :key="c.stationId"
      >
        <a
          @click="deleteAreaCondition(index)"
        >
          <i
            class="m-areaSelection__stationDelete fas fa-times-circle"
          />
        </a>
        {{ concatAndAddWords(c.stationName, c.timeRequired) }}
      </li>
    </ul>
  </div>
</template>

<script>
import notification from '~/mixins/notification';
import InputBox from '~/components/elements/common/InputBox';
import StationSelection from './StationSelection';
import stationFilter from '~/mixins/stationFilter';

export default {
  components: {
    StationSelection,
    InputBox,
  },
  mixins: [notification, stationFilter],
  data() {
    return {
      nearestStation: {
        name: '',
        stationId: 0,
        minimumERent: 0,
      },
      timeRequired: '',
      area: this.initArea && this.initArea.length ? this.initArea : [],
      eRentArray: [],
    };
  },
  props: {
    stationsList: {
      type: Array,
      default: () => [],
    },
    initArea: {
      type: Array,
      default: () => [],
    },
    // 「追加」ボタン内の'追加'を表示するかどうか。縦幅が細い場合に消せるように。
    displayAddText: {
      type: Boolean,
      default: () => true,
    },
  },
  computed: {},
  methods: {
    addAreaCondition() {
      this.resetNotificationMessage();
      const {
        nearestStation, timeRequired, area, eRentArray,
      } = this;
      // Validation
      if (!nearestStation.id) {
        this.setNotificationMessage('error', '駅名を入力してください');
        return;
      }
      if (timeRequired === '') {
        this.setNotificationMessage('error', '徒歩分数を入力してください');
        return;
      }
      // エリア条件(=駅名と徒歩分数)の配列に入力内容を追加
      area.push({ stationName: nearestStation.name, timeRequired, stationId: nearestStation.id });
      eRentArray.push(nearestStation.minimumERent);
      // input item の表示をクリア
      this.nearestStation = { name: '', stationId: 0 };
      this.timeRequired = '';
      this.$emit('update-area', area);
      this.$emit('update-eRentArray', eRentArray);
    },
    deleteAreaCondition(index) {
      const { area } = this;
      area.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="scss">
.m-areaSelection {
  @include m-areaSelection;
}
</style>
