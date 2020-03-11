/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","sync-commons~app~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/d.js":
/*!******************!*\
  !*** ./src/d.js ***!
  \******************/
/*! exports provided: mod, d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mod", function() { return mod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return d; });
function mod(a, b) {
  return a % b
}
const d = 'd'

// class ExtractChunksPlugin {
//   constructor(options) {
//     this.options = options
//     this.chunkPath = options.chunkPath || 'Chunks'
//   }

//   apply(compiler) {
//     compiler.hooks.thisCompilation.tap(pluginName, compilation => {
//       // 抽取公共chunk
//       compilation.hooks.optimizeDependenciesAdvanced.tap(pluginName, modules => {
//         for (const module of modules) {
//           // 被依赖小于2，不会当做公共chunk进行抽取
//           if (module.reasons.length < 2) continue

//           const chunkName = module.resource.match(/\w+(?=\.)/gi)[0]
//           const hasChunkName = hasChunk(chunkName, compilation)
//           if (hasChunkName) continue

//           const newChunk = compilation.addChunk(chunkName)
//           debugger

//           // Module内部会进行关联，这个方法判断如果已经存在这个chunk，则返回false；
//           if (module.addChunk(newChunk)) {
//             newChunk.addModule(module)
//             extractModules.set(chunkName, module)
//           }

//           if (newChunk.groupsIterable.chunkGroup) {
//             newChunk.groupsIterable.chunkGroup.addChild(newChunk)
//           }

//           newChunk.hasExistedChunk = true
//         }
//       })

//       // 移除页面Chunk中已经存在的公共module，因为这个公共module已经以单独chunk的形式存在
//       compilation.hooks.optimizeChunks.tap(pluginName, chunks => {
//         chunks.forEach(chunk => {
//           extractModules.forEach(module => {
//             if (chunk.containsModule(module) && chunk.hasEntryModule()) {
//               chunk.removeModule(module)
//               module.removeChunk(chunk)
//             }
//           })
//         })
//       })

//       // 各个chunk配置附加参数及全局quickappGlobal
//       compilation.hooks.chunkAsset.tap(pluginName, (chunk, filename) => {
//         const sourceChildren = compilation.assets[filename]._source.children

//         let _actualParamStr = actualParamStr
//         let _formalParamStr = formalParamStr
//         if (chunk.entryModule) {
//           // sourceChildren.splice(1, 0, quickappGlobal)
//           _actualParamStr = actualModuleRequireParam
//             .concat(appModuleRequireNativeFunctions)
//             .join(', ')
//           _formalParamStr = formalModuleRequireParam
//             .concat(appModuleRequireNativeFunctions)
//             .join(', ')
//         }

//         sourceChildren.forEach((item, index) => {
//           // 运行时的源码形式
//           if (item.constructor.name === 'PrefixSource') {
//             let content = item._source._value
//             // window -> global
//             content = windowReplaceWithGlobal(content)
//             content = content.replace(
//               /(?<=(if\(installedChunks\[depId\]\s+!==\s+0\)\s+))fulfilled\s+=\s+false;/,
//               '{ fulfilled = false; $app_evaluate$(`${quickappGlobal.chunkFileMap[depId]}.js`); }' // eslint-disable-line
//             )
//             // 引入额外方法
//             content = content.replace(
//               /(?<=(modules\[moduleId\].call\())module.exports,\s+module,\s+module.exports,\s+__webpack_require__/,
//               _actualParamStr
//             )
//             item._source._value = content
//           } else if (item.constructor.name === 'String') {
//             // window -> global
//             let content = windowReplaceWithGlobal(item)
//             // 引入额外方法
//             content = content.replace(
//               /(?<=function\()module,\s+__webpack_exports__(,\s+__webpack_require__)?/,
//               _formalParamStr
//             )
//             sourceChildren[index] = content
//           }
//         })

//         // 抽取的chunk放到配置的（默认为Chunks）文件夹下
//         if (chunk.hasExistedChunk) {
//           let tempFile = compilation.assets[filename]
//           delete compilation.assets[filename]
//           let newFilename = this.chunkPath + '/' + filename
//           chunk.files = chunk.files.map(item => {
//             if (item === filename) {
//               return newFilename
//             }
//           })
//           compilation.assets[newFilename] = tempFile
//         }
//       })

//       // 把引用公共chunk的方式替换为$app_evaluate$
//       compilation.moduleTemplates.javascript.hooks.render.tap(
//         pluginName,
//         moduleSourcePostModule => {
//           // 配置为sourcemap的源码形式
//           if (moduleSourcePostModule.constructor.name === 'CachedSource') {
//             let source = moduleSourcePostModule._source
//             if (
//               source &&
//               source.constructor.name === 'ReplaceSource' &&
//               source.replacements &&
//               source.replacements.length
//             ) {
//               source.replacements.map(items => {
//                 let chunkName =
//                   items.content.match(/\w+(?=\.js)/gi) && items.content.match(/\w+(?=\.js)/gi)[0]
//                 let chunkPath = `${compiler.outputPath}/${this.chunkPath}/${chunkName}.js`
//                 items.content = items.content.replace(
//                   /\s=\s__webpack_require__\((.+?)\);/,
//                   ` = $app_evaluate$('${chunkPath}');` // eslint-disable-line
//                 )
//               })
//             }
//             moduleSourcePostModule._source = source
//           } else if (moduleSourcePostModule.constructor.name === 'RawSource') {
//             // 默认为eval的源码形式
//             let value = moduleSourcePostModule._value
//             if (value) {
//               let chunkName = value.match(/\s=\s__webpack_require__\((.+?)\);/gi)
//               chunkName && chunkName.map(item => {
//                 item = item.match(/(\w+)\s+/ig) && item.match(/(\w+)\s+/ig)[0] && item.match(/(\w+)\s+/ig)[0].slice(0, -1)
//                 if(!extractModules.get(item)) return
//                 let chunkPath = `${compiler.outputPath}/${this.chunkPath}/${item}.js`
//                 value = value.replace(
//                   new RegExp(` = __webpack_require__((.+?)${item}(.+?));`, 'i'),
//                   ` = $app_evaluate$('${chunkPath}');` // eslint-disable-line
//                 )
//               })
//             }
//             moduleSourcePostModule._value = value
//           }
//         }
//       )
//     })
//   }
// }


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./b */ "./src/b.js");
/* harmony import */ var _d__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./d */ "./src/d.js");


// import './a.scss'
// import { del } from './common1/aa'
// import { del as del1 } from './common/aa'
// import Vue from 'vue'
Object(_b__WEBPACK_IMPORTED_MODULE_0__["add"])(1, 2)
// del(1, 2)
// del1(1, 2)
Object(_d__WEBPACK_IMPORTED_MODULE_1__["mod"])(100, 11)

/***/ })

/******/ });
//# sourceMappingURL=index.js.map