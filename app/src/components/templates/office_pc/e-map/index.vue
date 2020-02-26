<template>
  <div class="p-emap">
    <aside class="p-emap__aside">
      <EmapSwitcher
        class="p-emap__switcher"
        @switch-cnt="switchCnt"
        :active-num="activeNum"
      />
      <template v-if="activeNum === selectedEnum.RECOMMEND">
        <header class="p-emap__asideHead">
          <h1
            class="p-emap__asideHeadTtl"
            @click="focusoutItem"
          >
            あなたにおすすめ
          </h1>
          <a
            class="p-emap__asideHeadAnchor"
            @click="togglePanel"
          >
            <span v-if="isActive">キャンセル</span>
            <span v-else>
              <i class="p-emap__asideHeadAnchorIcon fas fa-sync-alt" />条件変更
            </span>
          </a>
        </header>
        <modal
          v-if="(isActive && !isLoggedIn && activeNum === selectedEnum.RECOMMEND) || showSignupModal"
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
        <EditSetting
          v-if="isActive && isLoggedIn"
          :demands="demands"
          :stations-list="stations"
          @update-tenant-demands="updateTenantDemands"
          class="p-emap__edit"
        />
        <template v-else>
          <perfect-scrollbar>
            <Listing
              :listings="likedListing"
              :pinned-building="pinnedBuilding"
              @select-item="selectItem"
              :is-favorite="true"
              class="p-emap__listingBody p-emap__listingBody--listing"
            />
            <Listing
              :listings="offeredListing"
              :pinned-building="pinnedBuilding"
              @select-item="selectItem"
              class="p-emap__listingBody p-emap__listingBody--listing"
              :like="like"
              :dismiss="dismiss"
            />
            <RecommendPagenation
              :count="recommendCount"
              :building-per-page="buildingPerPage"
              @change-page="$emit('change-page', $event)"
            />
          </perfect-scrollbar>
        </template>
      </template>
      <template v-else-if="activeNum === selectedEnum.SEARCH">
        <header class="p-emap__asideHead">
          <h1
            class="p-emap__asideHeadTtl"
            @click="focusoutItem"
          >
            検索結果
          </h1>
          <a
            class="p-emap__asideHeadAnchor"
            @click="togglePanel"
          >
            <span v-if="isActive">キャンセル</span>
            <span v-else>
              <i class="p-emap__asideHeadAnchorIcon fas fa-sync-alt" />条件変更
            </span>
          </a>
        </header>
        <EditCondition
          v-if="isActive"
          @toggle-panel="togglePanel"
          :search="search"
        />
        <template v-else>
          <Listing
            :listings="resultBuildings"
            :pinned-building="pinnedBuilding"
            @select-item="selectItem"
            class="p-emap__listingBody p-emap__listingBody--listing"
            :like="likefn"
            :dismiss="dismissfn"
          />
          <SearchPagenation :search="search" />
        </template>
      </template>
    </aside>
    <section class="p-emap__cnt">
      <GmapMap
        class="p-emap__cntMap"
        ref="mapRef"
        :center="aveCoordinate"
        :zoom="13"
        :options="gMapOptions"
        map-type-id="roadmap"
      >
        <GmapInfoWindow
          :opened="pinClicked"
          @closeclick="pinClicked=false"
          :position="infoWindowPos"
          :options="infoOptions"
        >
          <ListingPopup :building="pinnedBuilding" />
        </GmapInfoWindow>
        <template
          v-if="activeNum === selectedEnum.RECOMMEND"
        >
          <GmapMarker
            v-for="(building, index) in offeredListing"
            :key="'Recommends-'+index"
            :position="{ lat: building.latitude, lng: building.longitude }"
            :clickable="true"
            @click="selectItem(building)"
            :icon="(building.id===pinnedBuilding.id)?focusIcon:normalIcon"
          />
          <GmapMarker
            v-for="(building, index) in likedListing"
            :key="'Others-'+index"
            :position="{ lat: building.latitude, lng: building.longitude }"
            :clickable="true"
            @click="selectItem(building)"
            :icon="(building.id===pinnedBuilding.id)?focusIcon:favoriteIcon"
          />
          <GmapMarker
            v-for="(building, index) in showAllBuildings?otherBuildings:[]"
            :key="'Others-'+index"
            :position="{ lat: building.latitude, lng: building.longitude }"
            :clickable="true"
            @click="toggleInfoWindow(building)"
            :icon="(building.id===pinnedBuilding.id)?focusIcon:otherIcon"
          />
        </template>
        <template
          v-if="activeNum === selectedEnum.SEARCH"
        >
          <GmapMarker
            v-for="building in resultBuildings"
            :key="'Result-'+building.id"
            :position="{ lat: building.latitude, lng: building.longitude }"
            :clickable="true"
            @click="toggleInfoWindow(building)"
            :icon="(building.id===pinnedBuilding.id)?focusIcon:otherIcon"
          />
        </template>
      </GmapMap>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import eMap from '~/mixins/eMap';
