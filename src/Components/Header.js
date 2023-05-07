import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

//images
import Profile from "../assets/profile.png";
import Logout from "../assets/logout.png";

function Header({ user,setUser }) {
  const navigate = useNavigate();
  const [profileClicked, setProfileClicked] = useState(false);

  const onLogoutClick = () => {
    localStorage.clear();
    setUser({
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      userid: null,
    });
    navigate("/");
  };

  return (
    <Container>
      <div className="nav-links">
        <Link to={"/"} className="home">
          Home
        </Link>
        <div className="button-container" onClick={() => (profileClicked ? setProfileClicked(false) : setProfileClicked(true))}>
          <img src={Profile} alt="profile" />
          {user.firstName} {user.lastName}
        </div>
        <div className={`logout-container ${profileClicked ? "active" : ""}`}>
          <div className="profile item" onClick={() => navigate("/profile")}>
            Profile
          </div>
          <div className="logout item" onClick={() => onLogoutClick()}>
            <img src={Logout} alt="logout" />
            Logout
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  z-index: 1000;

  .nav-links {
    padding-inline: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;

    .home {
      padding-inline: 30px;
      padding-bottom: 10px;
      padding-top: 10px;
      cursor: pointer;
      border-radius: 12px;

      &:hover {
        background-color: lightgray;
      }
    }
  }

  .button-container {
    display: flex;
    align-items: center;
    column-gap: 20px;
    padding-inline: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: lightgray;
    }

    img {
      width: 30px;
    }
  }

  .logout-container {
    position: absolute;
    bottom: -110px;
    right: 50px;
    background-color: var(--post-background);
    box-shadow: 0 0 5px 0 lightgray;
    transform-origin: top;
    transform: scaleY(0);
    transition: all 0.3s ease;
    z-index: 100;

    &.active {
      transform: scaleY(1);
    }

    .item {
      padding-inline: 30px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 20px;

      &:hover {
        background-color: lightgray;
        cursor: pointer;
      }
    }

    .profile {
      border-bottom: 1px solid lightgray;
    }

    .logout {
      img {
        width: 20px;
      }
    }
  }
`;
