import React, {
  Component
} from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  format_date() {
    return this.state.date.toLocaleDateString('en-US', {weekday: "short", month: "short", day: "numeric"});
  }

  format_time() {
    if (this.state.date.getHours() > 12){
      return (this.state.date.getHours() - 12) + ':' + this.state.date.getMinutes() + " PM"
    }else{
      return this.state.date.getHours() + ':' + this.state.date.getMinutes() + " AM"
    }
  }

  render() {
    return (
      <div className="mdl-card mdl-cell mdl-shadow--2dp">
        <div className="mdl-card__title">
          {/* <h1 className="mdl-card__title-text">Hello</h1> */}
        </div>
        <p className="mdl-typography--text-center mdl-typography--subhead">{this.format_date()}</p>
        <p className="mdl-typography--text-center mdl-typography--display-3">{this.format_time()}</p>
        <p className="mdl-typography--text-center mdl-typography--subhead">Portland, OR</p>
      </div>
    );
  }
}

export default Clock;
