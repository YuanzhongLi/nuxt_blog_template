<template>
  <div class="m-chatHeader">
    <div class="m-chatHeader__account">
      <div
        class="m-chatHeader__accountThumb"
        :style="`background-image: url(${avatarUrl});`"
      />
      <div class="m-chatHeader__accountInfo">
        <p class="m-chatHeader__accountInfoCompany">
          {{ companyName }}
        </p>
        <p class="m-chatHeader__accountInfoName">
          {{ name }}
        </p>
      </div>
      <a
        href="#"
        class="m-chatHeader__anchor"
        @click="openOffer"
        v-if="isOpen"
      >
        閉じる
      </a>
      <a
        href="#"
        class="m-chatHeader__anchor"
        @click="openOffer"
        v-else
      >
        オファー物件を見る
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    companyName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    openOffer() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.m-chatHeader {
  @include m-chatHeader;
}
</style>
