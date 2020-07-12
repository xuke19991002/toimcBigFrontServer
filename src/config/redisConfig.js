import redis from 'redis'
import confog from './index'

const options = {
  host: confog.REDIS.host,
  port: confog.REDIS.port,
  detect_buffers: true,
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('The server refused the connection')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Retry time exhausted')
    }
    if (options.attempt > 10) {
      return undefined
    }
    return Math.min(options.attempt * 100, 3000)
  }
}
const client = redis.createClient(options)

export const setValue = (key, value, time) => {
  if (typeof value == null || value === '') return
  if (typeof value === 'string') {
    if(time != null){
      // redis 设置过期时间 单位为秒 过期自动删除
      return client.set(key, value, 'EX', time)
    }
    client.set(key, value)
  } else if (typeof value === 'object') {
    Object.keys(value).forEach(item => {
      client.hset(key, item, value[item], redis.print) // 回调函数 redis.print 输出redis打印结果
    })
  }
}

// 处理getValue的两种方式

// 方式一
const { promisify } = require('util') // promisify 将其包装成一个promise对象
const getAsync = promisify(client.get).bind(client)

export const getValue = key => {
  return getAsync(key)
}

const hgetallAsync = promisify(client.hgetall).bind(client)
export const getHValue = key => {
  return hgetallAsync(key)
}

export default {
  client,
  setValue,
  getValue,
  getHValue
}
