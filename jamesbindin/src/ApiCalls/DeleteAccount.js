import RequestStrategy from './RequestStrategy';

//creates and sends delete request to the customer endpoint
//uses session data to recieve current user data, uses promises
//and returns api result
class DeleteAccount extends RequestStrategy{

  async makeApiCall(){
    let userData = this.user.getUser();
    let userName = userData.userName;
    let password = userData.password;

    const url = this.url + 'customers/'+ userName+"/"+password;

    var parameters = {
      mode: 'cors',
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": '*'
      },
      method: "DELETE"
    };

    var promise = await fetch(url, parameters)
    .then(response => {return response.json()})
    .then(data => {return data})
    .catch( error => console.log("Error:\n " + error) )

    return promise;
  }
}
export default DeleteAccount;
