import axios from "axios";
import React, { useEffect, useState } from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Home from "./components/center/home";
import Movies from "./components/center/movies";
import Widgets from "./components/widgets";
import Login from "./components/login"
import MovieDetail from "./components/center/movieDetail"

function App() {
    const [isAuthentication, SetIsAuthentication]=useState(true);

      useEffect(() => {
      checkAuthentication();
  }, []);

    const checkAuthentication = async () => {
    try {
      await axios.get("http://127.0.0.1:8000/api/user",
       {headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }});
       SetIsAuthentication(true)
      }catch (err) {
      console.error(err);
      SetIsAuthentication(false)
    }
  };

  return (
  <>
    { isAuthentication ? (
     <div className="App h-screen bg-black overflow-y-auto overflow-hidden">
            <Header />
            <main className="flex">
                <Sidebar />
                    <div className="flex-grow h-screen pb-44 pt-6 overflow-y-auto overflow-hidden">
                    <Router>
                      <Switch>
                        <Route path={["/", "/home"]} component={Home} exact />
                        <Route path="/movies" component={Movies} exact />
                        <Route path="/movies" component={Movies} exact />
                        <Route path="/movie/:id/" component={MovieDetail} exact />
                      </Switch>
                    </Router>
                    </div>
                <Widgets />
            </main>
    </div>):(
    <Login />
    )}
   </>
  );
}

export default App;
