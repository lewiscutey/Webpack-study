(quickappGlobal["webpackJsonp"] = quickappGlobal["webpackJsonp"] || []).push([["async-commons"],{

/***/ "./src/a.scss":
/*!********************!*\
  !*** ./src/a.scss ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = module.exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "div {\n  color: red; }\n  div a {\n    display: block; }\n", ""]);


/***/ }),

/***/ "./src/b.js":
/*!******************!*\
  !*** ./src/b.js ***!
  \******************/
/*! exports provided: add */
/***/ (function(module, exports, __webpack_require__, $app_define$, $app_bootstrap$, $app_require$, $app_define_wrap$) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony import */ var _d_js__WEBPACK_IMPORTED_MODULE_0__ = $app_evaluate$('/Users/lewis/Documents/项目/Github/Webpack-study/webpack-plugin-demo/dist/Chunks/d.js');
/* harmony import */ var _common_aa__WEBPACK_IMPORTED_MODULE_1__ = $app_evaluate$('/Users/lewis/Documents/项目/Github/Webpack-study/webpack-plugin-demo/dist/Chunks/aa.js');
/* harmony import */ var _common1_aa__WEBPACK_IMPORTED_MODULE_2__ = $app_evaluate$('/Users/lewis/Documents/项目/Github/Webpack-study/webpack-plugin-demo/dist/Chunks/aa.js');




Object(_d_js__WEBPACK_IMPORTED_MODULE_0__["mod"])(100, 11)
Object(_common_aa__WEBPACK_IMPORTED_MODULE_1__["del"])(100, 11)
Object(_common1_aa__WEBPACK_IMPORTED_MODULE_2__["del"])(100, 11)

function add(a, b) {
  return a + b
}


/***/ }),

/***/ "./src/c.js":
/*!******************!*\
  !*** ./src/c.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, exports, __webpack_require__, $app_define$, $app_bootstrap$, $app_require$, $app_define_wrap$) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return del; });
/* harmony import */ var _d_js__WEBPACK_IMPORTED_MODULE_0__ = $app_evaluate$('/Users/lewis/Documents/项目/Github/Webpack-study/webpack-plugin-demo/dist/Chunks/d.js');

// import Vue from 'vue'

Object(_d_js__WEBPACK_IMPORTED_MODULE_0__["mod"])(100, 11)

__webpack_require__.e(/*! import() */ "async-commons").then(__webpack_require__.bind(null, /*! ./b.js */ "./src/b.js")).then(add => add(1, 2));

function del(a, b) {
  return a - b
}

var vm = new Vue({
  // 选项
})

/***/ }),

/***/ "./src/common/aa.js":
/*!**************************!*\
  !*** ./src/common/aa.js ***!
  \**************************/
/*! exports provided: del */
/***/ (function(module, exports, __webpack_require__, $app_define$, $app_bootstrap$, $app_require$, $app_define_wrap$) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
function del (a, b) {
  return a - b
}

/***/ }),

/***/ "./src/common1/aa.js":
/*!***************************!*\
  !*** ./src/common1/aa.js ***!
  \***************************/
/*! exports provided: del */
/***/ (function(module, exports, __webpack_require__, $app_define$, $app_bootstrap$, $app_require$, $app_define_wrap$) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
function del (a, b) {
  return a - b
}

/***/ }),

/***/ "./src/d.js":
/*!******************!*\
  !*** ./src/d.js ***!
  \******************/
/*! exports provided: mod, d */
/***/ (function(module, exports, __webpack_require__, $app_define$, $app_bootstrap$, $app_require$, $app_define_wrap$) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mod", function() { return mod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return d; });
function mod(a, b) {
  return a % b
}
const d = 'd'

class ExtractChunksPlugin {
  constructor(options) {
    this.options = options
    this.chunkPath = options.chunkPath || 'Chunks'
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap(pluginName, compilation => {
      // 抽取公共chunk
      compilation.hooks.optimizeDependenciesAdvanced.tap(pluginName, modules => {
        for (const module of modules) {
          // 被依赖小于2，不会当做公共chunk进行抽取
          if (module.reasons.length < 2) continue

          const chunkName = module.resource.match(/\w+(?=\.)/gi)[0]
          const hasChunkName = hasChunk(chunkName, compilation)
          if (hasChunkName) continue

          const newChunk = compilation.addChunk(chunkName)
          debugger

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


/***/ })

}]);
//# sourceMappingURL=async-commons.js.map