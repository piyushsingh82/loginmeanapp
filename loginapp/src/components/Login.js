import React from "react";

import { Form, Button } from "react-bootstrap";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      useremail: null,
      userpasswd: null,
      login: false,
      store: null,
    };
  }
  componentDidMount() {
    let store = JSON.parse(localStorage.getItem("login"));
    this.setState({ store: store });
    if (store && store.login) {
      this.setState({ login: true });
    }
    // console.log('store item : '+store);
  }
  AuthorizeLogin() {
    console.log("this state " + this.state.useremail, this.state.userpasswd);
    fetch("http://localhost:127.0.0.1/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state),
    }).then((resp) => {
      console.log("what a response", resp);
      resp.json().then((result) => {
        console.log("result :" + result);
        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            token: result.token,
          })
        );
        this.setState({ login: true });
      });
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="loginpage">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required="required"
                onChange={(e) => {
                  this.setState({ useremail: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required="required"
                onChange={(e) => {
                  this.setState({ userpasswd: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              onClick={() => this.AuthorizeLogin()}
            >
              Submit
            </Button>
          </Form>
        </div>

        <div></div>
      </div>
    );
  }
}

// Login.propTypes = {};
//{!this.state.login?:}
export default Login;
