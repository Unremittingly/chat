<template>
  <div class="room">
    <div class="user">
      <span class="label">欢迎您：</span>
      <span>{{this.name}}</span>
      <span @click="loginOut" class="loginOut">注销</span>
    </div>
    <div class="desc">
      <span class="all-num desc-item"><span class="label">总人数：</span><span>{{this.userNum}}</span></span>
      <span class="cur-num desc-item"><span class="label">当前在线：</span><span>{{this.curNum}}</span></span>
    </div>
    <div class="content">
      <div v-for="(item,index) in data" :key="index" class="chat-item">
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
  import {postUrl} from '../helper/dataManage';

  export default {
    name: 'index',

    data () {
      return {
        name: this.$store.state.login.user,
        text: '',
        userNum: this.$store.state.login.userNum,
        curNum: 0,
        socket: null,
        data: []
      };
    },
    methods: {
      loginOut(){
        this.$store.commit('login/loginOut');
        this.socket.ws.close();
        this.$router.push(
          {
            path: '/home'
          }
        );
        // window.location.reload()

      },
      sendMessage () {
        if(!this.text){
          console.log('消息不能为空!');
          return false;
        }
        this.socket.ws.send(JSON.stringify(
          {
            name: this.name,
            msg: this.text
          }
        ));
      },
      initData (data) {
        for (let i = 0; i < data.length; i++) {
          let obj = data[i];
          let isSelf = false;
          if (obj.username === this.name) {
            isSelf = true;
          }
          this.data.splice(i,1,{
            // id:3,
            id: obj.sendId,
            isSelf: isSelf,
            name: obj.username,
            text: obj.content,
            time:  timeFormat(obj.time, 'H:m:s')
          });
        }
      }
    },
    beforeDestroy(){
      this.socket.ws.close();
    },
    beforeCreate () {
      if (!this.$store.state.login.isLogin) {
        this.$router.push({
          path: '/'
        });
      } else {
        let self = this;
        postUrl('http://localhost:3010/getAllUser').then(function (data) {
          self.userNum = data.userNum;
        });
        postUrl('http://localhost:3010/getAllRecord', {}).then((data) => {
          self.initData(data.data);
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
            let uid = this.$store.state.login.uid;
            postUrl('http://localhost:3010/saveRecord', {
              id: uid,
              content: data.msg
            }).then((data) => {

            });
            let index = this.data.length;
            this.data.splice(index, 1, {
              // id:3,
              isSelf: isSelf,
              name: data.name,
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

    .loginOut{
      display: inline-block;
      margin-left: 10px;
      font-size: 1rem;
      color: red;
    }
  }
</style>
