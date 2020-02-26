<template>
  <tr
    class="a-tenantListTable__bodyLine"
  >
    <td
      class="a-tenantListTable__bodyCnt"
      :rowspan="row"
    >
      {{ tenant.id }}
    </td>
    <td class="a-tenantListTable__bodyHead">
      予算
    </td>
    <td class="a-tenantListTable__bodyCnt a-tenantListTable__bodyCnt--left">
      {{ tenant.budget }}万円
    </td>
    <td
      class="a-tenantListTable__bodyHead"
      :rowspan="row"
    >
      詳細情報
    </td>
    <td
      class="a-tenantListTable__bodyCnt"
      :rowspan="row"
    >
      <ul class="a-tenantListTable__bodyCntList">
        <li
          v-if="tenant.demandSize"
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            希望の面積
          </span>
          <span class="a-tenantListTable__bodyCntItemCnt">
            {{ tenant.demandSize }}坪
          </span>
        </li>
        <li
          v-if="tenant.businessStartPeriod"
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            営業開始時期
          </span>
          <span class="a-tenantListTable__bodyCntItemCnt">
            {{ tenant.businessStartPeriod | formatYearAndMonth }}
          </span>
        </li>
        <li
          v-if="tenant.demandAreaReason"
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            場所・エリアを希望する理由
          </span>
          <span class="a-tenantListTable__bodyCntItemCnt">
            {{ tenant.demandAreaReason }}
          </span>
        </li>
        <li
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            希望の付帯設備
          </span>
          <ul>
            <li
              v-for="(equipment) in wantEquipmentsList"
              :key="equipment"
            >
              {{ equipment }}
            </li>
          </ul>
        </li>
        <li
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            譲れない、妥協できる条件
          </span>
          <span class="a-tenantListTable__bodyCntItemCnt">
            {{ tenant.canCompromiseCondition }}
          </span>
        </li>
        <li
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            こだわり条件
          </span>
          <ul>
            <li
              v-for="(condition) in wantConditionsList"
              :key="condition"
            >
              {{ condition }}
            </li>
          </ul>
        </li>
      </ul>
    </td>
    <td
      class="a-tenantListTable__bodyHead"
      :rowspan="row"
    >
      お客様情報
    </td>
    <td
      class="a-tenantListTable__bodyCnt"
      :rowspan="row"
    >
      <ul class="a-tenantListTable__bodyCntList">
        <li
          v-if="tenant.industry"
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            業種
          </span>
          <span class="a-tenantListTable__bodyCntItemCnt">
            {{ tenant.industry }}
          </span>
        </li>
        <li
          v-if="tenant.industryOther"
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            その他業種
          </span>
          <span class="a-tenantListTable__bodyCntItemCnt">
            {{ tenant.industryOther }}
          </span>
        </li>
        <li
          v-if="tenant.movingReason"
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            移転理由
          </span>
          <span class="a-tenantListTable__bodyCntItemCnt">
            {{ tenant.movingReason }}
          </span>
        </li>
        <li
          v-if="tenant.industry"
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            その他移転理由
          </span>
          <span class="a-tenantListTable__bodyCntItemCnt">
            {{ tenant.movingOtherReason }}
          </span>
        </li>
      </ul>
    </td>
    <td
      class="a-tenantListTable__bodyHead"
      :rowspan="row"
    >
      現在の契約
    </td>
    <td
      class="a-tenantListTable__bodyCnt"
      :rowspan="row"
    >
      <ul class="a-tenantListTable__bodyCntList">
        <li
          v-if="tenant.currentAgreement"
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            契約
          </span>
          <span class="a-tenantListTable__bodyCntItemCnt">
            {{ tenant.currentAgreement }}
          </span>
        </li>
        <li
          v-if="tenant.currentContractExpirationPeriod"
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            期間満了時期
          </span>
          <span class="a-tenantListTable__bodyCntItemCnt">
            {{ tenant.currentContractExpirationPeriod | formatYearAndMonth }}
          </span>
        </li>
        <li
          v-if="tenant.submittedCancellNotice"
          class="a-tenantListTable__bodyCntItem"
        >
          <span class="a-tenantListTable__bodyCntItemLabel">
            解約届の提出
          </span>
          <span class="a-tenantListTable__bodyCntItemCnt">
            {{ tenant.submittedCancellNotice }}
          </span>
        </li>
      </ul>
    </td>
    <td
      class="a-tenantListTable__bodyCnt"
      :rowspan="row"
    >
      <a
        v-if="tenant.isLikeCount > 0"
        @click="openLikeBuildingsModal(tenant.id, true)"
        class="a-tenantListTable__bodyAnchor"
      >
        {{ tenant.isLikeCount }}件
      </a>
      <span v-else>0件</span>
    </td>
    <td
      class="a-tenantListTable__bodyCnt"
      :rowspan="row"
    >
      <a
        v-if="tenant.isDislikeCount > 0"
        @click="openLikeBuildingsModal(tenant.id, false)"
        class="a-tenantListTable__bodyAnchor"
      >
        {{ tenant.isDislikeCount }}件
      </a>
      <span v-else>0件</span>
    </td>
    <td
      class="a-tenantListTable__bodyCnt"
      :rowspan="row"
    >
      <a
        v-if="tenant.offerCount > 0"
        @click="handleOfferModal(tenant)"
        class="a-tenantListTable__bodyAnchor"
      >
        {{ tenant.offerCount }}件
      </a>
      <span v-else>0件</span>
      <br>
      <n-link
        class="a-tenantListTable__bodyAnchor"
        :to="{ path:'/agent/offer', query: {id: tenant.id}}"
      >
        オファーする
      </n-link>
    </td>
    <td
      v-if="roomIsActive"
      class="a-tenantListTable__bodyCnt"
      :rowspan="row"
    >
      開設
    </td>
    <td
      v-if="!roomIsActive"
      class="a-tenantListTable__bodyCnt"
      :rowspan="row"
    >
      未開設
    </td>
    <td
      class="a-tenantListTable__bodyCnt"
      :rowspan="row"
    >
      <!-- eslint-disable -->
      <p v-if="tenant.memo.id" class="a-tenantListTable__bodyMemo">{{ tenant.memo.content }}</p>
      <!-- eslint-enable -->
      <a
        @click="openMemoModal(tenant)"
        class="a-tenantListTable__bodyAnchor"
      >{{ tenant.memo.id ? 'メモの編集' : 'メモの作成' }}</a>
    </td>
  </tr>
</template>

<script>
import wantList from '~/mixins/wantList';
import date from '~/mixins/date';
import roomIsActive from '~/mixins/roomIsActive';

export default {
  data() {
    const row = 5;
    return {
      row,
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
  mixins: [wantList, date, roomIsActive],
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
