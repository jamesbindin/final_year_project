import RequestStrategy from './RequestStrategy';

//creates and sends a get request to the gpr endpoint,
//uses session data to recieve current user data, uses promises
//and returns api result
class GprGet extends RequestStrategy{

  async makeApiCall(){
        var parameters = {
        mode: 'cors',
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": '*'
        },
        method: "Get"
      }

      var promise = await fetch(this.url + "gpr/", parameters)
        .then(response => {return response.json()})
        .then(data => {return data})
        .catch( error => console.log("Error:\n " + error) )
        return promise;
  }
}
export default GprGet;
