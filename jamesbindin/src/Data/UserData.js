var store = require('store/storages/sessionStorage');

class UserData{

  setUser(data){
    store.remove('user');
    let dataStr = JSON.stringify(data);
    store.write("user",dataStr);
  }

  getUser(){
    let user = store.read("user");
    try {
      let userJson = JSON.parse(user);
      return userJson;
    } catch (e){
    return "";
    }
  }

  clearUser(){
    store.remove("user");
  }
}
export default UserData;
