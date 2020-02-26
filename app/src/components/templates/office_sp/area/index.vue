<template>
  <div class="p-area--sp">
    <a
      href="#"
      class="p-area--sp__search"
      @click.prevent="openModal"
    >
      <div>
        <i class="p-area--sp__searchIcon fas fa-search" />検索する
      </div>
    </a>
    <SearchModal
      v-if="isSearchModal"
      @handle-close="handleClose"
    />
    <header class="p-area--sp__head">
      <h1 class="p-area--sp__headTtl">
        東京都のオフィス
      </h1>
      <SelectBox
        id="sort"
        :options="sortOptions"
        :value="order"
        @select="setOrder($event);$store.dispatch('search/search');"
      />
    </header>
    <ul class="p-area--sp__list">
      <li
        v-for="building in resultBuildings"
        :key="building.id"
        class="p-area--sp__item"
      >
        <ResultBuildingItem
          :building="building"
        />
        <ul class="p-area--sp__itemAsking">
          <li
            v-for="asking in activeStatus.includes(building.id)?building.askings:building.askings.slice(0,5)"
            :key="asking.id"
            class="p-area--sp__itemAskingItem"
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
        <div class="p-area--sp__footer">
          <a
            v-if="building.askings.length > 5 && !activeStatus.includes(building.id)"
            class="p-area--sp__footerMore"
            @click="activeStatus.push(building.id)"
          >
            他{{ building.askings.length - 5 }}件見る<i class="p-area--sp__footerMoreIcon fas fa-chevron-right" />
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import AskingItem from '~/components/elements/office/sp/AskingItem';
import ResultBuildingItem from '~/components/elements/office/ResultBuildingItem';
import SearchModal from '~/components/elements/office/sp/SearchModal';
import SelectBox from '~/components/elements/common/SelectBox';

export default {
  components: {
    AskingItem,
    ResultBuildingItem,
    SearchModal,
    SelectBox,
  },
  props: {
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
    const activeStatus = [];
    const sortOptions = {
      1: '面積が小さい順',
      2: '面積が大きい順',
      3: '賃料が安い順',
      4: '賃料が高い順',
    };
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
    ...mapMutations('search', [
      'setOrder',
    ]),
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
.p-area {
  @include p-area;
}
</style>
