import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon} from "@heroicons/react/outline";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//import Login from "./components/login";
//import Signup from "./components/signup";
//import Logout from "./components/logout";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Home from "./components/center/home";
import Movies from "./components/center/movies";
import Widgets from "./components/widgets";
import Logout from "./components/logout"
import Login from "./components/login"

function App() {

  return (
  <>
    { localStorage.getItem("token") ? (
     <div className="App h-screen bg-black overflow-y-auto overflow-hidden">
            <Header />
            <main className="flex">
                <Sidebar />
                    <div className="flex-grow h-screen pb-44 pt-6 overflow-y-auto overflow-hidden">
                    <Router>
                      <Switch>
                        <Route path="/home" component={Home} exact />
                        <Route path="/movies" component={Movies} exact />
                        <Route path="/logout" component={Logout} exact />
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
