<template>
  <div v-if="formNum === 0">
    <ul class="top__formList">
      <li class="top__formItem top__formItem--account">
        <AccountImageUploader
          v-if="!this.isSimple"
          class="top__formAccountImage"
          :avatar-url="avatarUrl"
          @upload-img="uploadImg"
        />
        <div class="top__formItem--personal">
          <InputBox
            class="top__formItem--personalCnt"
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
            class="top__formItem--personalCnt"
            icon="far fa-envelope"
            label="メールアドレス"
            id="email"
            :label-content="email"
            @input="email = $event"
            input-type="email"
            placeholder="例：taro-yamada@estie.co.jp"
            :is-required="true"
          />
        </div>
      </li>
      <li class="top__formItem">
        <InputBox
          class="top__formInput"
          icon="fas fa-phone-alt"
          label="電話番号"
          id="phone_number"
          :label-content="phoneNumber"
          @input="phoneNumber = $event"
          input-type="text"
          placeholder="例：080-1234-5678"
          :is-required="true"
        />
      </li>
      <li
        class="top__formItem"
        :class="(!this.isSimple) ? 'top__formItem--flex': ''"
      >
        <InputBox
          :class="(!this.isSimple) ? 'top__formInput': ''"
          icon="fas fa-building"
          label="会社名"
          id="company"
          :label-content="company"
          @input="company = $event"
          input-type="text"
          placeholder="例：株式会社エスティ商事"
          :is-required="true"
        />
        <InputBox
          v-if="!this.isSimple"
          class="top__formInput"
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
        class="top__formItem top__formItem--flex"
      >
        <InputBox
          class="top__formInput"
          icon="fas fa-users"
          label="現入居中オフィスの利用人数"
          id="employee_num"
          :label-content="currentEmployees"
          @input="currentEmployees = $event"
          input-type="number"
          placeholder="例：50（人）"
          unit="人"
          :is-required="true"
        />
        <InputBox
          class="top__formInput"
          icon="fas fa-expand-arrows-alt"
          label="現入居中オフィスの面積（坪）"
          id="number"
          input-type="number"
          :label-content="currentArea"
          @input="currentArea = $event"
          placeholder="例：100（坪）"
          unit="坪"
          :is-required="true"
        />
      </li>
      <li class="top__formItem top__formItem--flex">
        <InputBox
          class="top__formInput"
          icon="fas fa-lock"
          label="パスワード"
          id="password"
          :label-content="password"
          @input="password = $event"
          input-type="password"
          placeholder="半角英数字8文字以上"
          :is-required="true"
        />
        <InputBox
          class="top__formInput"
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
    <div class="top__formFooter">
      <a
        class="top__formFooterBtn top__formFooterBtn--primary"
        @click="plusNum"
      >
        希望条件<i class="top__formFooterBtnNextIcon fas fa-chevron-circle-right" />
      </a>
    </div>
  </div>
  <div v-else-if="formNum === 1">
    <ul class="top__formList">
      <li class="top__formItem top__formItem--flex">
        <InputBox
          class="top__formInput"
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
          class="top__formInput"
          icon="fas fa-users"
          label="オフィス利用人数（見込）"
          id="employees"
          :label-content="employees"
          @input="employees = $event"
          input-type="number"
          placeholder="例：100（人）"
          unit="人"
          :is-required="true"
        />
      </li>
      <li class="top__formItem">
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
      <li class="top__formItem">
        <p class="top__formItemTxt">
          ▼ 希望エリア：最寄駅と徒歩分数を指定して下さい（複数選択可）
        </p>
        <AreaSelection
          :init-area="area"
          :stations-list="stations"
          @update-area="area = $event"
        />
      </li>
    </ul>
    <div class="top__formFooter top__formFooter--multi">
      <a
        class="top__formFooterBtn top__formFooterBtn--secondary"
        @click="minusNum"
      >
        <i class="top__formFooterBtnPrevIcon fas fa-chevron-circle-left" />戻る
      </a>
      <a
        class="top__formFooterBtn top__formFooterBtn--primary"
        @click="plusNum"
      >
        要望<i class="top__formFooterBtnNextIcon fas fa-chevron-circle-right" />
      </a>
    </div>
  </div>
  <div v-else>
    <ul class="top__formList">
      <li class="top__formItem">
        <TextAreaBox
          label="その他ご要望"
          :label-content="others"
          @input="others = $event"
          placeholder="ご自由にご記入ください"
        />
      </li>
    </ul>
    <div class="top__formFooter top__formFooter--multi">
      <a
        class="top__formFooterBtn top__formFooterBtn--secondary"
        @click="minusNum"
      >
        <i class="top__formFooterBtnPrevIcon fas fa-chevron-circle-left" />戻る
      </a>
      <a
        class="top__formFooterBtn top__formFooterBtn--primary"
        @click.prevent="signup"
      >
        新規登録する
      </a>
    </div>
  </div>
</template>

<script>
import InputBox from '~/components/elements/common/InputBox';
import TextAreaBox from '~/components/elements/common/TextAreaBox';
import SelectBox from '~/components/elements/common/SelectBox';
import AreaSelection from '~/components/elements/common/areaSelection';
import notification from '~/mixins/notification';
import AccountImageUploader from '~/components/elements/common/AccountImageUploader';

/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

export default {
  components: {
    InputBox,
    TextAreaBox,
    SelectBox,
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
      formNum: 0,
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
    plusNum(e) {
      e.preventDefault();
      if (this.formNum === 1 && !this.area.length) {
        this.setNotificationMessage('error', '希望エリアは必須です（追加ボタンを押してください）');
        return;
      }
      this.formNum += 1;
    },
    minusNum(e) {
      e.preventDefault();
      this.formNum -= 1;
    },
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
  },
};
</script>

<style scoped lang="scss">
.top {
  @include top;
}
</style>
