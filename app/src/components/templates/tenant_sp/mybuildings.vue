<template>
  <div class="p-mybuildings--sp">
    <Tab
      @switch-cnt="switchCnt"
      class="p-mybuildings__switch"
    />
    <ul
      v-if="activeNum === selectedEnum.OFFER"
      class="p-mybuildings__list"
    >
      <template v-for="offer in offers">
        <li
          v-for="offerAsking in offer.offerAskings"
          :key="offerAsking.id"
          class="p-mybuildings__item"
        >
          <OfferingItem
            :offer-asking="offerAsking"
            :agent="offer.agent"
            :offer-id="offer.id"
            @offer-asking-like-by-id="offerAskingLikeById"
            @offer-asking-dislike-by-id="offerAskingDislikeById"
            @create-download-log="createDownloadLog"
          />
        </li>
      </template>
    </ul>
    <ul
      class="p-mybuildings__list"
      v-else-if="activeNum === selectedEnum.ASKING"
    >
      <li
        v-for="asking in askings"
        :key="asking.id"
        class="p-mybuildings__item"
      >
        <AskingItem
          :asking="asking"
          :dismiss="dismiss"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import AskingItem from '~/components/elements/mybuildings/sp/AskingItem';
import OfferingItem from '~/components/elements/mybuildings/sp/OfferingItem';
import Tab from '~/components/elements/mybuildings/sp/Tab';

export default {
  components: {
    AskingItem,
    OfferingItem,
    Tab,
  },
  data() {
    const selectedEnum = {
      OFFER: 1,
      ASKING: 2,
    };
    return {
      activeNum: selectedEnum.OFFER,
      selectedEnum,
    };
  },
  props: {
    offers: {
      type: Array,
      default: () => [],
    },
    askings: {
      type: Array,
      default: () => [],
    },
    dismiss: {
      type: Function,
      required: true,
    },
  },
  methods: {
    offerAskingLikeById(id) {
      this.$emit('offer-asking-like-by-id', id);
    },
    offerAskingDislikeById(id) {
      this.$emit('offer-asking-dislike-by-id', id);
    },
    askingLikeDislikeById(id) {
      this.$emit('asking-like-dislike-by-id', id);
    },
    switchCnt(num) {
      this.activeNum = num;
    },
    createDownloadLog(offerId) {
      this.$emit('create-download-log', offerId);
    },
  },
};
</script>

<style lang="scss" scoped>
.p-mybuildings {
  @include p-mybuildings;
}
</style>
