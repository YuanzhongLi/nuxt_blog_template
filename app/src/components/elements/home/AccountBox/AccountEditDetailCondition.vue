<template>
  <form class="m-editSetting">
    <ul class="m-editSetting__list">
      <li class="m-editSetting__item">
        <p class="m-editSetting__itemLabel">
          お客様情報
        </p>
        <SelectBox
          label="業種"
          id="industry"
          :options="industryOptions"
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
          希望の付帯設備：（複数選択可）
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
          こだわり条件：（複数選択可）
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
          現在の契約形態
        </p>
        <SelectBox
          id="currentAgreement"
          label="契約"
          :options="currentAgreementOptions"
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
          @select="editingDemands.submittedCancellNotice = $event"
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
import CheckBox from '~/components/elements/common/CheckBox';
import updateTenantDemand from '~/mixins/updateTenantDemand';

export default {
  components: {
    InputBox,
    CheckBox,
    TextAreaBox,
    SelectBox,
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
  mixins: [notification, updateTenantDemand],
  data() {
    const editingDemands = this.demands;
    editingDemands.walkingTime = `${editingDemands.area[0].timeRequired}分以内`;
    const areaStation = editingDemands.area.map(el => ({
      id: el.id, tenantId: el.tenantId, stationId: el.stationId, stationName: el.stationName, deleted: el.deleted,
    }));
    const bsPeriod = String(editingDemands.businessStartPeriod);
    const ccePeriod = String(editingDemands.currentContractExpirationPeriod);
    let demandsWantEquipments = JSON.parse(editingDemands.wantEquipments);
    let demandsWantConditions = JSON.parse(editingDemands.wantConditions);
    const industryOptions = ['IT・通信・インターネット', 'メーカー', '商社', 'サービス・レジャー', '流通・小売・フード', 'マスコミ・広告・デザイン', '金融・保険', 'コンサルティング', '不動産・建設・設備', '運輸・交通・物流・倉庫', '環境・エネルギー', 'その他'];
    const currentAgreementOptions = ['定期借家契約', '普通借家契約'];
    const movingReasonOptions = ['人員拡大', 'コスト削減', '立地改善', 'ビル改善', '拠点統合'];
    const submittedCancellNoticeOptions = ['未', '済'];
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
      areaStation,
      businessStartPeriodY: bsPeriod.slice(0, 4),
      businessStartPeriodM: bsPeriod.slice(4, 6),
      wantEquipments: demandsWantEquipments,
      wantConditions: demandsWantConditions,
      currentContractExpirationPeriodY: ccePeriod.slice(0, 4),
      currentContractExpirationPeriodM: ccePeriod.slice(4, 6),
      industryOptions,
      currentAgreementOptions,
      movingReasonOptions,
      submittedCancellNoticeOptions,
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
  },
};
</script>

<style scoped lang="scss">
.m-editSetting {
  @include m-editSetting;
}
</style>
