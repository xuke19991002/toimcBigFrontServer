## 项目说明
此项目为[慕课网大前端](https://class.imooc.com/sale/webfullstack)对应的课程学习项目，此项目为前端对应的服务端nodeJS项目，技术栈为使用node-koa开发作为基本开发

## 项目笔记
关于package.json的命令介绍
```$javascript
"scripts": {
    "start": "nodemon --exec babel-node src/index.js",
    "webpack:debug": "node --inspect-brk ./node_modules/.bin/webpack",
    "dev": "cross-env NODE_ENV=dev nodemon --exec babel-node --inspect=3333 src/index.js",
    "build": "cross-env NODE_ENV=prod webpack --config config/webpack.config.prod.js",
    "clean": "rimraf dist",
    // cross-env NODE_ENV=dev 传递环境变量 dev
    // webpack --watch 监听对应的配置文件 配置文件中存在入口文件 当入口文件相关联的文件变化时 webpack自动为我们打包 形成到 /dist/server.bundle.js
    // --progress 查看所有的打印信息 --hide-modules 隐藏有关模块的打包信息
    "watch": "cross-env NODE_ENV=dev webpack --watch --progress--hide-modules --config config/webpack.config.dev.js",
    // 运行起来打包出来的文件
    // --inspect 调试模式
    "debug": "nodemon --inspect ./dist/server.bundle.js",
    // 运行项目 需要执行以上两个命令 借助 npm-run-all 这个包帮助我们执行多个命令
    "start:dist": "npm-run-all -p watch debug"
}
```
