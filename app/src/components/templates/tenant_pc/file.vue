<template>
  <div class="p-file">
    <!-- ↓空だったらp-file__table--emaptyを追加↓ -->
    <aside class="p-file__table">
      <!-- 空だったら↓こちらを表示↓ -->
      <p
        style="display: none;"
        class="p-file__table--emptyTxt"
      >
        アップロードしたファイルがありません
      </p>
      <!-- 空だったら↑こちら↑ -->
      <FileTable class="p-file__tableCnt" />
      <div class="p-file__tableAdd">
        <label
          for="upload"
          class="p-file__tableAddBtn"
        >
          <input
            id="upload"
            class="p-file__tableAddInput"
            type="file"
          >
          <i class="p-file__tableAddIcon fas fa-plus" />
        </label>
      </div>
    </aside>
    <section class="p-file__cnt">
      <FilePreview />
    </section>
    <!-- 空だったら↓こちら↓ -->
    <section
      class="p-file__cnt p-file__cnt--empty"
      style="display: none;"
    >
      <FileEmpty />
    </section>
    <!-- 空だったら↑こちら↑ -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

import FileTable from '~/components/elements/file/FileTable';
import FileEmpty from '~/components/elements/file/FileEmpty';
import FilePreview from '~/components/elements/file/FilePreview';

export default {
  components: {
    FileTable,
    FileEmpty,
    FilePreview,
  },
  middleware: ['injectTenant', 'tenantAuthenticated'],
  computed: {
    ...mapState(['device', 'tenant']),
  },
};
</script>

<style lang="scss" scoped>
.p-file {
  @include p-file;
}
</style>
