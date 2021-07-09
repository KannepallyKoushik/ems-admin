import React, { useContext } from "react";
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
import InputLabel from "@material-ui/core/InputLabel";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

const AddBatch = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [, setUser] = useContext(UserContext);

  const [batchIn, setBatchIn] = React.useState(new Date());
  const [batchOut, setBatchOut] = React.useState(new Date());

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

  const submitForm = (e) => {
    e.preventDefault();

    const body = {
      batchIn: batchIn.getFullYear(),
      batchOut: batchOut.getFullYear(),
    };

    axios
      .post("/dashboard/admin/addBatch", body, {
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
      })
      .catch((err) => {
        handleError(err);
      });

    setBatchIn(new Date());
    setBatchOut(new Date());
  };

  const handleError = (err) => {
    console.log(err.response.data);
    toast.error(err.response.data);
    if (err.response.status === 403) {
      setTimeout(function () {
        logout();
      }, 5000);
    }
  };

  function Batch() {
    return (
      <div class="batch-component">
        <form>
          <CssBaseline />
          <Main logout={logout} />
          <ToastContainer />
          <Container className="boxed" maxWidth="md">
            <br></br>
            <br></br>
            <h1 align="center">Batch Details</h1>
            <br></br>
            <h5 align="center">
              <em>Give Admission and Passout Year of New Batch</em>
            </h5>
            <Grid xs={12} container direction="column" className="batch">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <InputLabel id="batchin">Batch In</InputLabel>
                <DatePicker
                  disableFuture
                  openTo="year"
                  views={["year"]}
                  id="bi"
                  value={batchIn}
                  onChange={(date) => setBatchIn(date)}
                  renderInput={(props) => <TextField {...props} />}
                />

                <br></br>
                <br></br>
                <InputLabel id="batchout">Batch out</InputLabel>
                <DatePicker
                  id="bo"
                  openTo="year"
                  views={["year"]}
                  value={batchOut}
                  onChange={(date) => setBatchOut(date)}
                  renderInput={(props) => <TextField {...props} />}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Container className="button" align="center" maxWidth="sm">
              <br></br>
              <Button
                variant="contained"
                color="primary"
                id="batchsubmit"
                className="submitbutton"
                onClick={submitForm}
              >
                Add Batch
              </Button>
            </Container>
            <br></br>
            <br></br>
          </Container>
        </form>
      </div>
    );
  }

  return authorised ? <Batch /> : <NotAdmin />;
};

export default AddBatch;
