import React, { useState } from "react";
import styled from "styled-components";

//components
import InputField from "./InputField";

//images
import Google from "../assets/google.png";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <div className="container">
        <div className="heading">Sign Up</div>
        <Form>
          <div className="google">
            <img src={Google} alt="google-icon" />
            Sign up with Google
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Signup;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    width: 400px;
    height: max-content;
    background-color: var(--post-background);
    border-radius: 16px;
    padding: 20px 40px;
    padding-bottom: 40px;
    box-shadow: 0 0 10px 0px lightgray;

    .heading {
      text-align: center;
      font-size: 1.7rem;
      font-weight: var(--font-w-600);
      color: var(--text-heading-color);
      margin-bottom: 30px;
    }
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .google {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 25px;
    background-color: var(--background-color);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: lightgray;
    }

    img {
      width: 20px;
    }
  }
`;
