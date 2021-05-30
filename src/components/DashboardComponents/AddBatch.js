import React, { useContext } from "react";
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
import InputLabel from "@material-ui/core/InputLabel";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

const AddBatch = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [, setUser] = useContext(UserContext);

  const [batchin, setBatchIn] = React.useState("");
  const [batchout, setBatchOut] = React.useState("");

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

  function Batch() {
    return (
      <div class="batch-component">
        <CssBaseline />
        <Main logout={logout} />
        <Container className="boxed" maxWidth="md">
          <br></br>
          <br></br>
          <h1 align="center">Batch Details</h1>
          <br></br>
          <h5 align="center">
            <em>Give Admission and Passout Year of New Batch</em>
          </h5>
          <Grid xs={12} container direction="column" className="batch">
            <InputLabel id="batchin">Batch In</InputLabel>

            <br></br>
            <br></br>
            <InputLabel id="batchout">Batch out</InputLabel>
          </Grid>
          <Container className="button" align="center" maxWidth="sm">
            <br></br>
            <Button
              variant="contained"
              color="primary"
              className="submitbutton"
            >
              Add Batch
            </Button>
          </Container>
          <br></br>
          <br></br>
        </Container>
      </div>
    );
  }

  return authorised ? <Batch /> : <NotAdmin />;
};

export default AddBatch;
