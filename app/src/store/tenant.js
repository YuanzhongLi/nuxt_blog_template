import log from '../utils/log';

export const state = () => ({
  tenantId: null,
  isLoggedIn: false,
  tenant: {},
});

export const mutations = {
  setTenantData(_state, tenantData) {
    Object.assign(_state, tenantData);
  },
};

export const actions = {
  async injectTenantData({ commit }, { app, tenantAccessToken }) {
    const client = app.$axios.withAccessToken(tenantAccessToken);

    const {
      isLoggedIn,
      id,
    } = await client.$get('/auth/status/tenant')
      .catch((err) => {
        log.error(err);
        return {
          isLoggedIn: false,
          tenantId: null,
        };
      });
    const tenant = {};
    if (isLoggedIn) {
      const t = await client.$get('/tenant/tenant_info');
      const tmp = {
        name: t.name,
        company: t.company,
        avatarUrl: t.avatarUrl,
        isConsentTerm: t.isConsentTerm,
      };
      Object.assign(tenant, tmp);
    }
    commit('setTenantData', {
      isLoggedIn,
      tenantId: id,
      tenant,
    });
  },
};
