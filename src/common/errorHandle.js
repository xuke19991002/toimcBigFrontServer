export default (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: 'Protected resource, use Authorization header to get access\n'
      }
    } else {
      ctx.status = err.status || 500
      ctx.body = Object.assign({
        code: 500,
        msg: err.message
      },
      // err.stack 包含了代码的具体报错信息 包含行号
      process.env.NODE_ENV === 'development' ? {stack: err.stack} : {}) // 开发模式下 返回具体的代码错误信息
    }
  })
}
