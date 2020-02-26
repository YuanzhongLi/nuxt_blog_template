<template>
  <div class="a-filePreview">
    <header class="a-filePreview__head">
      <h1 class="a-filePreview__headTtl">
        プレビュー
      </h1>
      <nav class="a-filePreview__headNav">
        <a
          class="a-filePreview__headNavAnchor"
          href="#"
        >
          <i class="fas fa-caret-left" />
        </a>
        <span class="a-filePreview__headNavNum">2/15</span>
        <a
          class="a-filePreview__headNavAnchor"
          href="#"
        >
          <i class="fas fa-caret-right" />
        </a>
      </nav>
    </header>
    <div class="a-filePreview__body">
      <img
        class="a-filePreview__bodyImg"
        src="https://template.k-solution.info/img/keiyakusho_saikenjoto01.jpg"
      >
      <div class="a-filePreview__bodyInfo">
        <h2 class="a-filePreview__bodyInfoTtl">
          <i class="a-filePreview__bodyInfoTtlIcon fas fa-info-circle" />情報
        </h2>
        <ul class="a-filePreview__bodyInfoList">
          <li class="a-filePreview__bodyInfoItem">
            <h3 class="a-filePreview__bodyInfoItemTtl">
              ファイルネーム
            </h3>
            <p class="a-filePreview__bodyInfoItemTxt">
              重要事項説明書
            </p>
          </li>
          <li class="a-filePreview__bodyInfoItem">
            <h3 class="a-filePreview__bodyInfoItemTtl">
              アップロード時間
            </h3>
            <p class="a-filePreview__bodyInfoItemTxt">
              2019/7/27 11:34
            </p>
          </li>
          <li class="a-filePreview__bodyInfoItem">
            <h3 class="a-filePreview__bodyInfoItemTtl">
              拡張子
            </h3>
            <p class="a-filePreview__bodyInfoItemTxt">
              pdf
            </p>
          </li>
          <li class="a-filePreview__bodyInfoItem">
            <h3 class="a-filePreview__bodyInfoItemTtl">
              サイズ
            </h3>
            <p class="a-filePreview__bodyInfoItemTxt">
              105.71KB
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a-filePreview {
  @include a-filePreview;
}
</style>
