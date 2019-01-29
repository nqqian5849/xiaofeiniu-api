/* 小肥牛扫码点餐项目 */
// console.log("准备启动服务器API...");
// console.log(new Date().toLocaleString());
//端口
const PORT = 8090;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const categoryRouter = require('./routes/admin/category');
const adminRouter = require('./routes/admin/admin');
//创建http应用服务器
var app = express();
//启动主服务器
app.listen(PORT, () => {
    console.log('Server Listening' + PORT);
});
//使用中间件
app.use(cors());
//bodyParser.urlencoded({})
app.use(bodyParser.json());//把json格式的请求主体数据解析出来放入req.body属性
//挂载路由
app.use('/admin/category', categoryRouter);
app.use('/admin', adminRouter);

