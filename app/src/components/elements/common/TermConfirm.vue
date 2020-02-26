<template>
  <div class="a-termConfirm">
    <div class="a-termConfirm__cnt">
      <h1 class="a-termConfirm__ttl">
        利用規約・プライバシーポリシー改定のお知らせ
      </h1>
      <p class="a-termConfirm__txt">
        estieをご利用いただきありがとうございます。<br>サービスの改善に伴い、一部利用規約とプライバシーポリシーの改定を行いました。<br>ご確認の上、サービスのご利用をお願いいたします
      </p>
      <div>
        <a
          href="#"
          @click.prevent="$emit('submit')"
          class="a-termConfirm__confirm"
        >
          改定内容に同意する
        </a>
      </div>
      <ul class="a-termConfirm__list">
        <li class="a-termConfirm__item">
          <a
            class="a-termConfirm__anchor"
            href="/terms"
            target="_blank"
          >
            利用規約
          </a>
        </li>
        <li class="a-termConfirm__item">
          <a
            class="a-termConfirm__anchor"
            href="/privacy"
            target="_blank"
          >
            プライバシーポリシー
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a-termConfirm {
  @include a-termConfirm;
}
</style>
