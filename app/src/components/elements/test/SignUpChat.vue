<template>
  <div class="chatForm">
    <ul
      class="chatForm__list"
      id="chat-form-list"
    >
      <li class="chatForm__item chatForm__item--bot">
        <LpChatBot>
          お名前を教えてください
        </LpChatBot>
      </li>
      <li
        v-if="this.name !== ''"
        class="chatForm__item chatForm__item--tenant"
      >
        <LpChatTenant
          @edit="edit(name,'name')"
        >
          {{ name }}
        </LpChatTenant>
      </li>
      <!-- mail -->
      <li
        v-if="this.name !== ''"
        class="chatForm__item chatForm__item--bot"
      >
        <LpChatBot
          @created="changeInputtingItem('email')"
        >
          メールアドレスを教えてください
        </LpChatBot>
      </li>
      <li
        v-if="this.email !== ''"
        class="chatForm__item chatForm__item--tenant"
      >
        <LpChatTenant @edit="edit(email,'email')">
          {{ email }}
        </LpChatTenant>
      </li>
      <!-- phoneNumber -->
      <li
        v-if="this.email !== ''"
        class="chatForm__item chatForm__item--bot"
      >
        <LpChatBot
          @created="changeInputtingItem('phoneNumber')"
        >
          電話番号を教えてください
        </LpChatBot>
      </li>
      <li
        v-if="this.phoneNumber !== ''"
        class="chatForm__item chatForm__item--tenant"
      >
        <LpChatTenant @edit="edit(phoneNumber,'phoneNumber')">
          {{ phoneNumber }}
        </LpChatTenant>
      </li>
      <!-- company -->
      <li
        v-if="this.phoneNumber !== ''"
        class="chatForm__item chatForm__item--bot"
      >
        <LpChatBot
          @created="changeInputtingItem('company')"
        >
          御社の会社名を教えてください
        </LpChatBot>
      </li>
      <li
        v-if="this.company !== ''"
        class="chatForm__item chatForm__item--tenant"
      >
        <LpChatTenant @edit="edit(company,'company')">
          {{ company }}
        </LpChatTenant>
      </li>
      <!-- password -->
      <li
        v-if="this.company !== ''"
        class="chatForm__item chatForm__item--bot"
      >
        <LpChatBot
          @created="changeInputtingItem('password')"
        >
          パスワードを作成してください。
          パスワードは半角英字と半角数字それぞれ1文字以上含む8文字以上の文字列である必要があります。
        </LpChatBot>
      </li>
      <li
        v-if="this.password !== ''"
        class="chatForm__item chatForm__item--bot"
      >
        <LpChatBot
          @created="changeInputtingItem('confirmPassword')"
        >
          確認のため、パスワードを再度入力してください
        </LpChatBot>
      </li>
      <li
        v-if="this.confirmPassword !== ''"
        class="chatForm__item chatForm__item--bot"
      >
        <LpChatBot>
          パスワードが正常に作成されました
        </LpChatBot>
      </li>
      <!-- budget -->
      <li
        v-if="this.confirmPassword !== ''"
        class="chatForm__item chatForm__item--bot"
      >
        <LpChatBot
          @created="changeInputtingItem('budget')"
        >
          月額賃料予算を教えてください(単位：万円)
        </LpChatBot>
      </li>
      <li
        v-if="this.budget !== ''"
        class="chatForm__item chatForm__item--tenant"
      >
        <LpChatTenant @edit="edit(budget,'budget')">
          {{ budget }}万円
        </LpChatTenant>
      </li>
      <!-- employees -->
      <li
        v-if="this.budget !== ''"
        class="chatForm__item chatForm__item--bot"
      >
        <LpChatBot
          @created="changeInputtingItem('employees')"
        >
          オフィスを利用する社員数を教えてください(単位：人)
        </LpChatBot>
      </li>
      <li
        v-if="this.employees !== ''"
        class="chatForm__item chatForm__item--tenant"
      >
        <LpChatTenant @edit="edit(employees,'employees')">
          {{ employees }}人
        </LpChatTenant>
      </li>
      <!-- movingTerm -->
      <li
        v-if="this.employees !== ''"
        class="chatForm__item chatForm__item--bot"
      >
        <LpChatBot
          @created="changeInputtingItem('movingTerm')"
        >
          希望入居時期を教えてください
        </LpChatBot>
      </li>
      <li
        v-if="this.movingTerm !== ''"
        class="chatForm__item chatForm__item--tenant"
      >
        <LpChatTenant @edit="edit(movingTerm,'movingTerm')">
          {{ movingTerm }}
        </LpChatTenant>
      </li>
      <!-- area -->
      <li
        v-if="this.movingTerm !== ''"
        class="chatForm__item chatForm__item--bot"
      >
        <LpChatBot
          @created="changeInputtingItem('area')"
        >
          希望エリアを教えてください
        </LpChatBot>
      </li>
      <li
        v-if="this.area.length !== 0"
        class="chatForm__item chatForm__item--tenant"
      >
        <LpChatTenant
          @edit="edit(area,'area')"
        >
          <span
            v-for="(c) in area"
            :key="c.stationId"
          >「{{ concatAndAddWords(c.stationName, c.timeRequired) }}」 </span>
        </LpChatTenant>
      </li>
      <li
        v-if="this.area.length !== 0"
        class="chatForm__item chatForm__item--bot"
      >
        <LpChatBot @created="changeInputtingItem('finish')">
          入力ありがとうございました。内容に問題なければ、新規登録ボタンを押してください
        </LpChatBot>
      </li>
    </ul>
    <div
      class="chatForm__input"
      v-if="(this.inputtingItem!=='movingTerm' && this.inputtingItem!=='area' && this.inputtingItem!=='finish')"
    >
      <input
        class="chatForm__inputBox"
        :type="this.inputtingItem === 'password' || this.inputtingItem === 'confirmPassword' ? 'password' : 'text'"
        placeholder="こちらに回答を入力してください"
        v-model="inputtingValue"
      >
      <!-- avoid the page reloading when the enter button is pressed -->
      <input
        type="text"
        style="display: none;"
      >
      <div
        class="chatForm__inputBtn"
        @click="sendItemToChatbot"
      >
        <i class="chatForm__inputBtnIcon fas fa-paper-plane" />送信
      </div>
    </div>
    <ul
      class="chatForm__suggest"
      v-if="(this.inputtingItem==='movingTerm' )"
    >
      <li
        class="chatForm__suggestItem"
        @click="choiceMovingTerm('今すぐ')"
      >
        今すぐ
      </li>
      <li
        class="chatForm__suggestItem"
        @click="choiceMovingTerm('3ヶ月以内')"
      >
        3ヶ月以内
      </li>
      <li
        class="chatForm__suggestItem"
        @click="choiceMovingTerm('6ヶ月以内')"
      >
        6ヶ月以内
      </li>
      <li
        class="chatForm__suggestItem"
        @click="choiceMovingTerm('1年以内')"
      >
        1年以内
      </li>
      <li
        class="chatForm__suggestItem"
        @click="choiceMovingTerm('物件次第')"
      >
        物件次第
      </li>
    </ul>
    <div v-if="(this.inputtingItem==='area' )">
      <AreaSelectionForChat
        :class-name="className"
        :stations-list="stations"
        @update-area="updateArea"
      />
      <div
        class="chatForm__inputBtn chatForm__inputBtn--area"
        @click="sendItemToChatbot"
      >
        <i class="chatForm__inputBtnIcon fas fa-paper-plane" />送信
      </div>
    </div>
    <div
      v-if="(this.inputtingItem==='finish')"
      class="chatForm__inputBtn chatForm__inputBtn--finish"
      @click="signup"
    >
      新規登録
    </div>
  </div>
