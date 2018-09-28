(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './elementAnalysis', './puppeteerTool', './model/attributeTypes.model', './model/eleEventTypes.model', './model/element.model', './model/elementOperator.model', './model/elementSelectKey.model', './model/elementTypes.model'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./elementAnalysis'), require('./puppeteerTool'), require('./model/attributeTypes.model'), require('./model/eleEventTypes.model'), require('./model/element.model'), require('./model/elementOperator.model'), require('./model/elementSelectKey.model'), require('./model/elementTypes.model'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.elementAnalysis, global.puppeteerTool, global.attributeTypes, global.eleEventTypes, global.element, global.elementOperator, global.elementSelectKey, global.elementTypes);
    global.index = mod.exports;
  }
})(this, function (exports, _elementAnalysis, _puppeteerTool, _attributeTypes, _eleEventTypes, _element, _elementOperator, _elementSelectKey, _elementTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ElementTypes = exports.ElementSelectKey = exports.EleOperatorModel = exports.ElementModel = exports.EleEventTypes = exports.AttributeTypes = exports.ElementAnalysis = exports.PuppeteerTool = undefined;

  var _elementAnalysis2 = _interopRequireDefault(_elementAnalysis);

  var _puppeteerTool2 = _interopRequireDefault(_puppeteerTool);

  var _attributeTypes2 = _interopRequireDefault(_attributeTypes);

  var _eleEventTypes2 = _interopRequireDefault(_eleEventTypes);

  var _element2 = _interopRequireDefault(_element);

  var _elementOperator2 = _interopRequireDefault(_elementOperator);

  var _elementSelectKey2 = _interopRequireDefault(_elementSelectKey);

  var _elementTypes2 = _interopRequireDefault(_elementTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.PuppeteerTool = _puppeteerTool2.default;
  exports.ElementAnalysis = _elementAnalysis2.default;
  exports.AttributeTypes = _attributeTypes2.default;
  exports.EleEventTypes = _eleEventTypes2.default;
  exports.ElementModel = _element2.default;
  exports.EleOperatorModel = _elementOperator2.default;
  exports.ElementSelectKey = _elementSelectKey2.default;
  exports.ElementTypes = _elementTypes2.default;
});