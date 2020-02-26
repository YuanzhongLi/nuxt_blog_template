import {
  isEmpty,
} from '~/utils/validation';

import notification from '~/mixins/notification';

export default {
  mixins: [notification],
  methods: {
    async update() {
      const {
        employees,
        budget,
        movingTerm,
        others,
        areaStation,
        industry,
        industryOther,
        movingReason,
        movingOtherReason,
        demandSize,
        demandAreaReason,
        canCompromiseCondition,
        currentAgreement,
        submittedCancellNotice,
        walkingTime,
      } = this;
      const wantEquipments = JSON.stringify(this.wantEquipments);
      const wantConditions = JSON.stringify(this.wantConditions);
      const businessStartPeriod = Number(this.businessStartPeriodY + this.businessStartPeriodM);
      const currentContractExpirationPeriod = Number(this.currentContractExpirationPeriodY + this.currentContractExpirationPeriodM);
      const area = areaStation.map(n => Object.assign(n, { timeRequired: Number(walkingTime.replace('分以内', '')) }));
      const requiredValues = {
        employees,
        budget,
        movingTerm,
        areaStation,
        walkingTime,
      };
      const notRequiredValues = {
        others,
        industry,
        industryOther,
        movingReason,
        movingOtherReason,
        demandSize,
        businessStartPeriod,
        demandAreaReason,
        wantEquipments,
        canCompromiseCondition,
        wantConditions,
        currentAgreement,
        currentContractExpirationPeriod,
        submittedCancellNotice,
      };
      const emptyErrorMessage = {
        employees: 'オフィスを利用する社員数',
        budget: '月額賃料予算',
        movingTerm: '希望入居時期',
        areaStation: '希望駅名',
        walkingTime: '希望徒歩分数',
      };
      const keyOfMissedRequiredValues = Object.keys(requiredValues)
        .find(_ => emptyErrorMessage[_] !== undefined && isEmpty(requiredValues[_]));
      if (emptyErrorMessage[keyOfMissedRequiredValues] !== undefined && isEmpty(requiredValues[keyOfMissedRequiredValues])) {
        this.setNotificationMessage('error', `記入していない必須項目（${emptyErrorMessage[keyOfMissedRequiredValues]}）があります`);
        return;
      }
      const values = {
        employees,
        budget,
        movingTerm,
        area,
        ...notRequiredValues,
      };
      this.$emit('update-tenant-demands', values);
    },
  },
};
