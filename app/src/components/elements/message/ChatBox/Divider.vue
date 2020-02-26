<template>
  <div class="a-divider">
    <hr class="a-divider__border">
    <p class="a-divider__txt">
      <slot />
    </p>
  </div>
</template>

<style scoped lang="scss">
.a-divider {
  @include a-divider;
}
</style>
