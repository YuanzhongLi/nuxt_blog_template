import log from '../utils/log';

export const state = () => ({
  resultBuildings: [],
  count: 0,
  conditions: {
    prefectures: [],
    wards: [],
    cities: [],
    stations: [],
    rent: [0, 60000],
    area: [0, 500],
    timeRequired: null,
    completedOn: null,
    contractStart: null,
    page: 1,
    buildingPerPage: 10,
    order: '4',
  },
  flags: {
    rent: true,
    area: true,
  },
});

export const mutations = {
  /*
  input {
    id
    target
  }
  */
  addLocation(_state, payload) {
    switch (payload.target) {
      case 'prefecture':
        if (!_state.conditions.prefectures.map(n => n.id).includes(payload.value.id)) {
          _state.conditions.prefectures.push(payload.value);
        }
        break;
      case 'ward':
        if (!_state.conditions.wards.map(n => n.id).includes(payload.value.id)) {
          _state.conditions.wards.push(payload.value);
        }
        break;
      case 'city':
        if (!_state.conditions.cities.map(n => n.id).includes(payload.value.id)) {
          _state.conditions.cities.push(payload.value);
        }
        break;
      default:
        _state.conditions.stations.push(payload.value);
        break;
    }
  },
  /*
  input {
    id
    target
  }
  */
  removeLocation(_state, payload) {
    switch (payload.target) {
      case 'prefecture':
        _state.conditions.prefectures = _state.conditions.prefectures.filter(n => n.id !== payload.id);
        break;
      case 'ward':
        _state.conditions.wards = _state.conditions.wards.filter(n => n.id !== payload.id);
        break;
      case 'city':
        _state.conditions.cities = _state.conditions.cities.filter(n => n.id !== payload.id);
        break;
      default:
        _state.conditions.stations = _state.conditions.stations.filter(n => n.id !== payload.id);
        break;
    }
  },
  /*
  input {
    id
    target
    type
  }
  */
  setValue(_state, payload) {
    switch (payload.target) {
      case 'rent':
        _state.conditions.rent = payload.value;
        break;
      case 'area':
        _state.conditions.area = payload.value;
        break;
      default:
        break;
    }
  },
  /*
  input {
    id
    target
    type
  }
  */
  setFlag(_state, payload) {
    switch (payload.target) {
      case 'rent':
        _state.flags.rent = payload.value;
        break;
      case 'area':
        _state.flags.area = payload.value;
        break;
      default:
        break;
    }
  },
  setTimeRequired(_state, payload) {
    _state.conditions.timeRequired = payload;
  },
  setCompletedOn(_state, payload) {
    _state.conditions.completedOn = payload;
  },
  setContractStart(_state, payload) {
    _state.conditions.contractStart = payload;
  },
  setResultBuildings(_state, payload) {
    _state.resultBuildings = payload;
  },
  setPage(_state, payload) {
    _state.conditions.page = payload;
  },
  setOrder(_state, payload) {
    _state.conditions.order = payload;
  },
  setCount(_state, payload) {
    _state.count = payload;
  },
  setState(_state, payload) {
    _state.conditions = payload;
  },
};

export const actions = {
  async search({ commit, state: _state }) {
    const condition = Object.assign({}, _state.conditions);
    condition.completedOn = condition.completedOn ? new Date().getFullYear() - Number(condition.completedOn.replace(/[^0-9]/g, '')) : null;
    condition.timeRequired = condition.timeRequired ? Number(condition.timeRequired.replace(/[^0-9]/g, '')) : null;
    condition.order = Number(condition.order);
    condition.contractStart = (() => {
      switch (condition.contractStart) {
        case ('即入居可'):
          return new Date().getTime();
        case ('3ヶ月以内'):
          return new Date().getTime() + 3 * 30 * 24 * 60 * 60 * 1000;
        default:
          return null;
      }
    })();
    if (!_state.flags.rent) {
      delete condition.rent;
    }
    if (!_state.flags.area) {
      delete condition.area;
    }
    condition.prefectureIds = condition.prefectures.map(n => n.id);
    delete condition.prefectures;
    condition.wardIds = condition.wards.map(n => n.id);
    delete condition.wards;
    condition.cityIds = condition.cities.map(n => n.id);
    delete condition.cities;
    condition.stationIds = condition.stations.map(n => n.id);
    delete condition.stations;
    try {
      const res = await this.$axios.post('/buildings/search', {
        ...condition,
      });
      commit('setResultBuildings', res.data.buildings);
      commit('setCount', res.data.count);
    } catch (err) {
      log.error(err);
    }
  },
  setStorage({ state: _state }) {
    localStorage.setItem('initialState', JSON.stringify(_state.conditions));
  },
  loadStorage({ commit }) {
    commit('setState', JSON.parse(localStorage.getItem('initialState')));
  },
};
