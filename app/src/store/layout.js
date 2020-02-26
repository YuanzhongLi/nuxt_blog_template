
export const state = () => ({
  isSideNavOpen: false,
  showLoadingModal: false,
  errorMessage: '',
  successMessage: '',
});

export const mutations = {
  setSideNavOpen(_state, context) {
    _state.isSideNavOpen = context.isSideNavOpen;
  },
  setLoading(_state, context) {
    _state.showLoadingModal = context.showLoadingModal;
  },
  setNotificationMessage(_state, context) {
    _state.errorMessage = context.errorMessage;
    _state.successMessage = context.successMessage;
  },
};
