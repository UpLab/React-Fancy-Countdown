'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _datetimeUtil = require('../../datetime-util');

var _datetimeUtil2 = _interopRequireDefault(_datetimeUtil);

var _effect = require('../../effect');

var _effect2 = _interopRequireDefault(_effect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './index.scss';

var flipCountdown = function flipCountdown(WrappedComponent) {
  var FlipCountdown = function (_React$Component) {
    _inherits(FlipCountdown, _React$Component);

    /**
      =====Props=====
      Days: Set true if hours are more than 99; If false this component only support less than 100 hours and doesn't show Days and Weeks.
      Weeks: Set true if days are more than 99; If false this component only support less than 100 days and doesn't show Weeks.
      ================
    */

    function FlipCountdown(props) {
      _classCallCheck(this, FlipCountdown);

      var _this = _possibleConstructorReturn(this, (FlipCountdown.__proto__ || Object.getPrototypeOf(FlipCountdown)).call(this, props));

      _this.state = {
        due: false
      };

      _this.updateTime = _this.updateTime.bind(_this);
      _this.flip = _this.flip.bind(_this);
      return _this;
    }

    _createClass(FlipCountdown, [{
      key: 'updateTime',
      value: function updateTime(flatSeconds) {
        var _this2 = this;

        var checkTime = function checkTime(wrap, val) {
          var tensDom = wrap.querySelector('.tens');
          var unitsDom = wrap.querySelector('.units');

          var tens = parseInt(val / 10);
          var units = val % 10;

          if (tens != tensDom.querySelector('.top').innerHTML) _this2.flip(tensDom, tens);
          if (units != unitsDom.querySelector('.top').innerHTML) _this2.flip(unitsDom, units);
        };

        var _thisDoc = _reactDom2.default.findDOMNode(this);
        var timeObjs = _datetimeUtil2.default.getTimeObjs(flatSeconds, this.props.days, this.props.weeks);

        /** seconds */
        checkTime(_thisDoc.querySelector('.seconds'), timeObjs.seconds);

        /** minutes */
        checkTime(_thisDoc.querySelector('.minutes'), timeObjs.minutes);

        /** hours */
        checkTime(_thisDoc.querySelector('.hours'), timeObjs.hours);

        /** days */
        if (this.props.days) {
          checkTime(_thisDoc.querySelector('.days'), timeObjs.days);

          /**  weeks */
          if (this.props.weeks) {
            checkTime(_thisDoc.querySelector('.weeks'), timeObjs.weeks);
          }
        }
      }
    }, {
      key: 'flip',
      value: function flip(element, value) {
        var top = element.querySelector('.top');
        var topBack = element.querySelector('.top-back');
        var bottom = element.querySelector('.bottom');
        var bottomBack = element.querySelector('.bottom-back');

        topBack.innerHTML = value;
        bottom.innerHTML = value;

        _effect2.default.rotateX(top, 0, 90, 150, function () {
          _effect2.default.rotateX(bottom, -90, 0, 80, function () {
            top.innerHTML = value;
            bottomBack.innerHTML = value;
            _effect2.default.setRotateX(top, 0);
            _effect2.default.setRotateX(bottom, -90);
          });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          WrappedComponent,
          _extends({}, this.props, {
            updateTime: this.updateTime }),
          _react2.default.createElement(
            'div',
            { className: 'flipCountdown' },
            this.props.weeks && this.props.days ? _react2.default.createElement(
              'div',
              { className: 'flip-block-time weeks' },
              _react2.default.createElement(
                'span',
                { className: 'title' },
                'WEEKS'
              ),
              _react2.default.createElement(
                'div',
                { className: 'stage tens' },
                _react2.default.createElement(
                  'span',
                  { className: 'top' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'top-back' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom-back' },
                  '7'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'stage units' },
                _react2.default.createElement(
                  'span',
                  { className: 'top' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'top-back' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom-back' },
                  '7'
                )
              )
            ) : null,
            this.props.days ? _react2.default.createElement(
              'div',
              { className: 'flip-block-time days' },
              _react2.default.createElement(
                'span',
                { className: 'title' },
                'DAYS'
              ),
              _react2.default.createElement(
                'div',
                { className: 'stage tens' },
                _react2.default.createElement(
                  'span',
                  { className: 'top' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'top-back' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom-back' },
                  '7'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'stage units' },
                _react2.default.createElement(
                  'span',
                  { className: 'top' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'top-back' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom-back' },
                  '7'
                )
              )
            ) : null,
            _react2.default.createElement(
              'div',
              { className: 'flip-block-time hours' },
              _react2.default.createElement(
                'span',
                { className: 'title' },
                'HOURS'
              ),
              _react2.default.createElement(
                'div',
                { className: 'stage tens' },
                _react2.default.createElement(
                  'span',
                  { className: 'top' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'top-back' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom-back' },
                  '7'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'stage units' },
                _react2.default.createElement(
                  'span',
                  { className: 'top' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'top-back' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom-back' },
                  '7'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'flip-block-time minutes' },
              _react2.default.createElement(
                'span',
                { className: 'title' },
                'MINUTES'
              ),
              _react2.default.createElement(
                'div',
                { className: 'stage tens' },
                _react2.default.createElement(
                  'span',
                  { className: 'top' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'top-back' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom-back' },
                  '7'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'stage units' },
                _react2.default.createElement(
                  'span',
                  { className: 'top' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'top-back' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom-back' },
                  '7'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'flip-block-time seconds' },
              _react2.default.createElement(
                'span',
                { className: 'title' },
                'SECONDS'
              ),
              _react2.default.createElement(
                'div',
                { className: 'stage tens' },
                _react2.default.createElement(
                  'span',
                  { className: 'top' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'top-back' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom-back' },
                  '7'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'stage units' },
                _react2.default.createElement(
                  'span',
                  { className: 'top' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'top-back' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom' },
                  '7'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'bottom-back' },
                  '7'
                )
              )
            )
          )
        );
      }
    }]);

    return FlipCountdown;
  }(_react2.default.Component);

  FlipCountdown.propTypes = {
    days: _propTypes2.default.bool,
    weeks: _propTypes2.default.bool
  };

  FlipCountdown.defaultProps = {
    days: true,
    weeks: true
  };

  return FlipCountdown;
};

exports.default = flipCountdown;