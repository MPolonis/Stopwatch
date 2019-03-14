class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        this.print(this.state.times);
    }

    reset() {
        this.setStatet({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }      
        });
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.watch = setInterval(() => this.step(), 10);
            this.setState({
                running: true
            });
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        }
    }

    stop() {
        clearInterval(this.watch);
        this.setState({
            running: false
        });
    }

    resetStopWatch() {
        this.stop();
        this.reset();
        this.print();
    }

    render() {
        return (
            <div className={'container'}>
                <nav className={'controls'}>
                    <a href={'#'} className={'button'} id={'start'}>Start</a>
                    <a href={'#'} className={'button'} id={'stop'}>Stop</a>
                    <a href={'#'} className={'button'} id={'reset'}>Reset</a>
                </nav>
                <div className={'stopwatch'}></div>
                <ul className={'results'}></ul>
            </div>
        );
    }
    
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = <Stopwatch />
React.Dom.render(stopwatch, document.getElementById('app'));