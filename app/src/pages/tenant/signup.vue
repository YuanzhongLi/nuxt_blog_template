<template>
  <div>
    <TenantSignUpSP
      v-if="device.isMobile"
      :stations="stations"
      :upload-img="uploadImg"
      :avatar-url="avatarUrl"
      @signup="signup"
      @signupEmail="signupEmail"
      @signupEmailConfirm="signupEmailConfirm"
    />
    <TenantSignUpPC
      v-else
      :stations="stations"
      :upload-img="uploadImg"
      :avatar-url="avatarUrl"
      @signup="signup"
      @signupEmail="signupEmail"
      @signupEmailConfirm="signupEmailConfirm"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import log from '~/utils/log';
import siteinfo from '~/mixins';
import notification from '~/mixins/notification';
import tenantSignup from '~/mixins/tenantSignup';
import tenantEmailSignup from '~/mixins/tenantEmailSignup';
import tenantEmailSignupConfirm from '~/mixins/tenantEmailSignupConfirm';
import TenantSignUpPC from '~/components/templates/tenant_pc/signup';
import TenantSignUpSP from '~/components/templates/tenant_sp/signup';

export default {
  layout: 'default',
  components: {
    TenantSignUpPC,
    TenantSignUpSP,
  },
  middleware: 'injectDevice',
  mixins: [siteinfo, notification, tenantSignup, tenantEmailSignup, tenantEmailSignupConfirm],
  computed: {
    ...mapState(['device']),
  },
  async asyncData({ app, store }) {
    const stationsList = await app.$axios.$get('stations');
    return {
      stations: stationsList.stations,
    };
  },
  data() {
    return {
      avatarUrl: '',
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

      const fileName = `tenant_${this.timestamp()}_.${fileType}`;
      const formData = new FormData();
      formData.append('fileName', fileName);
      formData.append('image', file);

      this.openLoadingModal();
      const { imgUrl, error } = await this.$axios.$post('/auth/upload_img_to_s3/tenant', formData)
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
  },
  head() {
    return {
      title: this.getHeadTitle('新規登録 / テナント'),
      meta: [{ name: 'robots', content: 'noindex' }],
    };
  },
};
</script>
