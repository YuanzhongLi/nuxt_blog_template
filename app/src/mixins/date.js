export default {
  methods: {
    /**
     * @param {String} strMonth ex) '1月'
     * @return {Number} 1
     */
    strMonthToInt(strMonth) {
      return Number(strMonth.split('月')[0]);
    },
    /**
     * @param {String} strMonth ex) '1年'
     * @return {Number} 1
     */
    strYearToInt(strYear) {
      return Number(strYear.split('年')[0]);
    },
    bigIntToFormattedDateTime(num) {
      const d = new Date(num);
      const year = d.getFullYear();
      const mo = d.getMonth() + 1;
      const month = String(mo).padStart(2, '0');
      const da = d.getDate();
      const day = String(da).padStart(2, '0');
      const h = d.getHours();
      const hour = String(h).padStart(2, '0');
      const mi = d.getMinutes();
      const minutes = String(mi).padStart(2, '0');
      return `${year}/${month}/${day} - ${hour}:${minutes}`;
    },
  },
  computed: {
    monthList() {
      const ret = [];
      for (let i = 1; i <= 12; i += 1) {
        ret.push(`${i}月`);
      }
      return ret;
    },
    yearList() {
      const ret = [];
      const date = new Date(Date.now());
      const toYear = date.getFullYear();
      const fromYear = 1900;
      for (let i = fromYear; i <= toYear + 10; i += 1) {
        ret.push(`${i}年`);
      }
      return ret;
    },
  },
  filters: {
    formatYearAndMonth(period) {
      if (!period) return '';
      const strPeriod = String(period);
      return `${strPeriod.slice(0, 4)}年${strPeriod.slice(4, 6)}月`;
    },
  },
};
