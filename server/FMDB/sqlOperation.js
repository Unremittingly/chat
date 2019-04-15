const mysql = require('mysql');
let connection = null;

/****
 * 连接数据库  初始化
 * @param option
 * @returns {Connection}
 */
const connectMysql = function (option) {
    let opt = {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'fcymwg&M%8r_',
        database: 'chat'
    };
    opt = Object.assign(opt, option);
    connection = mysql.createConnection(opt);
    connection.connect();
    return connection;
};
/*****
 * 查询数据
 * @param tableName 表明
 * @param callBack  查询成功后的回调
 */

const selectAll = function (tableName, callBack) {
    if (connection) {
        let sql = 'SELECT * FROM ' + tableName;
        connection.query(sql, function (error, result) {
            if (error) {
                console.log('查询失败', error);
                return false;
            } else {
                if (result) {
                    callBack(result);
                }
                return true;
                // console.log('result',result);
            }
        })
    } else {
        connectMysql();
        selectAll(tableName, callBack);
    }
};
/*****
 * 查询  通过id
 * @param id  id
 * @param tableName 表名
 * @param callBack 回调
 */
const selectForId = function (id, tableName, callBack) {
    if (connection) {
        let sql = 'SELECT * FROM ' + tableName + ' where id=' + id;
        connection.query(sql, function (error, result) {
            if (error) {
                console.log('查询失败', error);
                return false;
            } else {
                if (result) {
                    callBack(result[0]);
                }
                return true;
                // console.log('result',result);
            }
        })
    } else {
        connectMysql();
        selectForId(id, tableName, callBack);
    }
};

/********
 * 更新数据
 * @param sql SQL语句
 * @param callBack  更新过后的回调
 * @returns {boolean}  false 失败  失败后不会有回调执行
 */
const update = function (sql, callBack) {
    if (connection) {
        if (!sql) {
            return false;
        }
        connection.query(sql, function (error, result) {
            if (error) {
                console.log('查询失败', error);
            } else {
                if (result) {
                    callBack(result);
                }
                // console.log('result',result);
            }
        })
    } else {
        connectMysql();
        update(sql, callBack);
    }
};

/******
 * 删除数据单行
 * @param id  单行id
 * @returns {boolean}   true 成功
 */
const deleteData = function (id) {
    if (connection) {
        if (id) {
            let sql = 'DELETE FROM info WHERE id = ' + id + '';
            connection.query(sql, function (error, result) {
                if (error) {
                    console.log('删除失败', error);
                    return false;
                } else {
                    console.log('result', result);
                    return true;
                }
            })
        } else {
            console.log('该条数据不存在');
            return false;
        }

    } else {
        connectMysql();
        deleteData(id);
    }
};


function getTime() {
    return new Date().getTime();
}

/***
 * 插入数据
 * @param sql SQL语句
 * @returns {boolean}
 */
const insertData = function (sql, callback) {
    let isSuccess = false;
    if (connection) {
        let defaultSql = sql || '';
        if (defaultSql) {
            connection.query(defaultSql, function (error, result) {
                if (error) {
                    console.log('数据插入失败', error);
                    isSuccess = false;
                } else {
                    console.log('数据插入成功', result);
                    isSuccess = true;
                }
                callback(isSuccess);
            })
        }
    } else {
        connectMysql();
        isSuccess = insertData(sql, callback);
    }
    return isSuccess;
};

/******
 * 通用方法  只需要传入sql 就可以啦 其实这个方法都可以使用  只需要传入sql 就可以啦
 * @param sql   sql语句
 * @param callback  回调
 * @returns {boolean}
 */
const operationData = async function (sql, callback) {
    let isSuccess = false;
    if (connection) {
        let defaultSql = sql || '';
        if (defaultSql) {
            await connection.query(defaultSql, function (error, result) {
                if (error) {
                    console.log('数据操作失败',error);
                    isSuccess = false;
                } else {
                    console.log('数据操作成功');
                    if (callback) {
                        callback(result);
                    }
                    isSuccess = true;
                }
            })
        }
    } else {
        connectMysql();
        operationData(sql, callback);
    }
    return isSuccess;
};

/***
 * 关闭数据库操作
 * @returns {boolean}  true 成功  false  失败
 */
const close = function () {
    if (connection) {
        connection.end();
        return true;
    } else {
        return false;
    }
};

exports.connectSql = connectMysql;
exports.getTime = getTime;
exports.selectAll = selectAll;
exports.update = update;
exports.deleteData = deleteData;
exports.insertData = insertData;
exports.close = close;
exports.operationData = operationData;
exports.selectForId = selectForId;
