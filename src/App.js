import React, { Fragment, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import axios from "./axios";
import { AuthContext } from "./Contexts/AuthContext";

// Components
import Home from "./components/Home";
import Dashboard from "./components/DashboardComponents/Dashboard";
import AdminSignIn from "./components/AuthComponents/AdminSignIn";
import ReportForm from "./components/AuthComponents/ReportForm";
import ChangePass from "./components/AuthComponents/ChangePass";
import ForgotPass from "./components/AuthComponents/ForgotPass";
import VerifyEmail from "./components/AuthComponents/VerifyEmail";
import PageNotFound from "./components/404-page";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);

  useEffect(() => {
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
    checkAuthenticated();
  }, [setIsAuthenticated]);

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
            render={() =>
              !isAuthenticated ? <AdminSignIn /> : <Redirect to="/dashboard" />
            }
          />
          <Route
            exact
            path="/dashboard"
            render={() =>
              isAuthenticated ? <Dashboard /> : <Redirect to="/admin/login" />
            }
          />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
