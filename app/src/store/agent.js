import log from '../utils/log';

export const state = () => ({
  agentId: null,
  isLoggedIn: false,
  agent: {},
});

export const mutations = {
  setAgentData(_state, agentData) {
    Object.assign(_state, agentData);
  },
};

export const actions = {
  async injectAgentData({ commit }, { app, agentAccessToken }) {
    const client = app.$axios.withAccessToken(agentAccessToken);

    const {
      isLoggedIn,
      id,
    } = await client.$get('/auth/status/agent')
      .catch((err) => {
        log.error(err);
        return {
          isLoggedIn: false,
          id: null,
        };
      });

    let agent = {};
    if (isLoggedIn) {
      agent = await client.$get('/agent/agent_info');
    }

    commit('setAgentData', {
      isLoggedIn,
      agentId: id,
      agent,
    });
  },
};
