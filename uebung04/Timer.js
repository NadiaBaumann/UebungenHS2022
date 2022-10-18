import React, {Component} from "react";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {count: this.props.countdown, text:""};
        this.interval = "0";

        this.update = this.update.bind(this);
        this.start = this.start.bind(this);
    }

    update() {
        this.setState({count: this.state.count - 1});

        if (this.state.count >= 1) {
            this.setState({text: ""});
        }
            
        
        if (this.state.count < 1)
        {
            this.setState({text: "FERTIG"});
            this.setState({count: ""});
            clearInterval(this.interval);
            this.interval = "0";
        }
    }

    start() {
        this.setState({count: this.props.countdown})

        if (this.interval !== "0")
        {clearInterval(this.interval);}
        this.interval = setInterval(this.update, 1000);
    }

    render() {
        return (<>
            <hr/>
            <h2>Timer 50 Sekunden</h2>
            <p>{this.state.count}</p>
            <p>{this.state.text}</p>
            <button onClick={this.start}>Start</button>
        </>);
    }
}

export default Timer;