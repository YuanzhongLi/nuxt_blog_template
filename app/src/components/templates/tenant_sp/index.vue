<template>
  <div class="p-home--sp">
    <TermConfirm
      v-if="!tenant.isConsentTerm"
      @submit="updateIsConsentTerm"
    />
    <a
      href="#"
      class="p-home--sp__search"
      @click.prevent="openModal"
    >
      <div>
        <i class="p-home--sp__searchIcon fas fa-search" />検索する
      </div>
    </a>
    <SearchModal
      v-if="isSearchModal"
      @handle-close="handleClose"
    />
    <HomeEditSettingModal
      v-if="isEditSettingModal"
      @handle-close="handleEditClose"
      :stations-list="stationsList"
      :demands="demands"
      @update-tenant-demands="updateTenantDemands"
    />
    <div class="p-home--sp__condition">
      <AccountBox
        :demands="demands"
        :stations-list="stationsList"
        @update-tenant-demands="updateTenantDemands"
      />
      <a
        class="p-home--sp__conditionEdit"
        @click="editSettingModal"
      >
        <i class="p-home--sp__conditionEditIcon fas fa-sync-alt" />条件変更
      </a>
    </div>
    <TimeLine
      :reacted-buildings="reactedBuildings"
      :activities="activities"
      :offers="offers"
      :is-offer-exist="isOfferExist"
      :cancel-like="cancelLike"
      @add-offers="addOffers"
      @add-activities="addActivities"
      @create-download-log="createDownloadLog"
      class="p-home--sp__main"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AccountBox from '~/components/elements/home/sp/AccountBox';
import HomeEditSettingModal from '~/components/elements/home/sp/HomeEditSettingModal';
import TermConfirm from '~/components/elements/common/TermConfirm';
import SearchModal from '~/components/elements/office/sp/SearchModal';
import TimeLine from '~/components/elements/home/TimeLine';

export default {
  head() {
    return {
      bodyAttrs: {
        class: this.tenant.isConsentTerm ? '' : 'is-fixed',
      },
    };
  },
  components: {
    AccountBox,
    HomeEditSettingModal,
    TermConfirm,
    SearchModal,
    TimeLine,
  },
  data() {
    return {
      isActive: false,
      isEditSettingModal: false,
      isSearchModal: false,
    };
  },
  props: {
    activities: {
      type: Array,
      default: () => [],
    },
    isOfferExist: {
      type: Boolean,
      default: false,
    },
    offers: {
      type: Array,
      default: () => [],
    },
    offeredListing: {
      type: Array,
      default: () => [],
    },
    reactedBuildings: {
      type: Object,
      default: () => {},
    },
    like: {
      type: Function,
      required: true,
    },
    dismiss: {
      type: Function,
      required: true,
    },
    cancelLike: {
      type: Function,
      required: true,
    },
    demands: {
      type: Object,
      required: true,
    },
    stationsList: {
      type: Array,
      default: () => [],
    },
    articles: {
      type: Array,
      default: () => [],
    },
    search: {
      type: Function,
      required: true,
    },
    updateIsConsentTerm: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapState('tenant', ['tenant']),
  },
  methods: {
    handleEditClose() {
      this.isEditSettingModal = false;
    },
    editSettingModal() {
      if (!this.stationsList.length) {
        this.$emit('get-stations');
      }
      this.isEditSettingModal = true;
    },
    updateTenantDemands(values) {
      this.isActive = false;
      this.$emit('update-tenant-demands', values);
    },
    createDownloadLog(offerId) {
      this.$emit('create-download-log', offerId);
    },
    addActivities($state) {
      this.$emit('add-activities', $state);
    },
    addOffers($state) {
      this.$emit('add-offers', $state);
    },
    handleClose() {
      this.isSearchModal = false;
    },
    openModal() {
      this.isSearchModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.p-home {
  @include p-home;
}
</style>
