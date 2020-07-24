var store = require('store/storages/sessionStorage');
import RequestContext from '../src/ApiCalls/RequestContext'
import User from '../src/Data/User'
let chai = require('chai');
let expect = chai.expect;

//All tests include using the RequestContext which is used to make requests to
//the api endpoints. User is used to create user objects and store the user in
//mock session data, which is used by api request classes such as /src/ApiCalls/CreateAccount.js
//all users with the username: test1 and test2 need to be removed from the database before tests
//are carried out.

//CreateAccount tests: tests creating a new user and attempting to create account with 
//user that already exists.
 describe('CreateAccount Unit Test', function() {
  it('CreateAccount, Testing New User:', async function() {
    let user = new User();
    let userDetails = user.makeUser("test1", "test1", "test1", "test1", "test1"); 
    user.setUser(userDetails);
    let requestContext = new RequestContext("createAccount")
    let response = await requestContext.contextInterface()
    delete response[0]["_id"]
    expect(response[0]).to.deep.equal(userDetails);
  });

  it('CreateAccount, Testing Existing User:', async function() {
    let user = new User();
    let userDetails = user.makeUser("test1", "test1", "test1", "test1", "test1"); 
    user.setUser(userDetails);
    let requestContext = new RequestContext("createAccount")
    let response = await requestContext.contextInterface()
    expect(response).to.deep.equal({"message": "account already exists"});
  });
});

//Login tests: logging in with a user that exists on system and attempts to login
//as a user that doesnt exist.
 describe('Login Unit Test', function() {
  it('Login, Testing Previously Created User:', async function() {
    let user = new User();
    let userDetails = user.makeUser("test1", "test1", "test1", "test1", "test1"); 
    user.setUser(userDetails);
    let requestContext = new RequestContext("login")
    let response = await requestContext.contextInterface()
    delete response["_id"]
    expect(response).to.deep.equal(userDetails);
  });

  it('Login Testing Not Existing User:', async function() {
    let user = new User();
    let userDetails = user.makeUser("test2", "test2", "test2", "test2", "test2"); 
    user.setUser(userDetails);
    let requestContext = new RequestContext("login")
    let response = await requestContext.contextInterface()
    expect(response).to.deep.equal({"message": "login failure"});
  });
});

//UserGet tests: get user that exists, get user that does not exist.
 describe('UserGet Unit Test', function() {
  it('userGet, Testing Previously Created User:', async function() {
    let user = new User();
    let userDetails = user.makeUser("test1", "test1", "test1", "test1", "test1"); 
    user.setUser(userDetails);
    let requestContext = new RequestContext("userGet")
    let response = await requestContext.contextInterface()
    delete response["_id"]
    expect(response).to.deep.equal(userDetails);
  });

  it('userGet, Testing Not Existing User:', async function() {
    let user = new User();
    let userDetails = user.makeUser("test2", "test2", "test2", "test2", "test2"); 
    user.setUser(userDetails);
    let requestContext = new RequestContext("userGet")
    let response = await requestContext.contextInterface()
    expect(response).to.deep.equal({"message": "get failure"});
  });
});

//UpdateUser tests: updates user that exists, updates user that does not exist.
 describe('UpdateUser Unit Test', function() {
  it('Login, Testing Previously Created User:', async function() {
    let user = new User();
    let userDetails = user.makeUser("test1", "newData", "newData", "newData", "test1"); 
    user.setUser(userDetails);
    let requestContext = new RequestContext("updateUser")
    let response = await requestContext.contextInterface()
    expect(response.n).to.deep.equal(1);
  });

  it('UpdateUser, Testing Not Existing User:', async function() {
    let user = new User();
    let userDetails = user.makeUser("test2", "test2", "test2", "test2", "test2"); 
    user.setUser(userDetails);
    let requestContext = new RequestContext("updateUser")
    let response = await requestContext.contextInterface()
    expect(response.n).to.deep.equal(0);
  });
});
