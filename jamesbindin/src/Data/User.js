import UserData from './UserData'
import ForexCalculations from '../Charts/ForexCalculations'

class User{
  constructor(){
    this.userData = new UserData();
  }

  makeUser(userName, firstName, lastName, email, password){
    let user =
    {
      userName:userName,
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password,
      equity:100000,
      trades:[]
    }
    return user;
  }

  setUser(user){
    this.userData.setUser(user);
  }

  getUser(){
    return this.userData.getUser();
  }

  clearUser(){
    this.userData.clearUser();
  }

  getOpenTrades(){
    let trades = this.getUser().trades;
    let openTrades = [];
    for(let t of trades){
      if (t.isOpen === true) {
        openTrades.push(t);
      }
    }
    return openTrades;
  }

  updateProfit(){
    let userRecord = this.getUser();
    let userTrades = userRecord.trades;

    try {
      for(var i = 0; i < userTrades.length; i++) {
        userTrades[i].profit = this.getProfitForTrade(userTrades[i]);
      }

      userRecord.trades = userTrades;
      this.setUser(userRecord);
    } catch (e) {}
  }

  getProfitForTrade(trade){
    let forexCalculations = new ForexCalculations();
    let profit = forexCalculations.tradeProfit(trade);
    return forexCalculations.roundToCurrency(profit);
  }

  calculateTotalEquity(){
    let userRecord = this.getUser();
    let trades = userRecord.trades;
    let currentEquity = userRecord.equity;
    let tradesProfit = 0.0;
    for (var i = 0; i < trades.length; i++) {
      tradesProfit +=  trades[i].profit;
    }
    return currentEquity + tradesProfit;

  }
}
export default User;
