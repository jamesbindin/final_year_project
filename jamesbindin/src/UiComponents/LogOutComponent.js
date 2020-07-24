import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import User from '../Data/User';

class LogOutComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.handleSubmitLogout = this.handleSubmitLogout.bind(this);
  }

  handleSubmitLogout(event){
    let user = new User();
    event.preventDefault();
    user.clearUser();
    this.props.updateState({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      alert: "logOutSuccess"
    });
  }

  render(){
    return(
      <>
      <div style={{paddingLeft:"20%", paddingRight:"20%"}}>
          <h1 align="center">Log Out</h1>
          <Form onSubmit={this.handleSubmitLogout}>
            <Button variant="primary" type="submit">
              Log Out
            </Button>
          </Form>
        </div>
          </>
      );
  }
}
export default LogOutComponent;
