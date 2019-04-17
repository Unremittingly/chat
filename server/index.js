const express = require('express');
const app = express();

const user = require('./user/index');

const bodyParser = require('body-parser');
// post请求需要加个body  然后通过body获取  这对post参数
app.use(bodyParser.urlencoded({extended: false}));

//设置跨域请求头  一个中间件设置跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'userInfo/json;charset=utf-8');

  next();
});

try {
  user.login(app);
} catch (e) {

}

try {
  user.saveChatRecord(app);
} catch (e) {

}
try {
  user.getAllRecord(app);
} catch (e) {

}

app.listen(3010, () => console.log('chat app listening on port 3010!'));
