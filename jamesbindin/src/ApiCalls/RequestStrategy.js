import User from '../Data/User';

//parent strategy class, contains base url for the api
//and make ApiCall function that is  used by the strategies.
class RequestStrategy{
  constructor(){
    // heroku api url, has been blanked out for privacy.
    this.url = 'XXXXXXXXXXXXXXXXXXXXXXX';
    this.user = new User();
  }
  makeApiCall(){}
}
export default RequestStrategy;
