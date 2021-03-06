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

var slideCountdown = function slideCountdown(WrappedComponent) {
  var SlideCountdown = function (_React$Component) {
    _inherits(SlideCountdown, _React$Component);

    /**
      =====Props=====
      Days: Set true if hours are more than 99; If false this component only support less than 100 hours and doesn't show Days and Weeks.
      Weeks: Set true if days are more than 99; If false this component only support less than 100 days and doesn't show Weeks.
      ================
    */

    function SlideCountdown(props) {
      _classCallCheck(this, SlideCountdown);

      var _this = _possibleConstructorReturn(this, (SlideCountdown.__proto__ || Object.getPrototypeOf(SlideCountdown)).call(this, props));

      _this.state = {
        due: false,
        initDone: false
      };
      _this.wrappedComponentRef = _react2.default.createRef();

      _this.updateTime = _this.updateTime.bind(_this);
      _this.slide = _this.slide.bind(_this);
      return _this;
    }

    _createClass(SlideCountdown, [{
      key: 'updateTime',
      value: function updateTime(flatSeconds) {
        var _this2 = this;

        var checkTime = function checkTime(wrap, val) {
          var tensDom = wrap.querySelector('.tens');
          var onesDom = wrap.querySelector('.ones');

          var tens = parseInt(val / 10);
          var ones = val % 10;

          if (tens != tensDom.querySelector('.bottom').innerHTML) _this2.slide(tensDom, tens);
          if (ones != onesDom.querySelector('.bottom').innerHTML) _this2.slide(onesDom, ones);
        };

        var _thisDoc = this.wrappedComponentRef.current;
        var timeObjs = _datetimeUtil2.default.getTimeObjs(flatSeconds, this.props.days, this.props.weeks);

        if (this.state.initDone) {
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
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var secondsInterval = this.props.deadline ? _datetimeUtil2.default.getInterval(_datetimeUtil2.default.now(), this.props.deadline) : undefined;
        var timeObjs = _datetimeUtil2.default.getTimeObjs(secondsInterval, this.props.days, this.props.weeks);

        var getElement = function getElement(dom) {
          for (var _len = arguments.length, className = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            className[_key - 1] = arguments[_key];
          }

          var target = dom;
          for (var index in className) {
            target = target.querySelector('.' + className[index]);
          }
          return target;
        };

        var _thisDoc = this.wrappedComponentRef.current;
        var units = ['seconds', 'minutes', 'hours', 'days', 'weeks'];
        var digits = ['tens', 'ones'];
        var doms = ['top', 'bottom'];

        for (var index in units) {
          var unit = units[index];

          for (var _index in digits) {
            var digit = digits[_index];

            for (var _index2 in doms) {
              var dom = doms[_index2];

              try {
                var value = digit === 'tens' ? parseInt(timeObjs[unit] / 10) : parseInt(timeObjs[unit] % 10);
                getElement(_thisDoc, unit, digit, dom).innerHTML = value;
              } catch (e) {
                // pass
              }
            }
          }
        }

        this.setState({
          initDone: true
        });
      }
    }, {
      key: 'slide',
      value: function slide(element, value) {
        var mask = element.querySelector('.mask');
        var top = element.querySelector('.top');
        var bottom = element.querySelector('.bottom');

        top.innerHTML = value;

        _effect2.default.slideDown(mask, 0, -40, 450, function () {
          bottom.innerHTML = value;
          _effect2.default.setPositionB(mask, 0);
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
            { className: 'slideCountdown', ref: this.wrappedComponentRef },
            this.props.weeks && this.props.days ? _react2.default.createElement(
              'div',
              { className: 'slide-block-time weeks' },
              _react2.default.createElement(
                'div',
                { className: 'wrap-stage' },
                _react2.default.createElement(
                  'div',
                  { className: 'stage tens' },
                  _react2.default.createElement(
                    'div',
                    { className: 'mask' },
                    _react2.default.createElement(
                      'div',
                      { className: 'top' },
                      '2'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'bottom' },
                      '6'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'stage ones' },
                  _react2.default.createElement(
                    'div',
                    { className: 'mask' },
                    _react2.default.createElement(
                      'div',
                      { className: 'top' },
                      '2'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'bottom' },
                      '6'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'title' },
                'WEEKS'
              )
            ) : null,
            this.props.days ? _react2.default.createElement(
              'div',
              { className: 'slide-block-time days' },
              _react2.default.createElement(
                'div',
                { className: 'wrap-stage' },
                _react2.default.createElement(
                  'div',
                  { className: 'stage tens' },
                  _react2.default.createElement(
                    'div',
                    { className: 'mask' },
                    _react2.default.createElement(
                      'div',
                      { className: 'top' },
                      '2'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'bottom' },
                      '6'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'stage ones' },
                  _react2.default.createElement(
                    'div',
                    { className: 'mask' },
                    _react2.default.createElement(
                      'div',
                      { className: 'top' },
                      '2'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'bottom' },
                      '6'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'title' },
                'DAYS'
              )
            ) : null,
            _react2.default.createElement(
              'div',
              { className: 'slide-block-time hours' },
              _react2.default.createElement(
                'div',
                { className: 'wrap-stage' },
                _react2.default.createElement(
                  'div',
                  { className: 'stage tens' },
                  _react2.default.createElement(
                    'div',
                    { className: 'mask' },
                    _react2.default.createElement(
                      'div',
                      { className: 'top' },
                      '2'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'bottom' },
                      '6'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'stage ones' },
                  _react2.default.createElement(
                    'div',
                    { className: 'mask' },
                    _react2.default.createElement(
                      'div',
                      { className: 'top' },
                      '2'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'bottom' },
                      '6'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'title' },
                'HOURS'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'slide-block-time minutes' },
              _react2.default.createElement(
                'div',
                { className: 'wrap-stage' },
                _react2.default.createElement(
                  'div',
                  { className: 'stage tens' },
                  _react2.default.createElement(
                    'div',
                    { className: 'mask' },
                    _react2.default.createElement(
                      'div',
                      { className: 'top' },
                      '6'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'bottom' },
                      '6'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'stage ones' },
                  _react2.default.createElement(
                    'div',
                    { className: 'mask' },
                    _react2.default.createElement(
                      'div',
                      { className: 'top' },
                      '6'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'bottom' },
                      '6'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'title' },
                'MINUTES'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'slide-block-time seconds' },
              _react2.default.createElement(
                'div',
                { className: 'wrap-stage' },
                _react2.default.createElement(
                  'div',
                  { className: 'stage tens' },
                  _react2.default.createElement(
                    'div',
                    { className: 'mask' },
                    _react2.default.createElement(
                      'div',
                      { className: 'top' },
                      '2'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'bottom' },
                      '2'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'stage ones' },
                  _react2.default.createElement(
                    'div',
                    { className: 'mask' },
                    _react2.default.createElement(
                      'div',
                      { className: 'top' },
                      '6'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'bottom' },
                      '6'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'title' },
                'SECONDS'
              )
            )
          )
        );
      }
    }]);

    return SlideCountdown;
  }(_react2.default.Component);

  SlideCountdown.propTypes = {
    days: _propTypes2.default.bool,
    weeks: _propTypes2.default.bool
  };

  SlideCountdown.defaultProps = {
    days: true,
    weeks: true
  };

  return SlideCountdown;
};

exports.default = slideCountdown;