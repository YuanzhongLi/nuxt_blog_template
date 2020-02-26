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
    <div class="a-askingItem">
      <table class="a-askingItem__table">
        <thead>
          <tr>
            <th
              class="a-askingItem__tableHead"
              colspan="2"
            >
              {{ asking.askingFloor }}階
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="a-askingItem__tableBodyCnt">
              面積
            </td>
            <td class="a-askingItem__tableBodyCnt a-askingItem__tableBodyCnt--right">
              {{ asking.askingArea.toLocaleString() }}坪（{{ Math.round(asking.askingArea * 3.3) }}㎡）
            </td>
          </tr>
          <tr>
            <td class="a-askingItem__tableBodyCnt">
              募集賃料（共益費込）
            </td>
            <td class="a-askingItem__tableBodyCnt a-askingItem__tableBodyCnt--right">
              {{ (asking.askingRent ? `${asking.askingRent.toLocaleString()}円/坪` : false) || (eRent ? `${eRent.toLocaleString()} ~ ${(eRent+5000).toLocaleString()}円/坪(推定)` : false ) || 'agentにお問い合わせください' }}
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
      <ul class="a-askingItem__action">
        <li class="a-askingItem__actionItem">
          <a
            :class="{'is-active': asking.isLike === 1 }"
            class="a-askingItem__actionAnchor a-askingItem__actionAnchor--fav"
            @click="likeById"
          >
            <i class="a-askingItem__actionIcon fas fa-heart" />興味あり
          </a>
        </li>
        <li class="a-askingItem__actionItem">
          <a
            :class="{'is-active': asking.isLike === 0 }"
            class="a-askingItem__actionAnchor a-askingItem__actionAnchor--dismiss"
            @click="dismissById"
          >
            <i class="a-askingItem__actionIcon fas fa-times" />
            興味なし
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Modal from '~/components/elements/common/modal/index';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      isModalShow: false,
    };
  },
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    asking: {
      type: Object,
      default: () => {},
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
  },
  methods: {
    likeById() {
      if (!this.isLoggedIn) {
        this.showSignupModal();
      } else {
        if (this.asking.isLike === 1) {
          return;
        }
        this.like(this.asking.id);
      }
    },
    dismissById() {
      if (!this.isLoggedIn) {
        this.showSignupModal();
      } else {
        if (this.asking.isLike === 0) {
          return;
        }
        this.dismiss(this.asking.id);
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
