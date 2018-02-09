(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("anodum"));
	else if(typeof define === 'function' && define.amd)
		define(["anodum"], factory);
	else if(typeof exports === 'object')
		exports["domma"] = factory(require("anodum"));
	else
		root["domma"] = factory(root["anodum"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mutationDriver = __webpack_require__(3);

var _mutationDriver2 = _interopRequireDefault(_mutationDriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Domma = function () {
  function Domma(options) {
    var _this = this;

    _classCallCheck(this, Domma);

    this.config = {
      childList: true,
      attributes: true,
      attributeOldValue: true,
      characterData: true,
      characterDataOldValue: true,
      subtree: true
    };

    this.driver = new _mutationDriver2.default(options);
    this.transactionStatus = 'resolved';
    this.transactionObserver = new MutationObserver(this.driver.conductTransaction);
    this.additiveEmitter = function (mutations) {
      if (_this.isTransactionPending()) return;
      _this.driver.addAdditiveMutations(mutations);
    };
    this.mutationObserver = new MutationObserver(this.additiveEmitter);
  }

  _createClass(Domma, [{
    key: 'connectStaticDocument',
    value: function connectStaticDocument(staticDOM) {
      this.driver.connectStaticDocument(staticDOM);
    }
  }, {
    key: 'composeLiveDocument',
    value: function composeLiveDocument() {
      var staticDOM = this.driver.getStaticDocument();

      if (!staticDOM) {
        throw new ReferenceError('static document is not connected');
      }

      var liveDOM = this.driver.referenceMap.composeLiveReference(staticDOM);

      this.connectLiveDocument(liveDOM);
    }
  }, {
    key: 'connectLiveDocument',
    value: function connectLiveDocument(liveDOM) {
      this.mutationObserver.disconnect();
      this.driver.connectLiveDocument(liveDOM);
      this.mutationObserver.observe(liveDOM, this.config);
    }
  }, {
    key: 'getStaticDocument',
    value: function getStaticDocument() {
      return this.driver.getStaticDocument();
    }
  }, {
    key: 'getLiveDocument',
    value: function getLiveDocument() {
      return this.driver.getLiveDocument();
    }
  }, {
    key: 'isTransactionResolved',
    value: function isTransactionResolved() {
      return this.transactionStatus === 'resolved';
    }
  }, {
    key: 'isTransactionPending',
    value: function isTransactionPending() {
      return this.transactionStatus === 'pending';
    }
  }, {
    key: 'conductTransaction',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(transaction) {
        var liveDOM;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                liveDOM = this.driver.getLiveDocument();

                if (liveDOM) {
                  _context.next = 3;
                  break;
                }

                throw new ReferenceError('live document is not connected');

              case 3:
                _context.next = 5;
                return 'pending';

              case 5:
                this.transactionStatus = _context.sent;
                _context.next = 8;
                return this.transactionObserver.observe(liveDOM, this.config);

              case 8:
                _context.next = 10;
                return transaction(liveDOM);

              case 10:
                _context.next = 12;
                return this.transactionObserver.disconnect();

              case 12:
                _context.next = 14;
                return 'resolved';

              case 14:
                this.transactionStatus = _context.sent;
                return _context.abrupt('return', this.driver.getLastTransaction());

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function conductTransaction(_x) {
        return _ref.apply(this, arguments);
      }

      return conductTransaction;
    }()
  }]);

  return Domma;
}();

exports.default = Domma;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _anodum = __webpack_require__(0);

var _mutationTypes = __webpack_require__(4);

var _mutationTypes2 = _interopRequireDefault(_mutationTypes);

var _referenceMap = __webpack_require__(6);

var _referenceMap2 = _interopRequireDefault(_referenceMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MutationDriver = function () {
  function MutationDriver(options) {
    _classCallCheck(this, MutationDriver);

    this.options = _extends({
      onBeforeSync: function onBeforeSync() {},
      onAfterSync: function onAfterSync() {}
    }, options);
    this.additiveMutations = [];
    this.lastTransaction = undefined;
    this.referenceMap = new _referenceMap2.default(options);

    this.conductTransaction = this.conductTransaction.bind(this);
    this.conductMutation = this.conductMutation.bind(this);
    this.reduceAdditiveMutations = this.reduceAdditiveMutations.bind(this);
  }

  _createClass(MutationDriver, [{
    key: 'connectStaticDocument',
    value: function connectStaticDocument(staticDOM) {
      if (!(0, _anodum.isDocumentNode)(staticDOM)) {
        throw new TypeError('staticDOM is not a Document');
      }

      this.staticDOM = staticDOM;
    }
  }, {
    key: 'connectLiveDocument',
    value: function connectLiveDocument(liveDOM) {
      if (!(0, _anodum.isDocumentNode)(liveDOM)) {
        throw new TypeError('liveDOM is not a Document');
      }

      this.liveDOM = liveDOM;
    }
  }, {
    key: 'getStaticDocument',
    value: function getStaticDocument() {
      return this.staticDOM;
    }
  }, {
    key: 'getLiveDocument',
    value: function getLiveDocument() {
      return this.liveDOM;
    }
  }, {
    key: 'ejectAdditiveReferenceMapMutations',
    value: function ejectAdditiveReferenceMapMutations(liveElement) {
      var containerNode = this.referenceMap.getReference(liveElement);
      this.referenceMap.unbind(containerNode);
    }
  }, {
    key: 'ejectAdditiveAttributeMutation',
    value: function ejectAdditiveAttributeMutation(liveElement, mutation) {
      var attributeName = mutation.attributeName,
          oldValue = mutation.oldValue;

      var containerId = this.referenceMap.getReferenceId(liveElement);

      if (oldValue) {
        this.referenceMap.setReferenceAttribute(containerId, attributeName, oldValue);
      } else {
        this.referenceMap.removeReferenceAttribute(containerId, attributeName);
      }
    }
  }, {
    key: 'ejectAdditiveChildListMutation',
    value: function ejectAdditiveChildListMutation(liveElement, mutation) {
      var _this = this;

      var containerNode = this.referenceMap.getReference(liveElement);
      var addedNodes = mutation.addedNodes,
          removedNodes = mutation.removedNodes;


      var nextLiveSibling = mutation.nextSibling;
      if (removedNodes.length && addedNodes.length) {
        nextLiveSibling = addedNodes[addedNodes.length - 1].nextSibling;
      } else if (removedNodes.length) {
        var previousSibling = mutation.previousSibling,
            nextSibling = mutation.nextSibling;

        var node = nextSibling;
        while (node) {
          if (previousSibling === node.previousSibling) {
            nextLiveSibling = node;
            break;
          }
          node = node.previousSibling;
        }
      }

      var nextStaticSibling = void 0;
      if (nextLiveSibling && nextLiveSibling.parentNode) {
        var liveNodes = Array.prototype.slice.call(nextLiveSibling.parentNode.childNodes);
        var liveIndex = liveNodes.indexOf(nextLiveSibling);
        nextStaticSibling = containerNode.childNodes[liveIndex];
      }

      var prevLiveSibling = mutation.previousSibling;

      var prevStaticSibling = void 0;
      if (prevLiveSibling && prevLiveSibling.parentNode) {
        var _liveNodes = Array.prototype.slice.call(prevLiveSibling.parentNode.childNodes);
        var _liveIndex = _liveNodes.indexOf(prevLiveSibling);
        prevStaticSibling = containerNode.childNodes[_liveIndex];
      }

      addedNodes.forEach(function (addedLiveNode) {
        if ((0, _anodum.isElementNode)(addedLiveNode)) {
          var id = _this.referenceMap.getReferenceId(addedLiveNode);
          _this.referenceMap.removeReference(id);
          _this.referenceMap.unbind(addedLiveNode);
        } else {
          var staticNode = void 0;
          if (nextStaticSibling) {
            staticNode = nextStaticSibling.previousSibling;
          } else if (prevStaticSibling && prevStaticSibling.nextSibling) {
            staticNode = prevStaticSibling.nextSibling;
          } else {
            staticNode = containerNode.firstChild;
          }
          containerNode.removeChild(staticNode);
        }
      });

      removedNodes.forEach(function (removedLiveNode) {
        var staticNode = void 0;
        if ((0, _anodum.isElementNode)(removedLiveNode)) {
          staticNode = _this.referenceMap.getReference(removedLiveNode);
        } else {
          staticNode = removedLiveNode.cloneNode();
          var textMutations = _this.getAdditiveMutations(removedLiveNode);
          textMutations.forEach(function (textMutation) {
            staticNode.nodeValue = textMutation.oldValue;
          });
        }

        if (nextStaticSibling) {
          containerNode.insertBefore(staticNode, nextStaticSibling);
        } else if (prevStaticSibling && prevStaticSibling.nextSibling) {
          containerNode.insertBefore(staticNode, prevStaticSibling.nextSibling);
        } else {
          containerNode.appendChild(staticNode);
        }
      });
    }
  }, {
    key: 'ejectAdditiveMutations',
    value: function ejectAdditiveMutations(liveElement) {
      var _this2 = this;

      (0, _anodum.traverseNode)(liveElement, function (lNode) {
        var mutations = _this2.getAdditiveMutations(lNode);

        _this2.ejectAdditiveReferenceMapMutations(lNode);

        mutations.reverse().forEach(function (mutation) {
          switch (mutation.type) {
            case _mutationTypes2.default.attributes:
              _this2.ejectAdditiveAttributeMutation(lNode, mutation);
              break;
            default:
              _this2.ejectAdditiveChildListMutation(lNode, mutation);
              break;
          }
        });
      });
    }
  }, {
    key: 'addAdditiveMutations',
    value: function addAdditiveMutations(mutations) {
      this.additiveMutations = this.additiveMutations.concat(mutations);
    }
  }, {
    key: 'reduceAdditiveMutations',
    value: function reduceAdditiveMutations(liveNode) {
      var _this3 = this;

      var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _mutationTypes2.default.all;

      var additiveMutations = this.getAdditiveMutations(liveNode, types);

      additiveMutations.forEach(function (mutation) {
        var index = _this3.additiveMutations.indexOf(mutation);
        _this3.additiveMutations.splice(index, 1);
        mutation.addedNodes.forEach(function (node) {
          return _this3.reduceAdditiveMutations(node);
        });
        mutation.removedNodes.forEach(function (node) {
          return _this3.reduceAdditiveMutations(node);
        });
      });
    }
  }, {
    key: 'getAdditiveMutations',
    value: function getAdditiveMutations(liveNode) {
      var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _mutationTypes2.default.all;

      return this.additiveMutations.filter(function (mutation) {
        var sameTarget = mutation.target === liveNode;
        var validType = types.indexOf(mutation.type) > -1;
        return sameTarget && validType;
      });
    }
  }, {
    key: 'conductAttributeMutation',
    value: function conductAttributeMutation(mutation) {
      var liveNode = mutation.target;
      var reference = this.referenceMap.getReference(liveNode);
      var referenceId = this.referenceMap.getReferenceId(liveNode);
      var attribute = mutation.attributeName;

      this.options.onBeforeSync(reference);
      if (liveNode.hasAttribute(attribute)) {
        var value = liveNode.getAttribute(attribute);
        this.referenceMap.setReferenceAttribute(referenceId, attribute, value);
      } else {
        this.referenceMap.removeReferenceAttribute(referenceId, attribute);
      }
      this.options.onAfterSync(reference);
    }
  }, {
    key: 'conductCharacterDataMutation',
    value: function conductCharacterDataMutation(mutation) {
      var liveNode = mutation.target.parentNode;
      var reference = this.referenceMap.getReference(liveNode);
      var referenceId = this.referenceMap.getReferenceId(liveNode);
      this.reduceAdditiveMutations(mutation.target, [_mutationTypes2.default.characterData]);
      this.options.onBeforeSync(reference);
      var newReference = this.referenceMap.replaceReference(liveNode, referenceId);
      this.ejectAdditiveMutations(liveNode);
      this.referenceMap.flush();
      this.options.onAfterSync(newReference);
    }
  }, {
    key: 'conductChildListMutation',
    value: function conductChildListMutation(mutation) {
      var liveNode = mutation.target;
      var reference = this.referenceMap.getReference(liveNode);
      var referenceId = this.referenceMap.getReferenceId(liveNode);
      var addedNodes = mutation.addedNodes,
          removedNodes = mutation.removedNodes,
          nextSibling = mutation.nextSibling,
          previousSibling = mutation.previousSibling;

      // for target.innerHTML or target.replacedChild

      if (addedNodes.length && removedNodes.length && !nextSibling && !previousSibling) {
        this.reduceAdditiveMutations(liveNode, [_mutationTypes2.default.childList]);
      }

      this.options.onBeforeSync(reference);
      var newReference = this.referenceMap.replaceReference(liveNode, referenceId);
      this.ejectAdditiveMutations(liveNode);
      this.referenceMap.flush();
      this.options.onAfterSync(newReference);
    }
  }, {
    key: 'conductMutation',
    value: function conductMutation(mutation) {
      switch (mutation.type) {
        case _mutationTypes2.default.attributes:
          if (!this.referenceMap.hasReference(mutation.target)) return;
          this.conductAttributeMutation(mutation);
          break;
        case _mutationTypes2.default.characterData:
          if (!this.referenceMap.hasReference(mutation.target.parentNode)) return;
          this.conductCharacterDataMutation(mutation);
          break;
        default:
          if (!this.referenceMap.hasReference(mutation.target)) return;
          this.conductChildListMutation(mutation);
          break;
      }
    }
  }, {
    key: 'conductTransaction',
    value: function conductTransaction(mutations) {
      var transaction = mutations;
      transaction.forEach(this.conductMutation);
      this.lastTransaction = transaction;
    }
  }, {
    key: 'getLastTransaction',
    value: function getLastTransaction() {
      return this.lastTransaction;
    }
  }]);

  return MutationDriver;
}();

exports.default = MutationDriver;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  all: ['childList', 'attributes', 'characterData'],
  characterData: 'characterData',
  attributes: 'attributes',
  childList: 'childList'
};

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generateUuid = __webpack_require__(7);

var _generateUuid2 = _interopRequireDefault(_generateUuid);

var _anodum = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReferenceMap = function () {
  function ReferenceMap(options) {
    _classCallCheck(this, ReferenceMap);

    this.options = _extends({
      referenceAttribute: 'data-uuid',
      forEachReferenceSave: function forEachReferenceSave() {}
    }, options);
    this.map = {};
  }

  _createClass(ReferenceMap, [{
    key: 'saveReference',
    value: function saveReference(liveNode, staticNode) {
      var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _generateUuid2.default)();

      liveNode.setAttribute(this.options.referenceAttribute, id);
      this.map[id] = { staticNode: staticNode };
      return id;
    }
  }, {
    key: 'composeStaticReference',
    value: function composeStaticReference(liveNode, id) {
      var _this = this;

      if (!(0, _anodum.isDocumentNode)(liveNode) && !(0, _anodum.isElementNode)(liveNode)) {
        throw new TypeError('liveNode is not neither Document nor Element');
      }

      var staticNode = liveNode.cloneNode(true);
      var rootPath = (0, _anodum.getTreePathOfNode)(liveNode);

      (0, _anodum.traverseNode)(liveNode, function (lNode, path) {
        if (!(0, _anodum.isElementNode)(lNode)) return;

        path.splice(0, rootPath.length, 0);

        var sNode = (0, _anodum.getNodeByTreePath)(staticNode, path);

        if (id && liveNode === lNode) {
          _this.saveReference(lNode, sNode, id);
        } else {
          _this.saveReference(lNode, sNode);
        }

        _this.options.forEachReferenceSave(lNode, sNode);
      }, true);

      return staticNode;
    }
  }, {
    key: 'composeLiveReference',
    value: function composeLiveReference(staticNode, id) {
      var _this2 = this;

      if (!(0, _anodum.isDocumentNode)(staticNode) && !(0, _anodum.isElementNode)(staticNode)) {
        throw new TypeError('staticNode is not neither Document nor Element');
      }

      var staticRoot = (0, _anodum.isDocumentNode)(staticNode) ? staticNode : staticNode.ownerDocument;
      var liveNode = staticNode.cloneNode(true);

      (0, _anodum.traverseNode)(liveNode, function (lNode, path) {
        if (!(0, _anodum.isElementNode)(lNode)) return;

        var sNode = (0, _anodum.getNodeByTreePath)(staticRoot, path);

        if (id && liveNode === lNode) {
          _this2.saveReference(lNode, sNode, id);
        } else {
          _this2.saveReference(lNode, sNode);
        }

        _this2.options.forEachReferenceSave(lNode, sNode);
      }, true);

      return liveNode;
    }
  }, {
    key: 'isReferenceId',
    value: function isReferenceId(id) {
      return Object.prototype.hasOwnProperty.call(this.map, id);
    }
  }, {
    key: 'getReferenceId',
    value: function getReferenceId(liveNode) {
      if (!(0, _anodum.isElementNode)(liveNode)) return undefined;
      return liveNode.getAttribute(this.options.referenceAttribute);
    }
  }, {
    key: 'getPreviousReferenceId',
    value: function getPreviousReferenceId(liveNode) {
      var referenceId = void 0;
      var node = liveNode.previousElementSibling;
      while (node) {
        referenceId = this.getReferenceId(node);
        if (referenceId) break;
        node = node.previousElementSibling;
      }

      return referenceId;
    }
  }, {
    key: 'getNextReferenceId',
    value: function getNextReferenceId(liveNode) {
      var referenceId = void 0;
      var node = liveNode.nextElementSibling;
      while (node) {
        referenceId = this.getReferenceId(node);
        if (referenceId) break;
        node = node.nextElementSibling;
      }

      return referenceId;
    }
  }, {
    key: 'getParentReferenceId',
    value: function getParentReferenceId(liveNode) {
      var referenceId = void 0;
      var node = liveNode.parentElement;
      while (node) {
        referenceId = this.getReferenceId(node);
        if (referenceId) break;
        node = node.parentElement;
      }

      return referenceId;
    }
  }, {
    key: 'hasReference',
    value: function hasReference(liveNode) {
      return this.isReferenceId(this.getReferenceId(liveNode));
    }
  }, {
    key: 'getReference',
    value: function getReference(liveNode) {
      var id = this.getReferenceId(liveNode);
      if (!this.isReferenceId(id)) return undefined;
      return this.map[id].staticNode;
    }
  }, {
    key: 'setReferenceAttribute',
    value: function setReferenceAttribute(id, attr, value) {
      if (!this.isReferenceId(id)) {
        throw new ReferenceError('reference with specified id is not found');
      }

      var staticNode = this.map[id].staticNode;

      staticNode.setAttribute(attr, value);
    }
  }, {
    key: 'hasReferenceAttribute',
    value: function hasReferenceAttribute(id, attr) {
      if (!this.isReferenceId(id)) {
        throw new ReferenceError('reference with specified id is not found');
      }

      var staticNode = this.map[id].staticNode;

      return staticNode.hasAttribute(attr);
    }
  }, {
    key: 'removeReferenceAttribute',
    value: function removeReferenceAttribute(id, attr) {
      if (!this.isReferenceId(id)) {
        throw new ReferenceError('reference with specified id is not found');
      }

      var staticNode = this.map[id].staticNode;

      staticNode.removeAttribute(attr);
    }
  }, {
    key: 'removeReference',
    value: function removeReference(id) {
      if (!this.isReferenceId(id)) {
        throw new ReferenceError('reference with specified id is not found');
      }

      var staticNode = this.map[id].staticNode;

      staticNode.parentNode.removeChild(staticNode);
      delete this.map[id];

      return staticNode;
    }
  }, {
    key: 'appendReference',
    value: function appendReference(liveNode, containerId) {
      if (!this.isReferenceId(containerId)) {
        throw new ReferenceError('reference with specified containerId is not found');
      }

      var staticContainer = this.map[containerId].staticNode;
      var staticNode = this.composeStaticReference(liveNode);

      staticContainer.appendChild(staticNode);

      return staticNode;
    }
  }, {
    key: 'insertReferenceBefore',
    value: function insertReferenceBefore(liveNode, siblingId) {
      if (!this.isReferenceId(siblingId)) {
        throw new ReferenceError('reference with specified siblingId is not found');
      }

      var siblingNode = this.map[siblingId].staticNode;
      var staticNode = this.composeStaticReference(liveNode);

      siblingNode.parentNode.insertBefore(staticNode, siblingNode);

      return staticNode;
    }
  }, {
    key: 'replaceReference',
    value: function replaceReference(liveNode, referenceId) {
      if (!this.isReferenceId(referenceId)) {
        throw new ReferenceError('reference with specified referenceId is not found');
      }

      var oldStaticElement = this.map[referenceId].staticNode;
      var newStaticElement = this.composeStaticReference(liveNode, referenceId);

      oldStaticElement.parentNode.replaceChild(newStaticElement, oldStaticElement);

      return newStaticElement;
    }
  }, {
    key: 'flush',
    value: function flush() {
      var _this3 = this;

      Object.keys(this.map).forEach(function (id) {
        var staticNode = _this3.map[id].staticNode;

        var node = staticNode;

        while (node && !(0, _anodum.isDocumentNode)(node)) {
          if (!node.parentNode) {
            delete _this3.map[id];
            return;
          }
          node = node.parentNode;
        }
      });
    }
  }, {
    key: 'unbind',
    value: function unbind(liveNode) {
      if (!(0, _anodum.isElementNode)(liveNode)) return;
      liveNode.removeAttribute(this.options.referenceAttribute);
    }
  }]);

  return ReferenceMap;
}();

exports.default = ReferenceMap;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function () {
  var lut = [];
  for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + i.toString(16);
  }

  var getRandomNumber = function () {
    return Math.random() * 0x100000000 >>> 0;
  };

  var d0 = getRandomNumber();
  var d1 = getRandomNumber();
  var d2 = getRandomNumber();
  var d3 = getRandomNumber();
  return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f >>> 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f >>> 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
};

/***/ })
/******/ ])["default"];
});