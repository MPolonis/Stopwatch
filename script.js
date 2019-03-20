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

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.watch = setInterval((this.state.times), 10);
            this.setState({
                running: true
            });
        }
    }


    calculate() {
        const {minutes, seconds, miliseconds} = this.times 
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
                    <button className='button' onClick={this.start}>Start</button>
                    <button className='button' onClick={this.stop}>Stop</button>
                    <button className='button' onClick={this.reset}>Reset</button>
                    {/* <a href={'#'} className={'button'} id={'start'}>Start</a>
                    <a href={'#'} className={'button'} id={'stop'}>Stop</a>
                    <a href={'#'} className={'button'} id={'reset'}>Reset</a> */}
                </nav>
                <div className={'stopwatch'}>
                    console.log('jolo')
                    {this.state.times}
                </div>
                 
                {/* <ul className={'results'} {this.state.times}></ul> */}
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
window.addEventListener("load", function () {
    console.log("Everything is loaded");
});

ReactDOM.render(<Stopwatch />, document.getElementById('app'));