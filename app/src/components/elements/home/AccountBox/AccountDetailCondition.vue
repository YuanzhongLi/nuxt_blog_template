<template>
  <dl class="a-settingTable">
    <dt class="a-settingTable__ttl">
      業種
    </dt>
    <dd class="a-settingTable__txt">
      {{ demands.industry }}
    </dd>
    <div v-if="demands.industry === 'その他'">
      <dt class="a-settingTable__ttl">
        その他業種
      </dt>
      <dd class="a-settingTable__txt">
        {{ demands.industryOther }}
      </dd>
    </div>
    <dt class="a-settingTable__ttl">
      移転理由
    </dt>
    <dd class="a-settingTable__txt">
      {{ demands.movingReason }}
    </dd>
    <dt class="a-settingTable__ttl">
      その他移転理由
    </dt>
    <dd class="a-settingTable__txt">
      {{ demands.movingOtherReason }}
    </dd>
    <dt class="a-settingTable__ttl">
      希望の面積
    </dt>
    <dd class="a-settingTable__txt">
      {{ demands.demandSize }}
    </dd>
    <dt class="a-settingTable__ttl">
      営業開始時期
    </dt>
    <dd class="a-settingTable__txt">
      {{ demands.businessStartPeriod }}
    </dd>
    <dt class="a-settingTable__ttl">
      場所・エリアを希望する理由
    </dt>
    <dd class="a-settingTable__txt">
      {{ demands.demandAreaReason }}
    </dd>
    <dt class="a-settingTable__ttl">
      希望の付帯設備
    </dt>
    <dd class="a-settingTable__txt">
      <ul class="a-settingTable__list">
        <li
          class="a-settingTable__listItem"
          v-for="(item) in wantEquipmentsList"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </dd>
    <dt
      class="a-settingTable__ttl"
    >
      譲れない条件、妥協できる条件
    </dt>
    <dd class="a-settingTable__txt">
      {{ demands.canCompromiseCondition }}
    </dd>
    <dt class="a-settingTable__ttl">
      こだわり条件
    </dt>
    <dd class="a-settingTable__txt">
      <ul class="a-settingTable__list">
        <li
          class="a-settingTable__listItem"
          v-for="(item) in wantConditionsList"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </dd>
    <dt class="a-settingTable__ttl">
      契約
    </dt>
    <dd class="a-settingTable__txt">
      {{ demands.currentAgreement }}
    </dd>
    <dt class="a-settingTable__ttl">
      期間満了時期
    </dt>
    <dd class="a-settingTable__txt">
      {{ demands.currentContractExpirationPeriod }}
    </dd>
    <dt class="a-settingTable__ttl">
      解約届の提出
    </dt>
    <dd class="a-settingTable__txt a-settingTable__txt--last">
      {{ demands.submittedCancellNotice }}
    </dd>
  </dl>
</template>

<script>
import wantList from '~/mixins/wantList';

export default {
  mixins: [wantList],
  props: {
    demands: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.a-settingTable {
  @include a-settingTable;
}
</style>
