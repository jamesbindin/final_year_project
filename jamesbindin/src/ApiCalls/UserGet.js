import RequestStrategy from './RequestStrategy';

//sends a get request to get the users details.
//uses session data to recieve current user data, uses promises
//and returns api result
class UserGet extends RequestStrategy{
  async makeApiCall(){
    let user = this.user.getUser();
    let userName = user.userName;
    let password = user.password;
    let url = this.url + "customers/"+userName+"/"+password;

    var parameters = {
        mode: 'cors',
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": '*'
        },
        method: "Get"
      }

      var promise = await fetch(url, parameters)
        .then(response => {return response.json()})
        .then(data => {return data})
        .catch( error => console.log(error) )
        return promise;
  }
}
export default UserGet;
