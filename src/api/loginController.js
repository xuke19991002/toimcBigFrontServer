// 处理时间的一个js库
import moment from 'moment'
import jwt from 'jsonwebtoken' // 用于生成、解析 token
import bcrypt from 'bcrypt' // 加密处理
import send from '../config/mailConfig'

import config from '../config/index'
import { checkCode } from '@/common/utils'
import User from '@/model/user'


class LoginController {
  async forget(ctx) {
    const { body } = ctx.request
    try {
      let res = await send({
        code: '1234',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'), // 过期时间 当前时间+30分钟的一个时间
        email: body.email, // 谁接收邮件
        user: '初夏'
      })
      ctx.body = {
        code: 0,
        data: res,
        msg: '邮件发送成功'
      }
    } catch (e) {
      console.log(e)
    }
  }

  // header Authorization: Bearer tokenString
  async login(ctx) {
    // 接受用户的数据
    const {
      username,
      password,
      sid, // 为了校验验证码的一个唯一的标识
      code
    } = ctx.request.body
    // 验证图片验证码的时效性、正确性
    const checkCodeRes = await checkCode(sid, code)
    if (checkCodeRes) {
      let checkUserPassword = false
      // 查询用户
      let user = await User.findOne({ username })
      // 比较密码 传递原始密码与数据库加密密码
      if (await bcrypt.compare(password, user.password)) {
        checkUserPassword = true
      }
      if (checkUserPassword) {
        // 验证通过 返回token数据
        const token = jwt.sign({ // payload
            _id: 'brian'
          },
          config.JWT_SECRET,
          {
            expiresIn: '1d'
          }
        )
        ctx.body = {
          code: 200,
          token,
          msg: '登录成功'
        }
      } else {
        // 用户名密码验证失败
        throw new Error('用户名或密码错误')
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '验证码错误'
      }
    }
  }

  async reg(ctx) {
    // 接收客户端数据
    const {
      username,
      name,
      password,
      sid,
      code
    } = ctx.request.body
    let msg = {}
    // 验证图片验证码的时效性、正确性
    const checkCodeRes = await checkCode(sid, code)
    let check = true
    if (checkCodeRes) {
      const user1 = await User.findOne({ username })
      // 查询此用户是否存在
      if (user1) {
        msg.username = ['此邮箱已经注册']
        check = false
      }
      // 查询昵称是否被使用
      const user2 = await User.findOne({ name })
      if (user2) {
        msg.name = ['昵称已被占用，请修改']
        check = false
      }
    } else {
      msg.code = ['验证码错误']
      check = false
    }
    if (check) {
      // 用户密码加密
      const _pas = await bcrypt.hash(password, 5)
      // 创建用户
      let user = new User({ username, name, password: _pas, create: moment().format('YYYY-MM-DD HH:mm:ss')})
      const res = await user.save()
      ctx.body = {
        code: 200,
        data: res,
        msg: '注册成功'
      }
    } else {
      ctx.body = {
        code: 401,
        data: msg,
        msg: '注册失败'
      }
    }
  }
}

export default new LoginController
