<template>
  <div class="a-imageFile">
    <time
      class="a-imageFile__time a-imageFile__time--receiver"
      v-if="this.type==='receiver'"
    >
      19:16
    </time>
    <div
      v-if="this.type==='sender'"
      class="a-imageFile__thumb"
      style="background-image: url(https://www.willstyle.co.jp/w/wp-content/uploads/2016/02/React-210x210.jpg);"
    />
    <a
      href="#"
      target="_blank"
      class="a-imageFile__img"
    >
      <div
        class="a-imageFile__imgThumb"
        style="background-image: url(https://template.k-solution.info/img/keiyakusho_saikenjoto01.jpg);"
      />
    </a>
    <time
      class="a-imageFile__time a-imageFile__time--sender"
      v-if="this.type==='sender'"
    >
      9:16
    </time>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
.a-imageFile {
  @include a-imageFile;
}
</style>
