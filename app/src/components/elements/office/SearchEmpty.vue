<template>
  <div class="a-searchEmpty">
    <i class="a-searchEmpty__icon fas fa-search" />
    <h1 class="a-searchEmpty__ttl">
      条件に該当する物件がありませんでした
    </h1>
    <p class="a-searchEmpty__txt">
      検索条件を変更して再度検索してください
    </p>
    <n-link
      to="/office"
      class="a-searchEmpty__anchor"
    >
      検索トップに戻る
    </n-link>
  </div>
</template>

<style lang="scss" scoped>
.a-searchEmpty {
  @include a-searchEmpty;
}
</style>
