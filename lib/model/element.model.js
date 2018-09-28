(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'babel-runtime/core-js/map', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', './attributeTypes.model', './elementSelectKey.model'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('babel-runtime/core-js/map'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('./attributeTypes.model'), require('./elementSelectKey.model'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.map, global.classCallCheck, global.createClass, global.attributeTypes, global.elementSelectKey);
        global.elementModel = mod.exports;
    }
})(this, function (exports, _map, _classCallCheck2, _createClass2, _attributeTypes, _elementSelectKey) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _map2 = _interopRequireDefault(_map);

    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

    var _createClass3 = _interopRequireDefault(_createClass2);

    var _attributeTypes2 = _interopRequireDefault(_attributeTypes);

    var _elementSelectKey2 = _interopRequireDefault(_elementSelectKey);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var ElementModel = function () {
        function ElementModel(type) {
            (0, _classCallCheck3.default)(this, ElementModel);

            this.type = type;
            this.childrens = new Array();
            this.elementSelectKey = new _elementSelectKey2.default();
        }

        (0, _createClass3.default)(ElementModel, [{
            key: 'setAttribute',
            value: function setAttribute(name, value) {
                if (name.toString() in _attributeTypes2.default) {
                    this[_attributeTypes2.default[name.toString()]] = value;
                } else {
                    if (!this.attributes) {
                        this.attributes = new _map2.default();
                    }
                    this.attributes.set(name, value || true);
                }
            }
        }, {
            key: 'addChildren',
            value: function addChildren(typeOrNode) {
                if (typeOrNode instanceof ElementModel) {
                    this.childrens.push(typeOrNode);
                    return typeOrNode;
                } else {
                    this.childrens.push(new ElementModel(typeOrNode));
                    return this.childrens[this.childrens.length - 1];
                }
            }
        }, {
            key: 'removeChildren',
            value: function removeChildren(index) {
                if (this.childrens) {
                    if (!index) {
                        this.childrens.pop();
                    } else if (this.childrens.length > index) {
                        this.childrens.splice(index, 1);
                    }
                }
            }
        }]);
        return ElementModel;
    }();

    exports.default = ElementModel;

    ;
});