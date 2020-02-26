<template>
  <div>
    <ul class="p-signup__list">
      <li class="p-signup__item">
        <h2 class="p-signup__ttl">
          基本情報の登録
        </h2>
      </li>
      <li class="p-signup__item p-signup__item--flex">
        <AccountImageUploader
          v-if="!this.isSimple"
          class="p-signup__itemAccount"
          :avatar-url="avatarUrl"
          @upload-img="uploadImg"
        />
        <div class="p-signup__item--personal">
          <InputBox
            class="p-signup__item--personalCnt"
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
            class="p-signup__item--personalCnt"
            icon="far fa-envelope"
            label="メールアドレス"
            :label-content="email"
            @input="email = $event"
            id="email"
            input-type="email"
            placeholder="例：taro-yamada@estie.co.jp"
            :is-required="true"
          />
        </div>
      </li>
      <li class="p-signup__item">
        <InputBox
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
      <li
        v-if="!this.isSimple"
        class="p-signup__item"
      >
        <InputBox
          icon="fas fa-map-marker-alt"
          label="住所"
          id="address"
          :label-content="address"
          @input="address = $event"
          input-type="text"
          placeholder="例：東京都渋谷区1-2-3"
          :is-required="true"
        />
      </li>
      <li
        v-if="!this.isSimple"
        class="p-signup__item p-signup__item--flex"
      >
        <InputBox
          class="p-signup__item--flexCnt"
          icon="fas fa-users"
          label="現入居中オフィスの利用人数"
          id="currentEmployees"
          :label-content="currentEmployees"
          @input="currentEmployees = $event"
          input-type="number"
          placeholder="例：50（人）"
          unit="人"
          :is-required="true"
        />
        <InputBox
          class="p-signup__item--flexCnt"
          icon="fas fa-expand-arrows-alt"
          label="現入居中オフィスの面積（坪）"
          id="currentArea"
          input-type="number"
          :label-content="currentArea"
          @input="currentArea = $event"
          placeholder="例：100（坪）"
          unit="坪"
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
    <ul class="p-signup__list">
      <li class="p-signup__item">
        <h2 class="p-signup__ttl">
          希望条件の登録
        </h2>
      </li>
      <li class="p-signup__item p-signup__item--flex">
        <InputBox
          class="p-signup__item--flexCnt"
          icon="fas fa-yen-sign"
          label="月額賃料予算（万円）"
          id="budget"
          :label-content="budget"
          @input="budget = $event"
          input-type="number"
          placeholder="例：300（万円）"
          unit="万円"
          :is-required="true"
        />
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
      <li class="p-signup__item">
        <p class="p-signup__itemLabel">
          希望エリア：最寄駅と徒歩分数を指定して下さい（複数選択可）
        </p>
        <AreaSelection
          :stations-list="stations"
          @update-area="area = $event"
        />
      </li>
      <li class="p-signup__item">
        <TextAreaBox
          label="その他ご要望"
          @input="others = $event"
          :label-content="others"
          placeholder="ご自由にご記入ください"
        />
      </li>
    </ul>
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
import InputBox from '~/components/elements/common/InputBox';
import SelectBox from '~/components/elements/common/SelectBox';
import TextAreaBox from '~/components/elements/common/TextAreaBox';
import AccountImageUploader from '~/components/elements/common/AccountImageUploader';

import AreaSelection from '~/components/elements/common/areaSelection';

import notification from '~/mixins/notification';

export default {
  components: {
    InputBox,
    SelectBox,
    TextAreaBox,
    AccountImageUploader,
    AreaSelection,
  },
  data() {
    const movingTermOptions = ['今すぐ', '3ヶ月以内', '6ヶ月以内', '1年以内', '物件次第'];
    return {
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
      budget: '',
      employees: '',
      others: '',
      movingTermOptions,
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
    isSimple: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    signup() {
      const {
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
      } = this;
      const values = {
        name,
        email,
        company,
        phoneNumber,
        address,
        password,
        confirmPassword,
        currentEmployees,
        currentArea,
        area,
        movingTerm,
        budget,
        employees,
        others,
      };
      this.$emit('signup', values);
    },
    updateArea(area) {
      this.area = area;
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
