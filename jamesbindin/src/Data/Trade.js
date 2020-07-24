import ChartData from './ChartData'
import RequestContext from "../ApiCalls/RequestContext"
import User from './User'

class Trade {

addTrade(isBuy, currencyPair, openPrice, openTime){
  let trade = {
    isOpen:true,
    isBuy:isBuy,
    currencyPair:currencyPair,
    openPrice:openPrice,
    closePrice:0.0,
    openTime:openTime,
    closeTime:0,
    ammount:100,
    leverage:100,
    profit:0.0
  }
  this.addTradeToUser(trade);
}

closeTrade(tradeData, userRecord){
  let chartData = new ChartData();

  let currentTime = new Date().toJSON();
  let currentPip = chartData.getCurrentPipForCurrencyPair(tradeData.currencyPair);

  tradeData.closePrice = currentPip;
  tradeData.closeTime = currentTime;
  tradeData.isOpen = false;

  let tradeProfit = parseFloat(tradeData.profit);
  userRecord.equity += tradeProfit



  this.replaceTrade(tradeData, userRecord);

  let requestContext = new RequestContext("updateUser");
  requestContext.contextInterface();
  }

  addTradeToUser(trade){
    let user = new User();
    let userRecord = user.getUser();
    try {
      userRecord.trades.push(trade);
      user.setUser(userRecord);
    } catch (e) {}
  }

  replaceTrade(trade, userRecord){
    let user = new User();
    for(var i = 0; i < userRecord.trades.length; i++){
      if(trade.openTime === userRecord.trades[i].openTime){
        userRecord.trades[i] = trade;
      }
    }
    user.setUser(userRecord);
  }
}
export default Trade;
