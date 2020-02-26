<template>
  <div class="m-offerEmpty">
    <h1 class="m-offerEmpty__ttl">
      エージェントからのオファーをお待ちください
    </h1>
    <p class="m-offerEmpty__txt">
      登録後、2日程度でオファーが届きます<br>
      物件の検索や、e-Mapでおすすめの物件を見ることは可能です<br>
      早速チェックしてみましょう
    </p>
    <n-link
      class="m-offerEmpty__anchor"
      to="/office/e-map"
    >
      <span class="m-offerEmpty__anchorTxt">e-Mapを見る</span>
    </n-link>
  </div>
</template>

<style lang="scss" scoped>
.m-offerEmpty {
  @include m-offerEmpty;
}
</style>
