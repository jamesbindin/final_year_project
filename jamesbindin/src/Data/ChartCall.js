import ChartData from './ChartData';
import CurrentChartInfo from './CurrentChartInfo'

 class ChartCall {
  constructor() {
    this.chartData = new ChartData();
    // NEED AN OANDA ACCOUNT AND API KEY TO ACCESS DATA
    this.oandaApiToken = "EMPTY API KEY!!!!!!!";
  }

  async getData(timeFrame){
    const urls = [
      "https://api-fxpractice.oanda.com/v3/instruments/EUR_USD/candles?granularity="+timeFrame+"&count=100",
      "https://api-fxpractice.oanda.com/v3/instruments/USD_JPY/candles?granularity="+timeFrame+"&count=100",
      "https://api-fxpractice.oanda.com/v3/instruments/GBP_USD/candles?granularity="+timeFrame+"&count=100",
      "https://api-fxpractice.oanda.com/v3/instruments/USD_CHF/candles?granularity="+timeFrame+"&count=100"
    ];

     let params = {
       headers: {
         "content-type": "application/json",
         "Connection": "Keep-Alive",
         "Authorization": this.oandaApiToken,
       },
       method: "GET"
     }

     let promise = Promise.all(urls.map(url =>
      fetch(url, params)
        .then(data => {
          return data.json();
        })
    ))
    return promise;
  }

  async getChartData(timeFrame){
    let currentChartInfo = new CurrentChartInfo()
    let data = await this.getData(timeFrame);
    let dataToJson = {
      EUR_USD: data[0],
      USD_JPY: data[1],
      GBP_USD: data[2],
      USD_CHF: data[3]
    }
    if(data[0].granularity === currentChartInfo.loadCurrentTimeframe() ){
      this.chartData.saveData(dataToJson);
    }
    return dataToJson;
  }
}
export default ChartCall;
