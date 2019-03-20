'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        _this.start = _this.start.bind(_this);
        _this.stop = _this.stop.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.calculate = _this.calculate.bind(_this);

        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            this.setStatet({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        }
    }, {
        key: 'format',
        value: function format(times) {
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            if (!this.state.running) {
                this.watch = setInterval(this.state.times, 10);
                this.setState({
                    running: true
                });
            }
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var _times = this.times,
                minutes = _times.minutes,
                seconds = _times.seconds,
                miliseconds = _times.miliseconds;

            this.state.times.miliseconds + 1;
            if (this.state.times.miliseconds >= 100) {
                this.state.times.seconds + 1;
                this.state.times.miliseconds = 0;
            }
            if (this.state.times.seconds >= 60) {
                this.state.times.times.minutes + 1;
                this.state.times.times.seconds = 0;
            }
            this.setState({
                times: this.state.times
            });
        }
    }, {
        key: 'stop',
        value: function stop() {
            clearInterval(this.watch);
            this.setState({
                running: false
            });
        }
    }, {
        key: 'resetStopWatch',
        value: function resetStopWatch() {
            this.stop();
            this.reset();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'button',
                        { className: 'button', onClick: this.start },
                        'Start'
                    ),
                    React.createElement(
                        'button',
                        { className: 'button', onClick: this.stop },
                        'Stop'
                    ),
                    React.createElement(
                        'button',
                        { className: 'button', onClick: this.reset },
                        'Reset'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'stopwatch' },
                    'console.log(\'jolo\')',
                    this.state.times
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
window.addEventListener("load", function () {
    console.log("Everything is loaded");
});

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
