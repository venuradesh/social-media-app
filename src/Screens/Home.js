import React, { useState, useEffect } from "react";
import styled from "styled-components";

//components
import Post from "../Components/Post";
import Header from "../Components/Header";
import InputField from "../Components/InputField";
import axios from "axios";

function Home({ user }) {
  const [hotelname, setHotelname] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [userID, setUserID] = useState(user.email);
  const [allPost, setAllPost] = useState([]);

  const onSubmitClick = () => {
    document.getElementById("hotelname").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("fileinput").value = "";

    const data = {
      userID: userID,
      resturantName: hotelname,
      description: desc,
      time: Date.now(),
      image: image,
    };

    axios
      .post("http://localhost:8080/addPost", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    setAllPost([]);
  };

  const convertBase64 = (e) => {
    setFile(e.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error : ", error);
    };
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getPosts`)
      .then((res) => {
        setAllPost([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [allPost]);

  return (
    <Container>
      <div className="header">
        <Header user={user} />
      </div>
      <div className="contents">
        <div className="posts-container">
          {allPost.map((post, index) => (
            <Post post={post} useId={userID} />
          ))}
        </div>
        <div className="add-post-container">
          <div className="heading">Add a Post</div>
          <div className="form">
            <InputField type="text" content={"Restaurant Name"} id="hotelname" onChange={setHotelname} />
            <InputField content="Description" id="desc" type="text" onChange={setDesc} />
            <div className="btn-container">
              <input type="file" name="fileinput" id="fileinput" onChange={convertBase64} />
              <div className="btn photo" onClick={() => document.getElementById("fileinput").click()}>
                Add a photo
              </div>
              <div className="file-selected">{file ? file.name : "no files selected"}</div>
            </div>
            <div className="btn-container">
              <div className="btn" onClick={() => onSubmitClick()}>
                Add the Post
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100vw;
  height: 60px;
  position: relative;

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
    }

    .add-post-container {
      flex: 1;
      width: 100%;
      height: max-content;
      background-color: var(--post-background);
      box-shadow: 0 2px 5px 0px lightgray;
      padding: 20px 30px;
      z-index: 10;

      .form {
        z-index: 0;
        position: relative;
      }

      .heading {
        font-size: 1.4rem;
        font-weight: var(--font-w-600);
        color: var(--text-heading-color);
        text-transform: uppercase;
        text-align: center;
      }

      .btn-container {
        width: 100%;
        display: flex;
        align-items: center;
        column-gap: 10px;

        .file-selected {
          font-size: 0.8rem;
        }

        input {
          display: none;
        }

        .btn {
          width: 100%;
          height: 50px;
          background-color: var(--btn-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--background-color);
          transition: all 0.3s ease;
          cursor: pointer;
          font-weight: var(--font-w-600);

          &.photo {
            width: 50%;
            background-color: var(--background-color);
            color: var(--text-heading-color);
            margin-top: 20px;
            margin-bottom: 20px;

            &:hover {
              background-color: lightgray;
            }
          }

          &:hover {
            background-color: var(--btn-color-alt);
          }
        }
      }
    }
  }
`;
