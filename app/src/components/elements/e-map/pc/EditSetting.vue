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
          icon="far fa-calendar-alt"
          :options="movingTermOptions"
          id="movingTerm"
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
      <li class="m-editSetting__item">
        <p class="m-editSetting__itemLabel">
          詳細条件
        </p>
        <InputBox
          label="希望の面積"
          :label-content="editingDemands.demandSize"
          @input="editingDemands.demandSize = $event"
          placeholder="ご自由にご記入ください"
          input-type="number"
          unit="坪"
        />
      </li>
      <li class="m-editSetting__item m-editSetting__item--flex">
        <InputBox
          class="m-editSetting__item--flexItem"
          label="営業開始時期(西暦年)"
          id="businessStartPeriodY"
          :label-content="businessStartPeriodY"
          :min="2020"
          :max="9999"
          @input="businessStartPeriodY = $event"
          input-type="number"
        />
        <InputBox
          class="m-editSetting__item--flexItem"
          id="businessStartPeriodM"
          label="営業開始時期(月)"
          :label-content="businessStartPeriodM"
          :min="1"
          :max="12"
          @input="businessStartPeriodM = $event"
          input-type="number"
        />
      </li>
      <li class="m-editSetting__item">
        <TextAreaBox
          label="場所・エリアを希望する理由"
          :label-content="editingDemands.demandAreaReason"
          @input="editingDemands.demandAreaReason = $event"
          placeholder="ご自由にご記入ください"
        />
      </li>
      <li class="m-editSetting__item">
        <p class="m-editSetting__itemLabel">
          希望の付帯設備（複数選択可）
        </p>
        <CheckBox
          class="m-editSetting__check"
          :value="wantEquipments.reception"
          @input="wantEquipments.reception = $event"
        >
          受付
        </CheckBox>
        <CheckBox
          class="m-editSetting__check"
          :value="wantEquipments.meeting_room"
          @input="wantEquipments.meeting_room = $event"
        >
          会議室
        </CheckBox>
        <CheckBox
          class="m-editSetting__check"
          :value="wantEquipments.server_room"
          @input="wantEquipments.server_room = $event"
        >
          サーバールーム
        </CheckBox>
        <CheckBox
          class="m-editSetting__check"
          :value="wantEquipments.warehouse"
          @input="wantEquipments.warehouse = $event"
        >
          倉庫
        </CheckBox>
        <CheckBox
          class="m-editSetting__check"
          :value="wantEquipments.parking"
          @input="wantEquipments.parking = $event"
        >
          駐車場
        </CheckBox>
        <CheckBox
          class="m-editSetting__check"
          :value="wantEquipments.emergency_generator"
          @input="wantEquipments.emergency_generator = $event"
        >
          非常用発電機
        </CheckBox>
      </li>
      <li class="m-editSetting__item">
        <TextAreaBox
          label="譲れない条件、妥協できる条件"
          :label-content="editingDemands.canCompromiseCondition"
          @input="editingDemands.canCompromiseCondition = $event"
          placeholder="ご自由にご記入ください"
        />
      </li>
      <li class="m-editSetting__item">
        <p class="m-editSetting__itemLabel">
          こだわり条件（複数選択可）
        </p>
        <CheckBox
          class="m-editSetting__check"
          :value="wantConditions.one_floor"
          @input="wantConditions.one_floor = $event"
        >
          1フロア希望
        </CheckBox>
        <CheckBox
          class="m-editSetting__check"
          :value="wantConditions.mansion_ok"
          @input="wantConditions.mansion_ok = $event"
        >
          マンションタイプＯＫ
        </CheckBox>
        <CheckBox
          class="m-editSetting__check"
          :value="wantConditions.share_office_ok"
          @input="wantConditions.share_office_ok = $event"
        >
          シェアオフィスＯＫ
        </CheckBox>
        <CheckBox
          class="m-editSetting__check"
          :value="wantConditions.use_gas"
          @input="wantConditions.use_gas = $event"
        >
          ガスの利用あり
        </CheckBox>
        <CheckBox
          class="m-editSetting__check"
          :value="wantConditions.wet_expansion"
          @input="wantConditions.wet_expansion = $event"
        >
          水回りの増設あり
        </CheckBox>
      </li>
      <li class="m-editSetting__item">
        <p class="m-editSetting__itemLabel">
          お客様情報
        </p>
        <SelectBox
          label="業種"
          :options="industryOptions"
          id="industry"
          :value="editingDemands.industry"
          @select="editingDemands.industry = $event"
          :is-required="false"
        />
      </li>
      <li
        v-if="this.editingDemands.industry === 'その他'"
        class="m-editSetting__item"
      >
        <InputBox
          label="その他業種(自由記述)"
          input-type="varchar"
          placeholder="上記に当てはまらない業種を記入"
          :label-content="editingDemands.industryOther"
          @input="editingDemands.industryOther = $event"
          :is-required="false"
        />
      </li>
      <li class="m-editSetting__item">
        <SelectBox
          id="movingReason"
          label="移転理由"
          :options="movingReasonOptions"
          :value="editingDemands.movingReason"
          @select="editingDemands.movingReason = $event"
        />
      </li>
      <li class="m-editSetting__item">
        <TextAreaBox
          label="その他移転理由"
          :label-content="editingDemands.movingOtherReason"
          @input="editingDemands.movingOtherReason = $event"
          placeholder="ご自由にご記入ください"
        />
      </li>
      <li class="m-editSetting__item">
        <p class="m-editSetting__itemLabel">
          現在の契約形態
        </p>
        <SelectBox
          id="currentAgreement"
          :options="currentAgreementOptions"
          label="契約"
          :value="editingDemands.currentAgreement"
          @select="editingDemands.currentAgreement = $event"
        />
      </li>
      <li class="m-editSetting__item m-editSetting__item--flex">
        <InputBox
          class="m-editSetting__item--flexItem"
          label="期間満了時期(年)"
          id="currentContractExpirationPeriodY"
          :min="2000"
          :max="9999"
          :label-content="currentContractExpirationPeriodY"
          @input="currentContractExpirationPeriodY = $event"
          input-type="number"
        />
        <InputBox
          class="m-editSetting__item--flexItem"
          label="期間満了時期(月)"
          id="currentContractExpirationPeriodM"
          :label-content="currentContractExpirationPeriodM"
          @input="currentContractExpirationPeriodM = $event"
          :min="1"
          :max="12"
          input-type="number"
        />
      </li>
      <li class="m-editSetting__item">
        <SelectBox
          label="解約届の提出"
          :options="submittedCancellNoticeOptions"
          :value="editingDemands.submittedCancellNotice"
          @select="seditingDemands.ubmittedCancellNotice = $event"
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
import notification from '~/mixins/notification';
import wantList from '~/mixins/wantList';
import CheckBox from '~/components/elements/common/CheckBox';
import updateTenantDemand from '~/mixins/updateTenantDemand';

