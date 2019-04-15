const sqlOperation = require('../FMDB/sqlOperation')

const login = (app) => {
  app.post('/login', function (req, res, next) {

    //ps 如果 不注明 不返回  这里会报404  错误码
    console.log('222')
    // let id = req.body.id
    let sql = 'SELECT * FROM user WHERE username="'+req.body.name+'"'  ;
    sqlOperation.operationData(sql, function (data) {
      let result = {}

      console.log('data', data)
      if (data.length>0) {
        //  说明有数据
        result = {
          isOk: false,
          status:1,//账号已存在
          message: '该账号已存在'
        }
      }else{
        result = {
          status:2,//账号不存在
          isOk:true,
        }
        let iSql = 'INSERT INTO user(username)  VALUES ' +'("'+req.body.name+'")';
        sqlOperation.insertData(iSql,function (isSuccess) {
          if(isSuccess){
            console.log('数据已插入成功');
          }
        })
      }
      res.send(result)
      next()
    })

  })

}

exports.login = login
