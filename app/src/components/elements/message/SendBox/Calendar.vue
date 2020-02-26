<template>
  <!-- Todo:コンソールにエラー出る -->
  <VueCtkDateTimePicker
    class="a-calendar"
    :no-value-to-custom-elem="true"
    :no-button-now="true"
    v-model="yourValue"
    :minute-interval="30"
    :format="'YYYY/MM/DD HH:mm'"
    :disabled-hours="['00', '01', '02', '03', '04', '05', '06', '07', '08', '17', '18', '19', '20', '21', '22', '23']"
    :min-date="start"
    :max-date="end"
    locale="en"
    color="#3d556c"
    label=""
    @validate="sendValue()"
  >
    <button
      class="a-calendar__btn"
      type="button"
    >
      <i class="a-calendar__btnIcon far fa-calendar-alt" />
    </button>
  </VueCtkDateTimePicker>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      yourValue: null,
    };
  },
  computed: {
    start() {
      // min-date に明日の9時を指定
      const start = moment().add(1, 'days').hour(8);
      return start.format('YYYY-MM-DDTHH:mm:ss');
    },
    end() {
      // max-date に min-date から3ヶ月後を指定
      const start = moment(this.start);
      const end = start.add(3, 'months').endOf('day');
      return end.format('YYYY-MM-DDTHH:mm:ss');
    },
  },
  methods: {
    sendValue() {
      this.$emit('input', this.yourValue);
    },
  },
};
</script>

<style scoped lang="scss">
.a-calendar {
  @include a-calendar;
}
</style>
