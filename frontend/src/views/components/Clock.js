import React, {
    Component
} from 'react';


function pad(n, width, z) {
z = z || '0';
n = n + '';
return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            location: ""
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        this.getLocation()
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    getLocation() {
        fetch("http://127.0.0.1:8000/api/location").then(res => res.json()).then((result) => {
                this.setState({
                    location: result.address_components[3].long_name + ", " + result.address_components[5].short_name
                });
            },
            (error) => {
                this.setState({
                    location: "ERROR"
                });
            });
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    formatDate() {
        return this.state.date.toLocaleDateString('en-US', {
            weekday: "short",
            month: "short",
            day: "numeric"
        });
    }


    formatTime() {
        if (this.state.date.getHours() > 12) {
            return (this.state.date.getHours() - 12) + ':' + pad(this.state.date.getMinutes(), 2) + " PM"
        } else {
            return this.state.date.getHours() + ':' + pad(this.state.date.getMinutes(), 2) + " AM"
        }
    }

    render() {
        return (
            <div className="mdl-card mdl-cell mdl-shadow--2dp">
        <div className="mdl-card__title">
          {/* <h1 className="mdl-card__title-text">Hello</h1> */}
        </div>
        <p className="mdl-typography--text-center mdl-typography--subhead">{this.formatDate()}</p>
        <p className="mdl-typography--text-center mdl-typography--display-3">{this.formatTime()}</p>
        <p className="mdl-typography--text-center mdl-typography--subhead">{this.state.date.location}</p>
      </div>
        );
    }
}

export default Clock;
