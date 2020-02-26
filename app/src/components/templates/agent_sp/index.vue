<template>
  <section class="p-list p-list--sp">
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
    <TenantList
      :tenants="tenants"
      @open-like-buildings-modal="openLikeBuildingsModal"
      @handle-offer-modal="handleOfferModal"
      @open-memo-modal="openMemoModal"
    />
  </section>
</template>

<script>
import OfferListModal from '~/components/elements/tenantList/sp/OfferListModal';
import TenantList from '~/components/elements/tenantList/sp/TenantList';
import MemoModal from '~/components/elements/common/modal/MemoModal';
import LikeBuildingsModal from '~/components/elements/common/modal/LikeBuildingsModal';

export default {
  components: {
    TenantList,
    OfferListModal,
    MemoModal,
    LikeBuildingsModal,
  },
  head() {
    return {
      bodyAttrs: {
        class: this.isOfferModalOpen || this.LikeBuildingsModal ? 'is-fixed' : '',
      },
    };
  },
  data() {
    return {
      isOfferModalOpen: false,
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
      required: true,
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
