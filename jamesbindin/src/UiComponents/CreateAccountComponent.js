import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import User from '../Data/User';
import RequestContext from '../ApiCalls/RequestContext';
import Security from './Security'

class CreateAccountComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
      };
    this.handleChangeCreateAccount = this.handleChangeCreateAccount.bind(this);
    this.handleSubmitCreateAccount = this.handleSubmitCreateAccount.bind(this);
  }

  async handleSubmitCreateAccount(event){
    event.preventDefault();
    let user = new User();
    let security = new Security();

    let data = this.state;
    data.password = await security.hashPassword(data.password);

    let madeUser = user.makeUser(data.userName, data.firstName, data.lastName, data.email, data.password);
    user.setUser(madeUser);

    let requestContext = new RequestContext("createAccount");
    let result = await requestContext.contextInterface();

    if(result[0] !== undefined){
      if(result[0].userName === madeUser.userName) {
        user.setUser(result[0]);
        this.props.updateState(result[0]);
        this.props.updateState({alert: 'createAccountSuccess'});
      }
    }
    else{
      user.clearUser();
      this.props.updateState({alert: 'createAccountFail'});

         }
  }

  handleChangeCreateAccount(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }

  render(){
    return(
      <>
        <div style={{paddingLeft:"25%", paddingRight:"25%"}}>
          <h1 align="center">Create Account</h1>
          <Form onSubmit={this.handleSubmitCreateAccount}>
            <Form.Group>
              <Form.Control name="userName"  placeholder="username" onChange={this.handleChangeCreateAccount}/>
              <Form.Control name="firstName"  placeholder="first name" onChange={this.handleChangeCreateAccount}/>
              <Form.Control name="lastName"  placeholder="last name" onChange={this.handleChangeCreateAccount}/>
              <Form.Control name="email"  placeholder="email" onChange={this.handleChangeCreateAccount}/>
              <Form.Control name="password"  placeholder="password" onChange={this.handleChangeCreateAccount}/>
            </Form.Group>
          <Button variant="primary" type="submit">Sign Up</Button>
          </Form>
        </div>
      </>
    );
  }
}

export default CreateAccountComponent;
