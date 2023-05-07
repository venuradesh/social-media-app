import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//components
import Post from "../Components/Post";
import Header from "../Components/Header";
import InputField from "../Components/InputField";
import axios from "axios";

//data
import post from "../Data/Posts";

//images
import ProfilePic from "../assets/profile.png";

function Profile({ user,setUser }) {
  const navigate = useNavigate();
  const [allPost, setAllPost] = useState([]);
  const [userDetailsfromAPI, setUserDetailsfromAPI] = useState({});
  const [editBtnClicked, setEditBtnClicked] = useState(false);
  const [deleteBtnClicked, setDeleteBtn] = useState(false);
  const [onFirstNameChange, setOnFIrstNameChange] = useState("");
  const [onLastNameChange, setOnLastNameChange] = useState("");
  const [onAddressChange, setOnAddressChange] = useState("");
  const [onDobChange, setOnDobChange] = useState("");
  const [onPasswordChange, setOnPasswordChange] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getSingleUserPosts/${user.email}`)
      .then((res) => {
        setAllPost([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:8080/getUser/${user.email}`)
      .then((res) => {
        setUserDetailsfromAPI(res.data[0]);
        setUser({
          email: res.data[0].userName,
          password: res.data[0].password,
          firstName: res.data[0].fName,
          lastName: res.data[0].lName,
          userid: res.data[0].id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDetailsfromAPI]);

  const onDeleteUserClick = () => {
    axios
      .delete(`http://localhost:8080/deleteUser/${user.email}`)
      .then((response) => {
        localStorage.clear();
        setUser({
          email: null,
          password: null,
          firstName: null,
          lastName: null,
          userid: null,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onUpdateUserClick = () => {
    axios
      .put("http://localhost:8080/editUser", {
        userName: user.email,
        password: onPasswordChange,
        address: onAddressChange,
        fName: onFirstNameChange,
        lName: onLastNameChange,
        dob: onDobChange,
      })
      .then((res) => {
        console.log(user.email);
        setAllPost([]);
        setUserDetailsfromAPI({});
        setEditBtnClicked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <div className="header">
        <Header user={user} />
      </div>
      <div className="contents">
        <div className="info-container">
          <>
            {!deleteBtnClicked ? (
              <>
                {!editBtnClicked ? (
                  <>
                    <div className="heading">
                      <img src={ProfilePic} alt="profile-image" />
                      <div className="name">
                        {userDetailsfromAPI.firstName} {userDetailsfromAPI.lastName}
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
                    <div className="btn-container">
                      <div className="edit btn" onClick={() => setEditBtnClicked(true)}>
                        Edit Details
                      </div>
                      <div className="delete btn" onClick={() => setDeleteBtn(true)}>
                        Delete Account
                      </div>
                    </div>
                  </>
                ) : (
                  <EditContainer>
                    <div className="heading">Edit Details</div>
                    <div className="form">
                      <InputField type={"text"} content={"Enter the FirstName"} value={user.firstName} id="firstname" onChange={setOnFIrstNameChange} />
                      <InputField type={"text"} content={"Enter the LastName"} value={user.lastName} id="LastName" onChange={setOnLastNameChange} />
                      <InputField type={"text"} content={"Enter the Address"} value={user.address} id="address" onChange={setOnAddressChange} />
                      <InputField type={"date"} content={"Enter the Date of Birth"} hover={true} value={user.dob} id="dob" onChange={setOnDobChange} />
                      <InputField type={"password"} content={"Enter the Password"} value={user.password} id="password" onChange={setOnPasswordChange} />
                    </div>
                    <div className="btn-container2">
                      <div className="submit btn" onClick={() => onUpdateUserClick()}>
                        Save
                      </div>
                      <div className="cancel btn" onClick={() => setEditBtnClicked(false)}>
                        Cancel
                      </div>
                    </div>
                  </EditContainer>
                )}
              </>
            ) : (
              <>
                <DeleteContainer>
                  <div className="heading">Do you need to delete your account?</div>
                  <div className="btn-container2">
                    <div className="yes btn" onClick={() => onDeleteUserClick()}>
                      Yes
                    </div>
                    <div className="no btn" onClick={() => setDeleteBtn(false)}>
                      No
                    </div>
                  </div>
                </DeleteContainer>
              </>
            )}
          </>
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
      width: 100%;
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

      .btn-container {
        display: flex;
        align-items: center;
        margin-top: 20px;
        column-gap: 20px;
        width: 100%;

        .btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
          background-color: var(--btn-color);
          cursor: pointer;

          &:hover {
            background-color: var(--btn-color-alt);
          }

          &.delete {
            background-color: var(--btn-danger);

            &:hover {
              background-color: var(--btn-danger-alt);
            }
          }
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

const EditContainer = styled.div`
  .form {
    position: relative;
    z-index: 0;
  }

  .btn-container2 {
    display: flex;
    align-items: center;
    margin-top: 20px;
    column-gap: 20px;
    width: 100%;

    .btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background-color: var(--btn-color);
      cursor: pointer;

      &:hover {
        background-color: var(--btn-color-alt);
      }
    }

    .cancel {
      background-color: var(--btn-danger);

      &:hover {
        background-color: var(--btn-danger-alt);
      }
    }
  }
`;

const DeleteContainer = styled.div`
  .btn-container2 {
    display: flex;
    align-items: center;
    margin-top: 20px;
    column-gap: 20px;
    width: 100%;

    .btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background-color: var(--btn-color);
      cursor: pointer;

      &:hover {
        background-color: var(--btn-color-alt);
      }
    }

    .yes {
      background-color: var(--btn-danger);

      &:hover {
        background-color: var(--btn-danger-alt);
      }
    }
  }
`;
