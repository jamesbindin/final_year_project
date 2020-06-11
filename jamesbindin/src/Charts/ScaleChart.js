import * as d3 from "d3"
import * as fc from 'd3fc'

class ScaleChart{

  //returns a d3 scale for the x axis. uses a discontinuity for the Scale
  //which closes the gap where theres a weekend, this is nessisary because
  //the foreign exchange market is closed and there is no data during this time.
  getScaleX(data, width){

    //get discontinuity gaps
    let gaps = this.getWeekendGaps();
    //get domain
    let domainX = this.getDomainX(data);
    //create scale with discontinuity
    let xScale = fc.scaleDiscontinuous(d3.scaleTime())
    .discontinuityProvider(fc.discontinuityRange(gaps[0], gaps[1], gaps[2], gaps[3]))
    .domain(domainX)
    .range([0, width]);

    return xScale;
  }

//returns a d3 scale for the y axis.
  getScaleY(data, height){
    //get domain
    let domainY = this.getDomainY(data);
    //create scale
    let yScale = d3.scaleLinear()
    .range([height ,0])
    .domain(domainY);

    return yScale;
  }

//returns the domain for x axis, lowest and highest values
  getDomainX(data){
    var dataL = data.candles.length - 1;
    var lowerLimit = new Date(data.candles[0].time);
    var upperLimit = new Date(data.candles[dataL].time);

    return [lowerLimit, upperLimit];
  }

//returns the domain for y axis, oldest and most recent dates
  getDomainY(data){
    var lowestValue = data.candles[0].mid.l;
    var highestValue = data.candles[0].mid.h;
    for (var i = 0; i < data.candles.length; i++){
      if(data.candles[i].mid.l < lowestValue){
        lowestValue = data.candles[i].mid.l;
      }
      if(data.candles[i].mid.h > highestValue){
        highestValue = data.candles[i].mid.h;
      }
    }
    return [lowestValue, highestValue];
  }

  //returns the past four weekend start and end dates and time.
  //is used to close the gaps in the x scale for the weekend period where there
  //is no market data available.
  getWeekendGaps(data){
    let startDate = new Date();
    let gaps = [[],[],[],[]];

    //find the most recent friday
    let isFriday = false;
    while(isFriday === false){
      if(startDate.getDay() === 5){isFriday = true}
      else{ startDate.setDate(startDate.getDate() -1)}
    }

    //set to 21:00 friday
    startDate.setHours(22);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    //set endDate to end of weekend (friday + 2 days).
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 2);

    gaps[0] = [startDate, endDate];

    //add previous 3 weekends to the list gaps.
    for (var i = 1; i < gaps.length; i++) {
      let prevDate1 = gaps[i-1][0];
      let prevDate2 = gaps[i-1][1];
      let d1 = new Date(prevDate1);
      let d2 = new Date(prevDate2);
      d1.setDate(d1.getDate() - 7);
      d2.setDate(d2.getDate() - 7);
      gaps[i] = [d1, d2];
    }
    return gaps;
  }

}
export default ScaleChart;
