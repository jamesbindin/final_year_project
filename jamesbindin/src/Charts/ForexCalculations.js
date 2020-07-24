import ChartData from '../Data/ChartData'
class ForexCalculations {

  tradeProfit(trade){
    let chartData = new ChartData();
    let currPipValues = chartData.getCurrentPips();
    let tradeOpenPips = trade.openPrice;
    let currencyPair = trade.currencyPair;
    let position = 0.0;

    switch (currencyPair) {
      case "EUR_USD":
        position = currPipValues.EUR_USD;
        break;
      case "USD_JPY":
        position = currPipValues.USD_JPY;
        break;
      case "GBP_USD":
        position = currPipValues.GBP_USD;
        break;
      case "USD_CHF":
        position = currPipValues.USD_CHF;
        break;
      default:
    }

    let pipDiff = position - tradeOpenPips;
    let tradeLotSize = trade.ammount * trade.leverage;
    let tradeProfit = pipDiff * tradeLotSize;
    if (trade.isBuy !== true) {
      tradeProfit = -tradeProfit;
    }
    if(trade.currencyPair === "USD_JPY"){
      tradeProfit = tradeProfit / 100;
    }
    return tradeProfit;
  }

  roundToCurrency(value){
    let roundedTwoDp = parseFloat(Math.round(value * 100) / 100).toFixed(2);
    return roundedTwoDp;
  }
}
export default ForexCalculations;
