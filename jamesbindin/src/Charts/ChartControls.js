import ChartCall from '../Data/ChartCall'
import ScaleChart from './ScaleChart'
import AxesChart from './AxesChart'
import ChartData from '../Data/ChartData'
import Trade from '../Data/Trade'
import User from '../Data/User'
import RequestContext from '../ApiCalls/RequestContext'
import CurrentChartInfo from '../Data/CurrentChartInfo'

class ChartControls{
constructor(){
  this.chartCall = new ChartCall();
  this.scaleChart = new ScaleChart();
  this.axesChart = new AxesChart();
  this.chartData = new ChartData();
  this.trade = new Trade();
  this.user = new User();
  this.currentChartInfo = new CurrentChartInfo();
}

  addTimeFrameButtons(controlsDiv, chartSvg, width, height){

    let buttons = controlsDiv.selectAll(".tfButton");
    buttons.attr("class","btn btn-sm btn-secondary")
      .attr("type", "button")
      .attr("value", (d, i) => {
        return d;
      })
      .on("click", (d, i) => {
        this.currentChartInfo.saveCurrentTimeframe(d);
      })
    }

  addChangeCurrency(controlsDiv){
    let data = ["EUR_USD", "USD_JPY", "GBP_USD", "USD_CHF"]
    let select = controlsDiv.append("div")
      .style("float", "right")
      .append("select");
      select
      .style("padding","0px 0px 0px 10px")
      .style("border", "none")
      .style("border-radius", "10px")
      .style("width", "100px")
      .style("height", "26px")
      .selectAll("option")
      .data(data)
      .enter().append("option")
      .text((d) => {
        return d;
      })
      select.on("change", (d) => {
        let newData = select.property('value')
        this.currentChartInfo.saveCurrentCurrency(newData);
      })


  }

  addBuyButton(controlsDiv, chartSvg, width, height){
    let buyButton = controlsDiv.select(".buyButton");

    buyButton.attr("class","btn btn-success btn-sm")
      .on("click",(d, i) => {
      this.buyTrade(chartSvg, width, height);
    })
  }

  addSellButton(controlsDiv, chartSvg, width, height){
    let sellButton = controlsDiv.select(".sellButton");

    sellButton.attr("class","btn btn-danger btn-sm")
    .on("click",(d, i) => {
      this.sellTrade(chartSvg, width, height);
    })
  }

  buyTrade(chartSvg, width, height){

    let requestContext = new RequestContext("updateUser");
    let cData = this.chartData.getCurrencyPairData();
    let isBuy = true;
    let candlesL = cData.candles.length
    let openPrice = cData.candles[candlesL-1].mid.c;

    let openTime = new Date().toJSON();
    let currencyPair = cData.instrument;

    this.trade.addTrade(isBuy, currencyPair, openPrice, openTime);

    requestContext.contextInterface();
  }

  sellTrade(chartSvg, width, height){
    let requestContext = new RequestContext("updateUser");

    let cData = this.chartData.getCurrencyPairData();
    let isBuy = false;
    let candlesL = cData.candles.length
    let openPrice = cData.candles[candlesL-1].mid.c;

    let openTime = new Date().toJSON();
    let currencyPair = cData.instrument;

    this.trade.addTrade(isBuy, currencyPair, openPrice, openTime);

    requestContext.contextInterface();
  }

}
export default ChartControls;
