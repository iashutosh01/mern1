import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Register from "./Register"; // 👈 import this


import Home from "./Home";
import Login from "./Login";
import AppLayout from "./layout/AppLayout";
import DashBoard from "./pages/DashBoard";

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const updateUserDetails = (user) => {
    setUserDetails(user);
    localStorage.setItem("userDetails", JSON.stringify(user));
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5002/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUserDetails(null);
      localStorage.removeItem("userDetails");
      navigate("/login");
    }
  };

  useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5002/auth/is-user-logged-in",
          {},
          { withCredentials: true }
        );
        if (response.data && response.data.user) {
          updateUserDetails(response.data.user);
        }
      } catch (error) {
        console.log("Session check failed:", error.message);
        localStorage.removeItem("userDetails");
      }
    };

    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    } else {
      isUserLoggedIn();
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Home />
            </AppLayout>
          )
        }
      />
      <Route
        path="/login"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Login updateUserDetails={updateUserDetails} />
            </AppLayout>
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          userDetails ? (
            <DashBoard logout={logout} user={userDetails} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/register" element={<AppLayout><Register /></AppLayout>} />

    </Routes>
  );
}

export default App;


