const path = require('path')

exports.resolve = function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

exports.APP_PATH = exports.resolve('src')
exports.DIST_PATH = exports.resolve('dist')

exports.getWebpackResolveConfig = function (customAlias = {}) {
  const appPath = exports.APP_PATH;
  return {
    // 告诉webpack 哪些目录需要去所有匹配alias
    modules: [appPath, 'node_modules'],
    extensions: ['.js', '.json'], // 哪些文件需要去搜索
    alias: {
      '@': appPath,
      // 自定义alias
      ...customAlias,
    },
  };
};
