<template>
  <div
    class="p-area"
    :class="{'p-area--login': isLoggedIn}"
  >
    <Breadcrumb
      :prefecture="prefecture"
      :ward="ward"
      path="area"
      class="p-area__breadcrumb"
    />
    <div class="p-area__cnt">
      <main class="p-area__main">
        <div class="p-area__mainCnt">
          <DetailSearch
            :search="search"
          />
        </div>
        <div class="p-area__mainCnt">
          <header class="p-area__mainHead">
            <h1 class="p-area__mainHeadTtl">
              {{ prefecture ? prefecture.name : '' }} {{ ward ? ward.name : '' }}のオフィス
            </h1>
            <SelectBox
              id="sort"
              :options="sortOptions"
              :value="order"
              @select="setOrder($event);$store.dispatch('search/search');"
            />
          </header>
          <ul class="p-area__mainBody">
            <li
              v-for="building in resultBuildings"
              :key="building.id"
              class="p-area__mainBodyItem"
            >
              <ResultBuildingItem
                :building="building"
              />
              <AskingTable
                :like="like"
                :is-logged-in="isLoggedIn"
                :dismiss="dismiss"
                :askings="building.askings"
                :e-rent="building.eRent"
                class="p-area__mainBodyItemTable"
              />
            </li>
          </ul>
          <Pagination
            :search="search"
            class="p-area__mainNav"
          />
        </div>
      </main>
      <aside class="p-area__aside">
        <n-link
          v-if="!isLoggedIn"
          class="p-area__emap"
          to="/office/e-map"
        >
          <img
            class="p-area__emapImg"
            src="~assets/images/article/emap.png"
          >
        </n-link>
        <div class="p-area__recommend">
          <header class="p-area__recommendHead">
            <h1 class="p-area__recommendHeadTtl">
              おすすめ物件
            </h1>
            <n-link
              class="p-area__recommendHeadAnchor"
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
      </aside>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import AskingTable from '~/components/elements/office/pc/AskingTable';
import Breadcrumb from '~/components/elements/office/pc/Breadcrumb';
import DetailSearch from '~/components/elements/office/pc/DetailSearch';
import Pagination from '~/components/elements/office/pc/Pagination';
import Recommend from '~/components/elements/office/Recommend';
import ResultBuildingItem from '~/components/elements/office/ResultBuildingItem';
import SelectBox from '~/components/elements/common/SelectBox';

export default {
  components: {
    AskingTable,
    Breadcrumb,
    DetailSearch,
    Pagination,
    Recommend,
    ResultBuildingItem,
    SelectBox,
  },
  data() {
    const sortOptions = {
      1: '面積が小さい順',
      2: '面積が大きい順',
      3: '賃料が安い順',
      4: '賃料が高い順',
    };
    return {
      sortOptions,
    };
  },
  props: {
    offeredListing: {
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
    prefecture: {
      type: Object,
      default: () => {},
    },
    ward: {
      type: Object,
      default: () => {},
    },
    search: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapState({
      resultBuildings: state => state.search.resultBuildings,
      order: state => state.search.conditions.order,
    }),
    isLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
  },
  methods: {
    ...mapMutations('search', [
      'setOrder',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.p-area {
  @include p-area;
}
</style>
