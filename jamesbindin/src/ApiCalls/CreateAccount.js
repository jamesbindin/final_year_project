import RequestStrategy from './RequestStrategy';

//creates and sends a post request to the createAccount endpoint 
//uses session data to recieve current user data, uses promises
//and returns api result
class CreateAccount extends RequestStrategy{

  async makeApiCall(){
    let body = this.user.getUser();
        var parameters = {
        mode: 'cors',
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": '*'
        },
        body: JSON.stringify(body),
        method: "POST"
      }
      
    let promise = await fetch(this.url + "customers/createAccount", parameters)
      .then(response => {return response.json()})
      .then(data => {return data})
      .catch( error => console.log("Error:\n " + error) )
      return promise;
  }
}
export default CreateAccount;
