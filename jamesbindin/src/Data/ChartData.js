import CurrentChartInfo from './CurrentChartInfo'
const store = require('store/storages/sessionStorage');

class ChartData{

  saveData(data){
    let dataStr = JSON.stringify(data);
    store.write('chartData',dataStr);
  }

  loadData(){
    let dataStr = store.read('chartData');
    return JSON.parse(dataStr);
  }

  clearChartData(){
    store.remove("chartData");
  }

  getCurrencyPairData(){
    let currentChartInfo = new CurrentChartInfo();
    let currencyPair = currentChartInfo.loadCurrentCurrency();
    let data = this.loadData();
    let cpData = null;
    switch (currencyPair) {
      case "EUR_USD":
      cpData = data.EUR_USD;
      break;
      case "USD_JPY":
      cpData = data.USD_JPY;
      break;
      case "GBP_USD":
      cpData = data.GBP_USD;
      break;
      case "USD_CHF":
      cpData = data.USD_CHF;
      break;
      default:
      break;
    }
    return cpData;
  }

  getCurrentPips(){
    let allChartData = this.loadData();
    let length = allChartData.EUR_USD.candles.length;
    let eurUsdPips = allChartData.EUR_USD.candles[length-1].mid.c;
    let usdJpyPips = allChartData.USD_JPY.candles[length-1].mid.c;
    let gbpUsdPips = allChartData.GBP_USD.candles[length-1].mid.c;
    let usdChfPips = allChartData.USD_CHF.candles[length-1].mid.c;

    let currentPips = {
      EUR_USD:eurUsdPips,
      USD_JPY:usdJpyPips,
      GBP_USD:gbpUsdPips,
      USD_CHF:usdChfPips
    };
    return currentPips;
  }

  getCurrentPipForCurrencyPair(pairString){
    let currentPips = this.getCurrentPips();
    let cpCurrentPip = null;
    switch (pairString) {
      case "EUR_USD":
        cpCurrentPip = currentPips.EUR_USD;
        break;
      case "USD_JPY":
        cpCurrentPip = currentPips.USD_JPY;
        break;
      case "GBP_USD":
        cpCurrentPip = currentPips.GBP_USD;
        break;
      case "USD_CHF":
        cpCurrentPip = currentPips.USD_CHF;
        break;
      default:

      return cpCurrentPip;
    }
  }

  getDataForCurrencyPair(pairString){
    let data = this.loadData();
    let cpData = null;
    switch (pairString) {
      case "EUR_USD":
        cpData = data.EUR_USD;
        break;
      case "USD_JPY":
        cpData = data.USD_JPY;
        break;
      case "GBP_USD":
        cpData = data.GBP_USD;
        break;
      case "USD_CHF":
        cpData = data.USD_CHF;
        break;
        default:
      }
      return cpData;
  }
}

export default ChartData;
