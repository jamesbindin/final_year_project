import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import User from '../Data/User';
import RequestContext from '../ApiCalls/RequestContext';
import Security from './Security';

class LogInComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
    this.handleSubmitLogIn = this.handleSubmitLogIn.bind(this);
    this.handleChangeLogIn = this.handleChangeLogIn.bind(this);
  }

   async handleSubmitLogIn(event){
    event.preventDefault();
    let user = new User();
    let security = new Security();

    let loginDetails = this.state;

    loginDetails.password = await security.hashPassword(loginDetails.password);
    user.setUser(loginDetails);
    let requestContext = new RequestContext("login");
    let userInfo = await requestContext.contextInterface();
    if(userInfo.userName === loginDetails.userName){
      user.setUser(userInfo)
      this.props.updateState({alert: 'loginSuccess', userName: userInfo.userName});
    }
    else{
      user.clearUser();
      this.props.updateState({alert: 'loginFail'});
    }
  }

  handleChangeLogIn(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }//end of LogInComponent

  render(){
    return(
      <>
        <div style={{paddingLeft:"20%", paddingRight:"20%"}}>
          <h1 align="center">Log In</h1>
          <Form onSubmit={this.handleSubmitLogIn}>
            <Form.Group>
              <Form.Control name="userName" placeholder="username" onChange={this.handleChangeLogIn}/>
                <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChangeLogIn}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Form>
      </div>
      </>
    );
  }
}
export default LogInComponent;
