const store = require('store/storages/sessionStorage');

class GprData{

  saveData(data){
    let dataStr = JSON.stringify(data);
    store.write('gprData',dataStr);
  }

  loadData(){
    let dataStr = store.read('gprData');
    return JSON.parse(dataStr);
  }

  clearData(){
    store.remove("gprData");
  }

}
export default GprData;
