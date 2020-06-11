class Wicks{

  addWicks(chartSvg, data){
    let wicks = chartSvg.selectAll(".wick")
      .data(data.candles)
      .enter().append("g")
      .append("line").attr("class","wick")
      .attr("transform", "translate("+51+","+10+")");
      return wicks;
  }

  updateWicks(chartSvg, data, xScale, yScale){
      let wicks = chartSvg.selectAll(".wick");
      let candles =  data.candles;
      let startTime = new Date(data.candles[0].time);
      let endTime = new Date(data.candles[1].time);
      let difference = xScale(endTime) - xScale(startTime);

      wicks.data(candles)
        .transition()
        .attr("x1",(d,i)=>{
          let time = new Date(d.time);
          return xScale(time) + (difference/2);
        })
        .attr("y1",(d,i)=>{
          return yScale(d.mid.l);
        })
        .attr("x2",(d,i)=>{
          let time = new Date(d.time);
          return xScale(time) + (difference/2);
        })
        .attr("y2",(d,i)=>{
          return yScale(d.mid.h);
        })
        .attr("stroke","grey")
        .attr("stroke-width",1);
  }
}
export default Wicks;
