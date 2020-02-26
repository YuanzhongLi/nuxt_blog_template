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
    <div class="m-recommend">
      <ul class="m-recommend__list">
        <li
          v-for="(data, index) in offeredListing"
          :key="'listing-'+index"
          class="m-recommend__item"
        >
          <BuildingCell
            :building="data"
            @like-by-id="likeById"
            @dismiss-by-id="dismissById"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BuildingCell from './BuildingCell';
import Modal from '~/components/elements/common/modal/index';


export default {
  components: {
    BuildingCell,
    Modal,
  },
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    offeredListing: {
      type: Array,
      default: () => [],
    },
    like: {
      type: Function,
      default: () => {},
    },
    dismiss: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isModalShow: false,
    };
  },
  methods: {
    likeById(id) {
      if (!this.isLoggedIn) {
        this.showSignupModal();
      } else {
        this.like(id);
      }
    },
    dismissById(id) {
      if (!this.isLoggedIn) {
        this.showSignupModal();
      } else {
        this.dismiss(id);
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
.m-recommend {
  @include m-recommend;
}
</style>
