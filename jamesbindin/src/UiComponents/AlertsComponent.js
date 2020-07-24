import React from 'react';
import Alert from 'react-bootstrap/Alert';


class AlertsComponent extends React.Component{
    alerts(alertRequest){
      if (alertRequest === "createAccountSuccess"){
        return <Alert variant="success">
          Account Created Successfuly.
        </Alert>;
      }
      else if(alertRequest === "createAccountFail"){
        return <Alert variant="warning">
          Problem Creating Account.
        </Alert>;
      }
      else if(alertRequest === "logOutSuccess"){
        return <Alert variant="success">
          Logged out successfully.
        </Alert>;
      }
      else if(alertRequest === "loginSuccess"){
        return <Alert variant="success">
          Logged in successfully.
        </Alert>;
      }
      else if(alertRequest === "loginFail"){
        return <Alert variant="warning">
          Problem Logging In.
        </Alert>;
      }
      else if(alertRequest === "deleteSuccess"){
        return <Alert variant="success">
          Delete successful.
        </Alert>;
      }
      else if(alertRequest === "deleteFail"){
        return <Alert variant="warning">
          Delete Unsuccessful.
        </Alert>;
      }
  }
}
export default AlertsComponent;
