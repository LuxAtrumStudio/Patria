import React, {
  Component
} from 'react';
import axios from 'axios';


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
    axios.get('/api/location').then(response => {
      var city = ""
      var state = ""
      for (var i = 0; i < response.data.address_components.length; i++) {
        if (response.data.address_components[i].types.includes('locality')) {
          city = response.data.address_components[i].long_name;
        }
        for (var j = 0; j < response.data.address_components[i].types.length; j++) {
          if (response.data.address_components[i].types[j].startsWith('administrative_area')) {
            state = response.data.address_components[i].short_name
          }
        }
      }
      this.setState({
        location: city + ', ' + state 
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

  formatLocation() {
    return this.state.location;
  }

  render() {
    return (
      <div className="mdl-card mdl-cell mdl-shadow--2dp">
        <div className="mdl-card__title">
          {/* <h1 className="mdl-card__title-text">Hello</h1> */}
        </div>
        <p className="mdl-typography--text-center mdl-typography--subhead">{this.formatDate()}</p>
        <p className="mdl-typography--text-center mdl-typography--display-3">{this.formatTime()}</p>
        <p className="mdl-typography--text-center mdl-typography--subhead">{this.formatLocation()}</p>
      </div>
    );
  }
}

export default Clock;
