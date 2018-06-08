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
		this.update();
	}

	// componentWillUnmount() {
	// 	d3.select('svg').selectAll('*').remove();
	// }

	componentWillReceiveProps() {
		console.log('will receive props running')
		this.update();
	}

	update() {
		console.log('update running')
		const data = [];
	    this.props.user.scores.forEach((item) => {
	    	data.push(item.score);
	    });

      	const margin = { top: 20, right: 60, bottom: 30, left: 40 };
      	const width = 300;
      	const height = 300;
      	const x = d3.scaleLinear().domain([0,data.length - 1]).range([0,width]);
        const y = d3.scaleLinear().domain([0,1]).range([height, 0]);

        const valueline = d3.line()
	    .x(function(d, i) { return x(i); })
	    .y(function(d) { return y(d); })
	    .curve(d3.curveMonotoneX);

        const svg = d3.select(this.refs.anchor)
    	.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
  		.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



	    //x.domain(data.map((d, i) => d));
	    y.domain([0, d3.max(data, d => d)]);

	    svg.append("path")
	      .datum(data)
	      .attr("class", "line")
	      .attr("d", valueline);

	    // Add the X Axis
		  svg.append("g")
		      .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x));

		// Add the Y Axis
		  svg.append("g")
		      .call(d3.axisLeft(y));

		svg.selectAll(".dot")
    	.data(data)
  		.enter().append("circle") // Uses the enter().append() method
    	.attr("class", "dot") // Assign a class for styling
    	.attr("cx", function(d, i) { return x(i) })
    	.attr("cy", function(d) { return y(d) })
    	.attr("r", 5);

    	svg.selectAll(".dot").exit().remove;
	}

	render() {
		const svgStyles = {
			width: '400px',
			height: '400px'
		}

		if (this.props.user.scores && this.props.user.scores.length > 1) {
			console.log('running')
			return (
				<svg style={svgStyles}>
					<g ref="anchor" />
				</svg>
			)
		}

		return null;
	}
}

export default connect(mapStateToProps)(LineChart);
