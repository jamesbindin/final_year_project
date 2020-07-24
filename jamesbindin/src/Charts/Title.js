import ChartData from '../Data/ChartData'

class Title {

  updateTitle(titleDiv){
    let chartData = new ChartData();
    let data = chartData.getCurrencyPairData();
    titleDiv.selectAll(".title")
      .data([data])
      .text((d) => {
        return this.titleUpdate(d);
      });
  }

  titleUpdate(data){
    let timeframe = data.granularity;
    let currencyPair = data.instrument;
    let titleStr = "";
    switch(currencyPair) {
      case "EUR_USD":
        titleStr = "Euro / U.S. dollar (EUR_USD), " + timeframe;
        break;
      case "USD_JPY":
        titleStr = "U.S. dollar / Japanese yen (USD_JPY), " + timeframe;
        break;
      case "GBP_USD":
        titleStr = "British pound / U.S. dollar (GBP_USD), " + timeframe;
        break;
      case "USD_CHF":
        titleStr = "U.S. dollar / Swiss franc (USD_CHF), " + timeframe;
        break;
      default:
    }
    return titleStr;
  }

}
export default Title;
