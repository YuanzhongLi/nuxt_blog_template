<template>
  <div>
    <div class="p-signup__list">
      <h1 class="p-signup__ttl">
        お客様情報
      </h1>
      <ul>
        <li class="p-signup__item p-signup__item--flex">
          <InputBox
            class="p-signup__item--flexCnt"
            icon="fas fa-user-circle"
            label="名前"
            id="name"
            :label-content="name"
            @input="name = $event"
            input-type="text"
            placeholder="例：山田 太郎"
            :is-required="true"
          />
          <InputBox
            class="p-signup__item--flexCnt"
            icon="fas fa-phone-alt"
            label="電話番号"
            id="phoneNumber"
            :label-content="phoneNumber"
            @input="phoneNumber = $event"
            input-type="text"
            placeholder="例：080-1234-5678"
            :is-required="true"
          />
        </li>
        <li class="p-signup__item p-signup__item--flex">
          <InputBox
            class="p-signup__item--flexCnt"
            icon="fas fa-lock"
            label="パスワード"
            id="password"
            input-type="password"
            :label-content="password"
            @input="password = $event"
            placeholder="半角英数字8文字以上"
            :is-required="true"
          />
          <InputBox
            class="p-signup__item--flexCnt"
            icon="fas fa-lock"
            label="パスワード（確認用）"
            id="confirmPassword"
            input-type="password"
            :label-content="confirmPassword"
            @input="confirmPassword = $event"
            placeholder="半角英数字8文字以上"
            :is-required="true"
          />
        </li>
      </ul>
    </div>
    <div class="p-signup__list">
      <h1 class="p-signup__ttl">
        会社情報
      </h1>
      <ul>
        <li class="p-signup__item">
          <InputBox
            icon="fas fa-building"
            label="会社名"
            :label-content="company"
            @input="company = $event"
            id="company"
            input-type="text"
            placeholder="例：株式会社エスティ商事"
            :is-required="true"
          />
        </li>
        <li class="p-signup__item p-signup__item--flex">
          <InputBox
            class="p-signup__item--flexCnt"
            icon="fas fa-users"
            label="オフィスを利用する社員数"
            id="employees"
            :label-content="employees"
            @input="employees = $event"
            input-type="number"
            placeholder="例：100"
            unit="人"
            :is-required="true"
          />
          <InputBox
            class="p-signup__item--flexCnt"
            icon="fas fa-yen-sign"
            label="月額賃料予算（万円）"
            id="budget"
            :label-content="budget"
            @input="budget = $event"
            input-type="number"
            :placeholder="bugetLabel"
            unit="万円"
            :is-required="true"
          />
        </li>
        <li class="p-signup__item">
          <SelectBox
            label="希望入居時期"
            id="movingTerm"
            icon="far fa-calendar-alt"
            :label-content="movingTerm"
            :options="movingTermOptions"
            @select="movingTerm = $event"
            :is-required="true"
          />
        </li>
      </ul>
    </div>
    <div class="p-signup__list">
      <h1 class="p-signup__ttl">
        ご希望のエリア
      </h1>
      <ul>
        <li class="p-signup__item">
          <client-only>
            <multiselect
              v-model="area"
              @search-change="changeAutoComplete"
              label="stationName"
              :options="options"
              :multiple="true"
              :close-on-select="true"
              :show-labels="false"
              :searchable="true"
              :loading="isLoading"
              :internal-search="false"
              :hide-selected="true"
              :block-keys="['Delete']"
              placeholder="駅名を入力してください"
            >
              <template
                slot="tag"
                slot-scope="{ option }"
              >
                <span class="p-signup__tag">
                  {{ option.stationName }}
                  <span
                    @click="area = area.filter(n => n.stationId !== option.stationId)"
                  >
                    <i class="p-signup__tagIcon fas fa-times" />
                  </span>
                </span>
              </template>
              <template slot="noOptions">
                検索ワードを入力してください
              </template>
              <template slot="noResult">
                合致するエリアがありません
              </template>
            </multiselect>
          </client-only>
        </li>
        <li class="p-signup__item">
          <SelectBox
            label="徒歩分数"
            id="walkingTime"
            :label-content="walkingTime"
            :options="walkingTimeOptions"
            @select="walkingTime = $event"
            :is-required="true"
          />
        </li>
      </ul>
    </div>
    <div class="p-signup__check">
      <CheckBox
        :value="termConsented"
        @input="consentTerm"
      />
      <a
        href="/terms"
        target="_blank"
        class="p-signup__checkAnchor"
      >
        利用規約
      </a>
      と
      <a
        href="/privacy"
        target="_blank"
        class="p-signup__checkAnchor"
      >
        プライバシーポリシー
      </a>
      に同意する
    </div>
    <div class="p-signup__save">
      <button
        class="p-signup__saveBtn"
        @click.prevent="signup"
      >
        新規登録
      </button>
    </div>
    <ul class="p-signup__formFooter">
      <li>
        <n-link
          class="p-signup__textAnchor"
          to="newpassword"
        >
          パスワードの再発行
        </n-link>
      </li>
      <li>
        <n-link
          class="p-signup__textAnchor"
          to="login"
        >
          ログイン
        </n-link>
      </li>
    </ul>
  </div>
