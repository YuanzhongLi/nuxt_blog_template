import log from '../utils/log';

export const state = () => ({
  userId: null,
  isLoggedIn: false,
  user: {},
});

export const mutations = {
  setUserData(_state, userData) {
    Object.assign(_state, userData);
  },
};

export const actions = {
  async injectUserData({ commit }, { app, userAccessToken }) {
    const client = app.$axios.withAccessToken(userAccessToken);

    const {
      isLoggedIn,
      id,
    } = await client.$get('/auth/status/user')
      .catch((err) => {
        log.error(err);
        return {
          isLoggedIn: false,
          id: null,
        };
      });

    let user = {};
    if (isLoggedIn) {
      user = await client.$get('/user/info');
    }

    commit('setUserData', {
      isLoggedIn,
      userId: id,
      user,
    });
  },
};
