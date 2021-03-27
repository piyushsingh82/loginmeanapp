import React from 'react';
import {Nav,Navbar} from 'react-bootstrap';

class Header extends React.Component {
  

    render() {
        return (
            <div>
               <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Usermanagment</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Register</Nav.Link>
      <Nav.Link href="#link">Home</Nav.Link>
      {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
  
  </Navbar.Collapse>
</Navbar> 
            </div>
        );
    }
}



export default Header;
