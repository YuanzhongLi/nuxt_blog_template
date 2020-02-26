<template>
  <tbody class="a-askingTable__body">
    <tr
      class="a-askingTable__bodyLine"
      :key="'asking' + asking.id"
    >
      <td class="a-askingTable__bodyCnt">
        {{ asking.askingFloor }}
      </td>
      <td class="a-askingTable__bodyCnt a-askingTable__bodyCnt--asking">
        <div
          class="a-askingTable__bodyImg a-askingTable__bodyImg--asking"
          :style="`background-image: url(${ asking.layoutImgUrl });`"
        />
      </td>
      <td class="a-askingTable__bodyCnt">
        {{ askingAreaAddUnit(asking.askingArea) }}<br><span class="a-askingTable__bodyCntSub"> {{ askingAreaSqAddUnit(asking.askingArea) }}</span>
      </td>
      <td class="a-askingTable__bodyCnt">
        {{ judgeAskingRent }}
        <br>
        <span
          v-if="!asking.askingRent && eRent"
          class="a-askingTable__bodyCntSub"
        >（推定）</span>
      </td>
      <td class="a-askingTable__bodyCnt">
        {{ asking.deposit }}
      </td>
      <td class="a-askingTable__bodyCnt">
        {{ asking.contractStart }}
      </td>
      <td class="a-askingTable__bodyCnt">
        {{ asking.contractType }}{{ asking.contractTerm }}
      </td>
      <td class="a-askingTable__bodyCnt">
        <ul
          class="a-askingTable__bodyInterest"
        >
          <li class="a-askingTable__bodyInterestItem">
            <a
              href="#"
              class="a-askingTable__bodyInterestAnchor a-askingTable__bodyInterestAnchor--fav"
              :class="{'is-active': this.isLike }"
              @click="askingLikeById(asking.id)"
            >
              <i class="a-askingTable__bodyInterestIcon a-askingTable__bodyInterestIcon--fav fas fa-heart" />
            </a>
          </li>
          <li class="a-askingTable__bodyInterestItem">
            <a
              href="#"
              class="a-askingTable__bodyInterestAnchor a-askingTable__bodyInterestAnchor--ignore"
              :class="{'is-active': !this.isLike }"
              @click="askingDislikeById(asking.id)"
            >
              <i class="a-askingTable__bodyInterestIcon a-askingTable__bodyInterestIcon--dismiss fas fa-times" />
            </a>
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</template>

<script>
import askingArea from '~/mixins/askingArea';
import askingRent from '~/mixins/askingRent';

export default {
  props: {
    asking: {
      type: Object,
      default: () => {},
    },
    isLoggedIn: {
      type: Boolean,
      require: true,
    },
    eRent: {
      type: Number,
      default: 0,
    },
  },
  mixins: [askingArea, askingRent],
  computed: {
    isLike() {
      return !!this.asking.isLike;
    },
  },
  methods: {
    askingLikeById(askingId) {
      this.$emit('asking-like-by-id', askingId);
    },
    askingDislikeById(askingId) {
      this.$emit('asking-dislike-by-id', askingId);
    },
  },
};
</script>


<style scoped lang="scss">
.a-askingTable {
  @include a-askingTable;
}
</style>
