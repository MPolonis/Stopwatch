class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.reset = this.reset.bind(this)
        this.calculate = this.calculate.bind(this)
        this.format = this.format.bind(this)
        this.resetStopWatch = this.resetStopWatch.bind(this)

    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }      
        });
    }

    format(times) {
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.watch = setInterval(this.calculate, 10);
            this.setState({
                running: true
            });
        }
    }


    calculate() {
        let {minutes, seconds, miliseconds} = this.state.times 
        miliseconds += 1;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        this.setState({
            times: {
                minutes,
                seconds,
                miliseconds
            }
        })
        
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
    }

    render() {
        return (
            <div className={'container'}>
                <nav className={'controls'}>
                    <button className='button' id='start' onClick={this.start}>Start</button>
                    <button className='button' id='stop' onClick={this.stop}>Stop</button>
                    <button className='button' id='reset' onClick={this.reset}>Reset</button>
                </nav>
                <div className={'stopwatch'}>
                    {this.format()}   
                </div>
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


ReactDOM.render(<Stopwatch />, document.getElementById('app'));