(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../webpack-numbers/src/index.js":
/*!***************************************!*\
  !*** ../webpack-numbers/src/index.js ***!
  \***************************************/
/*! exports provided: numToWord, wordToNum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"numToWord\", function() { return numToWord; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wordToNum\", function() { return wordToNum; });\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"../webpack-numbers/node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ref_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ref.json */ \"../webpack-numbers/src/ref.json\");\nvar _ref_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./ref.json */ \"../webpack-numbers/src/ref.json\", 1);\n\n\n\nfunction numToWord(num) {\n  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.reduce(_ref_json__WEBPACK_IMPORTED_MODULE_1__, (accum, ref) => {\n    return ref.num === num ? ref.word : accum\n  }, '')\n}\n\nfunction wordToNum(word) {\n  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.reduce(_ref_json__WEBPACK_IMPORTED_MODULE_1__, (accum, ref) => {\n    return ref.word === word && word.toLowerCase() ? ref.num : accum\n  }, -1)\n}\n\nif ('serviceWorker' in navigator) {\n  window.addEventListener('load', () => {\n    navigator.serviceWorker.register('/sw.js').then(registration => {\n      console.log('SW registered: ', registration);\n    }).catch(registrationError => {\n      console.log('SW registration failed: ', registrationError);\n    });\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vd2VicGFjay1udW1iZXJzL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uLi93ZWJwYWNrLW51bWJlcnMvc3JjL2luZGV4LmpzP2Y4MjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IG51bVJlZiBmcm9tICcuL3JlZi5qc29uJ1xuXG5leHBvcnQgZnVuY3Rpb24gbnVtVG9Xb3JkKG51bSkge1xuICByZXR1cm4gXy5yZWR1Y2UobnVtUmVmLCAoYWNjdW0sIHJlZikgPT4ge1xuICAgIHJldHVybiByZWYubnVtID09PSBudW0gPyByZWYud29yZCA6IGFjY3VtXG4gIH0sICcnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd29yZFRvTnVtKHdvcmQpIHtcbiAgcmV0dXJuIF8ucmVkdWNlKG51bVJlZiwgKGFjY3VtLCByZWYpID0+IHtcbiAgICByZXR1cm4gcmVmLndvcmQgPT09IHdvcmQgJiYgd29yZC50b0xvd2VyQ2FzZSgpID8gcmVmLm51bSA6IGFjY3VtXG4gIH0sIC0xKVxufVxuXG5pZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignL3N3LmpzJykudGhlbihyZWdpc3RyYXRpb24gPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1NXIHJlZ2lzdGVyZWQ6ICcsIHJlZ2lzdHJhdGlvbik7XG4gICAgfSkuY2F0Y2gocmVnaXN0cmF0aW9uRXJyb3IgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ1NXIHJlZ2lzdHJhdGlvbiBmYWlsZWQ6ICcsIHJlZ2lzdHJhdGlvbkVycm9yKTtcbiAgICB9KTtcbiAgfSk7XG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../webpack-numbers/src/index.js\n");

/***/ }),

/***/ "../webpack-numbers/src/ref.json":
/*!***************************************!*\
  !*** ../webpack-numbers/src/ref.json ***!
  \***************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"[{\\\"num\\\":1,\\\"word\\\":\\\"One\\\"},{\\\"num\\\":2,\\\"word\\\":\\\"Two\\\"},{\\\"num\\\":3,\\\"word\\\":\\\"Three\\\"},{\\\"num\\\":4,\\\"word\\\":\\\"Four\\\"},{\\\"num\\\":5,\\\"word\\\":\\\"Five\\\"},{\\\"num\\\":0,\\\"word\\\":\\\"Zero\\\"}]\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vd2VicGFjay1udW1iZXJzL3NyYy9yZWYuanNvbi5qcyIsInNvdXJjZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../webpack-numbers/src/ref.json\n");

/***/ })

}]);