const cookieparser = require('cookieparser');

export const state = () => ({
  userToken: null,
  adminToken: null,
  referer: null,
  lastVisitedPath: '',
});

export const mutations = {
  setUserToken(_state, userToken) {
    _state.userToken = userToken;
  },
  setAdminToken(_state, adminToken) {
    _state.adminToken = adminToken;
  },
  setReferer(_state, referer) {
    _state.referer = referer;
  },
  setLastVisitedPath(_state, path) {
    _state.lastVisitedPath = path;
  },
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      const userAccessToken = parsed.user_access_token;
      const adminAcessToken = parsed.admin_access_token;
      if (userAccessToken) {
        commit('setuserToken', userAccessToken);
      }
      if (adminAcessToken) {
        commit('setAdminToken', adminAcessToken);
      }
    }

    if (req.headers.referer && !state.referer && !req.headers.referer.includes(process.env.HOST_URL)) {
      commit('setReferer', req.headers.referer);
    }
  },
};
