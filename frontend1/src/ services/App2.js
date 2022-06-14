import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from "./components/login";
import Signup from "./components/signup";

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/login' component={Login} exact />
          <Route path='/signup' component={Signup} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
