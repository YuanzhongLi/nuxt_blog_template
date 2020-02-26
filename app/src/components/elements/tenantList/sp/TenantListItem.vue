<template>
  <table class="m-tenantListTable">
    <tbody>
      <tr>
        <th
          class="m-tenantListTable__head m-tenantListTable__head--center m-tenantListTable__head--label"
          colspan="2"
        >
          テナントID：{{ tenant.id }}
        </th>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          予算
        </th>
        <td class="m-tenantListTable__body">
          {{ tenant.budget }}万円
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          社員数
        </th>
        <td class="m-tenantListTable__body">
          {{ tenant.employees }}人
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          エリア
        </th>
        <td class="m-tenantListTable__body">
          <ul class="m-tenantListTable__bodyList">
            <li
              v-for="(tenantStation, i) in tenant.area"
              class="m-tenantListTable__bodyItem"
              :key="`area-${i}`"
            >
              {{ concatAndAddWords(tenantStation.stationName, tenantStation.timeRequired) }}
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          入居時期
        </th>
        <td class="m-tenantListTable__body">
          {{ tenant.movingTerm }}
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          希望
        </th>
        <td class="m-tenantListTable__body">
          <template v-if="tenant.others.length">
            {{ tenant.others }}
          </template>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          希望の面積
        </th>
        <td class="m-tenantListTable__body">
          <template v-if="tenant.demandSize > 0">
            {{ tenant.demandSize }}坪
          </template>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          営業開始時期
        </th>
        <td class="m-tenantListTable__body">
          <template v-if="tenant.businessStartPeriod">
            {{ tenant.businessStartPeriod | formatYearAndMonth }}
          </template>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          場所・エリアを希望する理由
        </th>
        <td class="m-tenantListTable__body">
          <template v-if="tenant.demandAreaReason">
            {{ tenant.demandAreaReason }}
          </template>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          希望の付帯設備
        </th>
        <td class="m-tenantListTable__body">
          <ul class="m-tenantListTable__bodyList">
            <li
              v-for="(equipment) in wantEquipmentsList"
              :key="equipment"
              class="m-tenantListTable__bodyItem"
            >
              {{ equipment }}
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          譲れない、妥協できる条件
        </th>
        <td class="m-tenantListTable__body">
          <template v-if="tenant.canCompromiseCondition">
            {{ tenant.canCompromiseCondition }}
          </template>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          こだわり条件
        </th>
        <td class="m-tenantListTable__body">
          <ul class="m-tenantListTable__bodyList">
            <li
              v-for="(condition) in wantConditionsList"
              :key="condition"
              class="m-tenantListTable__bodyItem"
            >
              {{ condition }}
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          業種
        </th>
        <td class="m-tenantListTable__body">
          <template v-if="tenant.industry">
            {{ tenant.industry }}
          </template>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          その他業種
        </th>
        <td class="m-tenantListTable__body">
          <template v-if="tenant.industryOther">
            {{ tenant.industryOther }}
          </template>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          移転理由
        </th>
        <td class="m-tenantListTable__body">
          <template v-if="tenant.movingReason">
            {{ tenant.movingReason }}
          </template>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          その他移転理由
        </th>
        <td class="m-tenantListTable__body">
          <template v-if="tenant.movingOtherReason">
            {{ tenant.movingOtherReason }}
          </template>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          契約
        </th>
        <td class="m-tenantListTable__body">
          <template v-if="tenant.currentAgreement">
            {{ tenant.currentAgreement }}
          </template>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          期間満了時期
        </th>
        <td class="m-tenantListTable__body">
          <template v-if="tenant.currentContractExpirationPeriod">
            {{ tenant.currentContractExpirationPeriod | formatYearAndMonth }}
          </template>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          解約届の提出
        </th>
        <td class="m-tenantListTable__body">
          <template v-if="tenant.submittedCancellNotice">
            {{ tenant.submittedCancellNotice }}
          </template>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          興味あり
        </th>
        <td class="m-tenantListTable__body">
          <a
            v-if="tenant.isLikeCount > 0"
            @click="openLikeBuildingsModal(tenant.id, true)"
            class="a-tenantListTable__bodyAnchor"
          >
            {{ tenant.isLikeCount }}件
          </a>
          <span v-else>0件</span>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          興味なし
        </th>
        <td class="m-tenantListTable__body">
          <a
            v-if="tenant.isDislikeCount > 0"
            @click="openLikeBuildingsModal(tenant.id, false)"
            class="a-tenantListTable__bodyAnchor"
          >
            {{ tenant.isDislikeCount }}件
          </a>
          <span v-else>0件</span>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          オファー状況
        </th>
        <td class="m-tenantListTable__body">
          <a
            v-if="tenant.offerCount > 0"
            @click="handleOfferModal(tenant)"
            class="m-tenantListTable__anchor"
          >
            オファー{{ tenant.offerCount }}件
          </a>
          <span v-else>
            -
          </span>
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          チャット
        </th>
        <td
          v-if="roomIsActive"
          class="m-tenantListTable__body"
        >
          開設
        </td>
        <td
          v-if="!roomIsActive"
          class="m-tenantListTable__body"
        >
          未開設
        </td>
      </tr>
      <tr>
        <th class="m-tenantListTable__head">
          メモ
        </th>
        <td class="m-tenantListTable__body">
          <!-- eslint-disable -->
          <span class="m-tenantListTable__infoCntMemo" v-if="tenant.memo.id">{{ tenant.memo.content }}</span>
          <!-- eslint-enable -->
          <a
            @click="openMemoModal(tenant)"
            class="m-tenantListTable__anchor m-tenantListTable__infoCntTxt--left"
          >
            {{ tenant.memo.id ? 'メモの編集' : 'メモの作成' }}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import wantList from '~/mixins/wantList';
import date from '~/mixins/date';
import stationFilter from '~/mixins/stationFilter';
import roomIsActive from '~/mixins/roomIsActive';

export default {
  data() {
    return {
      demands: {
        wantEquipments: this.tenant.wantEquipments,
        wantConditions: this.tenant.wantConditions,
      },
    };
  },
  props: {
    tenant: {
      type: Object,
      default: () => {},
    },
  },
  mixins: [wantList, date, stationFilter, roomIsActive],
  methods: {
    handleOfferModal(data) {
      if (data.offerCount === 0) return;
      this.$emit('handle-offer-modal', data.id);
    },
    openLikeBuildingsModal(tenantId, isOpen) {
      this.$emit('open-like-buildings-modal', tenantId, isOpen);
    },
    openMemoModal(tenant) {
      this.$emit('open-memo-modal', tenant);
    },
  },
};
</script>

<style scoped lang="scss">
.m-tenantListTable {
  @include m-tenantListTable;
}
</style>
