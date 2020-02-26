<template>
  <div class="p-office--sp">
    <a
      href="#"
      class="p-office--sp__search"
      @click.prevent="openModal"
    >
      <div>
        <i class="p-office--sp__searchIcon fas fa-search" />検索する
      </div>
    </a>
    <SearchModal
      v-if="isSearchModal"
      @handle-close="handleClose"
      :search="search"
    />
    <SearchHeader
      class="p-office--sp__cnt"
      @open-modal="openModal"
    />
    <PopularArea
      class="p-office--sp__cnt"
      :lists="lists"
    />
    <Prefectures class="p-office--sp__cnt" />
    <Recommend
      class="p-office--sp__cnt p-office--sp__recommend"
      :offered-listing="offeredListing"
      :dismiss="dismiss"
      :like="like"
      :is-logged-in="isLoggedIn"
    />
    <Articles
      class="p-office--sp__cnt"
      :articles="articles"
    />
  </div>
</template>

<script>
import Articles from '~/components/elements/office/Articles';
import SearchHeader from '~/components/elements/office/sp/SearchHeader';
import Prefectures from '~/components/elements/office/sp/Prefectures';
import PopularArea from '~/components/elements/office/PopularArea';
import Recommend from '~/components/elements/office/Recommend';
import SearchModal from '~/components/elements/office/sp/SearchModal';

export default {
  data() {
    return {
      isSearchModal: false,
    };
  },
  components: {
    Articles,
    SearchHeader,
    Prefectures,
    PopularArea,
    Recommend,
    SearchModal,
  },
  head() {
    return {
      bodyAttrs: {
        class: this.isSearchModal ? 'is-fixed' : '',
      },
    };
  },
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
    lists: {
      type: Array,
      default: () => [],
    },
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
    search: {
      type: Function,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
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
.p-office {
  @include p-office;
}
</style>
