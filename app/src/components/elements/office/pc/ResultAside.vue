<template>
  <aside class="m-resultAside">
    <nuxt-link
      to="/office/e-map?is_search=1"
      class="m-resultAside__emap"
    >
      <div class="m-resultAside__emapImg" />
      <span class="m-resultAside__emapTxt">
        <i class="m-resultAside__emapTxtIcon fas fa-search" />e-Mapで見る
      </span>
    </nuxt-link>
    <div class="m-resultAside__head">
      <h1
        v-if="prefecture"
        class="m-resultAside__headTtl"
      >
        {{ ward ? ward.name : prefecture.name }}
      </h1>
      <p class="m-resultAside__headNum">
        該当物件：{{ count }}件
      </p>
    </div>
    <div class="m-resultAside__body">
      <div class="m-resultAside__bodyCnt">
        <h2 class="m-resultAside__bodyCntTtl">
          エリアの変更
        </h2>
        <div class="m-resultAside__bodyChangeArea">
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
                <span class="m-resultAside__bodyTag">
                  {{ option.name }}
                  <span @click="removeLocation({ target: option.type, id: option.id })">
                    <i class="m-resultAside__bodyTagIcon fas fa-times" />
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
      </div>
      <div class="m-resultAside__bodyCnt">
        <h2 class="m-resultAside__bodyCntLabel">
          基本条件
        </h2>
        <ul class="m-resultAside__bodyList">
          <li class="m-resultAside__bodyListItem m-resultAside__bodyListItem--range">
            <RangeInput
              unit="円/坪"
              :max="rentRange[1]"
              :min="rentRange[0]"
              :interval="100"
              :mark-interval="20000"
              :is-omit="true"
              @change="setValue({target:'rent', value: $event})"
              :value="conditions.rent"
              :checked="flags.rent"
              @check="setFlag({target:'rent', value: $event})"
            >
              賃料の指定
            </RangeInput>
          </li>
          <li class="m-resultAside__bodyListItem m-resultAside__bodyListItem--range">
            <RangeInput
              unit="坪"
              :max="areaRange[1]"
              :min="areaRange[0]"
              :interval="5"
              :mark-interval="100"
              @change="setValue({target:'area', value: $event})"
              :value="conditions.area"
              :checked="flags.area"
              @check="setFlag({target:'area', value: $event})"
            >
              面積の指定
            </RangeInput>
          </li>
        </ul>
      </div>
      <div class="m-resultAside__bodyCnt">
        <h2 class="m-resultAside__bodyCntLabel">
          詳細条件
        </h2>
        <ul class="m-resultAside__bodyList">
          <li class="m-resultAside__bodyListItem">
            <InputBox
              icon="fas fa-user"
              label="社員数"
              id="employee"
              unit="人"
              @input="name = $event"
              input-type="num"
              placeholder="例：100"
              :is-required="false"
            />
          </li>
          <li class="m-resultAside__bodyListItem">
            <SelectBox
              label="駅からの徒歩分数"
              id="walkingTime"
              :options="walkingTimeOptions"
              @select="setTimeRequired($event)"
              :value="conditions.timeRequired"
            />
          </li>
          <li class="m-resultAside__bodyListItem">
            <SelectBox
              label="築年数"
              id="buildingYear"
              :options="buildingYearOptions"
              @select="setCompletedOn($event)"
              :value="conditions.completedOn"
            />
          </li>
          <li class="m-resultAside__bodyListItem">
            <SelectBox
              label="入居可能時期"
              id="contractStart"
              :options="contractStartOptions"
              @select="setContractStart($event)"
              :value="conditions.contractStart"
            />
          </li>
        </ul>
      </div>
      <a
        class="m-resultAside__search"
        @click="setPage(1);search()"
      >
        <i class="m-resultAside__searchIcon fas fa-search" />検索する
      </a>
    </div>
  </aside>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import InputBox from '~/components/elements/common/InputBox';
import RangeInput from '~/components/elements/common/search/RangeInput';
import SelectBox from '~/components/elements/common/SelectBox';

export default {
  components: {
    InputBox,
    RangeInput,
    SelectBox,
  },
  props: {
    prefecture: {
      type: Object,
      default: () => {},
    },
    ward: {
      type: Object,
      default: () => {},
    },
    search: {
      type: Function,
      required: true,
    },
  },
  data() {
    const walkingTimeOptions = ['1分以内', '3分以内', '5分以内', '10分以内', '20分以内'];
    const buildingYearOptions = ['築3年以内', '築10年以内', '築20年以内', '築30年以内', '築40年以内'];
    const contractStartOptions = ['即入居可', '3ヶ月以内', '指定なし'];
    return {
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
      'setPage',
    ]),
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

<style lang="scss" scoped>
.m-resultAside {
  @include m-resultAside;
}
</style>
