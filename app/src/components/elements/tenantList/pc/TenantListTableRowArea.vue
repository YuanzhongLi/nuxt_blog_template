<template>
  <tr>
    <td class="a-tenantListTable__bodyHead">
      エリア
    </td>
    <td class="a-tenantListTable__bodyCnt">
      <ul class="a-tenantListTable__bodyCntList">
        <li
          v-for="(tenantStation, i) in tenant.area"
          class="a-tenantListTable__bodyCntItem"
          :key="`area-${i}`"
        >
          {{ concatAndAddWords(tenantStation.stationName, tenantStation.timeRequired) }}
        </li>
      </ul>
    </td>
  </tr>
</template>

<script>
import stationFilter from '~/mixins/stationFilter';

export default {
  mixins: [stationFilter],
  props: {
    tenant: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
