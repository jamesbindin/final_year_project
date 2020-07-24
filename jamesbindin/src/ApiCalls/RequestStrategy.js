import User from '../Data/User';

//parent strategy class, contains base url for the api
//and make ApiCall function that is  used by the strategies.
class RequestStrategy{
  constructor(){
    // THE URL FOR THE REST API HAS BEEN REMOVED.
    this.url = 'EMPTY URL';
    this.user = new User();
  }
  makeApiCall(){}
}
export default RequestStrategy;
