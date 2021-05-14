import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import axios from "./axios";
// Components
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import AdminSignIn from "./components/AdminSignIn";
import ReportForm from "./components/ReportForm";
import ChangePass from "./components/ChangePass";
import ForgotPass from "./components/ForgotPass";
import VerifyEmail from "./components/VerifyEmail";

function App() {
  const checkAuthenticated = async () => {
    axios
      .post(
        "/auth/isverify",
        { dummybody: "dummy" },
        {
          headers: { token: localStorage.token },
          "Content-type": "application/json",
        }
      )
      .then((res) => {
        const parseRes = res.data;
        parseRes === true
          ? setIsAuthenticated(true)
          : setIsAuthenticated(false);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/forgotPassword"
            render={(props) => <ForgotPass {...props} />}
          />
          <Route
            exact
            path="/changePassword/:id"
            render={(props) => <ChangePass {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <SignIn {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/report"
            render={(props) => <ReportForm {...props} />}
          />
          <Route
            exact
            path="/verifyEmail/:id"
            render={(props) => <VerifyEmail {...props} />}
          />
          <Route
            exact
            path="/admin/login"
            render={(props) =>
              !isAuthenticated ? (
                <AdminSignIn {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
