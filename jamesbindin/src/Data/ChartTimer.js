import ChartCall from './ChartCall'
import CurrentChartInfo from './CurrentChartInfo'

class ChartTimer {

  chartTimer(){
      setInterval(() => {this.getChartData()}, 1000);
  }

  async getChartData(){
    let chartCall = new ChartCall();
    let currentChartInfo = new CurrentChartInfo();

    let currentTimeFrame = currentChartInfo.loadCurrentTimeframe();

    let data = await chartCall.getChartData(currentTimeFrame);
    return data;
  }
}
export default ChartTimer;
