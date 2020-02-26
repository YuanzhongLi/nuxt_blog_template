<template>
  <div
    class="m-accountBox"
    :class="{'m-accountBox--sp': device.isMobile}"
  >
    <div class="m-accountBox__account">
      <AccountInfo />
      <AccountInfoLevel
        :complete-num="demands.completeNum"
        class="m-accountBox__accountLevel"
      />
      <p
        v-if="device.isMobile"
        class="m-accountBox__expand"
      >
        <a
          href="#"
          class="m-accountBox__expandAnchor"
          :class="{'is-open': isActive}"
          @click.prevent="toggleSwitch"
        >
          <template v-if="isActive">
            登録条件を閉じる
          </template>
          <template v-else>
            登録条件を見る
          </template>
          <i class="m-accountBox__expandAnchorIcon fas fa-chevron-down" />
        </a>
      </p>
    </div>
    <div
      v-if="isActive"
      class="m-accountBox__info"
    >
      <Switcher @switch-cnt="switchCnt" />
      <transition>
        <AccountBasicCondition
          v-if="activeNum === selectedEnum.BASIC"
          :demands="demands.demand"
          :stations-list="stationsList"
          class="m-accountBox__condition"
        />
        <AccountDetailCondition
          v-else-if="activeNum === selectedEnum.ADDITIONAL"
          :demands="demands.demand"
          class="m-accountBox__condition"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AccountInfo from '~/components/elements/home/AccountBox/AccountInfo';
import AccountInfoLevel from '~/components/elements/home/AccountBox/AccountInfoLevel';
import AccountBasicCondition from '~/components/elements/home/AccountBox/AccountBasicCondition';
import AccountDetailCondition from '~/components/elements/home/AccountBox/AccountDetailCondition';
import Switcher from '~/components/elements/home/AccountBox/Switcher';

export default {
  data() {
    const selectedEnum = {
      BASIC: 1,
      ADDITIONAL: 2,
    };
    return {
      isActive: false,
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
    AccountBasicCondition,
    AccountDetailCondition,
    AccountInfo,
    AccountInfoLevel,
    Switcher,
  },
  computed: {
    ...mapState(['device']),
  },
  methods: {
    switchCnt(num) {
      this.activeNum = num;
    },
    toggleSwitch() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-enter-active {
  @include fade-enter-active(0.5);
}

.v-leave-active {
  @include fade-leave-active(0.5);
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
