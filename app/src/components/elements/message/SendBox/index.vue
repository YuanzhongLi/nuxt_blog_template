<template>
  <div class="m-sendBox">
    <Calendar
      class="m-sendBox__calendar"
      @input="inputDate($event)"
    />
    <label
      v-if="userType === 1"
      for="upload"
      class="m-sendBox__btn m-sendBox__btn--file"
    >
      <input
        type="file"
        id="upload"
        class="m-sendBox__input"
        @change.prevent="sendFile($event)"
      >
      <i class="m-sendBox__btnIcon fas fa-paperclip" />
    </label>
    <textarea
      name="text"
      class="m-sendBox__textarea"
      ref="adjust_textarea"
      @keydown="adjustHeight"
      v-model="message"
    />
    <label
      @click="sendMessage"
      for="send"
      class="m-sendBox__send "
      :class="{'is-disabled': !isValid }"
    >
      <input
        type="button"
        for="send"
        class="m-sendBox__input"
      >
      <i class="m-sendBox__sendIcon fas fa-paper-plane" />送信
    </label>
  </div>
</template>

<script>
import Calendar from './Calendar';
import {
  isValidMessage,
} from '~/utils/validation';


export default {
  components: {
    Calendar,
  },
  props: {
    userId: {
      type: Number,
      default: 0,
    },
    userType: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    isValid() {
      return isValidMessage(this.message);
    },
  },
  data() {
    return {
      message: '',
      pdf: null,
    };
  },
  methods: {
    adjustHeight() {
      const textarea = this.$refs.adjust_textarea;
      const resetHeight = () => new Promise((resolve) => {
        resolve(textarea.style.height = 'auto');
      });
      resetHeight().then(() => {
        textarea.style.height = `${textarea.scrollHeight}px`;
      });
    },
    sendMessage() {
      if (this.isValid) {
        const { message } = this;
        this.$emit('send-message', message);
        this.message = '';
      }
    },
    sendFile(e) {
      const { files } = e.target;
      const index = 0;
      const file = files[index];

      this.$emit('send-file', file);
      this.pdf = null;
    },
    inputDate(e) {
      if (this.message.length > 0) {
        this.message += `\n${e}`;
      } else {
        this.message = e;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.m-sendBox {
  @include m-sendBox;
}
</style>
