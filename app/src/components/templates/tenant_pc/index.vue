<template>
  <section class="p-home">
    <TermConfirm
      v-if="!tenant.isConsentTerm"
      @submit="updateIsConsentTerm"
    />
    <aside class="p-home__cnt p-home__account">
      <AccountBox
        :demands="demands"
        :stations-list="stationsList"
        @update-tenant-demands="updateTenantDemands"
      />
    </aside>
    <main class="p-home__cnt p-home__main">
      <SearchBox
        :search="search"
        class="p-home__cntItem p-home__cntSearch"
      />
      <TimeLine
        class="p-home__cntItem"
        :reacted-buildings="reactedBuildings"
        :activities="activities"
        :offers="offers"
        :is-offer-exist="isOfferExist"
        :cancel-like="cancelLike"
        @add-activities="addActivities"
        @add-offers="addOffers"
        @create-download-log="createDownloadLog"
      />
    </main>
    <aside class="p-home__cnt p-home__recommend">
      <div class="p-home__recommendWrap">
        <header class="p-home__recommendHead">
          <h1 class="p-home__recommendHeadTtl">
            おすすめ物件
          </h1>
          <n-link
            class="p-home__recommendHeadAnchor"
            to="/office/e-map"
          >
            e-Mapで見る
          </n-link>
        </header>
        <Recommend
          :offered-listing="offeredListing"
          :is-logged-in="isLoggedIn"
          :dismiss="dismiss"
          :like="like"
        />
      </div>
      <Footer class="p-home__recommendFooter" />
    </aside>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import AccountBox from '~/components/elements/home/pc/AccountBox';
import Footer from '~/components/elements/common/Footer';
import TermConfirm from '~/components/elements/common/TermConfirm';
import Recommend from '~/components/elements/office/Recommend';
import SearchBox from '~/components/elements/common/search/searchBox';
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
    Footer,
    TermConfirm,
    Recommend,
    SearchBox,
    TimeLine,
  },
  data() {
    return {
      isActive: false,
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
    search: {
      type: Function,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
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
    togglePanel() {
      if (!this.stations.length) {
        this.isActive = !this.isActive;
        this.$emit('get-stations');
        return;
      }
      this.isActive = !this.isActive;
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
  },
};
</script>

<style lang="scss" scoped>
.p-home {
  @include p-home;
}
</style>
