(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'babel-runtime/core-js/map', 'babel-runtime/core-js/json/stringify', 'babel-runtime/core-js/object/keys', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', './model/element.model', 'htmlparser2'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/core-js/map'), require('babel-runtime/core-js/json/stringify'), require('babel-runtime/core-js/object/keys'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('./model/element.model'), require('htmlparser2'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.map, global.stringify, global.keys, global.classCallCheck, global.createClass, global.element, global.htmlparser2);
        global.elementAnalysis = mod.exports;
    }
})(this, function (exports, _map, _stringify, _keys, _classCallCheck2, _createClass2, _element, htmlparser) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _map2 = _interopRequireDefault(_map);

    var _stringify2 = _interopRequireDefault(_stringify);

    var _keys2 = _interopRequireDefault(_keys);

    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

    var _createClass3 = _interopRequireDefault(_createClass2);

    var _element2 = _interopRequireDefault(_element);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var ElementAnalysis = function () {
        function ElementAnalysis() {
            var _this = this;

            (0, _classCallCheck3.default)(this, ElementAnalysis);

            this.onOpenTag = function (name, attributes) {
                try {
                    var newEle = new _element2.default(name);
                    _this.updateCurSelect(true, name);
                    var curSelectIndex = 0;
                    if (_this.selectKeyMap.has(_this.eleNodeSelect)) {
                        curSelectIndex = _this.selectKeyMap.get(_this.eleNodeSelect) + 1;
                    }
                    _this.selectKeyMap.set(_this.eleNodeSelect, curSelectIndex);
                    newEle.elementSelectKey.select = _this.eleNodeSelect.toString();
                    newEle.elementSelectKey.sameSelectIndex = curSelectIndex;
                    if (_this.curElementNode) {
                        _this.curElementNode.addChildren(newEle);
                    } else {
                        _this.rootElementModel.push(newEle);
                    }
                    _this.eleNodes.push(newEle);
                    _this.curElementNode = newEle;
                    (0, _keys2.default)(attributes).map(function (value) {
                        _this.curElementNode.setAttribute(value, attributes[value]);
                    });
                } catch (error) {
                    console.log((0, _stringify2.default)(_this.eleNodes));
                    console.log((0, _stringify2.default)(_this.rootElementModel));
                    throw new Error(error);
                }
            };
            this.onText = function (text) {
                if (_this.curElementNode) {
                    _this.curElementNode.content = text;
                }
            };
            this.onCloseTag = function (tagName) {
                _this.eleNodes.pop();
                _this.updateCurEle();
                _this.updateCurSelect(false);
            };
            this.rootElementModel = new Array();
            this.eleNodes = new Array();
            this.selectKeyMap = new _map2.default();
        }

        (0, _createClass3.default)(ElementAnalysis, [{
            key: 'updateCurEle',
            value: function updateCurEle() {
                if (this.eleNodes.length) {
                    this.curElementNode = this.eleNodes[this.eleNodes.length - 1];
                } else {
                    this.curElementNode = null;
                }
            }
        }, {
            key: 'updateCurSelect',
            value: function updateCurSelect(addOrMove, curType) {
                if (addOrMove) {
                    if (!this.eleNodeSelect) {
                        this.eleNodeSelect = this.preSelector || curType;
                    } else {
                        this.eleNodeSelect += '>' + curType;
                    }
                } else if (this.eleNodeSelect) {
                    var lastIndex = this.eleNodeSelect.lastIndexOf('>');
                    if (lastIndex !== -1) {
                        this.eleNodeSelect = this.eleNodeSelect.substr(0, lastIndex);
                    } else {
                        this.eleNodeSelect = null;
                    }
                }
            }
        }, {
            key: 'main',
            value: function main(html, preSelector) {
                this.preSelector = preSelector;
                var parser = new htmlparser.Parser({
                    onopentag: this.onOpenTag,
                    ontext: this.onText,
                    onclosetag: this.onCloseTag
                }, { decodeEntities: true });
                parser.write(html);
                parser.end();
                return this.rootElementModel;
            }
        }]);
        return ElementAnalysis;
    }();

    exports.default = ElementAnalysis;
});