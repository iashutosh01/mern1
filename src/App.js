import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Home from "./Home";
import Login from "./Login";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";  

function App() {
  const [userDetails, setUserDetails] = useState(null);

  const updateUserDetails = (user) => {
    setUserDetails(user);
    localStorage.setItem("userDetails", JSON.stringify(user));
  };

  useEffect(() => {
  const isUserLoggedIn = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5002/auth/is-user-logged-in',
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
          userDetails ? <Dashboard /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;
