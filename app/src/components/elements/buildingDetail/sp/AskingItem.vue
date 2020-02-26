<template>
  <div class="a-askingItem">
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
    <table class="a-askingItem__table">
      <thead>
        <tr>
          <th
            class="a-askingItem__tableHead"
            colspan="2"
          >
            5F
          </th>
        </tr>
      </thead>
      <tbody>
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
            {{ (asking.askingRent ? `${asking.askingRent.toLocaleString()}円/坪` : false) || (eRent ? `${eRent.toLocaleString()} ~ ${(eRent+5000).toLocaleString()}円/坪` : false ) || 'agentにお問い合わせください' }}
            <br>
            <span
              v-if="!asking.askingRent && eRent"
              class="a-askingTable__bodyCntSub"
            >（推定）</span>
          </td>
        </tr>
        <tr>
          <td class="a-askingItem__tableBodyCnt a-askingItem__tableBodyCnt--last">
            入居可能時期
          </td>
          <td class="a-askingItem__tableBodyCnt a-askingItem__tableBodyCnt--last a-askingItem__tableBodyCnt--right">
            {{ asking.contractStart }}
          </td>
        </tr>
      </tbody>
    </table>
    <ul
      class="a-askingItem__action"
    >
      <li class="a-askingItem__actionItem">
        <a
          class="a-askingItem__actionAnchor a-askingItem__actionAnchor--fav"
          href="#"
          :class="{'is-active': 1 === asking.isLike }"
          @click="askingLikeById(asking.id)"
        >
          <i class="a-askingItem__actionIcon fas fa-heart" />
          興味あり
        </a>
      </li>
      <li class="a-askingItem__actionItem">
        <a
          class="a-askingItem__actionAnchor a-askingItem__actionAnchor--dismiss"
          href="#"
          :class="{'is-active': 0 === asking.isLike }"
          @click="askingDislikeById(asking.id)"
        >
          <i class="a-askingItem__actionIcon fas fa-times" />
          興味なし
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Modal from '~/components/elements/common/modal/index';
import askingArea from '~/mixins/askingArea';

export default {
  data() {
    return {
      isModalShow: false,
    };
  },
  components: {
    Modal,
  },
  props: {
    asking: {
      type: Object,
      require: true,
      default: () => {},
    },
    isLoggedIn: {
      type: Boolean,
      require: true,
    },
    eRent: {
      type: Number,
      default: () => null,
    },
  },
  mixins: [askingArea],
  methods: {
    askingLikeById(askingId) {
      if (!this.isLoggedIn) {
        this.showSignupModal();
      } else {
        this.$emit('asking-like-by-id', askingId);
      }
    },
    askingDislikeById(askingId) {
      if (!this.isLoggedIn) {
        this.showSignupModal();
      } else {
        this.$emit('asking-dislike-by-id', askingId);
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
.a-askingItem {
  @include a-askingItem;
}
</style>
