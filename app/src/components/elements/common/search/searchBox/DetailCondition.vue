<template>
  <div class="a-detailCondition">
    <p class="a-detailCondition__ttl">
      詳細条件設定
    </p>
    <Switcher
      class="a-detailCondition__tab"
      @switch-cnt="switchCnt"
    />
    <ul class="a-detailCondition__conditions">
      <transition>
        <li
          class="a-detailCondition__conditionsItem"
          v-if="activeNum === selectedEnum.FLOORAREA"
          key="1"
        >
          <div class="a-detailCondition__range">
            <div class="a-detailCondition__rangeInput">
              <div class="a-detailCondition__rangeInputWrap">
                <input
                  :value="conditions.area[0]"
                  @input="setValue({target:'area', value: [Number($event.target.value), conditions.area[1]]})"
                  type="number"
                  :min="areaRange[0]"
                  :max="conditions.area[1]"
                  class="a-detailCondition__rangeInputBox"
                >
                <span class="a-detailCondition__rangeInputUnit">
                  坪
                </span>
              </div>
              <p class="a-detailCondition__rangeInputTxt">
                〜
              </p>
              <div class="a-detailCondition__rangeInputWrap">
                <input
                  :value="conditions.area[1]"
                  @input="setValue({target:'area', value: [conditions.area[0], Number($event.target.value)]})"
                  type="number"
                  :min="conditions.area[0]"
                  :max="areaRange[1]"
                  class="a-detailCondition__rangeInputBox"
                >
                <span class="a-detailCondition__rangeInputUnit">
                  坪
                </span>
              </div>
            </div>
          </div>
          <div class="a-detailCondition__range">
            <vue-slider
              :max="areaRange[1]"
              :min="areaRange[0]"
              @change="setValue({target:'area', value: $event})"
              :value="conditions.area"
              :enable-cross="false"
              :contained="true"
              :dot-size="16"
              :height="6"
              :interval="5"
              :marks="areaMark"
            />
          </div>
        </li>
        <li
          class="a-detailCondition__conditionsItem"
          v-if="activeNum === selectedEnum.RENT"
          key="2"
        >
          <div class="a-detailCondition__range">
            <div class="a-detailCondition__rangeInput">
              <div class="a-detailCondition__rangeInputWrap">
                <input
                  :value="conditions.rent[0]"
                  @input="setValue({target:'rent', value: [Number($event.target.value), conditions.rent[1]]})"
                  type="number"
                  class="a-detailCondition__rangeInputBox"
                  :min="rentRange[0]"
                  :max="conditions.rent[1]"
                >
                <span class="a-detailCondition__rangeInputUnit">
                  円/坪
                </span>
              </div>
              <p class="a-detailCondition__rangeInputTxt">
                〜
              </p>
              <div class="a-detailCondition__rangeInputWrap">
                <input
                  :value="conditions.rent[1]"
                  @input="setValue({target:'rent', value: [conditions.rent[0], Number($event.target.value)]})"
                  type="number"
                  :min="conditions.rent[0]"
                  :max="rentRange[1]"
                  class="a-detailCondition__rangeInputBox"
                >
                <span class="a-detailCondition__rangeInputUnit">
                  円/坪
                </span>
              </div>
            </div>
          </div>
          <div class="a-detailCondition__range">
            <vue-slider
              :max="rentRange[1]"
              :min="rentRange[0]"
              @change="setValue({target:'rent', value: $event})"
              :value="conditions.rent"
              :enable-cross="false"
              :contained="true"
              :dot-size="16"
              :height="6"
              :interval="100"
              :marks="rentMark"
            />
          </div>
        </li>
        <li
          v-if="activeNum === selectedEnum.WALKINGTIME"
          key="3"
        >
          <SelectBox
            label="駅からの徒歩分数"
            id="walkingTime"
            :options="walkingTimeOptions"
            @select="setTimeRequired($event)"
            :value="conditions.timeRequired"
          />
        </li>
        <li
          v-if="activeNum === selectedEnum.BUILDINGYEAR"
          key="4"
        >
          <SelectBox
            label="築年数"
            id="buildingYear"
            :options="buildingYearOptions"
            @select="setCompletedOn($event)"
            :value="conditions.completedOn"
          />
        </li>
        <li
          v-if="activeNum === selectedEnum.MOVEINTERM"
          key="5"
        >
          <SelectBox
            label="入居可能時期"
            id="contractStart"
            :options="contractStartOptions"
            @select="setContractStart($event)"
            :value="conditions.contractStart"
          />
        </li>
      </transition>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import SelectBox from '~/components/elements/common/SelectBox';
import Switcher from '../Switcher';

export default {
  components: {
    SelectBox,
    Switcher,
  },
  data() {
    const selectedEnum = {
      FLOORAREA: 1,
      RENT: 2,
      WALKINGTIME: 3,
      BUILDINGYEAR: 4,
      MOVEINTERM: 5,
    };
    const walkingTimeOptions = ['1分以内', '3分以内', '5分以内', '10分以内', '20分以内'];
    const buildingYearOptions = ['築3年以内', '築10年以内', '築20年以内', '築30年以内', '築40年以内'];
    const contractStartOptions = ['即入居可', '3ヶ月以内', '指定なし'];
    return {
      rentRange: [0, 60000],
      areaRange: [0, 500],
      walkingTimeOptions,
      buildingYearOptions,
      contractStartOptions,
      activeNum: selectedEnum.FLOORAREA,
      selectedEnum,
      rentMark: val => val % 10000 === 0,
      areaMark: val => val % 100 === 0,
    };
  },
  computed: {
    ...mapState('search', [
      'conditions',
      'flags',
      'count',
    ]),
  },
  methods: {
    ...mapMutations('search', [
      'setValue',
      'setFlag',
      'setTimeRequired',
      'setCompletedOn',
      'setContractStart',
    ]),
    switchCnt(num) {
      this.activeNum = num;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-leave-active {
  position: absolute;
  right: 0;
  left: 0;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.a-detailCondition {
  @include a-detailCondition;
}
</style>
