import Line from './Line'

class CurrentLine {
  constructor(){
    this.line = new Line();
  }
  drawCurrentLine(chartSvg, xScale, yScale, data){
    let candles = data.candles;
    let x1 =  candles[0].time;
    let x2 = candles[candles.length-1].time;
    let y1 = candles[candles.length-1].mid.c;
    x1 = new Date(x1);
    x2 = new Date(x2);
    let y2 = y1;
    let colour = "black";
    let strokeWidth = 1;
    let opacity = "0.30";
    this.line.drawLine(chartSvg, xScale, yScale, x1, x2, y1, y2, colour, opacity, "cl", strokeWidth);
  }
}

export default CurrentLine;
