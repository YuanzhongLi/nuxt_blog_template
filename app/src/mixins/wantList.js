export default {
  data() {
    return {
      defaultEquipments: {
        reception: false,
        meeting_room: false,
        server_room: false,
        warehouse: false,
        parking: false,
        emergency_generator: false,
      },
      defaultConditions: {
        use_gas: false,
        one_floor: false,
        mansion_ok: false,
        wet_expansion: false,
        share_office_ok: false,
      },
    };
  },
  computed: {
    wantEquipmentsJapaneseLabels() {
      return {
        reception: '受付',
        meeting_room: '会議室',
        server_room: 'サーバールーム',
        warehouse: '倉庫',
        parking: '駐車場',
        emergency_generator: '非常用発電機',
      };
    },
    wantConditionJapaneseLabels() {
      return {
        use_gas: 'ガスの利用あり',
        one_floor: '１フロア希望',
        mansion_ok: 'マンションタイプＯＫ',
        wet_expansion: '水回りの増設あり',
        share_office_ok: 'シェアオフィスＯＫ',
      };
    },
    noWantEquipments() {
      return { no_want_equipment: '希望付帯設備なし' };
    },
    noWantConditions() {
      return { no_want_condition: '希望こだわり条件なし' };
    },
    wantEquipmentsList() {
      const equipmentList = JSON.parse(this.demands.wantEquipments);
      if (!equipmentList) {
        return this.noWantEquipments;
      }
      Object.keys(equipmentList).forEach((item) => {
        if (equipmentList[item] === false) {
          delete equipmentList[item];
        } else {
          equipmentList[item] = this.wantEquipmentsJapaneseLabels[item];
        }
      });
      if (Object.keys(equipmentList).length === 0) {
        return this.noWantEquipments;
      }
      return equipmentList;
    },
    wantConditionsList() {
      const conditionList = JSON.parse(this.demands.wantConditions);
      if (!conditionList) {
        return this.noWantConditions;
      }
      Object.keys(conditionList).forEach((item) => {
        if (conditionList[item] === false) {
          delete conditionList[item];
        } else {
          conditionList[item] = this.wantConditionJapaneseLabels[item];
        }
      });
      if (Object.keys(conditionList).length === 0) {
        return this.noWantConditions;
      }
      return conditionList;
    },
  },
};
