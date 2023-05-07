import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import axios from "axios";

//components
import InputField from "./InputField";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitClick = (e) => {
    e.preventDefault();

    // setUser({ email: "venura@gmail.com", password: "123", firstName: "Venura", lastName: "Warnasooriya", userid: "abv" });
    // window.localStorage.setItem("useremail", "email@gmail.com");

    axios
      .get(`http://localhost:8080/getUser/${email}`)
      .then((res) => {
        if (res.data[0].password == password) {
          setUser({
            email: res.data[0].userName,
            password: res.data[0].password,
            firstName: res.data[0].fName,
            lastName: res.data[0].lName,
            userid: res.data[0].id,
          });
          window.localStorage.setItem("useremail", res.data[0].userName);
          window.localStorage.setItem("password", res.data[0].password);
          window.localStorage.setItem("firstname", res.data[0].fName);
          window.localStorage.setItem("lastname", res.data[0].lName);
          window.localStorage.setItem("userid", res.data[0].id);
          
          navigate("/");
        } else {
          console.log("password dosen't match");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <div className="container">
        <div className="heading">Login</div>
        <Form>
          <InputField type="email" content="Email" id="email" onChange={setEmail} />
          <InputField type="password" content="Password" id="password" onChange={setPassword} />
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
  position: relative;
  z-index: 0;

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
