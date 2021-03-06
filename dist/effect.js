'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Effect = function () {
  function Effect() {
    _classCallCheck(this, Effect);
  }

  _createClass(Effect, null, [{
    key: 'doAnimation',
    value: function doAnimation(element, from, to, period, action, callback) {
      var direct = from > to ? -1 : 1;
      var value = from;

      var interval = null;

      function animation() {
        if (Math.abs(value - from) >= Math.abs(from - to)) {
          cancelAnimationFrame(interval);
          if (callback) callback();
        } else {
          value += Math.abs(from - to) / period * 10;

          if (direct < 0 && value < to || direct > 0 && value > to) {
            value = to * direct;
          }
          action(element, value * direct);

          requestAnimationFrame(animation);
        }
      }

      interval = requestAnimationFrame(animation);
    }
  }, {
    key: 'resetRotateX',
    value: function resetRotateX(element) {
      element.style.webkitTransform = 'rotateX(0)';
    }
  }, {
    key: 'setRotateX',
    value: function setRotateX(element, deg) {
      element.style.webkitTransform = 'rotateX(' + deg + 'deg)';
    }
  }, {
    key: 'rotateX',
    value: function rotateX(element, from, to, period, callback) {
      Effect.doAnimation(element, from, to, period, function (element, value) {
        Effect.setRotateX(element, value);
      }, callback);
    }
  }, {
    key: 'setPositionB',
    value: function setPositionB(element, bottomValue) {
      element.style.bottom = bottomValue + 'px';
    }
  }, {
    key: 'slideDown',
    value: function slideDown(element, from, to, period, callback) {
      Effect.doAnimation(element, from, to, period, function (element, value) {
        Effect.setPositionB(element, value);
      }, callback);
    }
  }]);

  return Effect;
}();

exports.default = Effect;