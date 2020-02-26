<template>
  <tr>
    <td class="m-offerListModal__tableBody">
      <ul
        v-if="uniqueLikeBuildingNames.length"
        class="m-offerListModal__tableList"
      >
        <li
          class="m-offerListModal__tableItem"
          v-for="(likeBuildingName, index) of uniqueLikeBuildingNames"
          :key="'unique-like'+index"
        >
          {{ likeBuildingName }}
        </li>
      </ul>
      <template v-else>
        -
      </template>
    </td>
    <td class="m-offerListModal__tableBody">
      <ul
        v-if="uniqueDisLikeBuildingNames.length"
        class="m-offerListModal__tableList"
      >
        <li
          class="m-offerListModal__tableItem"
          v-for="(disLikeBuildingName, index) of uniqueDisLikeBuildingNames"
          :key="'unique-dis-like'+index"
        >
          {{ disLikeBuildingName }}
        </li>
      </ul>
      <template v-else>
        -
      </template>
    </td>
    <td class="m-offerListModal__tableBody">
      <a
        :href="`${url}`"
        target="_blank"
        class="m-offerListModal__tableAnchor"
      >
        <i class="m-offerListModal__tableAnchorIcon far fa-file-pdf" />
        <span>PDF</span>
      </a>
    </td>
    <td class="m-offerListModal__tableBody">
      <time>
        {{ bigIntToFormattedDateTime(data.createdAt) }}
      </time>
    </td>
  </tr>
</template>

<script>
import date from '~/mixins/date';
import log from '~/utils/log';
import offerListCell from '~/mixins/offerListCell';

export default {
  data() {
    return {
      url: '',
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  mixins: [date, offerListCell],
  created() {
    try {
      const client = this.$axios.withAccessToken(this.$store.state.agentToken);
      client
        .post('tenant/s3_signed_url', {
          id: this.data.id,
          type: 'agent',
        })
        .then((res) => {
          this.url = res.data;
        });
    } catch (err) {
      log.error(err);
    }
  },
};
</script>

<style scoped lang="scss">
.m-offerListModal {
  @include m-offerListModal;
}
</style>
