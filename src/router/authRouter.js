import Room from '@/chatRoom/index';
import store from '@/store/index';
export const authRouter =  (page) => {
  let user = sessionStorage.getItem('username');
  if(user){
    // this.$store.commit('login/setLoginStatus', true);
    //持久化处理
    store.commit('login/setLoginStatus', true);
    // store.setLoginStatus(true);
    return Room;
  }else{
    return page;
  }
};
