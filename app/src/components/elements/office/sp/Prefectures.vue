<template>
  <div class="m-mobilePrefectures">
    <h2 class="m-mobilePrefectures__ttl">
      都道府県から探す
    </h2>
    <ul class="m-mobilePrefectures__list">
      <li class="m-mobilePrefectures__item">
        <h3
          class="m-mobilePrefectures__itemTtl"
          :class="{'is-open': show_contents.indexOf('1') >= 0}"
          @click="toggle('1')"
        >
          北海道・東北<i class="m-mobilePrefectures__itemTtlIcon fas fa-chevron-down" />
        </h3>
        <ul
          v-show="show_contents.indexOf('1') >= 0"
          class="m-mobilePrefectures__cnt"
        >
          <li
            class="m-mobilePrefectures__cntItem"
            v-for="prefecture in tohoku"
            :key="prefecture.id"
          >
            <div
              @click="transferLink(`/office/${prefecture.en_name}/result`)"
              class="m-mobilePrefectures__cntItemAnchor"
            >
              {{ prefecture.name }}
            </div>
          </li>
        </ul>
      </li>
      <li class="m-mobilePrefectures__item">
        <h3
          class="m-mobilePrefectures__itemTtl"
          :class="{'is-open': show_contents.indexOf('2') >= 0}"
          @click="toggle('2')"
        >
          関東<i class="m-mobilePrefectures__itemTtlIcon fas fa-chevron-down" />
        </h3>
        <ul
          v-show="show_contents.indexOf('2') >= 0"
          class="m-mobilePrefectures__cnt"
        >
          <li
            class="m-mobilePrefectures__cntItem"
            v-for="prefecture in kanto"
            :key="prefecture.id"
          >
            <div
              @click="transferLink(`/office/${prefecture.en_name}/result`)"
              class="m-mobilePrefectures__cntItemAnchor"
            >
              {{ prefecture.name }}
            </div>
          </li>
        </ul>
      </li>
      <li class="m-mobilePrefectures__item">
        <h3
          class="m-mobilePrefectures__itemTtl"
          :class="{'is-open': show_contents.indexOf('3') >= 0}"
          @click="toggle('3')"
        >
          中部・北陸<i class="m-mobilePrefectures__itemTtlIcon fas fa-chevron-down" />
        </h3>
        <ul
          v-show="show_contents.indexOf('3') >= 0"
          class="m-mobilePrefectures__cnt"
        >
          <li
            class="m-mobilePrefectures__cntItem"
            v-for="prefecture in chubu"
            :key="prefecture.id"
          >
            <div
              @click="transferLink(`/office/${prefecture.en_name}/result`)"
              class="m-mobilePrefectures__cntItemAnchor"
            >
              {{ prefecture.name }}
            </div>
          </li>
        </ul>
      </li>
      <li class="m-mobilePrefectures__item">
        <h3
          class="m-mobilePrefectures__itemTtl"
          :class="{'is-open': show_contents.indexOf('4') >= 0}"
          @click="toggle('4')"
        >
          関西<i class="m-mobilePrefectures__itemTtlIcon fas fa-chevron-down" />
        </h3>
        <ul
          v-show="show_contents.indexOf('4') >= 0"
          class="m-mobilePrefectures__cnt"
        >
          <li
            class="m-mobilePrefectures__cntItem"
            v-for="prefecture in kansai"
            :key="prefecture.id"
          >
            <div
              @click="transferLink(`/office/${prefecture.en_name}/result`)"
              class="m-mobilePrefectures__cntItemAnchor"
            >
              {{ prefecture.name }}
            </div>
          </li>
        </ul>
      </li>
      <li class="m-mobilePrefectures__item">
        <h3
          class="m-mobilePrefectures__itemTtl"
          :class="{'is-open': show_contents.indexOf('5') >= 0}"
          @click="toggle('5')"
        >
          中国・四国<i class="m-mobilePrefectures__itemTtlIcon fas fa-chevron-down" />
        </h3>
        <ul
          v-show="show_contents.indexOf('5') >= 0"
          class="m-mobilePrefectures__cnt"
        >
          <li
            class="m-mobilePrefectures__cntItem"
            v-for="prefecture in chugoku"
            :key="prefecture.id"
          >
            <div
              @click="transferLink(`/office/${prefecture.en_name}/result`)"
              class="m-mobilePrefectures__cntItemAnchor"
            >
              {{ prefecture.name }}
            </div>
          </li>
        </ul>
      </li>
      <li class="m-mobilePrefectures__item">
        <h3
          class="m-mobilePrefectures__itemTtl"
          :class="{'is-open': show_contents.indexOf('6') >= 0}"
          @click="toggle('6')"
        >
          九州・沖縄<i class="m-mobilePrefectures__itemTtlIcon fas fa-chevron-down" />
        </h3>
        <ul
          v-show="show_contents.indexOf('6') >= 0"
          class="m-mobilePrefectures__cnt"
        >
          <li
            class="m-mobilePrefectures__cntItem"
            v-for="prefecture in kyushu"
            :key="prefecture.id"
          >
            <div
              @click="transferLink(`/office/${prefecture.en_name}/result`)"
              class="m-mobilePrefectures__cntItemAnchor"
            >
              {{ prefecture.name }}
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show_contents: [],
      tohoku: [
        { id: 0, en_name: 'hokkaido', name: '北海道' },
        { id: 1, en_name: 'aomori', name: '青森県' },
        { id: 2, en_name: 'iwate', name: '岩手県' },
        { id: 3, en_name: 'miyagi', name: '宮城県' },
        { id: 4, en_name: 'akita', name: '秋田県' },
        { id: 5, en_name: 'yamagata', name: '山形県' },
        { id: 6, en_name: 'fukushima', name: '福島県' },
      ],
      kanto: [
        { id: 7, en_name: 'ibaraki', name: '茨城県' },
        { id: 8, en_name: 'tochigi', name: '栃木県' },
        { id: 9, en_name: 'gumma', name: '群馬県' },
        { id: 10, en_name: 'saitama', name: '埼玉県' },
        { id: 11, en_name: 'chiba', name: '千葉県' },
        { id: 12, en_name: 'tokyo', name: '東京都' },
        { id: 13, en_name: 'kanagawa', name: '神奈川県' },
      ],
      chubu: [
        { id: 14, en_name: 'niigata', name: '新潟県' },
        { id: 15, en_name: 'toyama', name: '富山県' },
        { id: 16, en_name: 'ishikawa', name: '石川県' },
        { id: 17, en_name: 'fukui', name: '福井県' },
        { id: 18, en_name: 'yamanashi', name: '山梨県' },
        { id: 19, en_name: 'nagano', name: '長野県' },
        { id: 20, en_name: 'gifu', name: '岐阜県' },
        { id: 21, en_name: 'shizuoka', name: '静岡県' },
        { id: 22, en_name: 'aichi', name: '愛知県' },
      ],
      kansai: [
        { id: 23, en_name: 'mie', name: '三重県' },
        { id: 24, en_name: 'shiga', name: '滋賀県' },
        { id: 25, en_name: 'kyoto', name: '京都府' },
        { id: 26, en_name: 'osaka', name: '大阪府' },
        { id: 27, en_name: 'hyogo', name: '兵庫県' },
        { id: 28, en_name: 'nara', name: '奈良県' },
        { id: 29, en_name: 'wakayama', name: '和歌山県' },
      ],
      chugoku: [
        { id: 30, en_name: 'tottori', name: '鳥取県' },
        { id: 31, en_name: 'shimane', name: '島根県' },
        { id: 32, en_name: 'okayama', name: '岡山県' },
        { id: 33, en_name: 'hiroshima', name: '広島県' },
        { id: 34, en_name: 'yamaguchi', name: '山口県' },
        { id: 35, en_name: 'tokushima', name: '徳島県' },
        { id: 36, en_name: 'kagawa', name: '香川県' },
        { id: 37, en_name: 'ehime', name: '愛媛県' },
        { id: 38, en_name: 'kochi', name: '高知県' },
      ],
      kyushu: [
        { id: 39, en_name: 'fukuoka', name: '福岡県' },
        { id: 40, en_name: 'saga', name: '佐賀県' },
        { id: 41, en_name: 'nagasaki', name: '長崎県' },
        { id: 42, en_name: 'kumamoto', name: '熊本県' },
        { id: 43, en_name: 'oita', name: '大分県' },
        { id: 44, en_name: 'miyazaki', name: '宮崎県' },
        { id: 45, en_name: 'kagoshima', name: '鹿児島県' },
        { id: 46, en_name: 'okinawa', name: '沖縄県' },
      ],
    };
  },
  methods: {
    toggle(data) {
      if (this.show_contents.indexOf(data) >= 0) {
        this.show_contents = this.show_contents.filter(n => n !== data);
      } else {
        this.show_contents.push(data);
      }
    },
    transferLink(path) {
      this.$store.dispatch('search/loadStorage');
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.m-mobilePrefectures {
  @include m-mobilePrefectures;
}
</style>
