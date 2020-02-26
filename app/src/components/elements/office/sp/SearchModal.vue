<template>
  <div class="m-searchModal">
    <header class="m-searchModal__header">
      <h1 class="m-searchModal__headerTtl">
        検索
      </h1>
      <a
        href="#"
        @click.prevent="handleClose"
        class="m-searchModal__close"
      >
        <i class="fas fa-times" />
      </a>
    </header>
    <div class="m-searchModal__main">
      <div class="m-searchModal__mainCnt">
        <client-only>
          <multiselect
            :value="selectedLocations"
            @input="addLocation({ target: $event[$event.length - 1].type, value: $event[$event.length - 1] })"
            @search-change="changeAutoComplete"
            label="name"
            :options="options"
            :multiple="true"
            :close-on-select="true"
            :show-labels="false"
            :searchable="true"
            :loading="isLoading"
            :internal-search="false"
            :hide-selected="true"
            :block-keys="['Delete']"
            placeholder="市区町村・駅名を入力してください"
          >
            <template
              slot="tag"
              slot-scope="{ option }"
            >
              <span class="m-searchModal__mainCntTag">
                {{ option.name }}
                <span @click="removeLocation({ target: option.type, id: option.id })">
                  <i class="m-searchModal__mainCntTagIcon fas fa-times" />
                </span>
              </span>
            </template>
            <template slot="noOptions">
              検索ワードを入力してください
            </template>
            <template slot="noResult">
              合致するエリアがありません
            </template>
          </multiselect>
        </client-only>
      </div>
      <div class="m-searchModal__detail">
        <h2 class="m-searchModal__detailTtl">
          詳細条件の指定
        </h2>
        <ul class="m-searchModal__detailList">
          <li class="m-searchModal__detailItem">
            <RangeInput
              unit="円/坪"
              :max="rentRange[1]"
              :min="rentRange[0]"
              :interval="100"
              :mark-interval="10000"
              :is-hide-label="true"
              @change="setValue({target:'rent', value: $event})"
              :value="conditions.rent"
              :checked="flags.rent"
              @check="setFlag({target:'rent', value: $event})"
            >
              賃料の指定
            </RangeInput>
          </li>
          <li class="m-detailSearch__detailItem">
            <RangeInput
              unit="坪"
              :max="areaRange[1]"
              :min="areaRange[0]"
              :interval="5"
              :mark-interval="100"
              :is-hide-label="true"
              @change="setValue({target:'area', value: $event})"
              :value="conditions.area"
              :checked="flags.area"
              @check="setFlag({target:'area', value: $event})"
            >
              面積の指定
            </RangeInput>
          </li>
          <li class="m-searchModal__detailItem">
            <SelectBox
              label="駅からの徒歩分数"
              id="walkingTime"
              :options="walkingTimeOptions"
              @select="setTimeRequired($event)"
              :value="conditions.timeRequired"
            />
          </li>
          <li class="m-searchModal__detailItem">
            <SelectBox
              label="築年数"
              id="buildingYear"
              :options="buildingYearOptions"
              @select="setCompletedOn($event)"
              :value="conditions.completedOn"
            />
          </li>
          <li class="m-searchModal__detailItem">
            <SelectBox
              label="入居可能時期"
              id="contractStart"
              :options="contractStartOptions"
              @select="setContractStart($event)"
              :value="conditions.contractStart"
            />
          </li>
          <li class="m-searchModal__detailItem">
            <div
              @click="search"
              class="m-searchModal__btn"
            >
              <i class="m-searchModal__btnIcon fas fa-search" />検索する
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import RangeInput from '~/components/elements/common/search/RangeInput';
import SelectBox from '~/components/elements/common/SelectBox';

export default {
  components: {
    RangeInput,
    SelectBox,
  },
  data() {
    const walkingTimeOptions = ['1分以内', '3分以内', '5分以内', '10分以内', '20分以内'];
    const buildingYearOptions = ['築3年以内', '築10年以内', '築20年以内', '築30年以内', '築40年以内'];
    const contractStartOptions = ['即入居可', '3ヶ月以内', '指定なし'];
    return {
      isActive: false,
      walkingTimeOptions,
      buildingYearOptions,
      contractStartOptions,
      rentRange: [0, 60000],
      areaRange: [0, 500],
      prefectures: [],
      wards: [],
      stations: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapState('search', [
      'conditions',
      'flags',
      'count',
    ]),
    options() {
      return this.prefectures.concat(this.wards).concat(this.stations);
    },
    selectedLocations() {
      return this.conditions.prefectures.concat(this.conditions.wards).concat(this.conditions.stations);
    },
  },
  methods: {
    ...mapMutations('search', [
      'addLocation',
      'removeLocation',
      'setValue',
      'setFlag',
      'setTimeRequired',
      'setCompletedOn',
      'setContractStart',
    ]),
    handleClose() {
      this.$emit('handle-close');
    },
    async search() {
      // 検索結果が現れないページからはリンクになる
      if (this.$route.path === '/office' || this.$route.path === '/tenant') {
        this.$router.push('/office/result');
      } else {
        await this.$store.dispatch('search/search');
        this.$emit('handle-close');
      }
    },
    async changeAutoComplete($event) {
      if (!$event) { return; }
      this.isLoading = true;
      try {
        const res = await this.$axios.get('https://search.estie.jp/',
          {
            params: {
              table_names: ['prefecture', 'ward', 'station'],
              name: $event,
              limit: 5,
            },
          });
        this.prefectures = res.data.prefecture.data.map(n => Object.assign(n.attributes, { type: n.type }));
        this.wards = res.data.ward.data.map(n => Object.assign(n.attributes, { type: n.type }));
        this.stations = res.data.station.data.map(n => Object.assign(n.attributes, { type: n.type }));
      } catch (e) {
        this.setNotificationMessage('error', 'サーバーエラーです');
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.m-searchModal {
  @include m-searchModal;
}
</style>
