/**
   * テナントの希望条件のバリデーション
   * @param {Object} editingDemands
   * @returns "String"
   *
   * 登録できる場合は "" を返す
   * 登録できない場合は setNotificationMessage に渡すStringを返す
   *
   */

import { isEmpty } from '~/utils/validation';

export default {
  computed: {
    emptyErrorMessage() {
      return {
        employees: 'オフィスを利用する社員数',
        area: '希望エリア',
        movingTerm: '希望入居時期',
        budget: '月額賃料予算',
        areaStation: '希望最寄駅名',
        walkingTime: '希望徒歩分数',
      };
    },
  },
  methods: {
    validTenantDemandWithMessage(editingDemands) {
      const {
        employees,
        budget,
        movingTerm,
        others,
        areaStation,
        walkingTime,
      } = editingDemands;
      const requiredValues = {
        employees,
        budget,
        movingTerm,
        others,
        areaStation,
        walkingTime,
      };
      const key = Object.keys(requiredValues).find(_ => this.emptyErrorMessage[_] !== undefined && isEmpty(requiredValues[_]));
      if (this.emptyErrorMessage[key] !== undefined && isEmpty(requiredValues[key])) {
        if (key) {
          return `記入していない必須項目（${this.emptyErrorMessage[key]}）があります`;
        }
      }
      return '';
    },
  },
};
