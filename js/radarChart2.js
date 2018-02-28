export default function (id, data, options) {
	let cfg = {
		w: 600,
		h: 600,
		margin: {top: 20, right: 20, bottom: 20, left: 20},
		levels: 3,
		maxValue: 0,
		labelFactor: 1.25,
		wrapWidth: 60,
		opacityArea: 0.35,
		dotRadius: 4,
		opacityCircles: 0.1,
		strokeWidth: 2,
		roundStrokes: false,
		color: d3.scale.category10()
	};

	if ('undefined' !== typeof options) {
		for (var i in options) {
			if ('undefined' !== typeof options[i]){
				cfg[i] = options[i];
			}
		}
	}

	let maxValue = Math.max(cfg.maxValue, d3.max(data, function (i) { return d3.max(i.map(function (o) { return o.value; })) }));

	let allAxis = (data[0].map(function (i, j) { return i.axis })),
		total = allAxis.length,
		radius = Math.min(cfg.w / 2, cfg.h / 2),
		Format = d3.format(''),
		angleSlice = Math.PI * 2 / total;

	let rScale = d3.scale.linear()
		.range([0, radius])
		.domain([0, maxValue]);

	d3.select(id).select("svg").remove();

	let svg = d3.select(id).append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar" + id);

	let defs = svg.append("defs");

	let gradient = defs.append("linearGradient")
	   .attr("id", "svgGradient")
	   .attr("x1", "0%")
	   .attr("x2", "100%")
	   .attr("y1", "0%")
	   .attr("y2", "100%");

	gradient.append("stop")
	   .attr('class', 'start')
	   .attr("offset", "0%")
	   .attr("stop-color", "#B01DFF")
	   .attr("stop-opacity", 1);

	gradient.append("stop")
	   .attr('class', 'end')
	   .attr("offset", "100%")
	   .attr("stop-color", "#1DFFDD")
	   .attr("stop-opacity", 1);

	let g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w / 2 + cfg.margin.left) + "," + (cfg.h / 2 + cfg.margin.top) + ")");

	let filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	let axisGrid = g.append("g").attr("class", "axisWrapper");

	axisGrid.append("circle")
		.attr("r", cfg.h / 2 + cfg.margin.left / 6 + 1)
		.style("fill", "#fff")
		.style("stroke", "url(#svgGradient)")
		.style("stroke-width", "10px");

	axisGrid.selectAll(".levels")
		.data(d3.range(1, (cfg.levels + 1)).reverse())
		.enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", function (d, i) { return radius / cfg.levels * d; })
		.style("fill", "#fff")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	axisGrid.selectAll(".axisLabel")
		.data(d3.range(1, (cfg.levels+1)).reverse())
		.enter().append("text")
		.attr("class", "axisLabel")
		.attr("x", 4)
		.attr("y", function (d) { return -d * radius / cfg.levels; })
		.attr("dy", "0.4em")
		.style("font-size", "10px")
		.style("font-family", "Open Sans")
		.style("font-weight", "bold")
		.attr("fill", "#737373")
		.text(function (d, i) { return Format(maxValue * d / cfg.levels); });

	let axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");

	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function (d, i) { return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2); })
		.attr("y2", function (d, i) { return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2); })
		.attr("class", "line")
		.style("stroke", "#cdcdcd")
		.style("stroke-width", "1px");

	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "14px")
        .style("font-family", "Open Sans")
        .style("font-weight", "bold")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function (d, i) { return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2); })
		.attr("y", function (d, i) { return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2); })
		.text(function (d) { return d })
		.call(wrap, cfg.wrapWidth);

	let radarLine = d3.svg.line.radial()
		.interpolate("linear-closed")
		.radius(function (d) { return rScale(d.value); })
		.angle(function (d, i) { return i * angleSlice; });

	if(cfg.roundStrokes) {
		radarLine.interpolate("cardinal-closed");
	}

	let blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");

	let coords = d3.selectAll(".legend");

    axis.append("text")
        .attr("class", "legend2")
        .style("font-size", "14px")
        .style("font-family", "Open Sans")
        .style("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .text('')
        .attr("x", function (d, i) { return (coords[0][i].x.animVal[0].value); })
        .attr("y", function (d, i) {
			if (i === 0 || i === 1 || i === 7) return (coords[0][i].y.animVal[0].value * 1.1);
			return (coords[0][i].y.animVal[0].value);
		})
        .call(wrap, cfg.wrapWidth);

	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", function (d, i) { return radarLine(d); })
		.style("fill", function (d, i) { return cfg.color(i); })
		.style("fill-opacity", cfg.opacityArea)

        .on('mouseover', function (d, i) {
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0.1);
            d3.selectAll(".legend2")
                .data(d)
				.style("fill", cfg.color(i))
            	.text(function (d) { return (d.value + ' / 10') })
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.7);
		})
		.on('mouseout', function (d) {
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
            d3.selectAll(".legend2")
        		.text('')
		});

	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function (d, i) { return radarLine(d); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function (d, i) { return cfg.color(i); })
		.style("fill", "none")
		.style("filter" , "url(#glow)");

	blobWrapper.selectAll(".radarCircle")
		.data(function (d, i) { return d; })
		.enter().append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", function (d, i){ return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2); })
		.attr("cy", function (d, i){ return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2); })
		.style("fill", function (d, i, j) { return cfg.color(j); })
		.style("fill-opacity", 0.8);

	let blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");

	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(function (d, i) { return d; })
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius * 1.5)
		.attr("cx", function (d, i){ return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2); })
		.attr("cy", function (d, i){ return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2); })
		.style("fill", "none")
		.style("pointer-events", "all")

		.on("mouseover", function (d, i) {
			let newX =  parseFloat(d3.select(this).attr('cx')) - 10;
			let newY =  parseFloat(d3.select(this).attr('cy')) - 10;

			tooltip
				.attr('x', newX)
				.attr('y', newY)
				.text(Format(d.value))
				.transition().duration(200)
                .style("font-size", "14px")
                .style("font-family", "Open Sans")
                .style("font-weight", "bold")
				.style('opacity', 1);
		})
		.on("mouseout", function(){
			tooltip.transition().duration(200)
				.style("opacity", 0);
		});

	let tooltip = g.append("text")
		.attr("class", "tooltip")
		.style("opacity", 0);

	function wrap (text, width) {
		text.each(function () {
			let text = d3.select(this);
			let words = text.text().split(/\s+/).reverse();
			let word;
			let line = [];
			let lineNumber = 0;
			let lineHeight = 1.4;
			let y = text.attr("y");
			let x = text.attr("x");
			let dy = parseFloat(text.attr("dy"));
			let tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

			while (word = words.pop()) {
				line.push(word);
				tspan.text(line.join(" "));
				if (tspan.node().getComputedTextLength() > width) {
					line.pop();
					tspan.text(line.join(" "));
					line = [word];
					tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
				}
			}
		});
	}
}
