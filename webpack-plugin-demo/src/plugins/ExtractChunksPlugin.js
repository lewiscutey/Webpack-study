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

// const quickappGlobal = 'var quickappGlobal = Object.getPrototypeOf(global) || global;'

let extractModules = new Map()

function hasChunk(chunkName, compilation) {
  return !compilation.chunks.every(chunk => chunk.name !== chunkName)
}

function windowReplaceWithGlobal(content) {
  return content.replace(/window(?=\["webpackJsonp"\])/g, 'quickappGlobal')
}

class ExtractChunksPlugin {
  constructor(options) {
    this.options = options
    this.chunkPath = options.chunkPath || 'Chunks'
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap(pluginName, compilation => {
      // compilation.hooks.optimizeChunks.tap(pluginName, chunks => {
      //   chunks.forEach(chunk => {
      //     if(chunk.name === 'app') {
      //       chunk._modules.forEach(item => {
      //         item.value._chunks.delete(chunk);
      //       })
      //     }
      //   })
      // })
      // 抽取公共chunk
      compilation.hooks.optimizeDependenciesAdvanced.tap(pluginName, modules => {
        for (const module of modules) {
          // 被依赖小于2，不会当做公共chunk进行抽取
          if (module.reasons.length < 2) continue

          const chunkName = module.resource.match(/\w+(?=\.)/gi)[0]
          const hasChunkName = hasChunk(chunkName, compilation)
          if (hasChunkName) continue

          const newChunk = compilation.addChunk(chunkName)

          // Module内部会进行关联，这个方法判断如果已经存在这个chunk，则返回false；
          if (module.addChunk(newChunk)) {
            newChunk.addModule(module)
            extractModules.set(chunkName, module)
          }

          if (newChunk.groupsIterable.chunkGroup) {
            newChunk.groupsIterable.chunkGroup.addChild(newChunk)
          }

          newChunk.hasExistedChunk = true
        }
      })

      compilation.hooks.optimizeChunkAssets.tapAsync(pluginName, (chunks, callback) => {
        chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            console.log(1111, compilation.assets[file]._source.children)
          });
        });
    
        callback();
      })

      // 移除页面Chunk中已经存在的公共module，因为这个公共module已经以单独chunk的形式存在
      compilation.hooks.optimizeChunks.tap(pluginName, chunks => {
        chunks.forEach(chunk => {
          extractModules.forEach(module => {
            if (chunk.containsModule(module) && chunk.hasEntryModule()) {
              chunk.removeModule(module)
              module.removeChunk(chunk)
            }
          })
        })
      })

      // 各个chunk配置附加参数及全局quickappGlobal
      compilation.hooks.chunkAsset.tap(pluginName, (chunk, filename) => {
        const sourceChildren = compilation.assets[filename]._source.children

        let _actualParamStr = actualParamStr
        let _formalParamStr = formalParamStr
        if (chunk.entryModule) {
          // sourceChildren.splice(1, 0, quickappGlobal)
          _actualParamStr = actualModuleRequireParam
            .concat(appModuleRequireNativeFunctions)
            .join(', ')
          _formalParamStr = formalModuleRequireParam
            .concat(appModuleRequireNativeFunctions)
            .join(', ')
        }

        sourceChildren.forEach((item, index) => {
          // 运行时的源码形式
          if (item.constructor.name === 'PrefixSource') {
            let content = item._source._value
            // window -> global
            content = windowReplaceWithGlobal(content)
            content = content.replace(
              /(?<=(if\(installedChunks\[depId\]\s+!==\s+0\)\s+))fulfilled\s+=\s+false;/,
              '{ fulfilled = false; $app_evaluate$(`${quickappGlobal.chunkFileMap[depId]}.js`); }' // eslint-disable-line
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
              /(?<=function\()module,\s+__webpack_exports__(,\s+__webpack_require__)?/,
              _formalParamStr
            )
            sourceChildren[index] = content
          }
        })

        // 抽取的chunk放到配置的（默认为Chunks）文件夹下
        if (chunk.hasExistedChunk) {
          let tempFile = compilation.assets[filename]
          delete compilation.assets[filename]
          let newFilename = this.chunkPath + '/' + filename
          chunk.files = chunk.files.map(item => {
            if (item === filename) {
              return newFilename
            }
          })
          compilation.assets[newFilename] = tempFile
        }
      })

      // 把引用公共chunk的方式替换为$app_evaluate$
      compilation.moduleTemplates.javascript.hooks.render.tap(
        pluginName,
        moduleSourcePostModule => {
          // 配置为sourcemap的源码形式
          if (moduleSourcePostModule.constructor.name === 'CachedSource') {
            let source = moduleSourcePostModule._source
            if (
              source &&
              source.constructor.name === 'ReplaceSource' &&
              source.replacements &&
              source.replacements.length
            ) {
              source.replacements.map(items => {
                let chunkName =
                  items.content.match(/\w+(?=\.js)/gi) && items.content.match(/\w+(?=\.js)/gi)[0]
                let chunkPath = `${compiler.outputPath}/${this.chunkPath}/${chunkName}.js`
                items.content = items.content.replace(
                  /\s=\s__webpack_require__\((.+?)\);/,
                  ` = $app_evaluate$('${chunkPath}');` // eslint-disable-line
                )
              })
            }
            moduleSourcePostModule._source = source
          } else if (moduleSourcePostModule.constructor.name === 'RawSource') {
            // 默认为eval的源码形式
            let value = moduleSourcePostModule._value
            if (value) {
              let chunkName = value.match(/\s=\s__webpack_require__\((.+?)\);/gi)
              chunkName && chunkName.map(item => {
                item = item.match(/(\w+)\s+/ig) && item.match(/(\w+)\s+/ig)[0] && item.match(/(\w+)\s+/ig)[0].slice(0, -1)
                if(!extractModules.get(item)) return
                let chunkPath = `${compiler.outputPath}/${this.chunkPath}/${item}.js`
                value = value.replace(
                  new RegExp(` = __webpack_require__((.+?)${item}(.+?));`, 'i'),
                  ` = $app_evaluate$('${chunkPath}');` // eslint-disable-line
                )
              })
            }
            moduleSourcePostModule._value = value
          }
        }
      )
    })
  }
}

module.exports = ExtractChunksPlugin
