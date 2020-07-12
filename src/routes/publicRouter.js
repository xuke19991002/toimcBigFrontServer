const Router = require('koa-router')
const router = new Router({
  prefix: '/public'
})

import publicController from '../api/publicController.js'

router.get('/getCaptcha', publicController.getCaptcha)

export default router
