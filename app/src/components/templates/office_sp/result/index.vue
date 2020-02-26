<template>
  <div class="p-result--sp">
    <a
      href="#"
      class="p-result--sp__search"
      @click.prevent="openModal"
    >
      <div>
        <i class="p-result--sp__searchIcon fas fa-search" />検索する
      </div>
    </a>
    <SearchModal
      v-if="isSearchModal"
      @handle-close="handleClose"
    />
    <header class="p-result--sp__head">
      <h1 class="p-result--sp__headTtl">
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
      <ul class="p-result--sp__list">
        <li
          v-for="building in resultBuildings"
          :key="building.id"
          class="p-result--sp__item"
        >
          <ResultBuildingItem
            :building="building"
          />
          <ul class="p-result--sp__itemAsking">
            <li
              v-for="asking in activeStatus.includes(building.id)?building.askings:building.askings.slice(0,5)"
              :key="asking.id"
              class="p-result--sp__itemAskingItem"
            >
              <AskingItem
                :asking="asking"
                :e-rent="building.eRent"
                :dismiss="dismiss"
                :like="like"
                :is-logged-in="isLoggedIn"
              />
            </li>
          </ul>
          <div class="p-result--sp__footer">
            <a
              v-if="building.askings.length > 5 && !activeStatus.includes(building.id)"
              class="p-result--sp__footerMore"
              @click="activeStatus.push(building.id)"
            >
              他{{ building.askings.length - 5 }}件見る<i class="p-result--sp__footerMoreIcon fas fa-chevron-right" />
            </a>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <SearchEmpty />
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import AskingItem from '~/components/elements/office/sp/AskingItem';
import ResultBuildingItem from '~/components/elements/office/ResultBuildingItem';
import SearchEmpty from '~/components/elements/office/SearchEmpty';
import SearchModal from '~/components/elements/office/sp/SearchModal';
import SelectBox from '~/components/elements/common/SelectBox';

export default {
  components: {
    AskingItem,
    ResultBuildingItem,
    SearchEmpty,
    SearchModal,
    SelectBox,
  },
  props: {
    prefecture: {
      type: Object,
      default: () => {},
    },
    ward: {
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
    search: {
      type: Function,
      required: true,
    },
  },
  data() {
    const sortOptions = {
      1: '面積が小さい順',
      2: '面積が大きい順',
      3: '賃料が安い順',
      4: '賃料が高い順',
    };
    const activeStatus = [];
    return {
      sortOptions,
      isSearchModal: false,
      activeStatus,
    };
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
    handleClose() {
      this.isSearchModal = false;
    },
    openModal() {
      this.isSearchModal = true;
    },
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
