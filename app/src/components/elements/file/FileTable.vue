<template>
  <table class="a-fileTable">
    <thead class="a-fileTable__head">
      <tr>
        <th class="a-fileTable__ttl">
          名前
        </th>
        <th class="a-fileTable__ttl">
          アップロード時間
        </th>
        <th class="a-fileTable__ttl">
          削除
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="a-fileTable__line"
        v-for="n of 100"
        :key="n"
      >
        <td class="a-fileTable__body a-fileTable__body--cnt">
          <div
            class="a-fileTable__bodyThumb"
            style="background-image: url(https://cheat.co.jp/blog/wp-content/uploads/2018/09/1_-PlqbnwqjqJi_EVmrhmuDQ.jpeg);"
          />
          <span class="a-fileTable__bodyLabel">
            賃借契約書賃借契約書賃借契約書賃借契約書賃借契約書賃借契約書
          </span>
        </td>
        <td class="a-fileTable__body a-fileTable__body--time">
          2019/7/11:34
        </td>
        <td class="a-fileTable__body a-fileTable__body--delete">
          <a
            href="#"
            class="a-fileTable__bodyAnchor"
          >
            <i class="a-fileTable__bodyAnchorIcon fas fa-trash" />
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.a-fileTable {
  @include a-fileTable;
}
</style>
