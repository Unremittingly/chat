let user = sessionStorage.getItem('username');

const state = {
  session_id: '',
  user: user || '',
  userImage: '',
  userNum: 0,
  isLogin: false,
  uid: 0
};

const getters = {};

const actions = {};

const mutations = {
  setSession_id (state, value) {
    state.session_id = value;
  },
  setUserId (state, value) {
    state.uid = value;
  },
  setUser (state, value) {
    state.user = value;
    state.isLogin = true;
    // this.setSession_id(state,value);
    sessionStorage.setItem('username', value);
  },
  setUserImage (state, value) {
    state.userImage = value;
  },
  setUserNum (state, value) {
    state.userNum = value;
  },
  setLoginStatus (value) {
    state.isLogin = value;
  },
  loginOut () {
    state.isLogin = false;
    state.user = '';
    state.userNum = 0;
    state.uid = 0;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
