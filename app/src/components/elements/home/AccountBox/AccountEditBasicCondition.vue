<template>
  <form class="m-editSetting">
    <ul class="m-editSetting__list">
      <li class="m-editSetting__item">
        <InputBox
          icon="fas fa-yen-sign"
          label="月額賃料予算（万円）"
          id="budget"
          input-type="number"
          placeholder="例：300（万円）"
          :label-content="editingDemands.budget"
          @input="editingDemands.budget = $event"
          unit="万円"
          :is-required="true"
        />
      </li>
      <li class="m-editSetting__item">
        <InputBox
          icon="fas fa-users"
          label="オフィスを利用する社員数"
          id="employees"
          :label-content="editingDemands.employees"
          @input="editingDemands.employees = $event"
          input-type="number"
          placeholder="例：100"
          unit="人"
          :is-required="true"
        />
      </li>
      <li class="m-editSetting__item">
        <SelectBox
          label="希望入居時期"
          id="movingTerm"
          icon="far fa-calendar-alt"
          :options="movingTermOptions"
          :value="editingDemands.movingTerm"
          @select="editingDemands.movingTerm = $event"
          :is-required="true"
        />
      </li>
      <li class="m-editSetting__item">
        <client-only>
          <multiselect
            v-model="areaStation"
            @search-change="changeAutoComplete"
            label="stationName"
            :options="options"
            :multiple="true"
            :close-on-select="true"
            :show-labels="false"
            :searchable="true"
            :loading="isLoading"
            :internal-search="false"
            :hide-selected="true"
            :block-keys="['Delete']"
            placeholder="駅名を入力してください"
          >
            <template
              slot="tag"
              slot-scope="{ option }"
            >
              <span class="m-editSetting__tag">
                {{ option.stationName }}
                <span
                  @click="areaStation = areaStation.filter(n => n.stationId !== option.stationId)"
                >
                  <i class="m-editSetting__tagIcon fas fa-times" />
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
      </li>
      <li class="m-editSetting__item">
        <SelectBox
          label="徒歩分数"
          id="walkingTime"
          :value="editingDemands.walkingTime"
          :options="walkingTimeOptions"
          @select="editingDemands.walkingTime = $event"
          :is-required="true"
        />
      </li>
      <li class="m-editSetting__item">
        <TextAreaBox
          label="その他ご要望"
          :label-content="editingDemands.others"
          @input="editingDemands.others = $event"
          placeholder="ご自由にご記入ください"
        />
      </li>
    </ul>
    <button
      class="m-editSetting__save"
      @click.prevent="update"
    >
      保存
    </button>
  </form>
</template>

<script>
import InputBox from '~/components/elements/common/InputBox';
import SelectBox from '~/components/elements/common/SelectBox';
import TextAreaBox from '~/components/elements/common/TextAreaBox';
import updateTenantDemand from '~/mixins/updateTenantDemand';
// import { isEmpty } from '~/utils/validation';
import notification from '~/mixins/notification';


export default {
  components: {
    InputBox,
    SelectBox,
    TextAreaBox,
  },
  props: {
    demands: {
      type: Object,
      required: true,
    },
    stationsList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    movingTermOptions() {
      return ['今すぐ', '3ヶ月以内', '6ヶ月以内', '1年以内', '物件次第'];
    },
    walkingTimeOptions() {
      return ['1分以内', '3分以内', '5分以内', '10分以内', '20分以内'];
    },
  },
  mixins: [notification, updateTenantDemand],
  data() {
    const editingDemands = this.demands;
    const isLoading = false;
    editingDemands.walkingTime = `${editingDemands.area[0].timeRequired}分以内`;
    const areaStation = editingDemands.area.map(el => ({
      id: el.id, tenantId: el.tenantId, stationId: el.stationId, stationName: el.stationName, deleted: el.deleted,
    }));
    return {
      editingDemands,
      options: [],
      isLoading,
      areaStation,
    };
  },
  methods: {
    update() {
      this.editingDemands.areaStation = this.areaStation;
      const errorString = this.validTenantDemandWithMessage(this.editingDemands);
      if (errorString) {
        this.setNotificationMessage('error', errorString);
        return;
      }
      this.editingDemands.area = this.areaStation.map(n => Object.assign(n, { timeRequired: Number(this.editingDemands.walkingTime.replace('分以内', '')) }));
      this.$emit('update-tenant-demands', this.editingDemands);
    },
    async changeAutoComplete($event) {
      if (!$event) { return; }
      this.isLoading = true;
      try {
        const res = await this.$axios.get('https://search.estie.jp/',
          {
            params: {
              table_names: ['station'],
              name: $event,
              limit: 5,
            },
          });
        this.options = res.data.station.data.map(n => ({ stationId: n.attributes.id, stationName: n.attributes.name }));
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
.m-editSetting {
  @include m-editSetting;
}
</style>
