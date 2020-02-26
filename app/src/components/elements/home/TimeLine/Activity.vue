<template>
  <div class="m-offering">
    <ul>
      <li
        v-for="(data, index) in activities"
        :key="'activity'+index"
        class="m-offering__item"
      >
        <div
          v-if="data.articleId"
          class="m-offering__anchor"
        >
          <ArticleContent
            :data="data"
          />
        </div>
        <div
          v-else
          class="m-offering__anchor m-offering__anchor--offer"
        >
          <OfferingContent
            type="offering"
            @create-download-log="createDownloadLog"
            :data="data"
          />
        </div>
      </li>
    </ul>
    <client-only>
      <infinite-loading
        ref="infiniteLoading"
        spinner="spiral"
        @infinite="addActivities"
      >
        <span
          class="m-offering__loaded"
          slot="no-more"
        >
          すべてのコンテンツを読み込みました
        </span>
        <span
          class="m-offering__loaded"
          slot="no-results"
        >
          すべてのコンテンツを読み込みました
        </span>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import ArticleContent from './ArticleContent';
import OfferingContent from './OfferingContent';

export default {
  components: {
    ArticleContent,
    OfferingContent,
  },
  props: {
    activities: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    createDownloadLog(offerId) {
      this.$emit('create-download-log', offerId);
    },
    addActivities($state) {
      this.$emit('add-activities', $state);
    },
  },
};
</script>

<style scoped lang="scss">
.m-offering {
  @include m-offering;
}

.a-offeringContent {
  @include a-offeringContent;
}
</style>
