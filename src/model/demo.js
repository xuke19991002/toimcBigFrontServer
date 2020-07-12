import User from './user.js'

// 增
const user = {
  name: 'test',
  age: 21,
  email: 'xxx@xxx.com'
}

const insertMethods = async () => {
  const data = new User(user)
  const res = await data.save()
  console.log(res)
}

// 查
const findMethods = async () => {
  const res = await User.find() // 查询所有
  console.log(res)
}

// 改
const updateMethods = async () => {
  const res = await User.updateOne({name: 'test'}, {
    age: 30,
    email: 'testxxx@163.com'
  })
  console.log(res)
}

// 删
const deleteMethods = async () => {
  const res = await User.deleteOne({name: 'test'})
  console.log(res)
}

// insertMethods()
// findMethods()
// updateMethods()
deleteMethods()