</template>

<script>
import LpChatBot from '~/components/elements/test/ChatBot';
import LpChatTenant from '~/components/elements/test/ChatTenant';
import AreaSelectionForChat from '~/components/elements/common/tenant/areaSelection/AreaSelectionForChat';
import notification from '~/mixins/notification';
import {
  isValidEmail,
  isValidPhoneNumber,
  isValidPassword,
  isValidPositiveNumber,
  isEmpty,
} from '~/utils/validation';
import stationFilter from '~/mixins/stationFilter';

export default {
  components: {
    LpChatBot,
    LpChatTenant,
    AreaSelectionForChat,
  },
  mixins: [notification, stationFilter],
  props: {
    stations: {
      type: Array,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  data() {
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
      inputtingValue: '', // inputで編集中のデータ本体
      inputtingItem: 'name', // inputで編集中の項目
      requiredItemInChat: '', // 入力済み項目の編集後、チャットを続けるために編集する項目
    };
  },
  methods: {
    edit(value, item) {
      this.inputtingValue = value;
      this.inputtingItem = item;
    },
    sendItemToChatbot() {
      if (isEmpty(this.inputtingValue)) {
        if (this.inputtingItem === 'area') {
          this.setNotificationMessage('error', '項目が空です。エリア条件を選択後、＋ボタンを押してください');
        }
        this.setNotificationMessage('error', '項目が空です。入力してください');
      }
      switch (this.inputtingItem) {
        case 'name':
          this.name = this.inputtingValue;
          this.inputtingValue = '';
          this.inputtingItem = this.requiredItemInChat;
          break;
        case 'email':
          if (!isValidEmail(this.inputtingValue)) {
            this.setNotificationMessage('error', '無効なアドレスです');
            return;
          }
          this.email = this.inputtingValue;
          this.inputtingValue = '';
          this.inputtingItem = this.requiredItemInChat;
          break;
        case 'phoneNumber':
          if (!isValidPhoneNumber(this.inputtingValue)) {
            this.setNotificationMessage('error', '電話番号は10・11桁で、半角数字と半角ハイフンのみ入力可です。');
            return;
          }
          this.phoneNumber = this.inputtingValue;
          this.inputtingValue = '';
          this.inputtingItem = this.requiredItemInChat;
          break;
        case 'company':
          this.company = this.inputtingValue;
          this.inputtingValue = '';
          this.inputtingItem = this.requiredItemInChat;
          break;
        case 'password':
          if (!isValidPassword(this.inputtingValue)) {
            this.setNotificationMessage('error', 'パスワードは半角英字と半角数字それぞれ1文字以上含む8文字以上の文字列である必要があります');
            return;
          }
          this.password = this.inputtingValue;
          this.inputtingValue = '';
          break;
        case 'confirmPassword':
          if (this.password !== this.inputtingValue) {
            this.setNotificationMessage('error', '確認用のパスワードと異なります。もう一度最初から作成してください');
            this.inputtingValue = this.password;
            this.inputtingItem = 'password';
            this.requiredItemInChat = 'password';
            this.password = '';
            this.confirmPassword = '';
            return;
          }
          this.confirmPassword = this.inputtingValue;
          this.inputtingValue = '';
          this.inputtingItem = this.requiredItemInChat;
          break;
        case 'budget':
          if (!isValidPositiveNumber(this.inputtingValue)) {
            this.setNotificationMessage('error', '予算は正の数で入力してください');
            return;
          }
          if (this.inputtingValue >= 10000 || this.inputtingValue <= 0) {
            this.setNotificationMessage('error', '予算は「万円」単位で入力してください');
            return;
          }
          this.budget = this.inputtingValue;
          this.inputtingValue = '';
          this.inputtingItem = this.requiredItemInChat;
          break;
        case 'employees':
          if (!isValidPositiveNumber(this.inputtingValue)) {
            this.setNotificationMessage('error', '社員数は半角数字で入力してください');
            return;
          }
          this.employees = this.inputtingValue;
          this.inputtingValue = '';
          this.inputtingItem = this.requiredItemInChat;
          break;
        case 'area':
          this.area = this.inputtingValue;
          this.inputtingValue = '';
          this.inputtingItem = this.requiredItemInChat;
          break;
        default:
          return;
      }
      this.scrollToEnd();
    },
    changeInputtingItem(item) {
      this.requiredItemInChat = item;
      this.inputtingItem = item;
    },
    scrollToEnd() {
      this.$nextTick(() => {
        const chatLog = document.getElementById('chat-form-list');
        if (!chatLog) return;
        chatLog.scrollTop = chatLog.scrollHeight;
      });
    },
    choiceMovingTerm(item) {
      this.inputtingItem = 'movingTerm';
      this.movingTerm = item;
      this.inputtingValue = '';
      this.inputtingItem = 'area';
      this.scrollToEnd();
    },
    updateArea(obj) {
      this.inputtingValue = obj;
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

.chatForm {
  @include chatForm;
}
</style>
