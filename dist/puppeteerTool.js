(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'babel-runtime/regenerator', 'babel-runtime/core-js/map', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/core-js/promise', 'puppeteer', './model/eleEventTypes.model', './elementAnalysis'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/regenerator'), require('babel-runtime/core-js/map'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/core-js/promise'), require('puppeteer'), require('./model/eleEventTypes.model'), require('./elementAnalysis'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.regenerator, global.map, global.classCallCheck, global.createClass, global.promise, global.puppeteer, global.eleEventTypes, global.elementAnalysis);
        global.puppeteerTool = mod.exports;
    }
})(this, function (exports, _regenerator, _map, _classCallCheck2, _createClass2, _promise, _puppeteer, _eleEventTypes, _elementAnalysis) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _regenerator2 = _interopRequireDefault(_regenerator);

    var _map2 = _interopRequireDefault(_map);

    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

    var _createClass3 = _interopRequireDefault(_createClass2);

    var _promise2 = _interopRequireDefault(_promise);

    var _eleEventTypes2 = _interopRequireDefault(_eleEventTypes);

    var _elementAnalysis2 = _interopRequireDefault(_elementAnalysis);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
        return new (P || (P = _promise2.default))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : new P(function (resolve) {
                    resolve(result.value);
                }).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    var puppeteerTool = function () {
        function puppeteerTool(url) {
            (0, _classCallCheck3.default)(this, puppeteerTool);

            this.eventFunMap = new _map2.default();
            this.url = url;
            this.eventFunMap.set(_eleEventTypes2.default.Click, this.createOperator('click', true));
            this.eventFunMap.set(_eleEventTypes2.default.Hover, this.createOperator('hover'));
            this.eventFunMap.set(_eleEventTypes2.default.Focus, this.createOperator('focus'));
            this.eventFunMap.set(_eleEventTypes2.default.Input, this.createOperator('type', true));
        }

        (0, _createClass3.default)(puppeteerTool, [{
            key: 'init',
            value: function init() {
                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return (0, _puppeteer.launch)({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

                                case 2:
                                    this.browser = _context.sent;
                                    _context.next = 5;
                                    return this.browser.newPage();

                                case 5:
                                    this.page = _context.sent;
                                    _context.next = 8;
                                    return this.page.goto(this.url.toString(), { waitUntil: ['load', 'domcontentloaded'] });

                                case 8:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            }
        }, {
            key: 'getErrorInfo',
            value: function getErrorInfo(selector) {
                var curUrl = this.page.url();
                return '\u5728' + curUrl + '\u8FD9\u4E2A\u9875\u9762\uFF0C\u4F7F\u7528document.querySelectorAll(' + selector.select + ')\u67E5\u627E\u5230\u7684\u5143\u7D20\u6CA1\u6709\u7B2C' + selector.sameSelectIndex + '\u4E2A';
            }
        }, {
            key: 'getEleHandle',
            value: function getEleHandle(selector) {
                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
                    var eleHandle;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return this.page.$$(selector.select);

                                case 2:
                                    eleHandle = _context2.sent;

                                    if (!(selector.sameSelectIndex !== null && selector.sameSelectIndex !== undefined)) {
                                        _context2.next = 9;
                                        break;
                                    }

                                    if (!(eleHandle.length > selector.sameSelectIndex)) {
                                        _context2.next = 8;
                                        break;
                                    }

                                    return _context2.abrupt('return', eleHandle[selector.sameSelectIndex]);

                                case 8:
                                    throw new Error(this.getErrorInfo(selector));

                                case 9:
                                    return _context2.abrupt('return', eleHandle);

                                case 10:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));
            }
        }, {
            key: 'clearAll',
            value: function clearAll() {
                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    if (!this.browser) {
                                        _context3.next = 3;
                                        break;
                                    }

                                    _context3.next = 3;
                                    return this.browser.close();

                                case 3:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));
            }
        }, {
            key: 'getEleModal',
            value: function getEleModal(selector) {
                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee4() {
                    var eleHandle, html, eleHandleLength, index;
                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    if (this.page) {
                                        _context4.next = 3;
                                        break;
                                    }

                                    _context4.next = 3;
                                    return this.init();

                                case 3:
                                    selector = selector || {
                                        select: 'body',
                                        sameSelectIndex: null
                                    };
                                    _context4.next = 6;
                                    return this.getEleHandle(selector);

                                case 6:
                                    eleHandle = _context4.sent;
                                    html = '';
                                    eleHandleLength = eleHandle.length;
                                    index = 0;

                                case 10:
                                    if (!(index < eleHandleLength)) {
                                        _context4.next = 17;
                                        break;
                                    }

                                    _context4.next = 13;
                                    return this.page.evaluate(function (body) {
                                        return body.outerHTML;
                                    }, eleHandle[index]);

                                case 13:
                                    html += _context4.sent;

                                case 14:
                                    ++index;
                                    _context4.next = 10;
                                    break;

                                case 17:
                                    return _context4.abrupt('return', new _elementAnalysis2.default().main(html, selector.select));

                                case 18:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this);
                }));
            }
        }, {
            key: 'shotEle',
            value: function shotEle(options, selector) {
                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee5() {
                    var eleHandle;
                    return _regenerator2.default.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    if (this.page) {
                                        _context5.next = 3;
                                        break;
                                    }

                                    _context5.next = 3;
                                    return this.init();

                                case 3:
                                    if (!(selector && selector.select)) {
                                        _context5.next = 12;
                                        break;
                                    }

                                    _context5.next = 6;
                                    return this.getEleHandle(selector);

                                case 6:
                                    eleHandle = _context5.sent;
                                    _context5.next = 9;
                                    return eleHandle.screenshot(options);

                                case 9:
                                    return _context5.abrupt('return', _context5.sent);

                                case 12:
                                    _context5.next = 14;
                                    return this.page.screenshot(options);

                                case 14:
                                    return _context5.abrupt('return', _context5.sent);

                                case 15:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this);
                }));
            }
        }, {
            key: 'waitForRequestPromise',
            value: function waitForRequestPromise(waitForRequest, returnRes) {
                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee6() {
                    var _this = this;

                    var newPromise;
                    return _regenerator2.default.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    newPromise = new _promise2.default(function (resolve, reject) {
                                        if (waitForRequest === true) {
                                            _this.page.on('requestfinished', function () {
                                                resolve(returnRes);
                                            });
                                        } else {
                                            resolve(returnRes);
                                        }
                                    });
                                    return _context6.abrupt('return', newPromise);

                                case 2:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this);
                }));
            }
        }, {
            key: 'operator',
            value: function operator(eleOperatorModel) {
                var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                var regetEle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee7() {
                    var res;
                    return _regenerator2.default.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    if (this.page) {
                                        _context7.next = 3;
                                        break;
                                    }

                                    _context7.next = 3;
                                    return this.init();

                                case 3:
                                    if (!this.eventFunMap.has(eleOperatorModel.eventType)) {
                                        _context7.next = 6;
                                        break;
                                    }

                                    _context7.next = 6;
                                    return this.eventFunMap.get(eleOperatorModel.eventType)(eleOperatorModel);

                                case 6:
                                    if (!(regetEle === false && selector === null)) {
                                        _context7.next = 8;
                                        break;
                                    }

                                    return _context7.abrupt('return', null);

                                case 8:
                                    res = this.getEleModal(selector);
                                    return _context7.abrupt('return', res);

                                case 10:
                                case 'end':
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this);
                }));
            }
        }, {
            key: 'createOperator',
            value: function createOperator(operator, needValue) {
                var _this2 = this;

                return function (eleOperatorModel) {
                    return __awaiter(_this2, void 0, void 0, _regenerator2.default.mark(function _callee8() {
                        var allWaitPromise, waitOptions, eleHandles;
                        return _regenerator2.default.wrap(function _callee8$(_context8) {
                            while (1) {
                                switch (_context8.prev = _context8.next) {
                                    case 0:
                                        allWaitPromise = [];

                                        //如果有页面跳转或者reload
                                        if (eleOperatorModel.waitForNavigation) {
                                            waitOptions = {
                                                timeout: 10000,
                                                waitUntil: 'networkidle0'
                                            };

                                            allWaitPromise.push(this.page.waitForNavigation(waitOptions));
                                        }

                                        if (!eleOperatorModel.selector.sameSelectIndex) {
                                            _context8.next = 9;
                                            break;
                                        }

                                        _context8.next = 5;
                                        return this.getEleHandle(eleOperatorModel.selector);

                                    case 5:
                                        eleHandles = _context8.sent;

                                        allWaitPromise.push(needValue ? eleHandles[operator](eleOperatorModel.value) : eleHandles[operator]());
                                        _context8.next = 10;
                                        break;

                                    case 9:
                                        allWaitPromise.push(needValue ? this.page[operator](eleOperatorModel.selector.select, eleOperatorModel.value) : this.page[operator](eleOperatorModel.selector.select));

                                    case 10:
                                        return _context8.abrupt('return', _promise2.default.all(allWaitPromise));

                                    case 11:
                                    case 'end':
                                        return _context8.stop();
                                }
                            }
                        }, _callee8, this);
                    }));
                };
            }
        }]);
        return puppeteerTool;
    }();

    exports.default = puppeteerTool;
});