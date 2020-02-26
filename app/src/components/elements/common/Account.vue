<template>
  <div class="a-account">
    <a
      class="a-account__anchor"
      :class="{ 'is-open': isActive }"
      @click="toggleSwitch"
    >
      <div
        class="a-account__anchorThumb"
        :style="`background-image: url(${user.avatarUrl});`"
      />
      <div>
        <span
          v-if="user && user.company"
          class="a-account__anchorCompany"
        >
          {{ user.company }}
        </span>
        <p
          v-if="user && user.name"
          class="a-account__anchorName"
        >
          {{ user.name }}
        </p>
        <p
          v-else
          class="a-account__anchorName"
        >
          未ログイン
        </p>
      </div>
      <span class="a-account__anchorIcon">
        <i class="fas fa-caret-down" />
      </span>
    </a>
    <div
      v-if="isActive"
      class="a-account__cnt"
    >
      <ul class="a-account__cntList">
        <li>
          <a
            @click="openAccount"
            class="a-account__cntAnchor"
          >
            アカウント情報
          </a>
        </li>
        <li>
          <a
            @click.prevent="logout"
            class="a-account__cntAnchor"
          >
            ログアウト
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleSwitch() {
      this.$emit('toggle-switch');
    },
    openAccount() {
      this.$emit('open-account');
    },
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style scoped lang="scss">
.a-account {
  @include a-account;
}
</style>
