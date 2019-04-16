class Websocket {
  constructor (name, id, onMessage) {
    // 使用单例  实现唯一性
    if (!Websocket.instance) {
      this.name = name;
      this.id = id;
      this.ws = null;
      // 将this挂载到SingletonApple这个类的instance属性上
      Websocket.instance = this;

      this.create();
      this.onMessage = onMessage;
    } else {
      // 单例存在  初始化

      // console.log('this.ws',Websocket.instance.ws);
      Websocket.instance.ws.send(JSON.stringify({
        name: name
      }));
      // 回调函数每次的是不一样的 需要重新赋值
      Websocket.instance.onMessage = onMessage;
    }
    return Websocket.instance;
  }

  create () {
    if ('WebSocket' in window) {
      let that = this;
      // console.log('您的浏览器支持 WebSocket!')
      console.log('create');
      // 打开一个 web socket
      that.ws = new WebSocket('ws://localhost:8003');

      console.log('that.name', that.name);
      that.ws.onopen = function () {
        // Web Socket 已连接上，使用 send() 方法发送数据 先把用户名发送过去
        if (that.name) {
          that.ws.send(JSON.stringify({
            name: that.name
          }));
        }

        // 这里需要有一个用户名 userName  唯一的 活这说这里有个id  唯一的
        // console.log('数据发送中...')
      };

      that.ws.onmessage = function (evt) {
        // let received_msg = evt.data;
        // console.log('数据已接收...', received_msg, evt)
        that.onMessage(evt.data);
      };

      that.ws.onclose = function () {
        // 关闭 websocket
        console.log('连接已关闭...');
      };
    } else {
      // 浏览器不支持 WebSocket
      console.log('您的浏览器不支持 WebSocket!');
    }
  }
}

export const websocket = (name, id, onMessage) => {
  return new Websocket(name, id, onMessage);
};
