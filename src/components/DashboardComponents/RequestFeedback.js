import React, { useState, useEffect, useContext } from "react";
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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

const RequestFeedback = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [, setUser] = useContext(UserContext);

  const [batch, setBatch] = useState([]);
  const [branch, setBranch] = useState([]);

  const [batchID, setBatchID] = useState("");
  const handleChangeBatch = (event) => {
    setBatchID(event.target.value);
  };

  const [depID, setDepID] = useState("");
  const handleChangeBranch = (event) => {
    setDepID(event.target.value);
  };

  const [feeday, setFeeday] = useState("");
  const handleDateChange = (event) => {
    setFeeday(event.target.value);
  };

  const [description, setDescription] = useState("");
  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      eventDescription: description,
      depID: depID,
      batchID: batchID,
      deadline: feeday,
    };
    axios
      .post("/dashboard/admin/RequestFeedback", body, {
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
        setBatchID("");
        setDepID("");
        setFeeday("");
        setDescription("");
      })
      .catch((err) => {
        handleError(err);
      });

    console.log(body);

    getBatchData();
    getBranchData();
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

  const Feedback = () => {
    return (
      <div>
        <form>
          <CssBaseline />
          <Main logout={logout} />
          <ToastContainer />
          <Container maxWidth="md" className="boxed">
            <br></br>
            <br></br>
            <h1 align="center">Request Feedback from Students</h1>
            <Grid xs={12} container direction="column" className="batch">
              <h6>Description:</h6>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={2}
                placeholder="Event Description for Students"
                variant="outlined"
                value={description}
                onChange={handleDescChange}
              />
              <br></br>
              <br></br>
              <label for="deadline">
                <h6>Event Deadline:</h6>
              </label>

              <input
                type="date"
                id="deadline"
                name="deadline"
                class="deadline"
                value={feeday}
                onChange={handleDateChange}
              ></input>
              <br></br>
              <br></br>

              <InputLabel id="branch">Select Branch</InputLabel>
              <Select
                labelId="branch"
                id="branch"
                value={depID}
                onChange={handleChangeBranch}
              >
                {branch.map(({ dep_id, dep_name }) => {
                  return (
                    <MenuItem key={dep_id} value={dep_id}>
                      {dep_name}
                    </MenuItem>
                  );
                })}
              </Select>
              <br></br>
              <br></br>

              <InputLabel id="batch">Select Batch</InputLabel>
              <Select
                labelId="batch"
                id="batch"
                value={batchID}
                onChange={handleChangeBatch}
              >
                {batch.map(({ batch_id, pass_in, pass_out }) => {
                  return (
                    <MenuItem key={batch_id} value={batch_id}>
                      {pass_in}-{pass_out}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Container className="button" align="center" maxWidth="sm">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Publish Request
              </Button>
            </Container>
            <br></br>
          </Container>
        </form>
      </div>
    );
  };

  const getBatchData = async () => {
    axios
      .get("/dashboard/getBatches", {
        headers: { token: localStorage.token },
        "Content-type": "application/json",
      })
      .then((res) => {
        const parseRes = res.data;
        setBatch(parseRes);
      })
      .catch((er) => {
        handleError(er);
      });
  };

  const getBranchData = async () => {
    axios
      .get("/dashboard/getDept", {
        headers: { token: localStorage.token },
        "Content-type": "application/json",
      })
      .then((res) => {
        const parseRes = res.data;
        setBranch(parseRes);
      })
      .catch((er) => {
        handleError(er);
      });
  };

  useEffect(() => {
    getBatchData();
    getBranchData();
  }, []);

  return authorised ? Feedback() : <NotAdmin />;
};

export default RequestFeedback;
