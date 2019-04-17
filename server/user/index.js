const sqlOperation = require('../FMDB/sqlOperation');

//获取总人数
const getAllUser = (callback) => {
  sqlOperation.selectAll('user', function (result) {

    if (typeof callback === 'function') {
      callback(result.length);
    }
    // console.log('result',result.length);
  });
};

const getAllRecord = (app) => {
  app.post('/getAllRecord', function (req, res, next) {
    let sql = 'SELECT r.*,u.username FROM  chat_room as r left join user as u ON  u.id = r.sendId ';
    sqlOperation.operationData(sql, function (data) {
      res.send({
        data
      });
      next();
    });
  });
};
const login = (app) => {
  app.post('/login', function (req, res, next) {

    //ps 如果 不注明 不返回  这里会报404  错误码
    console.log('222');
    // let id = req.body.id
    let sql = 'SELECT * FROM user WHERE username="' + req.body.name + '"';
    sqlOperation.operationData(sql, function (data) {
      let result = {};

      getAllUser(function (userNum) {
        if (data.length > 0) {
          //  说明有数据
          result = {
            isOk: false,
            id: data[0].id,
            status: 1, //账号已存在
            message: '该账号已存在',
            userNum
          };
          res.send(result);
          next();
        } else {

          let iSql = 'INSERT INTO user(username)  VALUES ' + '("' + req.body.name + '")';
          sqlOperation.insertData(iSql, function (isSuccess, data) {
            if (isSuccess) {
              result = {
                status: 2, //账号不存在
                isOk: true,
                id: data.insertId,
                userNum
              };
              res.send(result);
              next();
            }
          });
        }
      });
    });
  });
};

const saveChatRecord = (app) => {
  app.post('/saveRecord', function (req, res, next) {
    let sendId = req.body.id;
    let time = parseInt(new Date() / 1000);
    let content = req.body.content;
    let sql = 'INSERT INTO chat_room(sendId,time,content)  VALUES ' + '("' + sendId + '","' + time + '","' + content + '")';
    sqlOperation.insertData(sql, function (isOk) {
      res.send({
        isOk
      });
      next();
    });
  });

};

exports.saveChatRecord = saveChatRecord;
exports.login = login;
exports.getAllRecord = getAllRecord;
