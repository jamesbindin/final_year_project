import React from 'react'
import * as d3 from "d3"

import User from '../Data/User'
import TradeLines from './TradeLines'
import ScaleChart from './ScaleChart'
import Wicks from './Wicks'
import Bars from './Bars'
import AxesChart from './AxesChart'
import ChartControls from './ChartControls'
import UpdateChart from './UpdateChart'
import ChartData from '../Data/ChartData'
import ChartTimer from '../Data/ChartTimer'
import TradeInfo from './TradeInfo'
import GprTimer from '../Data/GprTimer'
import GprData from '../Data/GprData'
import Gpr from './Gpr'
import CurrentChartInfo from "../Data/CurrentChartInfo"

class ChartComponent extends React.Component {
constructor(props){
super(props);
this.user = new User();
this.tradeLines = new TradeLines();
this.chartControls = new ChartControls();
this.scaleChart = new ScaleChart();
this.wicks = new Wicks();
this.bars = new Bars();
this.axesChart = new AxesChart();
this.updateChart = new UpdateChart();
this.chartData = new ChartData();
this.tradeInfo = new TradeInfo();
this.gprTimer = new GprTimer();
this.gprData = new GprData();
this.gpr = new Gpr();
this.currentChartInfo = new CurrentChartInfo();

this.chartDiv = "";
this.controlsDiv = "";
this.tradesDiv = "";
this.titleDiv = "";
}

async makeChart(){

  let chartTimer = new ChartTimer();
  this.gprTimer.gprTimer();

  let height = 250;
  let width = 800;
  let timeFrames = ['M5','M15','M30','H1','H4'];
  this.currentChartInfo.saveCurrentCurrency("EUR_USD")
  this.currentChartInfo.saveCurrentTimeframe("M15")

  await chartTimer.getChartData();
  chartTimer.chartTimer();
  let cData = this.chartData.getCurrencyPairData();
  await this.gprTimer.getGprData();
  let gprD = this.gprData.loadData();
  let titleDiv = d3.select(this.titleDiv)
  let chartDiv = d3.select(this.chartDiv)
  titleDiv.append("h2")
  .attr("class", "title")
  .attr("align", "center")
  .style("margin-bottom", "0")




  let controlsDiv = d3.select(this.controlsDiv)
  controlsDiv.style("padding", "10px")
  let tradesDiv = d3.select(this.tradesDiv)
  let chartSvg = chartDiv.append("svg")
    .attr("version","1.1")
    .attr("viewBox","0 0 860 280")
    .attr("preserveAspectRatio","xMinYMin meet")
    .attr("class","svg-content")

  controlsDiv.selectAll("input")
    .data(timeFrames)
    .enter()
    .append("input")
    .attr("class", "tfButton");
  controlsDiv.append("input")
    .attr("class","buyButton")
    .attr("type", "button")
    .attr("value", "Buy");

  controlsDiv.append("input")
    .attr("class","sellButton")
    .attr("type", "button")
    .attr("value", "Sell");
  let xScale = this.scaleChart.getScaleX(cData, height);
  d3.axisBottom(xScale)
  .scale(xScale)

  let yScale = this.scaleChart.getScaleY(cData, height);
  d3.axisLeft(yScale)
    .scale(yScale);
  this.axesChart.addAxesX(chartSvg);
  this.axesChart.addAxesY(chartSvg);
  this.gpr.addGpr(chartSvg, xScale, yScale, gprD);
  this.wicks.addWicks(chartSvg, cData);
  this.bars.addBars(chartSvg, cData);

  this.chartControls.addTimeFrameButtons(controlsDiv, chartSvg, width, height);
  this.chartControls.addBuyButton(controlsDiv, chartSvg, width, height);
  this.chartControls.addSellButton(controlsDiv, chartSvg, width, height);
  this.chartControls.addChangeCurrency(controlsDiv);
  this.tradeInfo.addCurrentTrades(tradesDiv);
  this.updateChart.updateChart(chartSvg, tradesDiv, titleDiv, width, height);
}

componentDidMount(){
  this.makeChart();
}

render() {
  return <div style={{paddingLeft:"13.5%", paddingRight:"13.5%"}}>
           <div ref={el => this.titleDiv = el}></div>
           <div className="svg-container"  ref={el => this.chartDiv = el} ></div>
           <div ref={el=> this.controlsDiv = el} ></div>
           <div ref={el => this.tradesDiv = el} ></div>
         </div>
       };
}//end of class

export default ChartComponent;
