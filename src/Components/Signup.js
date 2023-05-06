import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

//components
import InputField from "./InputField";

//images
import Google from "../assets/google.png";

function Signup() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [confimePassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitClick = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <div className="container">
        <div className="heading">Sign Up</div>
        <Form>
          <InputField type="text" content="First Name" id="firstname" onChange={setFirstname} />
          <InputField type="text" content="Last Name" id="lastname" onChange={setLastname} />
          <InputField type="date" hover={true} content="Date of Birth" id="dob" onChange={setDob} />
          <InputField type="text" content="Address" id="address" onChange={setAddress} />
          <InputField type="email" content="Email" id="email" onChange={setEmail} />
          <InputField type="password" content="Password" id="password" onChange={setPassword} />
          <InputField type="password" content="Confirm Password" id="cpassword" onChange={setConfirmPassword} />
          <div className="btn-container">
            <button type="submit" className="btn submit" onClick={(e) => onSubmitClick(e)}>
              Signup
            </button>
            <button type="reset" className="btn clear">
              Clear
            </button>
          </div>
          <div className="have-acc" onClick={() => navigate("/login")}>
            Already have an account
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
  z-index: 0;

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
    }
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 0;
  position: relative;

  .btn-container {
    display: flex;
    column-gap: 20px;
    width: 100%;
    margin-top: 20px;

    .btn {
      flex: 1;
      width: 100%;
      height: 50px;
      background-color: var(--btn-color);
      border: none;
      cursor: pointer;
      color: var(--post-background);
      font-weight: 600;
      font-size: 0.8rem;

      &:hover {
        background-color: var(--btn-color-alt);
      }

      &.clear {
        background-color: var(--btn-danger);

        &:hover {
          background-color: var(--btn-danger-alt);
        }
      }
    }
  }

  .have-acc {
    font-size: 0.8rem;
    color: var(--text-heading-color);
    margin-top: 20px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
