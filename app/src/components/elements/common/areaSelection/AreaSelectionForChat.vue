<template>
  <div
    class="m-areaSelectionForChat"
    :class="className"
  >
    <div
      class="m-areaSelectionForChat__wrap"
      :class="{'m-areaSelectionForChat__wrap--sp': device.isMobile}"
    >
      <StationSelection
        class="m-areaSelectionForChat__station"
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
      <div class="m-areaSelectionForChat__walk">
        <InputBox
          class="m-areaSelectionForChat__walkInput"
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
          class="m-areaSelectionForChat__add"
          @click="addAreaCondition"
        >
          <i class="fas fa-plus" />
          <span v-if="displayAddText" />
        </a>
      </div>
    </div>
    <ul
      v-if="area.length > 0"
      class="m-areaSelectionForChat__list m-areaSelection__station"
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
import { mapState } from 'vuex';
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
      },
      timeRequired: '',
      area: this.initArea && this.initArea.length ? this.initArea : [],
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
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState(['device']),
  },
  methods: {
    addAreaCondition() {
      this.resetNotificationMessage();
      const { nearestStation, timeRequired, area } = this;
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
      // input item の表示をクリア
      this.nearestStation = { name: '', stationId: 0 };
      this.timeRequired = '';
      this.$emit('update-area', area);
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

.m-areaSelectionForChat {
  &--building {
    .m-areaSelectionForChat__wrap {
      display: block;

      .m-areaSelectionForChat__station {
        width: 100%;
      }

      .m-areaSelectionForChat__walk {
        margin-top: 8px;
        width: 100%;
      }
    }
  }

  &__wrap {
    display: flex;
    align-items: center;
    margin-top: 16px;

    &--sp {
      display: block;

      .m-areaSelectionForChat__station {
        width: 100%;
      }

      .m-areaSelectionForChat__walk {
        margin-top: 8px;
        width: 100%;
      }
    }
  }

  &__station {
    margin-right: 8px;
    width: 60%;
  }

  &__walk {
    width: 40%;
    display: flex;
    align-items: center;

    &Input {
      flex: 1;
    }
  }

  &__add {
    margin-left: 8px;
    width: 42px;
    height: 42px;
    border-radius: 20px;
    line-height: 42px;
    background: #3e8bff;
    color: #fff;
    font-weight: bold;
    font-size: 1.3rem;
    transition: all 0.3s ease-out;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
  }

  &__list {
    margin-bottom: 8px;
  }
}
</style>
