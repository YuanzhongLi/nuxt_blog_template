<template>
  <div
    class="m-likeBuildingsModal"
    :class="{'m-likeBuildingsModal--sp': device.isMobile}"
  >
    <div class="m-likeBuildingsModal__cnt">
      <header class="m-likeBuildingsModal__cntHead">
        <div>
          <h1
            v-if="this.isLike"
            class="m-likeBuildingsModal__cntTtl"
          >
            お気に入り済 物件一覧
          </h1>
          <h1
            v-else
            class="m-likeBuildingsModal__cntTtl"
          >
            興味なし済 物件一覧
          </h1>
          <p class="m-likeBuildingsModal__cntSub">
            テナントID： {{ targetTenantId }}
          </p>
        </div>
        <a
          @click="closeModal"
          class="m-likeBuildingsModal__close"
        >
          <i class="fas fa-times" />
        </a>
      </header>
      <ul class="m-likeBuildingsModal__list">
        <template v-for="(building) in buildings">
          <li
            v-for="asking in building.askings"
            :key="asking.id"
            class="m-likeBuildingsModal__item"
          >
            <LikeBuildingsModalAsking
              :building="building"
              :asking="asking"
            />
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { noImgUrl } from '~/utils/building';
import LikeBuildingsModalAsking from '~/components/elements/common/modal/LikeBuildingsModalAsking';

export default {
  components: {
    LikeBuildingsModalAsking,
  },
  data() {
    return {
      noImgUrl,
      content: this.currentContent,
    };
  },
  props: {
    targetTenantId: {
      type: Number,
      required: true,
    },
    buildings: {
      type: Array,
      required: true,
    },
    isLike: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState(['device']),
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.m-likeBuildingsModal {
  @include m-likeBuildingsModal;
}
</style>