import EditCondition from '~/components/elements/e-map/pc/EditCondition';
import EditSetting from '~/components/elements/e-map/pc/EditSetting';
import EmapSwitcher from '~/components/elements/e-map/pc/EmapSwitcher';
import ListingPopup from '~/components/elements/e-map/ListingPopup';
import Listing from '~/components/elements/e-map/pc/Listing';
import Modal from '~/components/elements/common/modal/index';
import SearchPagenation from '~/components/elements/e-map/pc/SearchPagination';
import RecommendPagenation from '~/components/elements/e-map/pc/RecommendPagination';

export default {
  components: {
    EditCondition,
    EmapSwitcher,
    ListingPopup,
    Listing,
    EditSetting,
    Modal,
    SearchPagenation,
    RecommendPagenation,
  },
  mixins: [eMap],
  computed: {
    isLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
    ...mapState({
      resultBuildings: state => state.search.resultBuildings,
    }),
  },
  props: {
    showAllBuildings: {
      type: Boolean,
      default: false,
    },
    offeredListing: {
      type: Array,
      default: () => [],
      required: true,
    },
    likedListing: {
      type: Array,
      default: () => [],
    },
    aveCoordinate: {
      type: Object,
      default: () => {},
    },
    pinnedBuilding: {
      type: Object,
      default: () => {},
    },
    demands: {
      type: Object,
      required: true,
    },
    stations: {
      type: Array,
      default: () => [],
    },
    otherBuildings: {
      type: Array,
      default: () => [],
    },
    like: {
      type: Function,
      required: true,
    },
    dismiss: {
      type: Function,
      required: true,
    },
    recommendCount: {
      type: Number,
      required: true,
    },
    buildingPerPage: {
      type: Number,
      required: true,
    },
    search: {
      type: Function,
      required: true,
    },
  },
  data() {
    const selectedEnum = {
      RECOMMEND: 1,
      SEARCH: 2,
    };
    return {
      activeNum: selectedEnum.RECOMMEND,
      showSignupModal: false,
      isActive: false,
      pinClicked: false,
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      selectedEnum,
    };
  },
  mounted() {
    if (this.$route.query.is_search) {
      this.activeNum = 2;
    }
  },
  methods: {
    focusoutItem() {
      this.pinClicked = false;
      this.$emit('focusout-item');
    },
    togglePanel() {
      this.isActive = !this.isActive;
    },
    selectItem(item) {
      const { mapRef } = this.$refs;
      this.infoWindowPos = {
        lat: item.latitude,
        lng: item.longitude,
      };
      this.pinClicked = true;
      this.$emit('select-item', item, mapRef);
    },
    toggleInfoWindow(item) {
      const { mapRef } = this.$refs;
      this.infoWindowPos = {
        lat: item.latitude,
        lng: item.longitude,
      };
      this.pinClicked = true;
      this.$emit('toggle-info-window', item.id, mapRef);
    },
    updateTenantDemands(values) {
      this.isActive = false;
      this.$emit('update-tenant-demands', values);
    },
    likefn(buildingId) {
      if (!this.isLoggedIn) {
        this.showSignupModal = true;
        return;
      }
      this.like(buildingId);
    },
    dismissfn(buildingId) {
      if (!this.isLoggedIn) {
        this.showSignupModal = true;
        return;
      }
      this.dismiss(buildingId);
    },
    closeSignUpModal() {
      this.showSignupModal = false;
      if (this.activeNum === this.selectedEnum.RECOMMEND) {
        this.isActive = false;
      }
    },
    switchCnt(num) {
      this.activeNum = num;
    },
  },
};
</script>

<style lang="scss" scoped>
.p-emap {
  @include p-emap;
}
</style>
