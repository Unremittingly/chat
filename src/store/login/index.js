const state = {
  session_id: '',
  user: '',
  userImage: '',
  userNum: 0,
  isLogin: false,
  uid:0
};

const getters = {};

const actions = {};

const mutations = {
  setSession_id (state, value) {
    state.session_id = value;
  },
  setUserId(state,value){
    state.uid = value
  },
  setUser (state, value) {
    state.user = value;
  },
  setUserImage (state, value) {
    state.userImage = value;
  },
  setUserNum (state, value) {
    state.userNum = value;
  },
  setLoginStatus (state, value) {
    state.isLogin = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
