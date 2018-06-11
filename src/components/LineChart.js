import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

class LineChart extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.update(this.props.user);
	}

	componentWillReceiveProps(nextProps) {
		this.update(nextProps.user);
	}

	update(props) {
		d3.select("g").remove();
		const data = [];
	    props.scores.forEach((item) => {
	    	data.push(item.score);
	    });

      	const margin = { top: 20, right: 50, bottom: 20, left: 50 };
      	const width = 300;
      	const height = 300;
      	const x = d3.scaleLinear().domain([0,data.length - 1]).range([0,width]);
        const y = d3.scaleLinear().domain([0,1]).range([height, 0]);

        const valueline = d3.line()
	    .x(function(d, i) { return x(i); })
	    .y(function(d) { return y(d); })
	    .curve(d3.curveMonotoneX);

        const g = d3.select(this.refs.anchor)
    	.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
  		.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	    y.domain([0, d3.max(data, d => d)]);

	    var path = g.append("path")
	      .datum(data)
	      .attr("class", "line")
	      .attr("d", valueline);

	    // Add the X Axis
		g.append("g")
		    .attr("transform", "translate(0," + height + ")")
		    .call(d3.axisBottom(x).ticks(0));

		// Add the Y Axis
		g.append("g")
		    .call(d3.axisLeft(y));

		g.selectAll(".dot")
    	.data(data)
  		.enter().append("circle")
    	.attr("class", "dot")
    	.attr("cx", function(d, i) { return x(i) })
    	.attr("cy", function(d) { return y(d) })
    	.attr("r", 5)
    	.append("title")
        .text(function(d){ return d });
	}

	render() {
		const svgStyles = {
			width: '400px',
			height: '400px'
		}

		if (this.props.user.scores) {
			return (
				<div className="svg-container">
					<svg style={svgStyles} ref="anchor"></svg>
					<h3>User Scores</h3>
				</div>
			)
		}

		return null;
	}
}

export default connect(mapStateToProps)(LineChart);
