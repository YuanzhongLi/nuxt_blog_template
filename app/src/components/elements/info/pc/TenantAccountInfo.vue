<template>
  <form class="m-accountInfo">
    <h1 class="m-accountInfo__ttl">
      アカウント情報
    </h1>
    <div class="m-accountInfo__wrap">
      <div class="m-accountInfo__thumb">
        <AccountImageUploader
          :avatar-url="avatarUrl"
          @upload-img="uploadImg"
        />
      </div>
      <ul class="m-accountInfo__account">
        <li class="m-accountInfo__accountItem">
          <InputBox
            icon="fas fa-user-circle"
            label="名前"
            id="name"
            input-type="text"
            :label-content="name"
            @input="name = $event"
            placeholder="例：田中 太郎"
            :is-required="true"
          />
        </li>
        <li class="m-accountInfo__accountItem m-accountInfo__accountItem--flex">
          <InputBox
            class="m-accountInfo__accountItem--flexCnt"
            icon="fas fa-building"
            label="会社名"
            id="company"
            input-type="text"
            :label-content="company"
            @input="company = $event"
            placeholder="例：株式会社エスティ商事"
            :is-required="true"
          />
          <InputBox
            class="m-accountInfo__accountItem--flexCnt"
            icon="fas fa-phone-alt"
            label="電話番号"
            id="phoneNumber"
            input-type="text"
            :label-content="phoneNumber"
            @input="phoneNumber = $event"
            placeholder="080-1234-5678"
            :is-required="true"
          />
        </li>
        <li class="m-accountInfo__accountItem m-accountInfo__accountItem--flex">
          <InputBox
            class="m-accountInfo__accountItem--flexCnt"
            icon="fas fa-map-marker-alt"
            label="入居中の住所"
            id="address"
            input-type="text"
            :label-content="address"
            @input="address = $event"
            placeholder="例：東京都渋谷区1-1-1"
            :is-required="true"
          />
        </li>
        <li class="m-accountInfo__accountItem m-accountInfo__accountItem--flex">
          <InputBox
            class="m-accountInfo__accountItem--flexCnt"
            icon="fas fa-users"
            label="現入居中オフィスの利用人数"
            input-type="number"
            id="currentEmployees"
            :label-content="currentEmployees"
            @input="currentEmployees = $event"
            placeholder="例：100人"
            :is-required="true"
            unit="人"
          />
          <InputBox
            class="m-accountInfo__accountItem--flexCnt"
            icon="fas fa-expand-arrows-alt"
            label="現入居中オフィスの面積（坪）"
            input-type="number"
            id="currentArea"
            :label-content="currentArea"
            @input="currentArea = $event"
            placeholder="例：100坪"
            :is-required="true"
            unit="坪"
          />
        </li>
        <li class="m-accountInfo__accountItem">
          <input
            class="m-accountInfo__accountItemSubmit"
            :class="{'is-disabled': isDisable}"
            type="button"
            @click="update"
            value="変更する"
          >
        </li>
      </ul>
      <ul class="m-accountInfo__change">
        <li class="m-accountInfo__changeItem">
          <n-link
            to="/tenant/change-email"
            class="m-accountInfo__changeAnchor"
          >
            <i class="m-accountInfo__changeAnchorIcon far fa-envelope" />メールアドレスの変更
          </n-link>
        </li>
        <li class="m-accountInfo__changeItem">
          <n-link
            to="/tenant/change-password"
            class="m-accountInfo__changeAnchor"
          >
            <i class="m-accountInfo__changeAnchorIcon fas fa-lock" />
            パスワードの変更
          </n-link>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import InputBox from '~/components/elements/common/InputBox';
import AccountImageUploader from '~/components/elements/common/AccountImageUploader';
import { isEmpty } from '~/utils/validation';

export default {
  components: {
    InputBox,
    AccountImageUploader,
  },
  props: {
    uploadImg: {
      type: Function,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    currentTenant: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isDisable() {
      return isEmpty(this.name) || isEmpty(this.company) || isEmpty(this.address) || isEmpty(this.currentEmployees) || isEmpty(this.currentArea);
    },
  },
  data() {
    return {
      name: this.currentTenant.name,
      company: this.currentTenant.company,
      phoneNumber: this.currentTenant.phoneNumber,
      address: this.currentTenant.address,
      currentEmployees: this.currentTenant.currentEmployees,
      currentArea: this.currentTenant.currentArea,
    };
  },
  methods: {
    update() {
      if (isEmpty(this.name) || isEmpty(this.company) || isEmpty(this.phoneNumber) || isEmpty(this.address) || isEmpty(this.currentEmployees) || isEmpty(this.currentArea)) {
        return;
      }
      const values = {
        name: this.name,
        company: this.company,
        phoneNumber: this.phoneNumber,
        address: this.address,
        currentEmployees: this.currentEmployees,
        currentArea: this.currentArea,
      };
      this.$emit('update-account', values);
    },
  },
};
</script>

<style scoped lang="scss">
.m-accountInfo {
  @include m-accountInfo;
}
</style>
