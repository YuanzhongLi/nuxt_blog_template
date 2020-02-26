<template>
  <div class="a-askingTable">
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
    <table class="a-askingTable__cnt">
      <thead class="a-askingTable__head">
        <tr>
          <th class="a-askingTable__headCnt">
            フロア
          </th>
          <th class="a-askingTable__headCnt">
            図面
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
            契約期間（契約形態＋期間）
          </th>
          <th
            class="a-askingTable__headCnt"
          >
            興味
          </th>
        </tr>
      </thead>
      <template v-for="asking in askings">
        <AskingTableRow
          :key="asking.id"
          :asking="asking"
          :e-rent="eRent"
          @asking-like-by-id="askingLikeById"
          @asking-dislike-by-id="askingDislikeById"
        />
      </template>
    </table>
  </div>
</template>

<script>
import Modal from '~/components/elements/common/modal/index';
import AskingTableRow from '~/components/elements/buildingDetail/pc/AskingTableRow';

export default {
  data() {
    return {
      isModalShow: false,
    };
  },
  components: {
    Modal,
    AskingTableRow,
  },
  props: {
    askings: {
      type: Array,
      default: () => [],
    },
    isLoggedIn: {
      type: Boolean,
      require: true,
    },
    eRent: {
      type: Number,
      default: () => '',
    },
  },
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
.a-askingTable {
  @include a-askingTable;
}
</style>
