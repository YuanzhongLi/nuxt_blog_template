<template>
  <div class="a-fileEmpty">
    <div>
      <i class="a-fileEmpty__icon fas fa-inbox" />
      <h1 class="a-fileEmpty__ttl">
        必要書類をアップロードしましょう
      </h1>
      <p class="a-fileEmpty__txt">
        法人謄本、代表者身分証明書、決算書2期分など
      </p>
      <label
        class="a-fileEmpty__btn"
        for="emptyUpload"
      >
        <input
          type="file"
          id="emptyUpload"
          class="a-fileEmpty__btnInput"
        >
        <i class="a-fileEmpty__btnIcon fas fa-plus" />アップロード
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a-fileEmpty {
  @include a-fileEmpty;
}
</style>
