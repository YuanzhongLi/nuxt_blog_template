<template>
  <div class="m-searchBox">
    <div class="m-searchBox__base">
      <client-only>
        <multiselect
          class="m-searchBox__baseInput"
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
            <span class="m-searchBox__tag">
              {{ option.name }}
              <span @click="removeLocation({ target: option.type, id: option.id })">
                <i class="m-searchBox__tagIcon fas fa-times" />
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
      <a
        @click="search"
        class="m-searchBox__baseBtn"
      >
        <i class="m-searchBox__baseBtnIcon fas fa-search" />検索する
      </a>
    </div>
    <DetailCondition />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import DetailCondition from './DetailCondition';

export default {
  props: {
    search: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      prefectures: [],
      wards: [],
      stations: [],
      value: null,
      isLoading: false,
    };
  },
  components: {
    DetailCondition,
  },
  computed: {
    ...mapState('search', [
      'conditions',
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
        this.isLoading = false;
      } catch (e) {
        this.setNotificationMessage('error', 'サーバーエラーです');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.m-searchBox {
  @include m-searchBox;
}
</style>
