<template>
  <div>
    <TenantSPInfo
      v-if="device.isMobile"
      :upload-img="uploadImg"
      :avatar-url="avatarUrl"
      :current-tenant="currentTenant"
      :update-account="updateAccount"
    />
    <TenantPCInfo
      v-else
      :upload-img="uploadImg"
      :avatar-url="avatarUrl"
      :current-tenant="currentTenant"
      :update-account="updateAccount"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import notification from '~/mixins/notification';
import { isValidPhoneNumber } from '~/utils/validation';
import TenantPCInfo from '~/components/templates/tenant_pc/info';
import TenantSPInfo from '~/components/templates/tenant_sp/info';
import log from '~/utils/log';

export default {
  layout: ctx => (ctx.isMobile ? 'tenant_sp' : 'tenant_pc'),
  components: {
    TenantPCInfo,
    TenantSPInfo,
  },
  middleware: ['injectDevice', 'injectTenant', 'tenantAuthenticated'],
  mixins: [notification],
  async asyncData({ app, store }) {
    const client = app.$axios.withAccessToken(store.state.agentToken);
    const currentTenant = await client.$get('/tenant/tenant_info');
    return { currentTenant };
  },
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  computed: {
    ...mapState(['device']),
  },
  data() {
    return {
      avatarUrl: this.$store.state.tenant.tenant.avatarUrl,
    };
  },
  methods: {
    timestamp() {
      return JSON.stringify(Date.now());
    },
    async uploadImg(file) {
      this.resetNotificationMessage();
      if (file.size > 1000 * 1024) {
        this.setNotificationMessage('error', '画像は1MB以下をアップロードしてください');
        return;
      }
      const fileType = file.name.split('.').slice(-1)[0];
      const { tenantId } = this.$store.state.tenant;

      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);

      const fileName = `tenantid_${tenantId}_avatar_${this.timestamp()}_.${fileType}`;
      const formData = new FormData();
      formData.append('fileName', fileName);
      formData.append('image', file);

      this.openLoadingModal();
      const { imgUrl, error } = await client.$post('/tenant/upload_img_to_s3', formData)
        .catch((err) => {
          log.error(err);
          return { error: 'アップロードに失敗しました' };
        });

      this.closeLoadingModal();
      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }

      if (!imgUrl) {
        return;
      }
      this.avatarUrl = imgUrl;
    },
    async updateAccount(values) {
      const {
        name,
        company,
        address,
        currentEmployees,
        currentArea,
      } = values;
      let { phoneNumber } = values;
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const { avatarUrl } = this;
      const { tenantId } = this.$store.state.tenant;

      if (name === this.currentTenant.name
      && company === this.currentTenant.company
      && phoneNumber === this.currentTenant.phoneNumber
      && avatarUrl === this.currentTenant.avatarUrl
      && address === this.currentTenant.address
      && currentEmployees === this.currentTenant.currentEmployees
      && currentArea === this.currentTenant.currentArea
      ) {
        this.setNotificationMessage('error', '変更されていません');
        return;
      }
      if (!isValidPhoneNumber(values.phoneNumber)) {
        this.setNotificationMessage('error', '電話番号は10・11桁で、半角数字と半角ハイフンのみ入力可です。');
        return;
      }
      // チェックしたOKだった場合改めてvaluesにハイフンなしを入れる。
      phoneNumber = values.phoneNumber.replace(/-/g, '');
      this.openLoadingModal();

      const { error } = await client.$post('/tenant/update_info', {
        name,
        company,
        avatarUrl,
        address,
        phoneNumber,
        currentEmployees,
        currentArea,
      }).catch((err) => {
        log.error(err);
        return { error: '変更に失敗しました' };
      });

      this.closeLoadingModal();

      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }
      this.$store.commit('tenant/setTenantData', {
        tenantId,
        isLoggedIn: true,
        tenant: { name, company, avatarUrl },
      });

      this.setNotificationMessage('success', 'アカウントの変更に成功しました');
    },
  },
};
</script>
