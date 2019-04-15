<template>
  <div class="room">
    <div class="user"><span class="label">欢迎您：</span><span>{{name}}</span></div>
    <div class="desc">
      <span class="all-num desc-item"><span class="label">总人数：</span><span>0</span></span>
      <span class="cur-num desc-item"><span class="label">当前在线：</span><span>0</span></span>
    </div>
    <div class="content">
      <div class="chat-item">
        <div class="item-user"><span class="name">姓名</span><span class="time"></span></div>
        <div class="item-con"></div>
      </div>
    </div>
    <div>
      <textarea placeholder="输入内容"></textarea>
      <span class="send">send</span>
    </div>

  </div>
</template>

<script>

  import {websocket} from '../helper/websocket'

  export default {
    name: 'index',
    data(){
      return {
        name:'test'
      }
    },
    created () {
      //获取user
      let user = this.$store.state.login.user;

      websocket(user,1,function (result) {
        console.log('result');
      })


      console.log('2222',this.$store.state.login.user);

      console.log('11',this.$router);
    }

  }
</script>

<style scoped lang="less">
  .room{
    padding: 1rem;
    font-size: 1.4rem;

    .desc{
      margin: 1rem 0;

      .desc-item{
        display: inline-block;
        margin: 0 1rem;
      }
    }
  }
</style>
