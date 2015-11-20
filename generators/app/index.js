'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _yeomanGenerator = require('yeoman-generator');

var _yeomanWelcome = require('yeoman-welcome');

var _yeomanWelcome2 = _interopRequireDefault(_yeomanWelcome);

/**
 * Base Generator class
 */

var Ionic2 = (function (_Base) {
  _inherits(Ionic2, _Base);

  function Ionic2() {
    _classCallCheck(this, Ionic2);

    _get(Object.getPrototypeOf(Ionic2.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Ionic2, [{
    key: 'method1',
    value: function method1() {
      console.log(_yeomanWelcome2['default']);
    }
  }, {
    key: 'prompting',
    get: function get() {
      return {
        appName: function appName() {
          var _this = this;

          var done = this.async();
          var prompt = [{
            type: 'input',
            name: 'appName',
            message: 'Enter a name for your app:'
          }];

          this.prompt(prompt, function (_ref) {
            var appName = _ref.appName;

            _this.options.appName = appName;
            done();
          });
        }
      };
    }
  }]);

  return Ionic2;
})(_yeomanGenerator.Base);

exports['default'] = Ionic2;
module.exports = exports['default'];