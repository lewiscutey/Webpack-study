const path = require('path')

module.exports = {
  configureWebpack: {
    entry: {
      index: './src/index.js',
      main: './src/main.js'
    },
    optimization: {
      splitChunks: {
        minSize: 1,
        maxSize: 0,
        cacheGroups: {
          default: false,
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            minChunks: 2,
            name(module) {
              // 处理node_modules的chunk位置为node_modules下的路径,通过name来控制,如node_modules/vue/dist/vue.runtime.esm;
              const index = module.resource.indexOf('node_modules')
              const chunkPath = module.resource
                .slice(index)
                .replace(/(.+)\.\w\??(.+)?/, ($0, $1) => $1)
              // 兼容windows上的路径
              return chunkPath.split(path.sep).join('/')
            },
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          },
          chunks: {
            chunks: 'all',
            minChunks: 2,
            name(module) {
              // 处理正常chunk的位置为相对src下的路径，通过name来控制,如Common/a;
              const chunkPath = module.resource ? module.resource
                .replace(/(.+)\.\w\??(.+)?/, ($0, $1) => $1) : 'aaaaa'
              // 兼容windows上的路径
              return chunkPath.split(path.sep).join('/')
            },
            priority: 1,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    }
  }
}

class Event {
  constructor() {
    this.events = {}
  }
  on(eventName, callback) {
    if(!this.events[eventName]) {
      this.events[eventName] = [callback]
    } else {
      this.events[eventName].push(callback)
    }
  }
  emit(eventName) {
    this.events[eventName] && this.events[eventName].forEach(cb => cb())
  }
  remove(eventName, callback) {
    this.events[eventName] = this.events[eventName] ? this.events[eventName].filter(cb => cb !== callback) : []
  }
  once(eventName, callback) {
    let fn = () => {
      callback()
      this.remove(eventName, fn)
    }
    this.on(eventName, fn)
  }
}