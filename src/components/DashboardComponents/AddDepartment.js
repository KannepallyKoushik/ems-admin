import React, { useContext, useState } from "react";
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

const AddDepartment = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [, setUser] = useContext(UserContext);

  const [inputs, setInputs] = useState({
    deptName: "",
  });

  const { deptName } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const body = inputs;
    axios
      .post("/dashboard/admin/addDept", body, {
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
        setInputs({
          deptName: "",
        });
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

  const Department = () => {
    return (
      <div class="dept-component">
        <form>
          <CssBaseline />
          <Main logout={logout} className="navbar" />
          <ToastContainer />
          <Container className="boxed" maxWidth="md">
            <br></br>
            <br></br>
            <h1 align="center">Department List</h1>
            <Grid xs={12} container direction="column" className="batch">
              <h6>Name of New Department:</h6>
              <br />
              <TextField
                name="deptName"
                id="deptName"
                value={deptName}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Container className="button" align="center" maxWidth="sm">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Add Department
              </Button>
            </Container>
            <br></br>
          </Container>
        </form>
      </div>
    );
  };

  return authorised ? Department() : <NotAdmin />;
};

export default AddDepartment;
