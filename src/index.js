import path from 'path'
import Koa from 'koa'
import koaBody from 'koa-body'
import jsonUtil from 'koa-json'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import compose from 'koa-compose'
import compress from 'koa-compress'
import JWT from 'koa-jwt' // 用于路由权限控制 只是产生鉴权拦截功能
import router from './routes/index'
import config from './config/index'
import ErrorHandle from './common/errorHandle.js'



const app = new Koa()

const isDevMode = process.env.NODE_ENV !== 'production'

// 定义公共路径，不需要jwt鉴权
// 匹配正则的请求不进行校验
// 如果受保护的请求没有在header中携带token将不会通过
const jwt = JWT({secret: config.JWT_SECRET}).unless({path: [/^\/public/, /^\/login/]})

// 使用 koa-compose 集成中间件
const middleware = compose([
  ErrorHandle,
  koaBody(),
  cors(),
  jsonUtil({
    pretty: false,
    param: 'pretty'
  }),
  helmet(),
  statics(path.join(__dirname, '../public')),
  jwt
])
app.use(middleware)

// 生产模式就压缩我们的中间件 koa-compress 开启服务器Gzip压缩功能 以大大缩短加载时间
if (!isDevMode) {
  app.use(compress())
}


app.use(router())

const port = 3000
app.listen(port, () => {
  console.log(`服务启动成功 port:${port}`)
})

