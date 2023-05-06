import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Rating from "@mui/material/Rating";
import axios from "axios";
import moment from "moment/moment";

//images
import ProfilePic from "../assets/profile.png";
import Star from "../assets/star.png";
import PostCover from "../assets/post-cover.jpg";
import Like from "../assets/like.png";
import Comment from "../assets/comment.png";
import Send from "../assets/send.png";
import Close from "../assets/close.png";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import Right from "../assets/right.png";

//comment data


function Post(props) {
  const [optionsClicked, setOptionsClicked] = useState(false);
  const [allComments, setAllComments] = useState(2);
  const [newCommentClicked, setNewCommentClicked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [rateClicked, setRateClicked] = useState(false);
  const [showReviewsClicked, setShowReviewsClicked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState("");
  const [rateId, setRateId] = useState("");
  const [allRatings, setAllRatings] = useState([]);
  const [overallRate, setOverallRate] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [commentDeleteClicked, setCommentDeleteClicked] = useState(false);
  const [defaultMessage, setDefaultMessage] = useState({ message: "", commentId: "" });
  const [addReviewClicked, setAddReviewClicked] = useState(false);
  const [newRatingValue, setNewRatingValue] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [userAddedTheReview, setUserAddedTheReview] = useState(false);
  const [editReviewClicked, setEditReviewClicked] = useState(false);
  const [edittedReview, setEdittedReview] = useState("");
  const [defaultReview, setDefaultReview] = useState("");
  const [editRatingValue, setEditRatingValue] = useState(0);

  const post = props.post;
  const postID = post.id;
  const user_name = props.useId;
  const resturantName = post.resturantName;
  const addComment = () => {
    const data = {
      user_name: user_name,
      message: newComment,
      time: Date.now(),
      postID: postID,
    };
    axios
      .post("http://localhost:8080/addComment", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setComments([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteCommentClick = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8080/deleteComment/${id}`)
      .then((response) => {
        setComments([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onUpdateCommentClick = () => {
    console.log(commentId);
    axios
      .put("http://localhost:8080/editComment", {
        id: commentId,
        user_name: user_name,
        message: editedComment,
        time: Date.now(),
        postID: postID,
      })
      .then((res) => {
        setComments([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeletePostClick = (id) => {
    axios
      .delete(`http://localhost:8080/deletePost/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onUpdatePostClick = () => {
    axios
      .put("http://localhost:8080/editPost", {
        id: commentId,
        user_name: user_name,
        message: newComment,
        time: Date.now(),
        postID: postID,
      })
      .then((res) => {
        setComments([]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addRating = () => {
    const data = {
      userID: user_name,
      resturantName: resturantName,
      message: newReview,
      time: Date.now(),
      rate: newRatingValue,
    };

    setAddReviewClicked(false);
    setUserAddedTheReview(true);

    axios
      .post("http://localhost:8080/addRating", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAllRatings([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteRateClick = (id) => {
    axios
      .delete(`http://localhost:8080/deleteRating/${id}`)
      .then((response) => {
        console.log(response);
        setAllRatings([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onUpdateRateClick = () => {
    setEditReviewClicked(false);
    console.log(editRatingValue);
    axios
      .put("http://localhost:8080/updateRating", {
        id: rateId,
        userID: user_name,
        resturantName: resturantName,
        message: edittedReview,
        time: Date.now(),
        rate: editRatingValue,
      })
      .then((res) => {
        console.log(res);
        setAllRatings([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // localStorage.setItem("comments", JSON.stringify(allComments));
    axios
      .get(`http://localhost:8080/getComments/${postID}`)
      .then((res) => {
        setComments([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [comments]);

  useEffect(() => {
    // localStorage.setItem("comments", JSON.stringify(allComments));
    axios
      .get(`http://localhost:8080/getRatings/${resturantName}`)
      .then((res) => {
        setAllRatings([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [allRatings]);

  useEffect(() => {
    // localStorage.setItem("comments", JSON.stringify(allComments));
    axios
      .get(`http://localhost:8080/getLikes/${postID}`)
      .then((res) => {
        console.log(res.data);
        setLikesCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [likesCount]);

  const onRateClick = () => {
    setRateClicked(true);
    setAllRatings([]);
    var r = 1;
    allRatings.map((_rate) => {
      r = parseInt(_rate.rate) + r;
    });
    var x = r / allRatings.length;
    setOverallRate(x);
  };


  const addLike = () => {
    const data = {
      userId: user_name,
      postId: postID,
    };
    
    axios
      .post(`http://localhost:8080/addLike`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsLiked(true);
        setLikesCount(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeLike = (user_id,post_id) => {
    axios
      .delete(`http://localhost:8080/removeLike/${user_id}/${post_id}`)
      .then((response) => {
        console.log(response.data);
        setIsLiked(false)
        setLikesCount(0);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <div className="profile-container">
        <div className="name-container" onClick={() => setOptionsClicked(false)}>
          <div className="profile-image"></div>
          <div className="profile-name">
            <div className="name">{post.userID}</div>
            <div className="time">{moment(parseInt(post.time)).fromNow()}</div>
          </div>
        </div>
        <div className="more-options" onClick={() => (optionsClicked ? setOptionsClicked(false) : setOptionsClicked(true))}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`options ${optionsClicked ? "active" : ""}`}>
          <div className="item">Edit the Post</div>
          <div className="item">Delete the Post</div>
        </div>
      </div>
      <Description>
        <div className="res-name">
          <div className="res">
            <span>Resturant Name:</span> {post.resturantName}
          </div>
          <div className="btn" onClick={() => onRateClick()}>
            <img src={Star} alt="star" /> Rate
          </div>
        </div>
        <div className="desc-food">{post.description}</div>
      </Description>
      <PostContainer source={post.image}></PostContainer>
      <div className="like-count">
        <div className="like">
          <img src={Like} alt="like" />
          {likesCount}
        </div>
        <div className="comment">
          <img src={Comment} alt="comment" />
          {comments.length}
        </div>
      </div>
      <div className="like-comment-section">
        <div className={`btn ${isLiked ? "active" : ""}`} onClick={() => (isLiked ? removeLike(user_name,postID) : addLike())}>
          <img src={Like} alt="like" /> Like
        </div>
        <div className="btn" onClick={() => (newCommentClicked ? setNewCommentClicked(false) : setNewCommentClicked(true))}>
          <img src={Comment} alt="comment" />
          Comment
        </div>
      </div>
      <CommentSection>
        {newCommentClicked ? (
          <NewComment>
            <div className="profile">
              <img src={ProfilePic} alt="profile" />
            </div>
            <input type="text" placeholder="Enter your comment" id="comment" onChange={(e) => setNewComment(e.target.value)} />
            <div
              className="btn"
              onClick={() => {
                addComment();
                document.getElementById("comment").value = "";
              }}
            >
              <img src={Send} alt="send" />
            </div>
          </NewComment>
        ) : (
          <></>
        )}
        {!editClicked ? (
          <>
            {comments.map((comment, index) => (
              <>
                {index < allComments ? (
                  <div className="comment">
                    <div className="profile">
                      <div className="dp">
                        <img src={ProfilePic} alt="profile" />
                      </div>
                      <div className="container">
                        <div className="name">
                          {comment.user_name}
                          <div className="time">{moment(parseInt(comment.time)).fromNow()}</div>
                        </div>
                        <div className="comment">{comment.message}</div>
                      </div>
                      {user_name == comment.user_name || user_name == post.userID ? (
                        <div className={`edit-delete-section ${commentDeleteClicked ? "noHover" : ""}`}>
                          {user_name == comment.user_name ? (
                            <div
                              className="edit"
                              onClick={() => {
                                setDefaultMessage({ message: comment.message, commentId: comment.id });
                                setCommentId(comment.id);
                                !commentDeleteClicked ? setEditClicked(true) : <></>;
                              }}
                            >
                              {commentDeleteClicked ? <img src={Right} alt="ok" /> : <img src={Edit} alt="edit" />}
                            </div>
                          ) : (
                            <></>
                          )}

                          <div
                            className="delete"
                            onClick={() => {
                              onDeleteCommentClick(comment.id);
                              commentDeleteClicked ? setCommentDeleteClicked(false) : <></>;
                            }}
                          >
                            {commentDeleteClicked ? (
                              <img src={Close} alt="no" />
                            ) : (
                              <img
                                src={Delete}
                                alt="delete"
                                onClick={() => {
                                  setCommentDeleteClicked(true);
                                }}
                              />
                            )}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
            {comments.length > 2 ? (
              <>
                {allComments == 2 ? (
                  <div className="see-more" onClick={() => setAllComments(comments.length)}>
                    See more comments
                  </div>
                ) : (
                  <div className="see-more" onClick={() => setAllComments(2)}>
                    See less comments
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div className="edit-section">
              <input type="text" id="edit" defaultValue={defaultMessage.message} onChange={(e) => setEditedComment(e.target.value)} />
              <div className="btn-container">
                <div
                  className="save btn"
                  onClick={() => {
                    editedComment ? onUpdateCommentClick() : <></>;
                    editedComment ? (document.getElementById("edit").value = "") : <></>;
                    setEditClicked(false);
                  }}
                >
                  <img src={Right} alt="correct" />
                </div>
                <div
                  className="btn cancel"
                  onClick={() => {
                    document.getElementById("edit").value = "";
                    setEditClicked(false);
                  }}
                >
                  <img src={Close} alt="close" />
                </div>
              </div>
            </div>
          </>
        )}
      </CommentSection>
      {rateClicked ? (
        <Ratings ratings="4.5">
          <div className="container">
            <div className="close" onClick={() => setRateClicked(false)}>
              <img src={Close} alt="close" />
            </div>
            <div className="heading">
              Reviews and Ratings
              <span>{resturantName}</span>
            </div>
            <div className="star-collection">
              <Rating name="read-only" value={overallRate} precision={0.5} readOnly size="large" />
            </div>
            <div className="btn-container">
              {addReviewClicked ? (
                <div className="addreview-container">
                  <input type="text" name="new-review" onChange={(e) => setNewReview(e.target.value)} id="new-reivew" className="add-review" placeholder="Enter the New Review" />
                  <Rating
                    name="simple-controlled"
                    onChange={(event, newValue) => {
                      setNewRatingValue(newValue);
                    }}
                  />
                  <div className="btn-container">
                    <div
                      className="send btn"
                      onClick={() => {
                        if (newReview) {
                          addRating();
                        }
                      }}
                    >
                      Submit
                    </div>
                    <div className="cancel btn" onClick={() => setAddReviewClicked(false)}>
                      Cancel
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {!userAddedTheReview ? (
                    <div className="add-review btn" onClick={() => setAddReviewClicked(true)}>
                      Add Review
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
            {showReviewsClicked ? (
              <>
                {!editReviewClicked ? (
                  <div className="reviews-container">
                    {allRatings.map((review) => (
                      <div className="review">
                        <div className="profile">{review.userID}</div>
                        <div className="comment">{review.message}</div>
                        <div className="rating">
                          <Rating name="read-only" value={review.rate} readOnly size="large" />
                        </div>
                        {user_name == review.userID ? (
                          <div className="edit-section">
                            <div
                              className="edit btn"
                              onClick={() => {
                                setRateId(review.id);
                                setEditReviewClicked(true);
                                setDefaultReview(review.message);
                                setEditRatingValue(review.rate);
                              }}
                            >
                              <img src={Edit} alt="edit" />
                            </div>
                            <div className="delete btn" onClick={() => onDeleteRateClick(review.id)}>
                              <img src={Delete} alt="delete" />
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="edit-review">
                    <input type="text" name="edit-review" onChange={(e) => setEdittedReview(e.target.value)} defaultValue={defaultReview} id="new-reivew" className="add-review" placeholder="Enter the New Review" />
                    <Rating
                      name="simple-controlled"
                      onChange={(event, newValue) => {
                        setEditRatingValue(newValue);
                      }}
                      value={editRatingValue}
                    />
                    <div className="btn-container">
                      <div
                        className="send btn"
                        onClick={() => {
                          if (edittedReview) {
                            onUpdateRateClick();
                          }
                        }}
                      >
                        Save
                      </div>
                      <div className="cancel btn" onClick={() => setEditReviewClicked(false)}>
                        Cancel
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
            <div className="show-reviews" onClick={() => (showReviewsClicked ? setShowReviewsClicked(false) : setShowReviewsClicked(true))}>
              {showReviewsClicked ? "Hide Reviews" : "Show Reviews"}
            </div>
          </div>
        </Ratings>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Post;

const Container = styled.div`
  width: 650px;
  height: max-content;
  min-height: 200px;
  background-color: var(--post-background);
  z-index: 0;
  overflow: hidden;
  box-shadow: 0 2px 5px 0px lightgray;
  position: relative;

  .profile-container {
    padding-inline: 20px;
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 0;
    position: relative;

    .options {
      position: absolute;
      right: 20px;
      bottom: -110px;
      box-shadow: 0 2px 5px 0px lightgray;
      transform-origin: top;
      transform: scaleY(0);
      transition: all 0.3s ease;

      &.active {
        transform: scaleY(1);
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 50px;
        background-color: var(--post-background);
        cursor: pointer;
        font-size: 0.9rem;

        &:first-of-type {
          border-bottom: 1px solid lightgray;
        }

        &:hover {
          background-color: lightgray;
        }
      }
    }

    .name-container {
      display: flex;
      align-items: center;
      column-gap: 10px;
      flex: 1;

      .profile-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        background-image: url(${ProfilePic});
        background-position: top;
        background-size: cover;
      }

      .profile-name {
        .name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-heading-color);
        }

        .time {
          font-size: 0.5rem;
          font-weight: 600;
          color: var(--text-sub-color);
        }
      }
    }

    .more-options {
      z-index: 10;
      display: flex;
      row-gap: 2px;
      flex-direction: column;
      cursor: pointer;
      width: 20px;
      display: flex;
      justify-content: flex-end;

      div {
        width: 4px;
        height: 4px;
        background-color: var(--text-heading-color);
        border-radius: 50%;
      }
    }
  }

  .like-count {
    font-size: 0.8rem;
    display: flex;
    column-gap: 20px;
    padding-bottom: 10px;
    padding-inline: 20px;
    align-items: center;
    border-bottom: 1px solid lightgray;

    .like,
    .comment {
      display: flex;
      align-items: center;
      column-gap: 5px;

      img {
        width: 15px;
      }
    }
  }

  .like-comment-section {
    display: flex;
    border-bottom: 1px solid lightgray;

    .btn {
      font-size: 0.8rem;
      color: var(--text-heading-color);
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 10px;
      padding-inline: 20px;
      background-color: var(--post-background);
      padding-bottom: 10px;
      padding-top: 10px;
      cursor: pointer;

      &.active {
        background-color: var(--background-color);
      }

      &:hover {
        background-color: var(--background-color);
      }

      img {
        width: 20px;
      }
    }
  }
`;

const Description = styled.div`
  font-size: 0.8rem;
  margin-top: 20px;
  color: gray;
  padding-inline: 20px;
  margin-bottom: 10px;

  .res-name {
    display: flex;
    column-gap: 20px;
    align-items: center;
    margin-bottom: 10px;

    .res {
      span {
        font-weight: var(--font-w-600);
        color: var(--text-heading-color);
      }
    }

    .btn {
      background-color: var(--background-color);
      transition: all 0.3s ease;
      cursor: pointer;
      padding-inline: 20px;
      height: 30px;
      display: flex;
      align-items: center;
      font-weight: var(--font-w-600);
      column-gap: 10px;
      color: var(--text-heading-color);

      img {
        width: 20px;
      }

      &:hover {
        background-color: lightgray;
      }
    }
  }
`;

const PostContainer = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${(props) => props.source});
  background-size: cover;
  background-position: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const CommentSection = styled.div`
  margin-top: 10px;
  padding-inline: 20px;
  font-size: 0.8rem;

  .edit-section {
    display: flex;
    align-items: center;
    column-gap: 20px;
    width: 100%;
    height: 60px;
    margin-bottom: 20px;

    input {
      width: 100%;
      height: 45px;
      border-radius: 50px;
      border: none;
      outline: none;
      background-color: var(--background-color);
      padding-inline: 20px;
    }

    .btn-container {
      display: flex;
      height: 100%;

      .btn {
        height: 100%;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
          background-color: var(--background-color);
        }
      }

      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .comment {
    padding-bottom: 10px;
    position: relative;
    overflow-x: hidden;
    width: 100%;

    &:not(.noHover):hover {
      .edit-delete-section {
        right: 0;
      }
    }

    .profile {
      display: flex;
      column-gap: 20px;
      width: 100%;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .container {
        display: flex;
        flex-direction: column;

        .name {
          display: flex;
          column-gap: 20px;
          font-weight: var(--font-w-600);
          color: var(--text-heading-color);
          align-items: center;
          margin-bottom: 5px;

          .time {
            font-size: 0.6rem;
            color: var(--text-sub-color);
            opacity: 0.4;
          }
        }

        .comment {
          font-size: 0.7rem;
        }
      }
    }

    .edit-delete-section {
      display: flex;
      position: absolute;
      right: -100%;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      transition: all 0.3s ease;

      .edit,
      .delete {
        background-color: var(--background-color);
        height: calc(100% - 10px);
        padding-inline: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-5px);
        cursor: pointer;

        &:hover {
          background-color: lightgray;
        }
      }

      img {
        width: 20px;
        height: 20px;
        object-fit: cover;
      }
    }
  }

  .see-more {
    color: var(--text-sub-color);
    text-align: center;
    margin-bottom: 20px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 20px;
  margin-bottom: 20px;
  height: 50px;

  .profile {
    display: flex;
    align-items: center;

    img {
      width: 40px;
    }
  }

  .btn {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  input {
    flex: 1;
    height: 40px;
    border-radius: 50px;
    border: none;
    background-color: lightgray;
    color: var(--text-heading-color);
    padding-inline: 20px;
    outline: none;
  }

  img {
    width: 20px;
  }
`;

const Ratings = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    width: 400px;
    height: max-content;
    max-height: 600px;
    background-color: var(--post-background);
    padding: 20px;
    box-shadow: 0 2px 5px 0px lightgray;
    position: relative;
    padding-top: 40px;
    border-radius: 20px;
    padding-bottom: 40px;

    .edit-review {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding-top: 10px;
      border-top: 1px solid lightgray;

      input {
        width: 100%;
        height: 50px;
        padding-inline: 20px;
        border: none;
        outline: none;
        background-color: var(--background-color);
        margin-bottom: 10px;
      }

      .btn-container {
        display: flex;
        column-gap: 20px;

        .cancel {
          background-color: var(--btn-danger);

          &:hover {
            background-color: var(--btn-danger-alt);
          }
        }
      }
    }

    .close {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;

      img {
        width: 15px;
      }
    }

    .heading {
      color: var(--text-heading-color);
      font-size: 1.4rem;
      font-weight: 600;
      text-align: center;
      display: flex;
      flex-direction: column;

      span {
        font-size: 1rem;
      }
    }

    .star-collection {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .btn-container {
      width: 100%;
      margin-top: 20px;

      .addreview-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-top: 1px solid gray;
        padding-top: 20px;

        input {
          width: 100%;
          margin-bottom: 10px;
          height: 50px;
          padding-inline: 20px;
          border: none;
          outline: none;
          background-color: var(--background-color);
        }

        .btn-container {
          display: flex;
          column-gap: 20px;

          .cancel {
            background-color: var(--btn-danger);

            &:hover {
              background-color: var(--btn-danger-alt);
            }
          }
        }
      }

      .btn {
        height: 50px;
        width: 100%;
        background-color: var(--btn-color);
        color: var(--post-background);
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background-color: var(--btn-color-alt);
        }
      }
    }

    .show-reviews {
      font-size: 0.8rem;
      text-align: center;
      color: var(--text-sub-color);
      margin-top: 10px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .reviews-container {
      margin-top: 20px;
      height: 300px;
      overflow-y: auto;
      overflow-x: hidden;

      .review {
        position: relative;
        margin-bottom: 10px;

        .profile {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-heading-color);
        }

        .comment {
          font-size: 0.8rem;
        }

        .edit-section {
          position: absolute;
          height: 100%;
          top: 0;
          display: flex;
          right: -100%;

          .btn {
            height: 100%;
            display: flex;
            align-items: center;
            background-color: var(--background-color);
            padding-inline: 20px;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
              background-color: lightgray;
            }
          }
          img {
            width: 20px;
          }
        }

        &:hover {
          .edit-section {
            right: 0;
          }
        }
      }
    }
  }
`;
