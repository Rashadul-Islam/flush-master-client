import React, { createContext, useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./Components/Home/Home/Home";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/Login/PrivateRoute";
import AddService from "./Components/DashBoard/AddService/AddService";
import Book from "./Components/DashBoard/Book/Book";
import BookingList from "./Components/DashBoard/BookingList/BookingList";
import ManageServices from "./Components/DashBoard/ManageServices/ManageServices";
import MakeAdmin from "./Components/DashBoard/MakeAdmin/MakeAdmin";
import OrderList from "./Components/DashBoard/OrderList/OrderList";
import CustomerReview from "./Components/DashBoard/CustomerReview/CustomerReview";


export const UserContext = createContext();
export const UserContext2 = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  let { name, email, token } = loggedInUser;
  const [isAdmin, setIsAdmin] = useState(false);
  const userEmail = sessionStorage.getItem('userEmail');
  if (userEmail !== null) {
    email = userEmail;
  }

  useEffect(() => {
    fetch('https://pure-island-17993.herokuapp.com/isAdmin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: email })
    })
      .then(res => res.json())
      .then(data => setIsAdmin(data));
  }, [email])
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <UserContext2.Provider value={[isAdmin, setIsAdmin]}>
        <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            {
              isAdmin ? (<React.Fragment>
                <PrivateRoute path="/dashboard">
                  <OrderList />
                </PrivateRoute>
                <PrivateRoute path="/addService">
                  <AddService />
                </PrivateRoute>
                <PrivateRoute path="/makeAdmin">
                  <MakeAdmin />
                </PrivateRoute>
                <PrivateRoute path="/manageServices">
                  <ManageServices />
                </PrivateRoute>
              </React.Fragment>)
                :
                (<React.Fragment>
                  <PrivateRoute path="/booking/:serviceName">
                    <Book />
                  </PrivateRoute>
                  <PrivateRoute path="/book">
                    <Book />
                  </PrivateRoute>
                  <PrivateRoute path="/dashboard">
                    <BookingList />
                  </PrivateRoute>
                  <PrivateRoute path="/bookList">
                    <BookingList />
                  </PrivateRoute>
                  <PrivateRoute path="/review">
                    <CustomerReview />
                  </PrivateRoute>
                </React.Fragment>)
            }
          </Switch>
        </Router>
      </UserContext2.Provider>
    </UserContext.Provider>
  );
}

export default App;