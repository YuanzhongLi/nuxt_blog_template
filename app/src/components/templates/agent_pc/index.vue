<template>
  <div class="p-list">
    <OfferListModal
      v-if="isOfferModalOpen"
      :target-id="targetId"
      :offers="offers"
      @handle-close="handleClose"
    />
    <MemoModal
      v-if="isMemoModalOpen"
      :current-content="memo.content"
      @save="save"
      :close="handleClose"
      @handle-close="handleClose"
    />
    <LikeBuildingsModal
      v-if="isLikeBuildingsModalOpen"
      :target-tenant-id="targetTenantId"
      :buildings="buildings"
      @close="handleClose"
      :is-like="isLike"
    />
    <section class="p-list__cnt">
      <h1 class="p-list__cntTtl">
        テナントリスト
      </h1>
      <div class="p-list__cntTable">
        <div class="p-list__cntSearch">
          <InputBox
            class="p-list__cntSearchInput"
            type="number"
            input-type="number"
            icon="fas fa-user-circle"
            label="テナントID"
            placeholder="テナントIDを入力してください"
            :v-model="searchTenantId"
            @input="searchTenantId = $event"
          />
          <div
            @click="search"
            class="p-list__cntSearchBtn"
          >
            <i class="p-list__cntSearchBtnIcon fas fa-search" />検索
          </div>
        </div>
        <TenantListTable
          :tenants="tenants"
          @open-memo-modal="openMemoModal"
          @handle-offer-modal="handleOfferModal"
          @open-like-buildings-modal="openLikeBuildingsModal"
        />
      </div>
    </section>
  </div>
</template>

<script>
import TenantListTable from '~/components/elements/tenantList/pc/TenantListTable';
import OfferListModal from '~/components/elements/tenantList/pc/OfferListModal';
import MemoModal from '~/components/elements/common/modal/MemoModal';
import InputBox from '~/components/elements/common/InputBox';
import LikeBuildingsModal from '~/components/elements/common/modal/LikeBuildingsModal';

export default {
  components: {
    TenantListTable,
    OfferListModal,
    MemoModal,
    InputBox,
    LikeBuildingsModal,
  },
  head() {
    return {
      bodyAttrs: {
        class: this.isOfferModalOpen || this.isLikeBuildingsModalOpen || this.isMemoModalOpen ? 'is-fixed' : '',
      },
    };
  },
  data() {
    return {
      isOfferModalOpen: false,
      searchTenantId: this.searchTenantId,
      isMemoModalOpen: false,
      memo: {
        id: null,
        tenantId: null,
        content: '',
      },
      isLikeBuildingsModalOpen: false,
      isLike: false,
    };
  },
  props: {
    targetId: {
      type: Number,
      default: null,
    },
    offers: {
      type: Array,
      default: () => [],
    },
    tenants: {
      type: Array,
      required: true,
    },
    buildings: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClose() {
      this.isOfferModalOpen = false;
      this.isMemoModalOpen = false;
      this.isLikeBuildingsModalOpen = false;
    },
    handleOfferModal(tenantId) {
      this.$emit('handle-offer-modal', tenantId);
      this.isOfferModalOpen = true;
    },
    search() {
      this.$emit('search-tenant-list', this.searchTenantId);
    },
    openMemoModal(tenant) {
      this.memo.id = tenant.memo.id;
      this.memo.content = tenant.memo.content;
      this.memo.tenantId = tenant.id;
      this.isMemoModalOpen = true;
    },
    openLikeBuildingsModal(tenantId, isLike) {
      this.$emit('open-like-buildings-modal', tenantId, isLike);
      this.targetTenantId = tenantId;
      this.isLike = isLike;
      this.isLikeBuildingsModalOpen = true;
    },
    save(newContent) {
      if (this.memo.content === newContent) return;
      const m = Object.assign({}, this.memo, { content: newContent });
      const result = new Promise(resolve => this.$emit('save-memo', m, resolve));
      result.then(this.handleClose);
    },
  },
};
</script>

<style lang="scss" scoped>
.p-list {
  @include p-list;
}
</style>
