import RequestStrategy from './RequestStrategy';

//makes post request to update the users details uses promises
class UpdateUser extends RequestStrategy{
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

      var promise = await fetch(this.url + "customers/updateUser", parameters)
        .then(response => {return response.json()})
        .then(data => {return data})
        .catch( error => console.log("Error:\n " + error) )

        return promise;
  }
}
export default UpdateUser;
