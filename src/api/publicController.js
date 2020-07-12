// 生成验证码
import svgCaptcha from 'svg-captcha'
import { setValue, getValue } from '@/config/redisConfig'

class PublicController {
  async getCaptcha(ctx) {
    const { sid } = ctx.request.query
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1il',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 38
    })
    // 保存图片验证码数据 设置超时单位 单位s
    // 设置图片验证码超时10分钟
    setValue(sid, newCaptcha.text, 60 * 10)
    // getValue(sid).then(res => console.log(res))
    ctx.body = {
      data: newCaptcha.data
    }

    // newCaptcha.data 返回的是生成的验证码的svg图片 newCaptcha.text 为验证码数值
  }
}

export default new PublicController
