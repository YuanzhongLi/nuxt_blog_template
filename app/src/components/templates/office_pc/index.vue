<template>
  <div
    class="p-office"
    :class="loginClass"
  >
    <template v-if="isLoggedIn">
      <div class="p-office__cnt">
        <div class="p-office__cntMain">
          <DetailSearch
            class="p-office__cntMainItem"
            :search="search"
          />
          <Articles
            class="p-office__cntMainItem p-office__article"
            :articles="articles"
          />
        </div>
        <aside class="p-office__aside">
          <div class="p-office__recommend">
            <header class="p-office__recommendHead">
              <h1 class="p-office__recommendHeadTtl">
                おすすめ物件
              </h1>
              <n-link
                class="p-office__recommendHeadAnchor"
                to="/office/e-map"
              >
                e-Mapで見る
              </n-link>
            </header>
            <Recommend
              :is-logged-in="isLoggedIn"
              :offered-listing="offeredListing"
              :dismiss="dismiss"
              :like="like"
            />
          </div>
          <Footer class="p-office__recommendFooter" />
        </aside>
      </div>
    </template>
    <template v-else>
      <SearchHeader
        :search="search"
      />
      <div class="p-office__cnt">
        <PopularArea :lists="lists" />
        <div class="p-office__section">
          <Prefectures class="p-office__prefecture" />
          <div class="p-office__recommend">
            <header class="p-office__recommendHead">
              <h1 class="p-office__recommendHeadTtl">
                おすすめ物件
              </h1>
              <n-link
                class="p-office__recommendHeadAnchor"
                to="/office/e-map"
              >
                e-Mapで見る
              </n-link>
            </header>
            <Recommend
              class="p-office__recommend"
              :is-logged-in="isLoggedIn"
              :offered-listing="offeredListing"
              :dismiss="dismiss"
              :like="like"
            />
          </div>
        </div>
        <Articles
          class="p-office__article"
          :articles="articles"
        />
      </div>
    </template>
  </div>
</template>

<script>
import Articles from '~/components/elements/office/Articles';
import DetailSearch from '~/components/elements/office/pc/DetailSearch';
import Footer from '~/components/elements/common/Footer';
import SearchHeader from '~/components/elements/office/pc/SearchHeader';
import Prefectures from '~/components/elements/office/pc/Prefectures';
import PopularArea from '~/components/elements/office/PopularArea';
import Recommend from '~/components/elements/office/Recommend';

export default {
  components: {
    DetailSearch,
    Footer,
    SearchHeader,
    Prefectures,
    PopularArea,
    Recommend,
    Articles,
  },
  computed: {
    loginClass() {
      return (this.isLoggedIn) ? 'p-office--login' : 'p-office--notLogin';
    },
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
};
</script>

<style lang="scss" scoped>
.p-office {
  @include p-office;
}
</style>
