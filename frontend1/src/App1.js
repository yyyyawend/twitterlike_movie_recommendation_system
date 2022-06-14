import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import Login from "./components/login";
import Signup from "./components/signup";
import Logout from "./components/logout";

function App() {

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Movie Potato</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Movie</Nav.Link>
              <Nav.Link href="#action2">Star</Nav.Link>
              <Nav.Link href="#action2">Director</Nav.Link>
              <Nav.Link href="#action2">Post</Nav.Link>

              {localStorage.getItem('token') ? (

                <NavDropdown title="Hey" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Profile {localStorage.getItem('username')}</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout">Log out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Button variant="outline-success" href="/signup">
                    Sign up
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <Router>
          <Switch>
            <Route path="/login" component={Login} exact />
//            <Route path="/signup" component={Signup} exact />
            <Route path='/logout' component={Logout} exact />
          </Switch>
        </Router>
      </div>

      <footer className="text-center text-lg-start bg-light text-muted mt-4">
        <div className="text-center p-4">
          © Copyright -
          <a
            target="_blank"
            className="text-reset fw-bold text-decoration-none"
            href="https://twitter.com/greglim81"
          >
            Greg Lim
          </a>-
          <a
            target="_blank"
            className="text-reset fw-bold text-decoration-none"
            href="https://twitter.com/danielgarax"
          >
            Daniel Correa
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
