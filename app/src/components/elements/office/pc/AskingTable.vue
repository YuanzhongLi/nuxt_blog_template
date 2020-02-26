<template>
  <div>
    <modal
      v-if="isModalShow"
      @close="closeSignUpModal"
      @left-func="$router.push('/tenant/signup')"
    >
      <h2 slot="header">
        新規登録してください。
      </h2>
      <p slot="body">
        「いいね」「興味なし」をするためには、
        <br>
        アカウント登録をする必要があります。
      </p>
      <span slot="leftButtonLabel">
        新規登録
      </span>
    </modal>
    <div class="a-askingTable">
      <table class="a-askingTable__cnt">
        <thead class="a-askingTable__head">
          <tr>
            <th class="a-askingTable__headCnt">
              フロア
            </th>
            <th class="a-askingTable__headCnt">
              面積
            </th>
            <th class="a-askingTable__headCnt">
              募集賃料(共益費込)
            </th>
            <th class="a-askingTable__headCnt">
              敷金・保証金
            </th>
            <th class="a-askingTable__headCnt">
              入居可能時期
            </th>
            <th class="a-askingTable__headCnt">
              興味
            </th>
          </tr>
        </thead>
        <tbody class="a-askingTable__body">
          <tr
            v-for="asking in isActive?askings:askings.slice(0,5)"
            :key="asking.id"
            class="a-askingTable__bodyLine"
          >
            <td class="a-askingTable__bodyCnt">
              {{ asking.askingFloor }}
            </td>
            <td class="a-askingTable__bodyCnt">
              {{ asking.askingArea.toLocaleString() }}坪<br><span class="a-askingTable__bodyCntSub">（{{ Math.round(asking.askingArea * 3.3) }}㎡）</span>
            </td>
            <td class="a-askingTable__bodyCnt">
              {{ (asking.askingRent ? `${asking.askingRent.toLocaleString()}円/坪` : false) || (eRent ? `${eRent.toLocaleString()} ~ ${(eRent+5000).toLocaleString()}円/坪` : false ) || 'agentにお問い合わせください' }}
              <br>
              <span
                v-if="!asking.askingRent && eRent"
                class="a-askingTable__bodyCntSub"
              >（推定）</span>
            </td>
            <td class="a-askingTable__bodyCnt">
              {{ asking.deposit }}
            </td>
            <td class="a-askingTable__bodyCnt">
              {{ asking.contractStart }}
            </td>
            <td class="a-askingTable__bodyCnt">
              <ul class="a-askingTable__bodyInterest">
                <li class="a-askingTable__bodyInterestItem">
                  <a
                    @click="likeById(asking)"
                    :class="{'is-active': asking.isLike === 1 }"
                    class="a-askingTable__bodyInterestAnchor a-askingTable__bodyInterestAnchor--fav"
                  >
                    <i class="a-askingTable__bodyInterestIcon a-askingTable__bodyInterestIcon--fav fas fa-heart" />
                  </a>
                </li>
                <li class="a-askingTable__bodyInterestItem">
                  <a
                    @click="dismissById(asking)"
                    :class="{'is-active': asking.isLike === 0 }"
                    class="a-askingTable__bodyInterestAnchor a-askingTable__bodyInterestAnchor--ignore"
                  >
                    <i class="a-askingTable__bodyInterestIcon a-askingTable__bodyInterestIcon--dismiss fas fa-times" />
                  </a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="a-askingTable__footer">
        <a
          v-if="askings.length > 5 && !isActive"
          class="a-askingTable__footerMore"
          @click="isActive=true"
        >
          他{{ askings.length - 5 }}件見る<i class="a-askingTable__footerMoreIcon fas fa-chevron-right" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '~/components/elements/common/modal/index';

export default {
  components: {
    Modal,
  },
  props: {
    askings: {
      type: Array,
      default: () => [],
    },
    eRent: {
      type: Number,
      default: () => null,
    },
    like: {
      type: Function,
      required: true,
    },
    dismiss: {
      type: Function,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
      isModalShow: false,
    };
  },
  methods: {
    likeById(asking) {
      if (!this.isLoggedIn) {
        this.showSignupModal();
      } else {
        if (asking.isLike === 1) {
          return;
        }
        this.like(asking.id);
      }
    },
    dismissById(asking) {
      if (!this.isLoggedIn) {
        this.showSignupModal();
      } else {
        if (asking.isLike === 0) {
          return;
        }
        this.dismiss(asking.id);
      }
    },
    showSignupModal() {
      this.isModalShow = true;
    },
    closeSignUpModal() {
      this.isModalShow = false;
    },
  },
};
</script>

<style scoped lang="scss">
.a-askingTable {
  @include a-askingTable;
}
</style>
