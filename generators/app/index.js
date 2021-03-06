'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _yeomanGenerator = require('yeoman-generator');

var _yeomanWelcome = require('yeoman-welcome');

var _yeomanWelcome2 = _interopRequireDefault(_yeomanWelcome);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cordovaLib = require('cordova-lib');

var _cordovaLib2 = _interopRequireDefault(_cordovaLib);

var _Validate = require('./../utils/Validate');

var _Validate2 = _interopRequireDefault(_Validate);

var _Plugins = require('./../utils/Plugins');

var _Plugins2 = _interopRequireDefault(_Plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

/**
* Base Generator class to create a empty project
*/

var GeneratorIonic2 = (function (_Base) {
  _inherits(GeneratorIonic2, _Base);

  function GeneratorIonic2() {
    var _Object$getPrototypeO;

    _classCallCheck(this, GeneratorIonic2);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(GeneratorIonic2)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    var plug = new _Plugins2.default();
    _this.pkg = require(_this.sourceRoot() + '/../../../package.json');
    _this.options = {
      name: 'test-app',
      id: 'com.ionic2.gen.nice',
      version: '0.0.1',
      description: 'My Ionic 2 App',
      email: 'example@example.com',
      url: 'https://github.com/DrMabuse23/generator-ionic-2',
      author: 'DrMabuse'
    };
    _this.answers = null;
    _this.platforms = ['ios', 'android'];
    if (_os2.default.platform !== 'darwin') {
      _this.platforms.push('windows');
    }
    _this.plugins = plug.getPlugins();
    _this.genPrompts = [];

    // greet and shit
    _this._init();
    _this._getStartPrompts();
    return _this;
  }
  /**
  * create the basic prompts for the empty app creation
  * @return {Array} []
  */

  _createClass(GeneratorIonic2, [{
    key: '_getStartPrompts',
    value: function _getStartPrompts() {
      var _this2 = this;

      var keys = Object.keys(this.options);

      keys.forEach(function (option, key) {
        _this2.genPrompts.push({
          type: 'input',
          name: option,
          message: 'Enter a ' + option + ' for your app:',
          default: _this2.options[option]
        });
        if (typeof _Validate2.default[option] === 'function') {
          _this2.genPrompts[key].validate = _Validate2.default[option];
        }
      });

      this.genPrompts.push({
        type: 'checkbox',
        name: 'platforms',
        message: 'Please choose a Platform',
        choices: this.platforms
      });

      this.genPrompts.push({
        type: 'checkbox',
        name: 'plugins',
        message: 'Please choose your Plugins',
        choices: this.plugins
      });
    }
    /**
    * copy some files from root to destination
    */

  }, {
    key: '_copy',
    value: function _copy() {
      var file = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

      if (!file) {
        return false;
      }
      if (file === 'scripts') {
        return this.fs.copy(this.templatePath('' + file), this.destinationPath(file), function (err) {
          throw Error(err);
        });
      }
      return this.fs.copy(this.templatePath('_' + file), this.destinationPath(file), function (err) {
        throw Error(err);
      });
    }
    /**
    * create some templates with the params
    */

  }, {
    key: 'createTemplate',
    value: function createTemplate() {
      var file = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
      var options = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

      if (!file) {
        return false;
      }
      return this.fs.copyTpl(this.templatePath('_' + file), this.destinationPath(file), options);
    }
    /**
    * yeoman uses this like a constructor, but since this is getting
    * transpiled from es6, it won't work as it should. we're calling
    * it from constructor
    */

  }, {
    key: '_init',
    value: function _init() {
      this.fileCount = _fs2.default.readdirSync('.').length;

      // abort when directory is not empty on first run
      if (this.fileCount > 0) {
        this.log(_chalk2.default.red('Non-empty directory. Cordova needs an empty directory to set up project'));
        process.exit(1);
      }

      // console.log('cordova', cordova);
      this.log(_yeomanWelcome2.default);
      this.log('Welcome to ' + _chalk2.default.yellow.bold(this.pkg.name) + '! v. ' + _chalk2.default.red(this.pkg.version));
    }
    /**
    * question prompting
    */

  }, {
    key: 'prompting',
    value: function prompting() {
      var _this3 = this;

      var done = this.async();
      this.prompt(this.genPrompts, function (answers) {
        _this3.answers = answers;
        done();
      });
    }
    /**
    * create a cordova project into the destination folder
    */

  }, {
    key: '_initCordovaProject',
    value: function _initCordovaProject() {
      return _cordovaLib2.default.cordova.raw.create('.', this.answers.id, this.answers.name, this.answers.name).then(function () {
        return true;
      }).catch(function (err) {
        console.log(err.message);
        // process.exit();
        return err;
      });
    }
    /**
    * add one or many platforms to the destination
    */

  }, {
    key: '_addPlatforms',
    value: function _addPlatforms() {
      var _this4 = this;

      return _cordovaLib2.default.cordova.raw.platform('add', this.answers.platforms, { save: true }).then(function () {
        console.log('add platforms ' + _this4.answers.platforms);
        return true;
      }).catch(function (err) {
        console.log(err.message);
        // process.exit();
        return err;
      });
    }
    /**
    * add one or more Plugins to the destination
    */

  }, {
    key: '_addPlugins',
    value: function _addPlugins() {
      var _this5 = this;

      return _cordovaLib2.default.cordova.raw.plugin('add', this.answers.plugins, { save: true }).then(function () {
        console.log('add plugins ' + _this5.answers.plugins);
        return true;
      }).catch(function (err) {
        console.log(err.message);
        // process.exit();
        return err;
      });
    }
    /**
    * copy the ionic2angular stuff starter template
    */

  }, {
    key: '_createIonicApp',
    value: function _createIonicApp() {
      var _this6 = this;

      ['.gitignore', 'app', 'scripts', 'resources', 'tsconfig.json', 'gulpfile.js', 'webpack.config.js', 'webpack.production.config.js'].forEach(function (file) {
        _this6._copy(file);
      });
      ['package.json'].forEach(function (file) {
        _this6.createTemplate(file, _this6.answers);
      });
    }
    /**
    * promise the writing process
    */

  }, {
    key: 'writing',
    value: function writing() {
      var _this7 = this;

      var done = this.async();
      this._initCordovaProject().then(function () {
        _this7._addPlatforms().then(function () {
          _this7._addPlugins();
        });
      })
      // no matter what we've picked by cordova selections (or if we
      // picked no platforms or plugins, we'll continue execution)
      .finally(function () {
        _this7._createIonicApp();
        done();
      });
    }
    /**
    * npm install after create the app
    */

  }, {
    key: 'install',
    value: function install() {
      var _this8 = this;

      var done = this.async();
      return new Promise(function (resolve, reject) {
        var i = 0;
        _this8.log('☕  ☕  ☕  ☕  ☕   Start npm install   ☕  ☕  ☕  ☕  ☕');
        var process = _this8.spawnCommand('npm', ['install']);
        process.on('close', function (code, signal) {
          resolve(code);
          done();
        });
      });
    }
  }]);

  return GeneratorIonic2;
})(_yeomanGenerator.Base);

exports.default = GeneratorIonic2;
module.exports = exports['default'];