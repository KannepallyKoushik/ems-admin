import React, { useState, useEffect, useContext, Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";

import "../../App.css";
import "./Styles.css";
import "react-toastify/dist/ReactToastify.css";

import Main from "./Main";
import NotAdmin from "./NotAdmin";
import axios from "../../axios";

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

const PublishDeadline = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [, setUser] = useContext(UserContext);

  const [batchData, setBatchData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [facultiesData, setFacultiesData] = useState([]);

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const [deadline, setDeadline] = useState("");
  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const [batch, setBatch] = useState("");
  const handleChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const [branch, setBranch] = useState("");
  const handleChangeBranch = (event) => {
    setBranch(event.target.value);
  };

  const [totalCredits, setTotalCredits] = useState("");
  const handleCreditChange = (event) => {
    setTotalCredits(parseInt(event.target.value));
  };

  const [inputFields, setInputFields] = useState([
    { course_id: "", fac_id: "", demo: "" },
  ]);

  const { course_id, fac_id, demo } = inputFields;

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "course_id") {
      values[index].course_id = event.target.value;
    } else if (event.target.name === "fac_id") {
      values[index].fac_id = event.target.value;
    } else {
      values[index].demo = event.target.value;
    }

    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      course_id: "",
      fac_id: "",
      demo: "",
    });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleRemoveAllFields = () => {
    const values = [...inputFields];
    values.splice(1, values.length - 1);
    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      eventDescription: description,
      deadline: deadline,
      batchID: batch,
      depID: branch,
      creditTotal: totalCredits,
      courses: inputFields,
    };
    console.log(body);
    axios
      .post("/dashboard/admin/setEvent", body, {
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

    setDescription("");
    setDeadline("");
    setBatch("");
    setBranch("");
    setTotalCredits("");
    handleRemoveAllFields();

    getBatchData();
    getBranchData();
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

  const Deadline = () => {
    return (
      <div>
        <form>
          <CssBaseline />
          <Main logout={logout} />
          <ToastContainer />
          <Container className="boxed" maxWidth="md">
            <br></br>
            <br></br>
            <h1 align="center">Publish Submission Deadline</h1>
            <Grid xs={12} container direction="column" className="batch">
              <h6>Description:</h6>
              <TextField
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                multiline
                rows={2}
                placeholder="Event Description for Students"
                variant="outlined"
                autoComplete="off"
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
                value={deadline}
                onChange={handleDeadlineChange}
              ></input>
              <br></br>
              <br></br>
              <br></br>
              <Grid container>
                <Grid
                  container
                  xs={6}
                  align="center"
                  direction="column"
                  style={{ paddingRight: "7px" }}
                >
                  <InputLabel id="batch1">Select Batch</InputLabel>
                  <Select
                    labelId="batch"
                    id="batch"
                    value={batch}
                    onChange={handleChangeBatch}
                  >
                    {batchData.map(({ batch_id, pass_in, pass_out }) => {
                      return (
                        <MenuItem key={batch_id} value={batch_id}>
                          {pass_in}-{pass_out}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>

                <Grid
                  container
                  xs={6}
                  align="center"
                  direction="column"
                  style={{ paddingLeft: "7px" }}
                >
                  <InputLabel id="branch1">Select Branch</InputLabel>
                  <Select
                    labelId="branch"
                    id="branch"
                    value={branch}
                    onChange={handleChangeBranch}
                  >
                    {branchData.map(({ dep_id, dep_name }) => {
                      return (
                        <MenuItem key={dep_id} value={dep_id}>
                          {dep_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
              </Grid>
              <br></br>
              <br></br>
              <h6>Credits:</h6>
              <TextField
                id="totalCredits"
                name="totalCredits"
                value={totalCredits}
                onChange={handleCreditChange}
                multiline
                placeholder="Total Credits"
                variant="outlined"
                autoComplete="off"
              />
              <br></br>
              <br></br>
              <br></br>

              <h5>
                <em>Add Courses and Assign Faculty for Selected Batch:</em>
              </h5>
              <br></br>

              <Container className="boxed">
                {/* <form onSubmit={handleSubmit}> */}
                {inputFields.map((inputField, index) => (
                  <Fragment key={`${inputField}~${index}`}>
                    <br></br>
                    <br></br>

                    <Grid container>
                      <Grid
                        container
                        xs={12}
                        align="center"
                        direction="column"
                        style={{ paddingRight: "7px" }}
                      >
                        <InputLabel id="cid">
                          Course Code - CourseName:
                        </InputLabel>
                        <Select
                          labelId="cid"
                          id="course_id"
                          name="course_id"
                          value={course_id}
                          onChange={(event) => handleInputChange(index, event)}
                        >
                          {courseData.map(({ cid, c_code, cname }) => {
                            return (
                              <MenuItem key={cid} value={cid}>
                                {c_code} - {cname}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Grid>

                      <Grid
                        container
                        xs={12}
                        align="center"
                        direction="column"
                        style={{ paddingRight: "7px" }}
                      >
                        <br></br>
                        <InputLabel id="fname">
                          Faculty Name - Faculty email:
                        </InputLabel>
                        <Select
                          labelId="fname"
                          id="fac_id"
                          name="fac_id"
                          value={fac_id}
                          onChange={(event) => handleInputChange(index, event)}
                        >
                          {facultiesData.map(
                            ({ fac_id, facname, fac_email }) => {
                              return (
                                <MenuItem key={fac_id} value={fac_id}>
                                  {facname} - [{fac_email}]
                                </MenuItem>
                              );
                            }
                          )}
                        </Select>
                        <br></br>
                      </Grid>
                    </Grid>

                    <Grid xs={12} container direction="column" align="center">
                      <br></br>
                      <InputLabel id="demolink1">Demo Lecture Link:</InputLabel>
                      <TextField
                        id="demolink"
                        rows={1}
                        value={demo}
                        autoComplete="off"
                        onChange={(event) => handleInputChange(index, event)}
                      />
                      <br></br>
                    </Grid>

                    <Grid container>
                      <Grid xs={6} container direction="column">
                        <Button
                        id="addcol"
                          color="primary"
                          onClick={() => handleAddFields()}
                        >
                          Add
                        </Button>
                      </Grid>
                      <Grid xs={6} container align="center" direction="column">
                        <Button 
                        id="removecol"
                          color="secondary"
                          onClick={() => handleRemoveFields(index)}
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                    <br></br>
                  </Fragment>
                ))}
              </Container>
            </Grid>

            <Container className="button" align="center" maxWidth="sm">
              <Button
              id="feedsubmit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Publish Deadline
              </Button>
            </Container>
            <br></br>
          </Container>
          <br></br>
        </form>
      </div>
    );
  };

  const handleError = (er) => {
    console.log(er.response.data);
    toast.error(er.response.data);
    if (er.response.status === 403) {
      setTimeout(function () {
        logout();
      }, 5000);
    }
  };

  const getBatchData = async () => {
    axios
      .get("/dashboard/getBatches", {
        headers: { token: localStorage.token },
        "Content-type": "application/json",
      })
      .then((res) => {
        const parseRes = res.data;
        setBatchData(parseRes);
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
        setBranchData(parseRes);
      })
      .catch((er) => {
        handleError(er);
      });
  };

  useEffect(() => {
    getBatchData();
    getBranchData();
  }, []);

  useEffect(() => {
    if (branch === "") {
      return;
    }
    axios
      .post(
        "/dashboard/getCourse",
        {
          depID: branch,
        },
        {
          headers: { token: localStorage.token },
          "Content-type": "application/json",
        }
      )
      .then((res) => {
        const parseRes = res.data;
        setCourseData(parseRes);
      })
      .catch((er) => {
        handleError(er);
      });

    axios
      .get("/dashboard/getFaculty", {
        headers: { token: localStorage.token },
        "Content-type": "application/json",
      })
      .then((res) => {
        const parseRes = res.data;
        setFacultiesData(parseRes);
      })
      .catch((er) => {
        handleError(er);
      });

    console.log(courseData);
  }, [branch]);

  return authorised ? Deadline() : <NotAdmin />;
};

export default PublishDeadline;
