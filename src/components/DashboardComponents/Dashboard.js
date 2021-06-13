import React, { useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import DayPicker from "react-day-picker";

import "react-day-picker/lib/style.css";
import "../../App.css";
import "./Styles.css";
import "react-toastify/dist/ReactToastify.css";

import axios from "../../axios";
import Main from "./Main";
import NotAdmin from "./NotAdmin";

import CssBaseline from "@material-ui/core/CssBaseline";

import { AuthContext } from "../../Contexts/AuthContext";
import { UserContext } from "../../Contexts/UserContext";
import { AuthorizationContext } from "../../Contexts/AuthorizationContext";

const Dashboard = () => {
  const [authorised, setauthorised] = useContext(AuthorizationContext);
  const [, setIsAuthenticated] = useContext(AuthContext);
  const [, setUser] = useContext(UserContext);

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

  function AdminDash() {
    return (
      <div className="AdminDash">
        <CssBaseline />
        <Main logout={logout} className="navbar" />
        <ToastContainer />
        <h4 class="amma-quote">
          <i>
            "ENLIGHTENMENT means the ability to RECOGNISE ONESELF in ALL living
            creatures"
          </i>{" "}
          - AMMA
        </h4>
        <div class="video-container">
          <h5 class="video-title">EMS-Admin Portal Walkthrough Video</h5>
          <div class="dash-container">
            <br></br>
            <div class="video">
              <iframe
                width="720"
                height="420"
                align="center"
                title="Walkthrough Video"
                src="https://www.youtube.com/embed/WjwEh15M5Rw"
              ></iframe>
            </div>

            <div class="calender">
              <h5>Calendar:</h5>
              <DayPicker />
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const getData = async () => {
      axios
        .get("/dashboard/admin/", {
          headers: { token: localStorage.token },
          "Content-type": "application/json",
        })
        .then((res) => {
          const stringRes = JSON.stringify(res.data);
          setauthorised(true);
          setUser(stringRes);
        })
        .catch((er) => {
          console.log(er.response);
          setauthorised(false);
          localStorage.removeItem("token");
          setUser("");
          setauthorised(false);
          setTimeout(function () {
            setIsAuthenticated(false);
          }, 2000);
        });
    };
    getData();
  }, [setUser, setIsAuthenticated, setauthorised]);

  return authorised ? <AdminDash /> : <NotAdmin />;
};

export default Dashboard;
