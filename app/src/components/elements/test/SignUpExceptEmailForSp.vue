<template>
  <div>
    <div class="p-signup__list">
      <h1 class="p-signup__ttl">
        お客様情報
      </h1>
      <ul>
        <li class="p-signup__item">
          <div class="p-signup__item--personal">
            <InputBox
              class="p-signup__item--personalCnt"
              icon="fas fa-user-circle"
              label="名前"
              id="name"
              @input="name = $event"
              input-type="text"
              placeholder="例：山田 太郎"
              :is-required="true"
            />
          </div>
        </li>
        <li class="p-signup__item">
          <InputBox
            class="p-signup__item--flexCnt"
            icon="fas fa-phone-alt"
            label="電話番号"
            id="phoneNumber"
            @input="phoneNumber = $event"
            input-type="text"
            placeholder="例：080-1234-5678"
            :is-required="true"
          />
        </li>
        <li class="p-signup__item">
          <InputBox
            class="p-signup__item--flexCnt"
            icon="fas fa-lock"
            label="パスワード"
            id="password"
            @input="password = $event"
            input-type="password"
            placeholder="半角英数字8文字以上"
            :is-required="true"
          />
          <InputBox
            class="p-signup__item--flexCnt"
            icon="fas fa-lock"
            label="パスワード（確認用）"
            id="password"
            @input="confirmPassword = $event"
            input-type="password"
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
            class="p-signup__item--flexCnt"
            icon="fas fa-building"
            label="会社名"
            id="company"
            @input="company = $event"
            input-type="text"
            placeholder="例：株式会社エスティ商事"
            :is-required="true"
          />
        </li>
        <li class="p-signup__item">
          <InputBox
            class="p-signup__item--flexCnt"
            icon="fas fa-users"
            label="オフィスを利用する社員数"
            id="employees"
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
            @input="budget = $event"
            input-type="number"
            placeholder="例：300（万円）"
            unit="万円"
            :is-required="true"
          />
        </li>
        <li class="p-signup__item">
          <SelectBox
            label="希望入居時期"
            id="movingTerm"
            icon="far fa-calendar-alt"
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
        to="/privacy"
        target="_blank"
        class="p-signup__checkAnchor"
      >
        プライバシーポリシー
      </a>
      に同意
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
  computed: {
    movingTermOptions() {
      return ['今すぐ', '3ヶ月以内', '6ヶ月以内', '1年以内', '物件次第'];
    },
    walkingTimeOptions() {
      return ['1分以内', '3分以内', '5分以内', '10分以内', '20分以内'];
    },
  },
  data() {
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
      selected: null,
      options: [],
      isLoading: false,
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
        area: area.map(n => Object.assign(n, { timeRequired: walkingTime })),
        movingTerm,
        budget,
        employees,
        others,
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
</style>
