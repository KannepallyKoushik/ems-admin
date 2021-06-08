import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

import "../../App.css";
import "./Styles.css";
import "react-toastify/dist/ReactToastify.css";

import axios from "../../axios";
import Main from "./Main";
import NotAdmin from "./NotAdmin";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

const SetPassword = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [, setUser] = useContext(UserContext);

  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { oldPassword, newPassword, confirmPassword } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password must be same");
      return;
    }
    const body = {
      oldPassword,
      newPassword,
    };
    axios
      .post("/dashboard/setPassword", body, {
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        const status = res.status;
        console.log(status);
        toast.success(data);
        setTimeout(() => {
          window.location.reload(false);
        }, 500);
      })
      .catch((err) => {
        const status = err.response.data;
        console.log(status);
        toast.error(status);
      });
  };

  const logout = async (e) => {
    try {
      localStorage.removeItem("token");
      setUser("");
      setauthorised(false);
      setIsAuthenticated(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  const Password = () => {
    return (
      <div>
        <form>
          <CssBaseline />
          <Main logout={logout} />
          <ToastContainer />
          <Container className="boxed" maxWidth="md">
            <br></br>
            <br></br>
            <h1 align="center">Change Password</h1>
            <Grid xs={12} container direction="column" className="batch">
              <h6>Old Password:</h6>
              <TextField
                id="oldPassword"
                variant="outlined"
                type="password"
                name="oldPassword"
                value={oldPassword}
                onChange={handleChange}
              />
              <br></br>
              <h6>New Password:</h6>
              <TextField
                id="newPassword"
                variant="outlined"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
              />
              <br></br>
              <h6>Confirm Password:</h6>
              <TextField
                id="confirmPassword"
                variant="outlined"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
            </Grid>
            <Container className="button" align="center" maxWidth="sm">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Change Password
              </Button>
            </Container>
            <br></br>
          </Container>
        </form>
      </div>
    );
  };

  return authorised ? Password() : <NotAdmin />;
};

export default SetPassword;
