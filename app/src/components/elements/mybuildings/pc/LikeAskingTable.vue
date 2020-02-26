<template>
  <table class="a-mybuildingsTable">
    <thead class="a-mybuildingsTable__head">
      <tr class="a-mybuildingsTable__headLine">
        <th class="a-mybuildingsTable__headCnt">
          物件名（フロア）
        </th>
        <th class="a-mybuildingsTable__headCnt">
          住所
        </th>
        <th class="a-mybuildingsTable__headCnt">
          竣工年月
        </th>
        <th class="a-mybuildingsTable__headCnt">
          面積
        </th>
        <th class="a-mybuildingsTable__headCnt">
          募集賃料（共益費込）
        </th>
        <th class="a-mybuildingsTable__headCnt">
          敷金
        </th>
        <th class="a-mybuildingsTable__headCnt">
          入居可能時期
        </th>
        <th class="a-mybuildingsTable__headCnt">
          興味なし
        </th>
      </tr>
    </thead>
    <tbody class="a-mybuildingsTable__body">
      <tr
        v-for="(asking, index) of askings"
        class="a-mybuildingsTable__bodyLine"
        :key="index +'-offer'"
      >
        <td class="a-mybuildingsTable__bodyCnt a-mybuildingsTable__bodyCnt--left">
          <a
            :href="`/office/building-detail/${asking.buildingId}`"
            class="a-mybuildingsTable__bodyCntAnchor"
            target="_blank"
          >
            {{ asking.name }}({{ asking.askingFloor }}F)
          </a>
        </td>
        <td class="a-mybuildingsTable__bodyCnt">
          <span class="a-mybuildingsTable__bodyCntTxt a-mybuildingsTable__bodyCntTxt--left">
            {{ asking.address }}
          </span>
          <span class="a-mybuildingsTable__bodyCntTxt a-mybuildingsTable__bodyCntTxt--left">
            {{ concatAndAddWords(asking.stationName, asking.timeRequired) }}
          </span>
        </td>
        <td class="a-mybuildingsTable__bodyCnt">
          {{ `${String(asking.completedOn).slice(0,4)}年${String(asking.completedOn).slice(4,6)}月` }}
        </td>
        <td class="a-mybuildingsTable__bodyCnt">
          <span class="a-mybuildingsTable__bodyCntTxt">
            {{ askingAreaAddUnit(asking.askingArea) }}
          </span>
          <span class="a-mybuildingsTable__bodyCntSub">
            {{ askingAreaSqAddUnit(asking.askingArea) }}
          </span>
        </td>
        <td class="a-mybuildingsTable__bodyCnt">
          <span class="a-mybuildingsTable__bodyCntTxt">
            {{ (asking.askingRent ? `${asking.askingRent.toLocaleString()}円/坪` : false) || (asking.eRent ? `${asking.eRent.toLocaleString()} ~ ${(asking.eRent+5000).toLocaleString()}円/坪` : false ) || 'agentにお問い合わせください' }}
          </span>
          <span
            v-if="!asking.askingRent && asking.eRent"
            class="a-mybuildingsTable__bodyCntSub"
          >（推定）</span>
        </td>
        <td class="a-mybuildingsTable__bodyCnt">
          {{ asking.deposit }}
        </td>
        <td class="a-mybuildingsTable__bodyCnt">
          {{ asking.strContractStart }}
        </td>
        <td class="a-mybuildingsTable__bodyCnt">
          <a
            class="a-mybuildingsTable__bodyInterestAnchor a-mybuildingsTable__bodyInterestAnchor--ignore is_active"
            @click.prevent="dismiss(asking.id)"
          >
            <i class="a-mybuildingsTable__bodyInterestIcon a-mybuildingsTable__bodyInterestIcon--dismiss fas fa-times" />
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>


<script>
import askingArea from '~/mixins/askingArea';
import stationFilter from '~/mixins/stationFilter';

export default {
  mixins: [stationFilter, askingArea],
  props: {
    askings: {
      type: Array,
      required: true,
      default: () => [],
    },
    dismiss: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.a-mybuildingsTable {
  @include a-mybuildingsTable;
}
</style>
