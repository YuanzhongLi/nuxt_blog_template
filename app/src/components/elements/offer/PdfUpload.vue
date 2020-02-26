<template>
  <div class="a-pdfUpload">
    <div
      class="a-pdfUpload__thumb"
      style="background-image: url(https://template.k-solution.info/img/keiyakusho_saikenjoto01.jpg); display: none;"
    >
      <div class="a-pdfUpload__thumbType">
        <i class="a-pdfUpload__thumbTypeIcon far fa-file-pdf" />PDF
      </div>
      <a
        class="a-pdfUpload__thumbClose"
        href="#"
      >
        <i class="a-pdfUpload__thumbCloseIcon fas fa-times" />
      </a>
    </div>
    <i class="a-pdfUpload__icon fas fa-file-image" />
    <p class="a-pdfUpload__txt">
      {{ uploadFile ? uploadFile.name : 'PDFをアップロードしてください' }}
    </p>
    <label
      for="image-upload"
      class="a-pdfUpload__btn"
    >ファイルを選択
      <input
        id="image-upload"
        class="a-pdfUpload__file"
        type="file"
        @change.prevent="selectedFile($event)"
      >
    </label>
    <div
      style="display: none;"
      class="a-pdfUpload--loading"
    >
      <p class="a-pdfUpload--loadingCnt">
        アップロード処理中です…
      </p>
    </div>
    <div
      style="display: none;"
      class="a-pdfUpload--loading"
    >
      <p class="a-pdfUpload--loadingCnt">
        削除処理中です…
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    uploadFile: {
      type: Object,
      default: null,
    },
  },
  methods: {
    selectedFile(e) {
      const { files } = e.target;
      const index = 0;
      const file = files[index];
      this.$emit('input', file);
    },
  },
};
</script>

<style scoped lang="scss">
.a-pdfUpload {
  @include a-pdfUpload;
}
</style>
