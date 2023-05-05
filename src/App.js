import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//Screens
import Home from "./Screens/Home";

//components
import Signup from "./Components/Signup";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div``;
