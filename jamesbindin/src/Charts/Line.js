class Line{
  drawLine(chartSvg, xScale, yScale, x1, x2, y1, y2, colour, opacity,
    className, strokeWidth){

    chartSvg.append("g")
    .attr("transform", "translate("+(50)+","+(10)+")")
      .append("line")
      .attr("class", className)
      .style("stroke", colour)
      .attr("x1", xScale(x1))
      .attr("x2", xScale(x2))
      .attr("y1", yScale(y1))
      .attr("y2", yScale(y2))
      .attr("opacity",opacity)
      .attr("stroke-width", strokeWidth);
  }

  removeLines(chartSvg){
    chartSvg.selectAll(".tl")
      .remove();
    chartSvg.selectAll(".cl")
      .remove();
  }
}
export default Line;
