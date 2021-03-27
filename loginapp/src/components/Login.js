import React from 'react';
// import router from 'react-dom-router';
import {Form,Button} from 'react-bootstrap';

class Login extends React.Component {
   AuthorizeLogin(){
    console.log("state", this.state)
    fetch('https://127.0.01:3001/api/searchuser/:emailid',{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(this.state)
    })
   }

    render() {
        return (
            <div className="container-fluid">
                
               <div className = "loginpage">
               <Form>
               <Form.Group controlId="formBasicEmail">
                 <Form.Label>Email address</Form.Label>
                 <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{this.setState({useremail:e.target.value})}}/>
                </Form.Group>
             
               <Form.Group controlId="formBasicPassword">
                 <Form.Label>Password</Form.Label>
                 <Form.Control type="password" placeholder="Password" onChange={(e)=>{this.setState({userpasswd:e.target.value})}} />
               </Form.Group>
               <Form.Group controlId="formBasicCheckbox">
                 <Form.Check type="checkbox" label="Check me out" />
               </Form.Group>
               <Button variant="primary" type="button" onClick={()=>this.AuthorizeLogin()}>
                 Submit
               </Button>
             </Form>
               </div>
            </div>
        );
    }
}

// Login.propTypes = {};

export default Login;
