import React, {Component} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {count: this.props.countdown, render: true, msg: ""};
        this.started = false
        this.eingabefeld = <Grid style={{margin: 50}}>
        <TextField id="123" label="Zeit für Countdown erfassen" variant="outlined" />
        </Grid>
    
        // Event-Handler registrieren:
        this.update = this.update.bind(this);
        this.start_timer = this.start_timer.bind(this);
    }

    update() {
        this.setState({ count: this.state.count - 1 });
        if (this.state.count <= 1) {
            this.setState({msg: "FERTIG"});
            this.setState({count: ""});
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    start_timer() {
        this.setState({count: this.props.countdown});

        if (this.interval != null)
        {   clearInterval(this.interval);
            
            this.started = true;
            this.setState({render: false})
        }
        
        this.interval = setInterval(this.update, 1000);
        
    }


    render() {
        return (
        <>
            <p>{this.state.count}</p>
            <p>{this.state.msg}</p>
            <Button onClick={this.start_timer}>Start Timer</Button> 
            {this.state.render && this.eingabefeld}
        </>)
    }
}

export default Timer;