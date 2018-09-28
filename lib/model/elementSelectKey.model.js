(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "babel-runtime/helpers/classCallCheck"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("babel-runtime/helpers/classCallCheck"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classCallCheck);
    global.elementSelectKeyModel = mod.exports;
  }
})(this, function (exports, _classCallCheck2) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ElementSelectKey = function ElementSelectKey() {
    (0, _classCallCheck3.default)(this, ElementSelectKey);
  };

  exports.default = ElementSelectKey;
});