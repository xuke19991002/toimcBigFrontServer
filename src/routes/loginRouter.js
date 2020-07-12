const Router = require('koa-router')
const router = new Router({
  prefix: '/login'
})

import loginController from '../api/loginController'

router.post('/forget', loginController.forget)
router.post('/login', loginController.login)
router.post('/reg', loginController.reg)

export default router
