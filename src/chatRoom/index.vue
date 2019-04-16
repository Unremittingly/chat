<template>
  <div class="room">
    <div class="user">
      <span class="label">欢迎您：</span>
      <span>{{name}}</span>
    </div>
    <div class="desc">
      <span class="all-num desc-item"><span class="label">总人数：</span><span>{{this.userNum}}</span></span>
      <span class="cur-num desc-item"><span class="label">当前在线：</span><span>{{this.curNum}}</span></span>
    </div>
    <div class="content">
      <div v-for="item in data" :key='item'  class="chat-item">
        <div class="item-user " :class="{self:item.isSelf}">
          <span class="name">{{item.name}}</span>
          <span class="time">{{item.time}}</span>
        </div>
        <div class="item-con">{{item.text}}</div>
      </div>

    </div>
    <div class="chatInput">
      <textarea v-model="text" placeholder="输入内容"></textarea>
      <span class="send" @click="sendMessage">send</span>
    </div>

  </div>
</template>

<script>

import {websocket} from '../helper/websocket';
import {timeFormat} from '../helper/func';

export default {
  name: 'index',

  data () {
    return {
      name: this.$store.state.login.user,
      text: '',
      userNum: this.$store.state.login.userNum,
      curNum: 0,
      socket: null,
      data: [
        {
          isSelf: true,
          name: 'test',
          text: '你是猴子请来的逗比么 ',
          time: '9:14:21'
        },
        {
          isSelf: false,
          name: 'test',
          text: '你是猴子请来的逗比么 ',
          time: '9:14:21'
        }
      ]
    };
  },
  methods: {
    sendMessage () {
      this.socket.ws.send(JSON.stringify(
        {
          name: this.name,
          msg: this.text
        }
      ));
    }
  },
  beforeCreate () {
    if (!this.$store.state.login.isLogin) {
      this.$router.push({
        path: '/'
      });
    }
  },
  created () {
    // debugger
    // if(!this.$store.state.login.isLogin){
    //   return false;
    // }
    // 获取user
    let user = this.$store.state.login.user;

    // 单例
    this.socket = websocket(user, 1, (result) => {
      let data = JSON.parse(result);

      console.log('message', data);
      this.curNum = data.len ? data.len : 0;
      let isSelf = false;
      if (data.name) {
        if (data.name === this.name) {
          isSelf = true;
        }
        if (data.msg !== '') {
          // Vue 动态添加的数据  如果需要更新视图 那么就需要
          let index = this.data.length;

          this.data.splice(index, 1, {
            isSelf: isSelf,
            name: 'test',
            text: data.msg,
            time: timeFormat(new Date() / 1000, 'H:m:s')
          });
        }
      }
    });
  }

};
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
        color: blue;

        .name {
          margin-right: 0.5rem;
        }
      }

      .self {
        color: green;
      }

      .item-con {
        padding-left: 1rem;
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
