<template>
  <div
    class="p-result"
    :class="{'p-result--login': isLoggedIn}"
  >
    <Breadcrumb
      :prefecture="prefecture"
      :ward="ward"
      path="result"
      class="p-result__breadcrumb"
    />
    <div class="p-result__cnt">
      <ResultAside
        :prefecture="prefecture"
        :ward="ward"
        class="p-result__aside"
        :search="search"
      />
      <main class="p-result__main">
        <header class="p-result__mainHead">
          <h1 class="p-result__mainHeadTtl">
            検索結果
          </h1>
          <SelectBox
            id="sort"
            :value="order"
            :options="sortOptions"
            @select="setOrder($event);$store.dispatch('search/search');"
          />
        </header>
        <template v-if="resultBuildings.length">
          <ul class="p-result__mainBody">
            <li
              class="p-result__mainBodyItem"
              v-for="building in resultBuildings"
              :key="building.id"
            >
              <ResultBuildingItem
                :building="building"
              />
              <AskingTable
                :askings="building.askings"
                :is-logged-in="isLoggedIn"
                :like="like"
                :dismiss="dismiss"
                :e-rent="building.eRent"
                class="p-result__mainBodyItemTable"
              />
            </li>
          </ul>
          <Pagination
            :search="search"
            class="p-result__mainNav"
          />
        </template>
        <template v-else>
          <SearchEmpty />
        </template>
      </main>
      <aside
        v-if="isLoggedIn"
        class="p-result__recommend"
      >
        <div class="p-result__recommendCnt">
          <header class="p-result__recommendHead">
            <h1 class="p-result__recommendHeadTtl">
              おすすめ物件
            </h1>
            <n-link
              class="p-result__recommendHeadAnchor"
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
        <Footer class="p-result__recommendFooter" />
      </aside>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import AskingTable from '~/components/elements/office/pc/AskingTable';
import Breadcrumb from '~/components/elements/office/pc/Breadcrumb';
import Footer from '~/components/elements/common/Footer';
import Pagination from '~/components/elements/office/pc/Pagination';
import Recommend from '~/components/elements/office/Recommend';
import ResultAside from '~/components/elements/office/pc/ResultAside';
import ResultBuildingItem from '~/components/elements/office/ResultBuildingItem';
import SearchEmpty from '~/components/elements/office/SearchEmpty';
import SelectBox from '~/components/elements/common/SelectBox';

export default {
  components: {
    AskingTable,
    Breadcrumb,
    Footer,
    Pagination,
    Recommend,
    ResultAside,
    ResultBuildingItem,
    SearchEmpty,
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
.p-result {
  @include p-result;
}
</style>
