const state = {
  session_id: "",
  user: "",
  userImage:""
}

const getters = {}

const actions = {}

const mutations = {
  setSession_id(state, value) {
    state.session_id = value;
  },
  setUser(state, value) {
    state.user = value;
  },
  setUserImage(state, value) {
    state.userImage = value;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
