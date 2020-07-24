var store = require('store/storages/sessionStorage');

class CurrentChartInfo{

  saveCurrentCurrency(data){
    store.remove('currentCurrency');
    let dataStr = JSON.stringify(data);
    store.write("currentCurrency",dataStr);
  }

  loadCurrentCurrency(){
    let data = store.read("currentCurrency");
    try {
      let dataJson = JSON.parse(data);
      return dataJson;

    } catch (e){
    return "";
    }
  }

    saveCurrentTimeframe(data){
      store.remove('currentTimeframe');
      let dataStr = JSON.stringify(data);
      store.write("currentTimeframe",dataStr);
    }

    loadCurrentTimeframe(){
      let data = store.read("currentTimeframe");
      try {
        let dataJson = JSON.parse(data);
        return dataJson;

      } catch (e){
      return "";
      }
    }

    getTimeDifference(timeFrame){
      let oneMinute = 60000;
      let oneHour = oneMinute * 60;
      let timeDifferences = {
        M5:oneMinute*5,
        M15:oneMinute*15,
        M30:oneMinute*30,
        H1:oneHour,
        H4:oneHour*4
      }

      return timeDifferences[timeFrame];
    }

}
export default CurrentChartInfo;
