import Line from './Line'
import User from '../Data/User'

class TradeLines{
  constructor(){
    this.line = new Line();
    this.user = new User();
  }

  drawTrades(chartSvg, xScale, yScale, data){
    try{
      let userRecord = this.user.getUser();
      let trades = userRecord.trades;
      let currTimeAsStr = data.candles[data.candles.length-1].time;
      let currentTime = new Date(currTimeAsStr);

        for (var i = 0; i < trades.length; i++) {
          let trade = trades[i];
          if(trade.isOpen === true){

          let stTime = data.candles[0].time;
          stTime = new Date(stTime);
          let tradeValue = trade.openPrice;
          let opacity = "0.9";
          let className = "tl";
          let strokeWidth = 1;

          if (trades[i].isBuy === true){
            let buyValue = tradeValue;

            this.line.drawLine(chartSvg, xScale, yScale, stTime, currentTime, buyValue, buyValue, "green", opacity, className, strokeWidth);
          }
          else{
            let sellValue = tradeValue;
            this.line.drawLine(chartSvg, xScale, yScale, stTime, currentTime, sellValue, sellValue, "red", opacity, className, strokeWidth);
          }
        }
      }
    }
    catch(err){
    }
  }




}
export default TradeLines;
