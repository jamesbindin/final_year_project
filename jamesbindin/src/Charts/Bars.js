class Bars{

  addBars(chartSvg, data){
    chartSvg.selectAll(".bar")
      .data(data.candles)
      .enter().append("g").append("rect").attr("class", "bar")
      .attr("transform", "translate("+51+","+10+")");
  }

  updateBars(chartSvg, xScale, yScale, data){
    let bars = chartSvg.selectAll(".bar");
    let startTime = new Date(data.candles[0].time);
    let endTime = new Date(data.candles[1].time);

    bars.data(data.candles)
      .transition()
      .attr("x",(d,i)=>{
        let time = new Date(d.time);
        return xScale(time);
      })
      .attr("y",(d,i)=>{
        var candleVal = d.mid.c - d.mid.o;
        var yVal = Number(d.mid.o) + Number(candleVal);
        if(candleVal > 0){
          return yScale(yVal);
        }
        else{
          return yScale(d.mid.o);
        }
      })
      .attr("width", (d,i) => {
        let timeDifference = xScale(endTime) - xScale(startTime);
        return timeDifference;
      })
      .attr("height",(d)=>{
        var o = yScale(d.mid.o);
        var c = yScale(d.mid.c);
        var v = c - o;
        return Math.abs(v);
      })
      .attr("fill", (d,i)=>{
        var barVal = d.mid.c - d.mid.o;
        if(barVal > 0){
          return "green";
        }
        else{
          return "red";
        }
      });
  }

}
export default Bars;
