let server = require('ws').Server;
let ws = new server({
  port: 8003
}, function (e) {
  if (!e) {
    console.log('ws服务器开启，监听8003端口')
  } else {
    console.log('开启失败', e)
  }

});
var connNum = [];

const isSame = (name) => {
  let same = false;
  for (let i = 0; i < connNum.length; i++) {
    let w = connNum[i];
    if (w.name === name) {
      same = true;
      break;
    }

  }
  return same
}

//函数参数，连接的对象
ws.on('connection', function (socket, req) {
  // console.log('socket', socket.id)
  //收到消息发送给每一个人
  socket.on('message', function (msg) {
    console.log('msg', msg);
    let data = JSON.parse(msg);


    if (!isSame(data.name)) {
      connNum.push({
        name: data.name,
        socket
      })
    }
    // console.log('isSame',isSame(data.name),connNum[0].name);
    console.log('连接数：' + connNum.length);

    //广播给所有人
    sendAll(connNum,data)
  })

  function sendAll(connNum, data) {
    let len = connNum.length;
    for (var i = 0; i < connNum.length; i++) {
      let message = '';
      if (data && data.msg) {
        message = data.msg
      }
      // console.log('mass',message);
      if (connNum[i].name) {
        connNum[i].socket.send(JSON.stringify({
          name: connNum[i].name,
          msg: message,
          len,
          all:connNum//所有人员
        }))
      }

    }
  }

  function removeSocket(id) {
    for (let i = 0; i < connNum.length; i++) {
      if (connNum[i].socket._closeCode === id) {
        connNum.splice(i, 1);
        break;
      }
    }
  }

  // socket.send('发送的消息')
  //断开连接
  socket.on('close', function (id) {

    removeSocket(id);
    // connNum.splice(connNum.indexOf(this), 1)
    sendAll(connNum);
  })
});







