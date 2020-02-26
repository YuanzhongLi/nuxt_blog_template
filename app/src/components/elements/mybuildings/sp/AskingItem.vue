<template>
  <div class="a-askingItem">
    <table class="a-askingItem__table">
      <thead>
        <tr>
          <th
            class="a-askingItem__tableHead"
            colspan="2"
          >
            {{ asking.name }}{{ asking.askingFloor }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="a-askingItem__tableBodyCnt">
            住所
          </td>
          <td class="a-askingItem__tableBodyCnt a-askingItem__tableBodyCnt--right">
            <span class="a-askingItem__tableBodyCntTxt">
              {{ asking.address }}
            </span>
            <span class="a-askingItem__tableBodyCntTxt">
              {{ concatAndAddWords(asking.stationName, asking.timeRequired) }}
            </span>
          </td>
        </tr>
        <tr>
          <td class="a-askingItem__tableBodyCnt">
            竣工年月
          </td>
          <td class="a-askingItem__tableBodyCnt a-askingItem__tableBodyCnt--right">
            {{ `${String(asking.completedOn).slice(0,4)}年${String(asking.completedOn).slice(4,6)}月` }}
          </td>
        </tr>
        <tr>
          <td class="a-askingItem__tableBodyCnt">
            面積
          </td>
          <td class="a-askingItem__tableBodyCnt a-askingItem__tableBodyCnt--right">
            {{ askingAreaAddUnitTwoPaterns(asking.askingArea) }}
          </td>
        </tr>
        <tr>
          <td class="a-askingItem__tableBodyCnt">
            募集賃料（共益費込）
          </td>
          <td class="a-askingItem__tableBodyCnt a-askingItem__tableBodyCnt--right">
            <span class="a-mybuildingsTable__bodyCntTxt">
              {{ (asking.askingRent ? `${asking.askingRent.toLocaleString()}円/坪` : false) || (asking.eRent ? `${asking.eRent.toLocaleString()} ~ ${(asking.eRent+5000).toLocaleString()}円/坪` : false ) || 'agentにお問い合わせください' }}
            </span>
            <span
              v-if="!asking.askingRent && asking.eRent"
              class="a-mybuildingsTable__bodyCntSub"
            >（推定）</span>
          </td>
        </tr>
        <tr>
          <td class="a-askingItem__tableBodyCnt">
            入居可能時期
          </td>
          <td class="a-askingItem__tableBodyCnt a-askingItem__tableBodyCnt--right">
            {{ asking.strContractStart }}
          </td>
        </tr>
        <tr>
          <td class="a-askingItem__tableBodyCnt a-askingItem__tableBodyCnt--last">
            敷金
          </td>
          <td class="a-askingItem__tableBodyCnt a-askingItem__tableBodyCnt--last a-askingItem__tableBodyCnt--right">
            {{ asking.deposit }}
          </td>
        </tr>
      </tbody>
    </table>
    <a
      class="a-askingItem__actionAnchor a-askingItem__actionAnchor--dismiss"
      @click.prevent="dismiss(asking.id)"
    >
      <i class="a-askingItem__actionIcon fas fa-times" />
      興味なし
    </a>
  </div>
</template>

<script>
import askingArea from '~/mixins/askingArea';
import stationFilter from '~/mixins/stationFilter';

export default {
  mixins: [stationFilter, askingArea],
  props: {
    asking: {
      type: Object,
      required: true,
      default: () => {},
    },
    dismiss: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.a-askingItem {
  @include a-askingItem;
}
</style>
