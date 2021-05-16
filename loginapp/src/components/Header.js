import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Listing from "./Listing";
import Homepage from "./Home";
import About from "./About";
class Header extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Usermanagment</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to="/Home" className="btn">
                  Home
                </Link>
                <Link to="/Listing" className="btn">
                  List
                </Link>
                <Link to="/About" className="btn">
                  About
                </Link>
                <NavDropdown
                  title="Dropdown"
                  id="basic-nav-dropdown"
                  className="pullRight"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route path="/Home" component={Homepage} />
          <Route path="/About" component={About} />
          <Route path="/Listing" component={Listing} />
        </Router>
      </div>
    );
  }
}

export default Header;
