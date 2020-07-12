const mongoose = require('mongoose')

// 连接数据库 如果当前连接做了验证(鉴权)需要带上用户名与密码
// 用户名 imooc_usertest 密码 123456 连接的地址和数据库 localhost:27017/imooc_test

// 定义连接，连接过程 =>
mongoose.connect('mongodb://imooc_usertest:123456@localhost:27017/imooc_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// user 是collection的名称 后面的参数 就是collection的Schema(框架、骨架)
// 连接 collections，model + schema => model/user.js
const User = mongoose.model('users', {
  name: String,
  age: Number,
  email: String
})

const imooc = new User({
  name: 'imooc-test',
  age: 30,
  email: 'imooc@imooc.com'
})

imooc.save().then(() => {
  console.log('OK')
})
