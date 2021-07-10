/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
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

const AddCourse = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [, setUser] = useContext(UserContext);

  const [branch, setBranch] = useState([]);

  const [courseCode, setCourseCode] = useState("");
  const handleChangeCode = (event) => {
    setCourseCode(event.target.value);
  };

  const [courseName, setCourseName] = useState("");
  const handleChangeName = (event) => {
    setCourseName(event.target.value);
  };

  const [description, setDescription] = useState("");
  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  const [courseCredit, setCourseCredit] = React.useState("");
  const handleCredit = (event) => {
    setCourseCredit(event.target.value);
  };

  const [depID, setDepID] = useState("");
  const handleChangeBranch = (event) => {
    setDepID(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      courseCode: courseCode,
      courseName: courseName,
      cDescription: description,
      courseCredit: courseCredit,
      depID: depID,
    };
    axios
      .post("/dashboard/admin/addCourse", body, {
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
        setCourseCode("");
        setCourseName("");
        setDescription("");
        setCourseCredit("");
        setDepID("");
      })
      .catch((err) => {
        handleError(err);
      });

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

  const Course = () => {
    return (
      <div class="course-component">
        <form>
          <CssBaseline />
          <Main logout={logout} />
          <ToastContainer />
          <Container className="boxed" maxWidth="md">
            <br></br>
            <br></br>
            <h1 align="center">Course Details</h1>
            <br></br>
            <h5 align="center">
              <em>Give Details of New Course</em>
            </h5>
            <Grid xs={12} container direction="column" className="batch">
              <h6>Course Code:</h6>
              <TextField
                id="courseid"
                key="courseid"
                placeholder="Ex: TH123"
                margin="large"
                variant="outlined"
                value={courseCode}
                onChange={handleChangeCode}
              />
              <br></br>

              <h6>Course Name:</h6>
              <TextField
                id="coursename"
                key="coursename"
                placeholder="Ex: Thermodynamics"
                margin="large"
                variant="outlined"
                value={courseName}
                onChange={handleChangeName}
              />
              <br></br>

              <h6>Course Description:</h6>
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

              <InputLabel id="credits">
                <h6>Credits:</h6>
              </InputLabel>
              <Select
                labelId="credit"
                id="credit"
                value={courseCredit}
                onChange={handleCredit}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>

              <br></br>
              <InputLabel id="branch1">
                <h6>Department</h6>
              </InputLabel>
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
            </Grid>
            <Container className="button" align="center" maxWidth="sm">
              <br></br>
              <Button
                id="coursesubmit"
                variant="contained"
                color="primary"
                className="submitbutton"
                onClick={handleSubmit}
              >
                Add Course
              </Button>
            </Container>
            <br></br>
            <br></br>
          </Container>
        </form>
      </div>
    );
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
    getBranchData();
  }, []);

  return authorised ? Course() : <NotAdmin />;
};

export default AddCourse;
