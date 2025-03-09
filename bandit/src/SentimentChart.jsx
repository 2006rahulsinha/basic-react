import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const SentimentChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const width = 400, height = 300;
        const svg = d3.select(chartRef.current)
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("*").remove(); // Clear previous renders

        const x = d3.scaleBand()
            .domain(data.map(d => d.sentiment))
            .range([0, width])
            .padding(0.2);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => x(d.sentiment))
            .attr("y", d => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.count))
            .attr("fill", "steelblue");

    }, [data]);

    return <svg ref={chartRef}></svg>;
};

export default SentimentChart;
