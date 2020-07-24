
class AxesChart{
  updateAxes(chartSvg, xAxes, yAxes, height){
    try {
      chartSvg.select(".x")
        .transition()
        .attr("transform", "translate("+50+","+(height+10)+")")
        .call(xAxes);

      chartSvg.select(".y")
        .transition()
        .attr("transform", "translate("+50+","+(10)+")")
        .call(yAxes);
    }
     catch (e) {
      console.log(e);
    }
  }

  addAxesX(chartSvg){
    chartSvg.append("g")
    .attr("class", "x");
  }

  addAxesY(chartSvg){
      chartSvg.append("g")
      .attr("class", "y");
  }

}
export default AxesChart;
