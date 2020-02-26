/* eslint-disable import/prefer-default-export */

const agentOfferInfoTable = {
  name: 'ビル名',
  address: '住所',
  nearestStation: '最寄駅',
  timeRequired: '徒歩',
  story: '規模',
  completedOn: '竣工年月',
  grossFloorArea: '延床面積',
  standardFloorArea: '基準階面積',
  structure: '構造',
  floorHeight: '天井高',
  floorLoading: '床荷重',
  vacantRoomFloor: '募集フロア',
  askingRoomArea: '募集面積',
  askingRent: '募集賃料（共益費込）坪',
  askingMonthlyRent: '募集賃料（共益費込）月',
  deposit: '敷金・保証金',
  movingTerm: '入居可能時期',
  contract: '契約期間（契約形態＋期間）',
  explanation: 'その他説明',
};

export const noImgUrl = 'https://prd-estie.s3-ap-northeast-1.amazonaws.com/web/img/no_images.png';

export const formatBuildingInfoToList = (offerInfo) => {
  const ret = Object.keys(offerInfo).map((key) => {
    const jpKey = agentOfferInfoTable[key];
    if (jpKey === '竣工年月') {
      return {
        '竣工年月': `${String(offerInfo.completedOn).slice(0, 4)}年${String(offerInfo.completedOn).slice(4, 6)}月`,
      };
    }

    if (jpKey === '募集賃料（共益費込）坪') {
      if (!offerInfo[key]) {
        return {
          '募集賃料（共益費込）': '非公開',
        };
      }
      return {
        '募集賃料（共益費込）': `${offerInfo.askingMonthlyRent.toLocaleString()}円/月額　@${(Math.round(offerInfo[key] / 100) * 100).toLocaleString()}円/坪`,
      };
    }

    if (jpKey === '募集賃料（共益費込）月') return null;

    if (jpKey === '最寄駅') {
      return {
        '最寄駅': `${offerInfo[key]}　徒歩${offerInfo.timeRequired}分`,
      };
    }

    if (jpKey === '徒歩') return null;

    if (jpKey === '延床面積') {
      if (!offerInfo[key]) {
        return {
          '延床面積': 'ー',
        };
      }
      return {
        '延床面積': `${offerInfo[key].toLocaleString()}坪`,
      };
    }

    if (jpKey === '基準階面積') {
      if (!offerInfo[key]) {
        return {
          '基準階面積': 'ー',
        };
      }
      return {
        '基準階面積': `${offerInfo[key].toLocaleString()}坪`,
      };
    }

    if (jpKey === '募集面積') {
      return {
        '募集面積': `${(Math.round(offerInfo[key] * 100) / 100).toLocaleString()}坪 （${(Math.round(offerInfo[key] * 3.30579 * 100) / 100).toLocaleString()}㎡）`,
      };
    }

    const tmp = {};

    if (!offerInfo[key]) {
      tmp[jpKey] = 'ー';
      return tmp;
    }

    if (jpKey === '天井高') {
      return {
        '天井高': `${offerInfo[key].toLocaleString()}mm`,
      };
    }

    if (jpKey === '床荷重') {
      return {
        '床荷重': `${offerInfo[key].toLocaleString()}kg/㎡`,
      };
    }

    tmp[jpKey] = offerInfo[key];
    return tmp;
  });

  return ret.filter(i => i);
};
