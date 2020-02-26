const cookieparser = require('cookieparser');

export const state = () => ({
  agentToken: null,
  adminToken: null,
  tenantToken: null,
  referer: null,
  lastVisitedPath: '',
});

export const mutations = {
  setAgentToken(_state, agentToken) {
    _state.agentToken = agentToken;
  },
  setTenantToken(_state, tenantToken) {
    _state.tenantToken = tenantToken;
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
      const agentAccessToken = parsed.agent_access_token;
      const tenantAcessToken = parsed.tenant_access_token;
      const adminAcessToken = parsed.admin_access_token;
      if (agentAccessToken) {
        commit('setAgentToken', agentAccessToken);
      }
      if (tenantAcessToken) {
        commit('setTenantToken', tenantAcessToken);
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
