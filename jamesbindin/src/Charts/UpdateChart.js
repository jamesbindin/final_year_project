import * as d3 from "d3"

import Wicks from './Wicks'
import Bars from './Bars'
import AxesChart from './AxesChart'
import TradeLines from './TradeLines'
import ScaleChart from './ScaleChart'
import CurrentLine from './CurrentLine'
import Line from './Line'
import ChartData from '../Data/ChartData'
import TradeInfo from './TradeInfo'
import Title from './Title'
import User from '../Data/User'
import GprData from '../Data/GprData'
import Gpr from './Gpr'

class UpdateChart{
  constructor(){
    this.wicks = new Wicks();
    this.bars = new Bars();
    this.axesChart = new AxesChart();
    this.tradeLines = new TradeLines();
    this.scaleChart = new ScaleChart();
    this.currentLine = new CurrentLine();
    this.line = new Line();
    this.chartData = new ChartData();
    this.tradeInfo = new TradeInfo();
    this.title = new Title();
    this.user = new User();
    this.gpr = new Gpr();
  }

  updateChart(chartSvg, tradesDiv, titleDiv, width, height){
    this.update(chartSvg, tradesDiv, titleDiv, width, height)
    setInterval(() => {
      this.update(chartSvg, tradesDiv, titleDiv, width, height)
    }, 1000);
  }

  update(chartSvg, tradesDiv, titleDiv, width, height){
    let currentPips = this.chartData.getCurrentPips();
    let currencyPairData = this.chartData.getCurrencyPairData();
    let gprD = new GprData().loadData(); 
    try {
      let xScale = this.scaleChart.getScaleX(currencyPairData, width);
      let yScale = this.scaleChart.getScaleY(currencyPairData, height);

      let newScales = this.gpr.updateGpr(chartSvg, xScale, yScale, gprD);
      xScale = newScales.xScale;
      yScale = newScales.yScale;

      let xAxes = d3.axisBottom(xScale)
      .scale(xScale)
      let yAxes = d3.axisLeft(yScale)
      .scale(yScale);

      this.title.updateTitle(titleDiv);
      this.bars.updateBars(chartSvg, xScale, yScale, currencyPairData);
      this.wicks.updateWicks(chartSvg, currencyPairData, xScale, yScale);
      this.axesChart.updateAxes(chartSvg, xAxes, yAxes, height);
      this.line.removeLines(chartSvg);
      this.tradeLines.drawTrades(chartSvg, xScale, yScale, currencyPairData);
      this.currentLine.drawCurrentLine(chartSvg, xScale, yScale, currencyPairData);
      this.tradeInfo.updateCurrentTrades(tradesDiv, currencyPairData, currentPips);
      this.user.updateProfit();
    } catch (e) {}
  }
}
export default UpdateChart;
