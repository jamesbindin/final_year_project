import Login from './LogIn';
import CreateAccount from './CreateAccount'
import DeleteAccount from './DeleteAccount'
import UpdateUser from './UpdateUser'
import GprGet from './GprGet'
import UserGet from './UserGet'

//request context for the strategy pattern, used to
//select the correct strategy chosen by the client class.
class RequestContext{
  constructor(type){
    switch(type){
      case "login":
      this.RequestStrategy = new Login();
      break;

      case "createAccount":
      this.RequestStrategy = new CreateAccount();
      break;

      case "deleteAccount":
      this.RequestStrategy = new DeleteAccount();
      break;

      case "updateUser":
      this.RequestStrategy = new UpdateUser();
      break;

      case "gprGet":
      this.RequestStrategy = new GprGet();
      break;

      case "userGet":
      this.RequestStrategy = new UserGet();
      break;

      default:
      console.log("strategy does not exist");
    }
  }

  setStrategy(type){
    switch(type){
      case "login":
      this.RequestStrategy = new Login();
      break;

      case "createAccount":
      this.RequestStrategy = new CreateAccount();
      break;

      case "deleteAccount":
      this.RequestStrategy = new DeleteAccount();
      break;

      case "updateUser":
      this.RequestStrategy = new UpdateUser();
      break;

      case "gprGet":
      this.RequestStrategy = new GprGet();
      break;

      case "userGet":
      this.RequestStrategy = new UserGet();
      break;

      default:
      console.log("strategy does not exist");
    }
  }

  contextInterface(){
      return this.RequestStrategy.makeApiCall();
    }
}
export default RequestContext;
