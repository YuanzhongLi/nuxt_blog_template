import log from '../utils/log';

export const state = () => ({
  adminId: null,
  isLoggedIn: false,
});

export const mutations = {
  setAdminData(_state, adminData) {
    Object.assign(_state, adminData);
  },
};

export const actions = {
  async injectAdminData({ commit }, { app, agentAdminToken }) {
    const client = app.$axios.withAccessToken(agentAdminToken);

    const {
      isLoggedIn,
      id,
    } = await client.$get('/auth/status/admin')
      .catch((err) => {
        log.error(err);
        return {
          isLoggedIn: false,
          id: null,
        };
      });

    commit('setAdminData', {
      isLoggedIn,
      adminId: id,
    });
  },
};
