import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import User from '../Data/User';
import RequestContext from '../ApiCalls/RequestContext';
import Security from './Security';
import UserData from '../Data/UserData';

class DetailsComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      password: '',
      currentUser:{userName:'',firstName:'',lastName:'',email:'',equity:'',trades:[]}
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeDelete = this.handleChangeDelete.bind(this);
  }

  async componentDidMount(){
    let userData = new UserData();
    let user = userData.getUser();
    if(user !== null){
      let requestContext = new RequestContext("userGet");
      let currentUser = await requestContext.contextInterface();
      this.processUser(currentUser);
    }
  }

  //Adds user details to the details page
  processUser(currentUser){
    this.setState({currentUser:currentUser});
  }

  async handleDelete(event){
    event.preventDefault();
    let user = new User();
    let security = new Security();
    this.state.password = await security.hashPassword(this.state.password);
    user.setUser(this.state);
    let requestContext = new RequestContext("deleteAccount");
    let results = await requestContext.contextInterface();

    if(results !== undefined){
      if(results.n >= 1){
        user.clearUser();
        this.props.updateState({alert: "deleteSuccess"});
      } else {
        this.props.updateState({alert: "deleteFail"});
      }
    }
  }

  handleChangeDelete(event){
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({[name]: value});
  }

  render(){
    let trades = this.state.currentUser.trades;
    return(
    <>
     <div style={{paddingLeft:"20%", paddingRight:"20%"}} >
       <h1 align="center">Account Details</h1>
         <Table striped bordered hover>
          <thead>
            <tr>
              <th>UserName</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Equity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.currentUser.userName}</td>
              <td>{this.state.currentUser.firstName}</td>
              <td>{this.state.currentUser.lastName}</td>
              <td>{this.state.currentUser.email}</td>
              <td>{parseFloat(this.state.currentUser.equity).toFixed(2)}</td>
            </tr>
          </tbody>
      </Table>
        <h2>Delete Account</h2>
        <Form onSubmit={this.handleDelete}>
          <Form.Group>
            <Form.Control name="userName" placeholder="user name" onChange={this.handleChangeDelete}/>
              <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChangeDelete}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Delete Account
          </Button>
        </Form>
        </div>
      </>
    );
  }
}
export default DetailsComponent;
