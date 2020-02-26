<template>
  <div>
    <label
      v-if="avatarUrl"
      for="account-image"
      class="a-accountImageUploader a-accountImageUploader--image"
      :style="`background-image: url(${avatarUrl});`"
    >
      <input
        type="file"
        id="account-image"
        class="a-accountImageUploader__input"
        @change="uploadImg"
      >
      <div class="a-accountImageUploader__edit">
        <i class="a-accountImageUploader__editIcon fas fa-pen" />編集
      </div>
    </label>
    <label
      v-else
      class="a-accountImageUploader"
      for="account-image"
    >
      <input
        type="file"
        class="a-accountImageUploader__input"
        id="account-image"
        @change="uploadImg"
      >
      <p class="a-accountImageUploader__txt">
        <i class="a-accountImageUploader__txtIcon fas fa-cloud-upload-alt" />
        <span class="a-accountImageUploader__txtLabel">
          アカウント<br>画像（任意）
        </span>
      </p>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    avatarUrl: {
      type: String,
      default: '',
    },
  },
  methods: {
    uploadImg($event) {
      const file = $event.target.files[0];
      this.$emit('upload-img', file);
    },
  },
};
</script>

<style scoped lang="scss">
.a-accountImageUploader {
  @include a-accountImageUploader;
}
</style>
