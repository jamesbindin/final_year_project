import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ChartComponent from '../Charts/ChartComponent.js';

import User from '../Data/User';
import CreateAccountComponent from './CreateAccountComponent'
import LogInComponent from './LogInComponent'
import LogOutComponent from './LogOutComponent'
import DetailsComponent from './DetailsComponent'
import AlertsComponent from './AlertsComponent'

class NavbarComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mainComponent : '',
      userName : '',
      firstName : '',
      lastName : '',
      email : '',
      alert : ''
    }
    this.user = new User();
    this.alertsComponent = new AlertsComponent();
    this.selectMainComponent = this.selectMainComponent.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleNavigation(key){
    let navComponent = key + "Component";
    this.setState({mainComponent: navComponent});
    this.setState({alert:''});
  }

  updateState(data){
    this.setState(data);
  }

  showUserName(){
    let user = this.user.getUser();
    if (user !== null) {
      let userName = user.userName;
        return(
          <Navbar.Text>
            Logged In As: &nbsp;
            <abbr>{userName}</abbr>
          </Navbar.Text>
        )}
  }

  selectMainComponent(){
    let component = this.state.mainComponent;
    if(component === "ChartComponent"){
      return <ChartComponent updateState={this.updateState} />;
    }
    else if (component === "CreateAccountComponent") {
      return <CreateAccountComponent  updateState={this.updateState}/>;
    }
    else if (component === "LogInComponent") {
      return <LogInComponent  updateState={this.updateState}/>;
    }
    else if (component === "LogOutComponent") {
      return <LogOutComponent  updateState={this.updateState}/>;
    }
    else if (component === "DetailsComponent") {
      return <DetailsComponent  updateState={this.updateState}/>;
    }
    else{
      return <ChartComponent  updateState={this.updateState}/>;
    }
  }

  render(){
    return(
      <>
  <Navbar bg = "primary" variant = "dark" expand = "sm" collapseOnSelect >
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse >
        <Nav onSelect={k => this.handleNavigation(k)}>
        <Navbar.Brand className="navbar-brand" href="/">Forex Trading</Navbar.Brand>
          <Nav.Item>
            <Nav.Link eventKey="Chart">View Chart</Nav.Link>
          </Nav.Item>
          <NavDropdown  title="Account" id="nav-dropdown">
            <NavDropdown.Item eventKey="LogIn">
              Login
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="CreateAccount">
              Create Account
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="LogOut">
              Logout
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="Details">
              My Account
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <Nav className="justify-content-end">
        {this.showUserName()}
      </Nav>
    </Navbar>

    <div className="jumbotron" style={{padding:"1%", margin:"0px", border:"0px"}} >
      {this.alertsComponent.alerts(this.state.alert)}
      {this.selectMainComponent()}
    </div>
  </>
    );
  }
}
export default NavbarComponent;
