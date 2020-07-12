const combineRouters = require('koa-combine-routers')

import publicRouter from './publicRouter'
import loginRouter from './loginRouter'

const _combineRouters = combineRouters(
  publicRouter,
  loginRouter
)

export default _combineRouters
