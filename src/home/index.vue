<template>

  <div class="home">
    <div class="item">
      <span class="label">用户名：</span>
      <input id="user" type="text" v-model="name" placeholder="输入您的名称">
    </div>
    <div class="item">
      <span id="login" @click="login">Login</span>
    </div>
  </div>
</template>

<script>

  import {postUrl} from '../helper/dataManage'

  export default {
    name: 'index',
    data: function () {
      return {
        name: '',
        id: 1
      }
    },
    methods: {

      setUser(name){
        this.$store.commit("login/setUser",name);
      },
      login () {

        console.log('this', this.name)
        let name = this.name
        if (name) {
          postUrl('http://localhost:3010/login', {
            name: name,
            id: this.id
          }).then((data) => {
            console.log('data', data)
            this.setUser(name);
            this.$router.push(
              {
                path: '/room',
                query: {
                  name: this.name,
                  id: this.id
                }
              }
            )
            console.log('login in')
          })

        }
      }

    }
  }
</script>

<style scoped lang="less">
  .home {
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    font-size: 1.4rem;
  }

  .item {
    margin: 2rem;


    input {
      height: 2.8rem;
      width: 10rem;
      line-height: 3.6rem;
      padding-left: 0.5rem;
      font-size: 1.2rem;
      border: 1px solid #eee;
      border-radius: 0.3rem;

    }
  }


  #login {
    padding: 0.5rem 2rem;
    border: 1px solid #eee;
    color: #fff;
    border-radius: 0.5rem;
    background: #666;
  }

</style>
