'use strict'
import nodemailer from 'nodemailer' // 发送邮件的插件

async function send(sendInfo) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '1242425209@qq.com', // generated ethereal user
      pass: 'ejxaumdnceycgeed' // 这个地方是填写开通qq邮箱POP3服务时给的授权码
    }
  })

  // let sendInfo = {
  //   code: '1234',
  //   expire: '2020-06-24', // 过期时间
  //   email: '1242425209@qq.com', // 谁接收邮件
  //   user: '初夏'
  // }

  const subject = sendInfo.user !== ''
    ? `你好开发者，${sendInfo.user}！《慕课网前端全栈学习测试》注册码`
    : '《慕课网前端全栈学习测试》注册码';

  const text = `您在《慕课网前端全栈学习测试》课程中注册，您的邀请码是${sendInfo.code}，邀请码的过期时间：${sendInfo.expire}`;

  const url = 'https://cn.vuejs.org'

  const html = `<div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">
        <div style="height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;">Imooc社区——欢迎来到官方社区</div>
        <div style="padding: 25px">
          <div>您好，${sendInfo.user}童鞋，重置链接有效时间30分钟，请在${sendInfo.expire}之前重置您的密码：</div>
          <a href="${url}" style="padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;">立即重置密码</a>
          <div style="padding: 5px; background: #f2f2f2;">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>
        </div>
        <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">系统邮件，请勿直接回复</div>
    </div>`

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"认证邮件" <1242425209@qq.com>', // sender address
    to: sendInfo.email || '1242425209@qq.com', // 发送给谁
    subject, // 主题
    text, // plain text body
    html
  })

  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  return 'Message sent: %s', info.messageId
}

// send().catch(console.error)

export default send
