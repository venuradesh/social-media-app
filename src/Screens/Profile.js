import React, { useState, useEffect } from "react";
import styled from "styled-components";

//components
import Post from "../Components/Post";
import Header from "../Components/Header";
import InputField from "../Components/InputField";
import axios from "axios";

//data
import post from "../Data/Posts";

//images
import ProfilePic from "../assets/profile.png";

function Profile({ user }) {
  const [allPost, setAllPost] = useState([]);
  const [userDetailsfromAPI, setUserDetailsfromAPI] = useState({
    firstName: "",
    lastName: "",
    address: "",
    dob: "",
    email: "venurawarnasooriya@gmail.com",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getSingleUserPosts/${user.email}`)
      .then((res) => {
        console.log(res.data);
        setAllPost([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <div className="header">
        <Header user={user} />
      </div>
      <div className="contents">
        <div className="info-container">
          <div className="heading">
            <img src={ProfilePic} alt="profile-image" />
            <div className="name">
              {user.firstName} {user.lastName}
            </div>
          </div>
          <div className="email item">
            Email: <span>{user.email}</span>
          </div>
          <div className="address item">
            Address: <span>{userDetailsfromAPI.address}</span>
          </div>
          <div className="dob item">
            Date of Birth: <span>{userDetailsfromAPI.dob}</span>
          </div>
        </div>
        <div className="posts-container">
          
          {allPost.map((post, index) => (
            <Post post={post} useId={user.id} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  width: 100vw;
  height: 60px;
  position: relative;
  z-index: 0;

  .header {
    width: 100%;
    height: 100%;
    background-color: var(--post-background);
    top: 0;
    box-shadow: 0 2px 5px 0px lightgray;
  }

  .contents {
    display: flex;
    column-gap: 30px;
    padding-top: 30px;
    padding-inline: 50px;
    overflow-x: hidden;
    z-index: -1;

    .posts-container {
      flex: 2;
      /* max-height: calc(100vh - 60px); */
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      row-gap: 20px;
      overflow-y: auto;
      margin-bottom: 30px;
      z-index: -1;
    }

    .info-container {
      flex: 1;
      width: 100%;
      height: max-content;
      background-color: var(--post-background);
      box-shadow: 0 2px 5px 0px lightgray;
      padding: 20px 30px;

      .heading {
        font-size: 1.4rem;
        font-weight: var(--font-w-600);
        color: var(--text-heading-color);
        text-transform: uppercase;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        row-gap: 20px;

        img {
          width: 100px;
        }
      }

      .item {
        color: var(--text-heading-color);
        font-weight: 600;
        margin-top: 20px;
        display: flex;
        column-gap: 20px;

        span {
          font-weight: 400;
          opacity: 0.8;
        }
      }
    }
  }
`;