</template>

<script>
import CheckBox from '~/components/elements/common/CheckBox';
import InputBox from '~/components/elements/common/InputBox';
import SelectBox from '~/components/elements/common/SelectBox';
import notification from '~/mixins/notification';

export default {
  components: {
    CheckBox,
    InputBox,
    SelectBox,
  },
  data() {
    const isLoading = false;
    return {
      token: this.$route.query.token,
      name: '',
      email: '',
      company: '',
      phoneNumber: '',
      currentEmployees: '',
      currentArea: '',
      address: '',
      password: '',
      confirmPassword: '',
      area: [],
      movingTerm: '',
      walkingTime: '',
      budget: '',
      employees: '',
      others: '',
      eRentArray: [],
      selected: null,
      options: [],
      isLoading,
      termConsented: false,
    };
  },
  mixins: [notification],
  props: {
    stations: {
      type: Array,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    uploadImg: {
      type: Function,
      required: true,
    },
  },
  computed: {
    bugetLabel() {
      return this.eRentArray.length !== 0 && Number(this.employees) > 0
        ? `最低賃料の目安:${Math.min.apply(null, this.eRentArray) * 2 * Number(this.employees) / 10000}万円` : '月額賃料予算（万円）';
    },
    movingTermOptions() {
      return ['今すぐ', '3ヶ月以内', '6ヶ月以内', '1年以内', '物件次第'];
    },
    walkingTimeOptions() {
      return ['1分以内', '3分以内', '5分以内', '10分以内', '20分以内'];
    },
  },
  methods: {
    signup() {
      const {
        token,
        name,
        email,
        company,
        phoneNumber,
        currentEmployees,
        currentArea,
        address,
        password,
        confirmPassword,
        area,
        movingTerm,
        budget,
        employees,
        others,
        walkingTime,
        termConsented,
      } = this;
      const values = {
        token,
        name,
        email,
        company,
        phoneNumber,
        address,
        password,
        confirmPassword,
        currentEmployees,
        currentArea,
        movingTerm,
        budget,
        employees,
        others,
        area: area.map(n => Object.assign(n, { timeRequired: walkingTime })),
        termConsented,
      };
      this.$emit('signupEmailConfirm', values);
    },
    updateArea(area) {
      this.area = area;
    },
    async changeAutoComplete($event) {
      if (!$event) { return; }
      this.isLoading = true;
      try {
        const res = await this.$axios.get('https://search.estie.jp/',
          {
            params: {
              table_names: ['station'],
              name: $event,
              limit: 5,
            },
          });
        this.options = res.data.station.data.map(n => ({ stationId: n.attributes.id, stationName: n.attributes.name }));
      } catch (e) {
        this.setNotificationMessage('error', 'サーバーエラーです');
      } finally {
        this.isLoading = false;
      }
    },
    consentTerm(checked) {
      this.termConsented = checked;
    },
  },
};
</script>

<style lang="scss" scoped>
.p-signup {
  @include p-signup;
}

.chatForm {
  @include chatForm;
}
</style>
