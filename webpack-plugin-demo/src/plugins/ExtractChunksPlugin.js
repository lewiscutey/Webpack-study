/*
 * Copyright (C) 2017, hapjs.org. All rights reserved.
 */

const pluginName = 'ExtractChunksPlugin'
const actualModuleRequireParam = [
  'module.exports',
  'module',
  'module.exports',
  '__webpack_require__'
]
const formalModuleRequireParam = ['module', 'exports', '__webpack_require__']
const moduleRequireNativeFunctions = [
  '$app_define$',
  '$app_bootstrap$',
  '$app_require$',
  '$app_define_wrap$'
]
const appModuleRequireNativeFunctions = ['$app_define$', '$app_bootstrap$', '$app_require$']

// modules[moduleId].call() 里的参数字符串
const actualParamStr = actualModuleRequireParam.concat(moduleRequireNativeFunctions).join(', ')
// 每个模块引入的参数字符串
const formalParamStr = formalModuleRequireParam.concat(moduleRequireNativeFunctions).join(', ')

const quickGlobal = 'var quickGlobal = Object.getPrototypeOf(global) || global;'

let extractModules = []

class ExtractChunksPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap(pluginName, compilation => {
      // 抽取公共chunk
      compilation.hooks.optimizeDependenciesAdvanced.tap(pluginName, modules => {
        for (const module of modules) {
          if (module.reasons.length < 2) continue

          const chunkName = module.resource.match(/\w+(?=\.)/gi)[0]
          const isHasChunk = compilation.chunks.every(chunk => chunk.name !== chunkName)
          if (!isHasChunk) continue

          const newChunk = compilation.addChunk(chunkName)
          if (module.addChunk(newChunk)) {
            newChunk.addModule(module)
            extractModules.push(module)
          }
          newChunk.entryModule = undefined
          newChunk.hasExistedChunk = true
        }
      })

      // 移除公共chunk
      compilation.hooks.optimizeChunks.tap(pluginName, chunks => {
        chunks.forEach(chunk => {
          extractModules.forEach(module => {
            if(chunk.containsModule(module) && chunk.hasEntryModule()) {
              chunk.removeModule(module);
            }
          })
        })
      })

      // 各个chunk配置
      compilation.hooks.chunkAsset.tap(pluginName, (chunk, filename) => {
        const sourceChildren = compilation.assets[filename]._source.children

        let _actualParamStr = actualParamStr
        let _formalParamStr = formalParamStr
        if(chunk.entryModule) {
          debugger
          sourceChildren.splice(1, 0, quickGlobal)
          _actualParamStr = actualModuleRequireParam
            .concat(appModuleRequireNativeFunctions)
            .join(', ')
          _formalParamStr = formalModuleRequireParam
            .concat(appModuleRequireNativeFunctions)
            .join(', ')
        }

        sourceChildren.forEach((item, index) => {
          if (item.constructor.name === 'PrefixSource') {
            let content = item._source._value
            // window -> global
            content = windowReplaceWithGlobal(content)
            // 加上$res_require$引入
            content = content.replace(
              /(?<=(if\(installedChunks\[depId\]\s+!==\s+0\)\s+))fulfilled\s+=\s+false;/,
              '{ fulfilled = false; $app_evaluate$(`${depId}.js`); }' // eslint-disable-line
            )
            // 引入额外方法
            content = content.replace(
              /(?<=(modules\[moduleId\].call\())module.exports,\s+module,\s+module.exports,\s+__webpack_require__/,
              _actualParamStr
            )
            item._source._value = content
          } else if (item.constructor.name === 'String') {
            // window -> global
            let content = windowReplaceWithGlobal(item)
            // 引入额外方法
            content = content.replace(
              /(?<=function\()module,\s+exports(,\s+__webpack_require__)?/,
              _formalParamStr
            )
            sourceChildren[index] = content
          }
        })

        // 抽取的chunk放到Chunks文件夹下
        if(chunk.hasExistedChunk) {
          debugger
          let tempFile = compilation.assets[filename]
          delete compilation.assets[filename]
          let newFilename = 'Chunks/' + filename
          chunk.files = chunk.files.map(item => {
            if(item === filename) {
              return newFilename
            }
          })
          compilation.assets[newFilename] = tempFile
        }
      })

    })
  }
}

function windowReplaceWithGlobal(content) {
  return content.replace(/window(?=\["webpackJsonp"\])/g, 'quickGlobal')
}

module.exports = ExtractChunksPlugin