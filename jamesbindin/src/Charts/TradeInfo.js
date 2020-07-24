import User from '../Data/User'
import Trade from '../Data/Trade'

class TradeInfo {

  addCurrentTrades(tradesDiv){
    let lables = ["Trade Type", "Currency Pair", "Open Price", "Time Opened", "Trade Ammount", "Current Value", ""]

    try {
      let table = tradesDiv.append("table")
        .attr("class","table table-hover");

      let titleRow = table.append("thead")
        .append("tr").attr("class","titleRow");

        titleRow.selectAll(".titleRow").data(lables).enter()
        .append("th")
        .attr("scope", "col")
        .text((d) => {
          return d;
        });

        table.append("tbody");
      this.updateCurrentTrades(tradesDiv);
    } catch(e){}
  }

  updateCurrentTrades(tradesDiv, currencyPairData, currentPips){
    let user = new User();
    let trade = new Trade();
    let userRecord = user.getUser();

    try {
      let trades = user.getOpenTrades(userRecord.trades);

      let table = tradesDiv.selectAll("tbody")
      table.selectAll(".tradeRow")
        .data(trades).exit().remove();

      let rows = table.selectAll(".tradeRow")
        .data(trades)
        .enter().append("tr")
        .attr("class", "tradeRow")
        .attr("scope", "row")

      rows.append("td")
        .attr("class", "isBuy")
      rows.append("td")
        .attr("class", "currencyPair")
      rows.append("td")
        .attr("class", "openPrice")
      rows.append("td")
        .attr("class", "openTime")
      rows.append("td")
        .attr("class", "ammount")
      rows.append("td")
        .attr("class", "profit")
      rows.append("td")
        .attr("class", "closeTradeButton")
        .append("input")
        .attr("type","button")
        .attr("value","End Trade")
        .attr("class","btn btn-outline-danger btn-sm")

      table.selectAll(".isBuy")
        .text((d,i) => {
          if(trades[i].isBuy === true)
            {return "buy";}
          else
            {return "sell";}
        })

      table.selectAll(".currencyPair")
        .text((d,i) => {
          return trades[i].currencyPair;
        })

      table.selectAll(".openPrice")
        .attr("class", "openPrice")
        .text((d,i) => {
          return trades[i].openPrice;
        });

      table.selectAll(".openTime")
        .attr("class", "openTime")
        .text((d,i) => {
          return this.formatDate(trades[i].openTime);
        });

      table.selectAll(".ammount")
        .attr("class", "ammount")
        .text((d,i) => {
          return trades[i].ammount;
        });

      table.selectAll(".profit")
      .attr("class", "profit")
        .text((d,i) => {
          return trades[i].profit;
        })

      table.selectAll(".closeTradeButton")
        .on("click",(d,i) => {
            trade.closeTrade(trades[i], userRecord);
        });

    } catch(e){}
  }

  formatDate(date){
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let seconds = d.getSeconds();

    let dateStr = year+"/"+month+"/"+day+" "+hour+":"+minute+":"+ seconds;
    return dateStr;
  }


}
export default TradeInfo;
