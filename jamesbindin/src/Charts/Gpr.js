import * as d3 from "d3"
import CurrentChartInfo from '../Data/CurrentChartInfo'
import ChartData from '../Data/ChartData'

class Gpr{
  constructor(){
    this.currentChartInfo = new CurrentChartInfo();
    this.chartData = new ChartData();
  }

  addGpr(chartSvg, xScale, yScale, gprD){

    chartSvg.append("g").attr("transform", "translate(50,10)")
            .append("path")
            .attr("class", "area")
    chartSvg.append("g").attr("transform", "translate(50,10)")
            .append("path")
            .attr("class", "mean")
  }

  updateGpr(chartSvg, xScale, yScale, gprD){
      //get the current selected currency pair and timeframe string.
      let currentCurrency =  this.currentChartInfo.loadCurrentCurrency();
      // let currentTimeframe = this.currentChartInfo.loadCurrentTimeframe();
      //get the candlestick data.
      let currentChartData = this.chartData.loadData();
      let currentTimeframe = currentChartData.EUR_USD.granularity;
      //select the correct currency pair for the gpr data
      let cp = gprD.find((element) => {
        if(element.currencyPair === currentCurrency){
          return element;
        }
        return cp;
        });
      //select correct timeframe
      let currentGpr = cp.data[currentTimeframe];
      let currentCandles = currentChartData[currentCurrency].candles;
      let firstCandleTime = new Date(currentCandles[0].time);

      let gprEndTime = new Date(currentGpr[currentGpr.length-1].time);
      let lastCandleTime = new Date(currentCandles[currentCandles.length-1].time);

      //remove data from gpr where their date is older than the candle data.
      let elementsToRemove = []
      for (var i = 0; i < currentGpr.length; i++) {
        let gprTime = new Date(currentGpr[i].time);
        if(gprTime < firstCandleTime){
            //make list of elements to remove from gpr.
            elementsToRemove.push(currentGpr[i])
        }
      }
      //remove the unwanted elements from the gpr datatime.
      for(let i = 0; i < elementsToRemove.length; i++){
        let index = currentGpr.indexOf(elementsToRemove[i]);
        currentGpr.splice(index, 1);
      }

      //select latest time for the xScale by choosing the most recent date.
      let latestTime = lastCandleTime;
      if(gprEndTime > lastCandleTime){
        latestTime = gprEndTime;
      }
      //get the highest and lowest value for the Y scale.
      let lowHighArr = this.getHighestAndLowest(currentGpr, currentCandles);

      //add new domains to scales taking account for the gpr values.
      xScale.domain([firstCandleTime, latestTime]);
      yScale.domain(lowHighArr);

      // let time1 = new Date(currentGpr[0].time);
      // let time2 = new Date(currentGpr[1].time);
      // let diff = time2 - time1;

      let diff = this.currentChartInfo.getTimeDifference(currentTimeframe);

      let area = d3.area()
        .x((d, i) => {
          let time = new Date(d.time);
          return xScale(new Date(time.getTime() + (diff/2)))
        })
        .y0((d) => {
          return yScale(d.mean - d.var)
        })
        .y1((d) => {
          return yScale(d.mean + d.var )
        });

      chartSvg.selectAll(".area")
              .datum(currentGpr)
              .transition()
              .attr("d", area)
              .style("fill","black")
              .style("opacity","0.33")



      var lineGenerator = d3.line()
            .x(function(d, i) {
              let time = new Date(d.time);
              return xScale(new Date(time.getTime() + (diff/2)));
            })
            .y(function(d) {
              return yScale(d.mean);
            });
      var line = lineGenerator(currentGpr);

      chartSvg.selectAll(".mean")
        .transition()
      	.attr('d', line)
        .style('fill', 'none')
        .style('stroke','black')
        .style('stroke-width','1.2')

    let newScales = {xScale:xScale, yScale:yScale};
    return newScales;
  }

  //returns hightst and lowest value for list of gpr objects and list of candles, used for Y scale.
  getHighestAndLowest(currentGpr, currentCandles){

    // variables used to store overall high and low.
    let hightstValue = null;
    let lowestValue = null;

    //find high and low for gpr list.
    for (let i = 0; i < currentGpr.length; i++) {
      if(i === 0){
        hightstValue = currentGpr[i].mean + currentGpr[i].var;
        lowestValue = currentGpr[i].mean - currentGpr[i].var;
        }
        else{
          let currentHighValue = currentGpr[i].mean + currentGpr[i].var;
          let currentLowValue = currentGpr[i].mean - currentGpr[i].var;

          if(currentHighValue > hightstValue){
            hightstValue = currentHighValue;
          }

          if(currentLowValue < lowestValue){
            lowestValue = currentLowValue;
          }
        }
    }

    //change overall high and low values if any in the candle array are larger.
    for (let i = 0; i < currentCandles.length; i++) {
      let currentHighValue = parseFloat(currentCandles[i].mid.h);
      let currentLowValue = parseFloat(currentCandles[i].mid.l);

      if(currentHighValue > hightstValue){
        hightstValue = currentHighValue;
      }

      if(currentLowValue < lowestValue){
        lowestValue = currentLowValue;
      }
    }
    let lowHighArr = [lowestValue, hightstValue];

    return lowHighArr;
  }

}
export default Gpr;
