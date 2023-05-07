import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//Screens
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";

//components
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App() {
  const [user, setUser] = useState({
    email: window.localStorage.getItem("useremail") ? window.localStorage.getItem("useremail") : "",
    password: window.localStorage.getItem("password") ? window.localStorage.getItem("useremail") : "",
    firstName: window.localStorage.getItem("firstname") ? window.localStorage.getItem("firstname") : "",
    lastName: window.localStorage.getItem("lastname") ? window.localStorage.getItem("lastname") : "",
    userid: window.localStorage.getItem("userid") ? window.localStorage.getItem("userid") : "",
  });
  
  return (
    <Container>
      <Router>
        <Routes>
          {user.userid ? <Route exact path="/" element={<Home user={user} />} /> : <Route exact path="/" element={<Navigate to="/login" />} />}
          {user.userid ? <Route exact path="/profile" element={<Profile user={user} />} /> : <Route exact path="/" element={<Navigate to="/login" />} />}
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div``;
