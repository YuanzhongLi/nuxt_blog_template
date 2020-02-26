<template>
  <div class="m-editSettingModal">
    <header class="m-editSettingModal__header">
      <h1 class="m-editSettingModal__headerTtl">
        条件変更
      </h1>
      <a
        @click="handleClose"
        class="m-editSettingModal__close"
      >
        <i class="fas fa-times" />
      </a>
    </header>
    <div class="m-editSettingModal__main">
      <nav class="m-editSettingModal__tab">
        <ul class="m-editSettingModal__tabList">
          <li class="m-editSettingModal__tabListItem">
            <a
              href="#"
              class="m-editSettingModal__tabListAnchor"
              :class="{ 'is-active': activeNum === selectedEnum.BASIC }"
              @click.prevent="switcher(selectedEnum.BASIC)"
            >
              基本条件
            </a>
          </li>
          <li class="m-editSettingModal__tabListItem">
            <a
              href="#"
              class="m-editSettingModal__tabListAnchor"
              :class="{ 'is-active': activeNum === selectedEnum.ADDITIONAL }"
              @click.prevent="switcher(selectedEnum.ADDITIONAL)"
            >
              詳細条件
            </a>
          </li>
        </ul>
      </nav>
      <AccountEditBasicCondition
        v-if="activeNum === selectedEnum.BASIC"
        :demands="demands.demand"
        :stations-list="stationsList"
        @update-tenant-demands="updateTenantDemands"
        class="m-editSettingModal__mainCnt"
      />
      <AccountEditDetailCondition
        v-else-if="activeNum === selectedEnum.ADDITIONAL"
        :demands="demands.demand"
        @update-tenant-demands="updateTenantDemands"
        class="m-editSettingModal__mainCnt"
      />
    </div>
  </div>
</template>

<script>
import AccountEditBasicCondition from '~/components/elements/home/AccountBox/AccountEditBasicCondition';
import AccountEditDetailCondition from '~/components/elements/home/AccountBox/AccountEditDetailCondition';

export default {
  data() {
    const selectedEnum = {
      BASIC: 1,
      ADDITIONAL: 2,
    };
    return {
      activeNum: selectedEnum.BASIC,
      selectedEnum,
    };
  },
  components: {
    AccountEditBasicCondition,
    AccountEditDetailCondition,
  },
  props: {
    demands: {
      type: Object,
      required: true,
    },
    stationsList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClose() {
      this.$emit('handle-close');
    },
    updateTenantDemands(values) {
      this.isActive = false;
      this.$emit('update-tenant-demands', values);
    },
    switcher(num) {
      this.activeNum = num;
    },
  },
};
</script>

<style scoped lang="scss">
.m-editSettingModal {
  @include m-editSettingModal;
}
</style>
