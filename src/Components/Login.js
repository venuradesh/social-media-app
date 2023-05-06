import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

//components
import InputField from "./InputField";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitClick = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <div className="container">
        <div className="heading">Login</div>
        <Form>
          <InputField type="email" content="Email" id="email" onChange={() => setEmail()} />
          <InputField type="password" content="Password" id="password" onChange={() => setPassword()} />
          <div className="btn-container">
            <button type="submit" className="btn submit" onClick={(e) => onSubmitClick(e)}>
              Login
            </button>
            <button type="reset" className="btn clear">
              Clear
            </button>
          </div>
          <div className="have-acc" onClick={() => navigate("/signup")}>
            Create an Account
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Login;

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
    }
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

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
