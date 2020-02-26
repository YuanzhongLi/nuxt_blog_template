<template>
  <transition name="m-Modal">
    <div
      class="m-Modal__mask"
      @click.self="closeModal"
    >
      <div class="m-Modal__container">
        <div class="m-Modal__header">
          <h2>
            <slot name="header">
              default header
            </slot>
          </h2>
        </div>
        <div class="m-Modal__body">
          <p>
            <slot name="body">
              default body
            </slot>
          </p>
        </div>
        <div class="m-Modal__footer">
          <button
            class="m-Modal__btn m-Modal__btn--submit"
            @click="leftFunc"
          >
            <span>
              <slot name="leftButtonLabel">
                default leftButtonLabel
              </slot>
            </span>
          </button>
          <button
            class="m-Modal__btn m-Modal__btn--cancel"
            @click="closeModal"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close');
    },
    leftFunc() {
      this.$emit('left-func');
    },
  },
};
</script>

<style scoped lang="scss">
.m-Modal {
  @include m-Modal;
}
</style>
