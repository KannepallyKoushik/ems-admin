import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../App.css";
import axios from "../axios";

function AdminDash(props) {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h5>Welcome {props.name}</h5>
    </div>
  );
}

function StudentDash(props) {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <h5>Welcome {props.name}</h5>
    </div>
  );
}

const Dashboard = ({ setAuth }) => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  const getData = async () => {
      axios
        .post(
          "/dashboard/",
          { dummybody: "dummy" },
          {
            headers: { token: localStorage.token },
            "Content-type": "application/json",
          }
        )
        .then((res) => {
          const parseRes = res.data;
          setRole(parseRes.user_role);
          setUsername(parseRes.username);
        })
        .catch((er) => {
          console.log(er.response.data);
        });
  };

  useEffect(() => {
    getData();
  }, []);

  function AuthorizationDash(props) {
    const user_role = props.role;
    if (user_role === "admin") {
      return <AdminDash name={username} />;
    } else if (user_role === "student") {
      return <StudentDash name={username} />;
    }
    return <div></div>;
  }

  return (
    <div>
      <AuthorizationDash role={role} />
      <button onClick={(e) => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
