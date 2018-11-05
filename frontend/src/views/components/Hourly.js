import React, {
	Component
} from 'react';
import axios from 'axios';

import {
	ResponsiveContainer,
	ComposedChart,
	LineChart,
	Line,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend
} from 'recharts';

class CustomizedAxisTick extends Component {
	render() {
		const {
			x,
			y,
			stroke,
			payload
		} = this.props;
		return (
			<g transform={`translate(${x},${y})`}>
      	<text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
		);
	}
}

class Hourly extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 1000,
			height: 400,
			location: "",
			data: []
		};
	}

	componentDidMount() {
		this.getLocation();
		this.getData();
	}

	getData() {
		axios.get('/api/weather/hourly').then(response => {
			var tdata = response.data.hourly;
			var res = tdata.map(function(item) {
				return {
					time: item.time,
					day: item.day,
					fahrenheit: parseInt(item.fahrenheit, 10),
					celsius: parseInt(item.celsius, 10),
					percip: parseInt(item.percip, 10)
				};
			});
			this.setState({
				data: res
			});
		});
	}

	getLocation() {
		axios.get('/api/location').then(response => {
			var city = "";
			var state = "";
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

	getDim() {
		this.setState({
			width: document.getElementById("hourly").clientWidth,
			height: document.getElementById("hourly").clientHeight
		});
	}

	renderChart() {
		// if (this.state.data.length === 0){
		// 	this.getData();
		// }
		console.log(this.state.data);
			return (
				<ResponsiveContainer width='100%' height={200}>
					<ComposedChart width={this.state.width} height={this.state.height} data={this.state.data} margin={{right: 10, bottom: 40}}>
          	<XAxis dataKey="time" interval={10} tick={<CustomizedAxisTick/>}/>
            <Tooltip/>
						<YAxis yAxisId="1"/>
						<YAxis orientation="right" domain={[0, 100]} yAxisId="2" hide={true}/>
            <Line yAxisId="1" type="monotone" dataKey="fahrenheit" stroke="#f44336" dot={false} name="Temp"/>
            <Area yAxisId="2" type='monotone' dataKey='percip' stroke='#00bcd4' fill='#00bcd4' name="Percip"/>
          </ComposedChart>
				</ResponsiveContainer>
		);
	}

	render() {
		return (
			<div className="mdl-card mdl-cell--8-col mdl-shadow--2dp" id="hourly">
      	<div className="mdl-card__title">
        	<h1 className="mdl-card__title-text">{this.state.location}</h1>
        </div>
				<div className="mdl-card__supporting-text">
          {this.renderChart()}
				</div>
      </div>
		);
	}
}

export default Hourly;
