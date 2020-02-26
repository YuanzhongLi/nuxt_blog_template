<template>
  <div class="m-accountBox">
    <div class="m-accountBox__account">
      <AccountInfo />
      <AccountInfoLevel
        :complete-num="demands.completeNum"
        class="m-accountBox__accountLevel"
      />
    </div>
    <div class="m-accountBox__info">
      <div class="m-accountBox__infoHead">
        <h1 class="m-accountBox__infoHeadTtl">
          登録情報
        </h1>
        <a
          v-if="this.isEditting"
          href="#"
          class="m-accountBox__infoHeadAnchor"
          @click.prevent="toggleSwitch"
        >
          キャンセル
        </a>
        <a
          v-else
          href="#"
          class="m-accountBox__infoHeadAnchor"
          @click.prevent="toggleSwitch"
        >
          <i class="m-accountBox__infoHeadAnchorIcon fas fa-pen" />編集
        </a>
      </div>
      <Switcher
        @switch-cnt="switchCnt"
        class="m-accountBox__switch"
      />
      <transition>
        <div
          v-if="activeNum === selectedEnum.BASIC"
          key="1"
        >
          <AccountEditBasicCondition
            v-if="this.isEditting"
            :demands="demands.demand"
            :stations-list="stationsList"
            @update-tenant-demands="updateTenantDemands"
            class="m-accountBox__condition"
          />
          <AccountBasicCondition
            v-else
            :demands="demands.demand"
            class="m-accountBox__condition"
          />
        </div>
        <div
          v-else-if="activeNum === selectedEnum.ADDITIONAL"
          key="2"
        >
          <AccountEditDetailCondition
            v-if="this.isEditting"
            :demands="demands.demand"
            @update-tenant-demands="updateTenantDemands"
            class="m-accountBox__condition"
          />
          <AccountDetailCondition
            v-else
            :demands="demands.demand"
            class="m-accountBox__condition"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import AccountInfo from '~/components/elements/home/AccountBox/AccountInfo';
import AccountInfoLevel from '~/components/elements/home/AccountBox/AccountInfoLevel';
import AccountBasicCondition from '~/components/elements/home/AccountBox/AccountBasicCondition';
import AccountDetailCondition from '~/components/elements/home/AccountBox/AccountDetailCondition';
import AccountEditBasicCondition from '~/components/elements/home/AccountBox/AccountEditBasicCondition';
import AccountEditDetailCondition from '~/components/elements/home/AccountBox/AccountEditDetailCondition';
import Switcher from '~/components/elements/home/AccountBox/Switcher';

export default {
  data() {
    const selectedEnum = {
      BASIC: 1,
      ADDITIONAL: 2,
    };
    return {
      isEditting: false,
      activeNum: selectedEnum.BASIC,
      selectedEnum,
    };
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
  components: {
    AccountInfo,
    AccountInfoLevel,
    AccountBasicCondition,
    AccountDetailCondition,
    AccountEditBasicCondition,
    AccountEditDetailCondition,
    Switcher,
  },
  methods: {
    switchCnt(num) {
      this.activeNum = num;
    },
    updateTenantDemands(values) {
      this.isEditting = false;
      this.$emit('update-tenant-demands', values);
    },
    toggleSwitch() {
      this.isEditting = !this.isEditting;
    },
  },
};
</script>

<style scoped lang="scss">
.v-enter-active {
  @include fade-enter-active(0.5);
}

.v-leave-active {
  @include fade-leave-active(0.5);
  right: 8px;
  left: 8px;
}

.v-enter {
  @include fade-enter(0);
}

.v-leave-to {
  @include fade-leave-to(0);
}

.m-accountBox {
  @include m-accountBox;
}
</style>
