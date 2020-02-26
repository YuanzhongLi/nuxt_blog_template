<template>
  <div
    class="o-searchHeader"
    :class="{'o-searchHeader--sp': device.isMobile}"
  >
    <div class="o-searchHeader__cnt">
      <h1 class="o-searchHeader__ttl">
        とっておきのオフィスを見つけましょう
      </h1>
      <SearchBox
        class="o-searchHeader__search"
        :search="search"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import SearchBox from '~/components/elements/common/search/searchBox';

export default {
  props: {
    search: {
      type: Function,
      required: true,
    },
  },
  components: {
    SearchBox,
  },
  computed: {
    ...mapState(['device']),
  },
};
</script>

<style lang="scss" scoped>
.o-searchHeader {
  @include o-searchHeader;
}
</style>
