<template>
  <div class="room">
    <div class="user">
      <span class="label">欢迎您：</span>
      <span>{{name}}</span>
    </div>
    <div class="desc">
      <span class="all-num desc-item"><span class="label">总人数：</span><span>{{this.userNum}}</span></span>
      <span class="cur-num desc-item"><span class="label">当前在线：</span><span>0</span></span>
    </div>
    <div class="content">
      <div class="chat-item">
        <div class="item-user">
          <span class="name">test</span>
          <span class="time">9:14:21</span>
        </div>
        <div class="item-con">你是猴子请来的么？</div>
      </div>
      <div class="chat-item">
        <div class="item-user">
          <span class="name">test</span>
          <span class="time">9:14:21</span>
        </div>
        <div class="item-con">你是猴子请来的么？</div>
      </div>

    </div>
    <div class="chatInput">
      <textarea placeholder="输入内容"></textarea>
      <span v-model="text" class="send" @click="sendMessage">send</span>
    </div>

  </div>
</template>

<script>

  import {websocket} from '../helper/websocket'

  export default {
    name: 'index',
    data () {
      return {
        name: this.$store.state.login.user,
        text: '',
        userNum:this.$store.state.login.userNum
      }
    },
    methods: {
      sendMessage () {
        console.log('1', this.text)
      }
    },
    beforeCreate(){
      if(!this.$store.state.login.isLogin){
        this.$router.push({
          path: '/',
        })
      }
    },
    created () {
      //获取user
      let user = this.$store.state.login.user;
      let userNum = this.$store.state.login.userNum;

      websocket(user, 1, function (result) {
        console.log('result', result)
      })

      console.log('2222', this.$store.state.login.user)

      console.log('11', this.$router)
    }

  }
</script>

<style scoped lang="less">
  .room {
    height: 100vh;
    padding: 1rem;
    font-size: 1.4rem;
    box-sizing: border-box;

    .desc {
      margin: 1rem 0;

      .desc-item {
        display: inline-block;
        margin: 0 1rem;
      }


    }

    .content {
      height: 70vh;
      padding: 1rem;
      overflow-y: auto;
      font-size: 1.2rem;
      text-align: left;
      border: 1px solid #eee;


      .chat-item {
        margin-bottom: 1.5rem;
      }

      .item-user {
        margin: 0.5rem 0;
        color: green;

        .name {
          margin-right: 0.5rem;
        }
      }

      .item-con {

      }

    }

    .chatInput {
      display: flex;
      justify-content: space-between;
      height: 10vh;
      margin-top: 1rem;


      textarea {
        width: 70vw;
        height: 3rem;
        padding: 0.5rem 1rem;
        border: 1px solid #eee;
        box-sizing: border-box;
        cursor: pointer;

      }

      .send {
        display: inline-block;
        width: 30vw;
        height: 3rem;
        line-height: 3rem;
      }
    }
  }
</style>
