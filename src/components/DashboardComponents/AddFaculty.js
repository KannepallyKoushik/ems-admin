import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import "../../App.css";
import "./Styles.css";

import axios from "../../axios";
import Main from "./Main";
import NotAdmin from "./NotAdmin";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

const AddFaculty = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [, setUser] = useContext(UserContext);

  const [dept, setDept] = useState([]);
  const [inputs, setInputs] = useState({
    facName: "",
    depID: "",
    facEmail: "",
  });

  const { facName, depID, facEmail } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    const body = inputs;
    axios
      .post("/dashboard/admin/addFaculty", body, {
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        const status = res.status;
        console.log(status);
        alert(data);
      })
      .catch((err) => {
        const status = err.response.data;
        console.log(status);
      });
    setInputs({
      facName: "",
      depID: "",
      facEmail: "",
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

  function Faculty() {
    return (
      <form>
        <div class="faculty-component">
          <CssBaseline />
          <Main logout={logout} />
          <Container className="boxed" maxWidth="md">
            <br></br>
            <br></br>
            <h1 align="center">Faculty Details</h1>
            <br></br>
            <h5 align="center">
              <em>Give Details of New Faculty</em>
            </h5>
            <Grid xs={12} container direction="column" className="batch">
              <h6>Faculty Name:</h6>
              <TextField
                id="facName"
                name="facName"
                value={facName}
                onChange={handleChange}
                placeholder="Full Name"
                margin="large"
                variant="outlined"
                autoComplete="off"
              />
              <br></br>
              <br></br>
              <h6>Faculty E-mail:</h6>
              <TextField
                id="facEmail"
                name="facEmail"
                value={facEmail}
                onChange={handleChange}
                placeholder="abc@example.com"
                margin="large"
                variant="outlined"
                autoComplete="off"
              />
              <br></br>
              <br></br>
              <InputLabel id="branch">
                <h6>Department</h6>
              </InputLabel>
              <Select
                labelId="department"
                id="depID"
                name="depID"
                value={depID}
                onChange={handleChange}
              >
                {dept.map(({ dep_id, dep_name }) => {
                  return (
                    <MenuItem key={dep_id} value={dep_id}>
                      {dep_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Container className="button" align="center" maxWidth="sm">
              <br></br>
              <Button
                variant="contained"
                color="primary"
                className="submitbutton"
                onClick={submitForm}
              >
                Add Faculty
              </Button>
            </Container>
            <br></br>
            <br></br>
          </Container>
        </div>
      </form>
    );
  }

  const getData = async () => {
    axios
      .get("dashboard/getDept", {
        headers: { token: localStorage.token },
        "Content-type": "application/json",
      })
      .then((res) => {
        const parseRes = res.data;
        setDept(parseRes);
      })
      .catch((er) => {
        console.log(er.response.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return authorised ? <Faculty /> : <NotAdmin />;
};

export default AddFaculty;
