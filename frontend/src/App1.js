import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon} from "@heroicons/react/outline";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Login from "./components/login";
//import Signup from "./components/signup";
import Logout from "./components/logout";

function App() {
  const navigation = [
    { name: "Home", href: "#", current: true },
    { name: "Movie", href: "#", current: false },
    { name: "Star", href: "#", current: false },
    { name: "Director", href: "#", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="App">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="lg:block h-8 w-auto"
                  src={require("./components/images/title.png")}
                  alt="Movie"
                />
              </div>
              <div className="sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {localStorage.getItem('token') ? (
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700">
                              Profile
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700">
                              Settings
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                             <a
                              href="/logout"
                              className="block px-4 py-2 text-sm text-gray-700">
                              Logout
                            </a>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <a
                    key="Login"
                    href="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </a>
                  <a
                    key="Signup"
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Signup
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </Disclosure>

     <div className="container mt-4">
        <Router>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path='/logout' component={Logout} exact />
          </Switch>
        </Router>
      </div>

    </div>
  );
}

export default App;
