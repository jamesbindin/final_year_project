import RequestContext from '../ApiCalls/RequestContext'
import GprData from './GprData'

class GprTimer {

  gprTimer(){
      this.getGprData();
      setInterval(() => {this.getGprData()}, 1200000);
  }


  async getGprData(){
    let gprData = new GprData();
    let requestContext = new RequestContext("gprGet");

    let data = await requestContext.contextInterface();
    gprData.saveData(data);
    return(data);

  }
}
export default GprTimer;