export default {
  components: {
    InputBox,
    CheckBox,
    SelectBox,
    TextAreaBox,
  },
  props: {
    demands: {
      type: Object,
      required: true,
    },
  },
  computed: {
    movingTermOptions() {
      return ['今すぐ', '3ヶ月以内', '6ヶ月以内', '1年以内', '物件次第'];
    },
    industryOptions() {
      return ['IT・通信・インターネット', 'メーカー', '商社', 'サービス・レジャー', '流通・小売・フード', 'マスコミ・広告・デザイン', '金融・保険', 'コンサルティング', '不動産・建設・設備', '運輸・交通・物流・倉庫', '環境・エネルギー', 'その他'];
    },
    currentAgreementOptions() {
      return ['定期借家契約', '普通借家契約'];
    },
    movingReasonOptions() {
      return ['人員拡大', 'コスト削減', '立地改善', 'ビル改善', '拠点統合'];
    },
    submittedCancellNoticeOptions() {
      return ['未', '済'];
    },
    walkingTimeOptions() {
      return ['1分以内', '3分以内', '5分以内', '10分以内', '20分以内'];
    },
  },
  mixins: [notification, wantList, updateTenantDemand],
  data() {
    const editingDemands = this.demands;
    const bsPeriod = String(editingDemands.businessStartPeriod);
    const ccePeriod = String(editingDemands.currentContractExpirationPeriod);
    let demandsWantEquipments = JSON.parse(editingDemands.wantEquipments);
    let demandsWantConditions = JSON.parse(editingDemands.wantConditions);
    const isLoading = false;
    editingDemands.walkingTime = `${editingDemands.area[0].timeRequired}分以内`;
    const areaStation = editingDemands.area.map(el => ({
      id: el.id, tenantId: el.tenantId, stationId: el.stationId, stationName: el.stationName, deleted: el.deleted,
    }));
    if (!demandsWantEquipments) {
      demandsWantEquipments = {
        reception: false,
        meeting_room: false,
        server_room: false,
        warehouse: false,
        parking: false,
        emergency_generator: false,
      };
    }
    if (!demandsWantConditions) {
      demandsWantConditions = {
        reception: false,
        meeting_room: false,
        server_room: false,
        warehouse: false,
        parking: false,
        emergency_generator: false,
      };
    }
    return {
      editingDemands,
      businessStartPeriodY: bsPeriod.slice(0, 4),
      businessStartPeriodM: bsPeriod.slice(4, 6),
      wantEquipments: demandsWantEquipments,
      wantConditions: demandsWantConditions,
      currentContractExpirationPeriodY: ccePeriod.slice(0, 4),
      currentContractExpirationPeriodM: ccePeriod.slice(4, 6),
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
      this.editingDemands.wantEquipments = JSON.stringify(this.wantEquipments);
      this.editingDemands.wantConditions = JSON.stringify(this.wantConditions);
      this.editingDemands.businessStartPeriod = Number(this.businessStartPeriodY + this.businessStartPeriodM);
      this.editingDemands.currentContractExpirationPeriod = Number(this.currentContractExpirationPeriodY + this.currentContractExpirationPeriodM);
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
