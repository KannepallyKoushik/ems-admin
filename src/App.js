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
import { UserProvider } from "./Contexts/UserContext";
import { AuthorizationProvider } from "./Contexts/AuthorizationContext";

// Components
import Home from "./components/Home";
import Dashboard from "./components/DashboardComponents/Dashboard";
import AddDepartment from "./components/DashboardComponents/AddDepartment";
import AdminSignIn from "./components/AuthComponents/AdminSignIn";
import ReportForm from "./components/AuthComponents/ReportForm";
import ChangePass from "./components/AuthComponents/ChangePass";
import ForgotPass from "./components/AuthComponents/ForgotPass";
import VerifyEmail from "./components/AuthComponents/VerifyEmail";
import AddFaculty from "./components/DashboardComponents/AddFaculty";
import AddBatch from "./components/DashboardComponents/AddBatch";
import AddCourse from "./components/DashboardComponents/AddCourse";
import RequestFeedback from "./components/DashboardComponents/RequestFeedback";
import SetPassword from "./components/DashboardComponents/SetPassword";

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
        </Switch>

        <AuthorizationProvider>
          <UserProvider>
            <Switch>
              <Route
                exact
                path="/dashboard"
                render={() =>
                  isAuthenticated ? (
                    <Dashboard />
                  ) : (
                    <Redirect to="/admin/login" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard/addDepartment"
                render={() =>
                  isAuthenticated ? (
                    <AddDepartment />
                  ) : (
                    <Redirect to="/admin/login" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard/addFaculty"
                render={() =>
                  isAuthenticated ? (
                    <AddFaculty />
                  ) : (
                    <Redirect to="/admin/login" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard/addBatch"
                render={() =>
                  isAuthenticated ? (
                    <AddBatch />
                  ) : (
                    <Redirect to="/admin/login" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard/addCourse"
                render={() =>
                  isAuthenticated ? (
                    <AddCourse />
                  ) : (
                    <Redirect to="/admin/login" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard/requestFeedback"
                render={() =>
                  isAuthenticated ? (
                    <RequestFeedback />
                  ) : (
                    <Redirect to="/admin/login" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard/setPassword"
                render={() =>
                  isAuthenticated ? (
                    <SetPassword />
                  ) : (
                    <Redirect to="/admin/login" />
                  )
                }
              />
            </Switch>
          </UserProvider>
        </AuthorizationProvider>
      </Router>
    </Fragment>
  );
}

export default App;
