import {
  getValue,
  setValue,
  getHValue
} from './redisConfig.js'

setValue('imooc', 'imooc message from redis client')

getValue('imooc').then(res => {
  console.log(res)
})

setValue('imoocObject', {
  name: 'brian',
  age: 30,
  flag: true,
  email: 'xxx@xxx.com'
})

getHValue('imoocObject').then(res => {
  console.log('getHValue >>> ',  JSON.stringify(res, null, 2))
})
