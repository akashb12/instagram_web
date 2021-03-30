import React, { useEffect, useState } from "react";
import { RootStore } from "../..";
import { ModalContext } from "../../Context/Context";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineSave,
  AiFillSave,
  AiFillDelete,
} from "react-icons/ai";
import { useParams, Link } from "react-router-dom";
import "./DetailProduct.css";
import { Modal } from "react-bootstrap";
import LikesModel from "../HomePage/LikesModel";

// interface
interface PostsUser {
  id: number;
  username: string;
  profile_image: string;
}

interface Posts {
  id: number;
  comments_enabled: boolean;
  attachment_url: string;
  caption: string;
  likes: Likes[];
  user: PostsUser;
  comments: Comments[];
  saved_posts: SavedPost[];
  replies: Replies[];
}

interface SavedPost {
  id: number;
  user_id: number;
  post_id: number;
}

interface Comments {
  id: number;
  comment: string;
  user: PostsUser;
}
interface Replies {
  id: number;
  comment_id: number;
  post_id: number;
  user_id: number;
  user: PostsUser;
  reply: string;
}

const DetailProductPage: React.FC = () => {
  const token: string = window.sessionStorage.getItem("token")!;
  const state = useSelector((state: RootStore) => state.mainReducer.auth!);
  const id = useParams<Params>().id;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [PostDetails, setPostDetails] = useState<Posts>({
    id: 0,
    attachment_url: "",
    caption: "",
    comments_enabled: true,
    likes: [],
    user: {
      id: 0,
      username: "",
      profile_image: "",
    },
    comments: [],
    saved_posts: [],
    replies: [],
  });
  const [LikesData, setLikesData] = useState<LikesDataType>({
    isOpen: false,
    AllLikes: [],
  });
  const [Comment, setComment] = useState<string>("");
  const [IsReply, setIsReply] = useState(false);
  const [ReplyDetails, setReplyDetails] = useState({
    postId: 0,
    commentId: 0,
    reply: "",
  });

  useEffect(() => {
    getFeeds();
  }, [state]);

  const Auth = () => {
    window.sessionStorage.removeItem("token");
    window.location.replace("/login");
  };

  const getFeeds = () => {
    axios
      .post(`/api/post/getPostDetails/${id}`, null, config)
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          setPostDetails({
            id: response.data.post.id,
            attachment_url: response.data.post.attachment_url,
            comments_enabled: response.data.post.comments_enabled,
            caption: response.data.post.caption,
            likes: response.data.post.likes,
            user: {
              id: response.data.post.user.id,
              username: response.data.post.user.username,
              profile_image: response.data.post.user.profile_image,
            },
            comments: response.data.post.comments,
            saved_posts: response.data.post.saved_posts,
            replies: response.data.post.replies,
          });
        } else if (response.data.error.name === "TokenExpiredError") {
          Auth();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const submitLike = (id: number) => {
    axios.post(`/api/like/addLike/${id}`, null, config).then((response) => {
      if (response.data.added) {
        getFeeds();
      } else if (response.data.removed) {
        getFeeds();
      } else if (response.data.error.name === "TokenExpiredError") {
        Auth();
      }
    });
  };

  // save post data
  const savePost = (id: number) => {
    axios.post(`/api/post/savePost/${id}`, null, config).then((response) => {
      if (response.data.added) {
        getFeeds();
      } else if (response.data.removed) {
        getFeeds();
      } else if (response.data.error.name === "TokenExpiredError") {
        Auth();
      }
    });
  };

  // type comment
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // add comment
  const submitComment = (id: number) => {
    axios
      .post(`/api/comment/addComment/${id}`, { comment: Comment }, config)
      .then((response) => {
        if (response.data.status) {
          setComment("");
          getFeeds();
        } else if (response.data.error.name === "TokenExpiredError") {
          Auth();
        }
      });
  };

  //   replies
  const setReplies = (postId: number, commentId: number) => {
    setIsReply(true);
    setReplyDetails({
      postId: postId,
      commentId: commentId,
      reply: "",
    });
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyDetails({ ...ReplyDetails, reply: e.target.value });
  };
  const submitReply = () => {
    axios
      .post(
        `/api/reply/addReply/${ReplyDetails.postId}/${ReplyDetails.commentId}`,
        { reply: ReplyDetails.reply },
        config
      )
      .then((response) => {
        if (response.data.status) {
          setReplyDetails({
            postId: 0,
            commentId: 0,
            reply: "",
          });
          getFeeds();
        } else if (response.data.error.name === "TokenExpiredError") {
          Auth();
        }
      });
  };

  //   remove comment
  const deleteComment = (postId: number, commentId: number) => {
    axios
      .post(`/api/comment/removeComment/${postId}/${commentId}`, null, config)
      .then((response) => {
        if (response.data.status) {
          getFeeds();
        } else if (response.data.error.name === "TokenExpiredError") {
          Auth();
        }
      });
  };

  // delete reply
  //   remove comment
  const deleteReply = (postId: number, replyId: number) => {
    axios
      .post(`/api/reply/removeReply/${postId}/${replyId}`, null, config)
      .then((response) => {
        if (response.data.status) {
          getFeeds();
        } else if (response.data.error.name === "TokenExpiredError") {
          Auth();
        }
      });
  };
  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Modal
          className="post_modal"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={true}
        >
          <div className="row ml-0 mr-0">
            <div className="post_left_side col-md-8 pr-0 pl-0">
              <img
                className="left_side_image"
                src={PostDetails && PostDetails.attachment_url}
                alt="no image"
              />
            </div>
            <div className="post_right_side col-md-4 pr-0 pl-0">
              <div className="post_user">
                <img
                  className="detail_post_profile"
                  src={PostDetails && PostDetails.user.profile_image}
                  alt="no image"
                />
                <span className="post_username">
                  <strong>{PostDetails && PostDetails.user.username}</strong>
                </span>
              </div>

              <hr />
              <div
                className="post_user"
                style={{ marginTop: "30px", marginBottom: "30px" }}
              >
                <img
                  className="detail_post_profile"
                  src={PostDetails && PostDetails.user.profile_image}
                  alt="no image"
                />
                <span className="post_username">
                  <strong>{PostDetails && PostDetails.user.username}</strong>
                </span>
                &nbsp;
                <span>{PostDetails && PostDetails.caption}</span>
              </div>
              {PostDetails.comments_enabled ? (
                <div
                  className="comments"
                  style={{ height: "28vh", overflowY: "auto" }}
                >
                  {PostDetails.comments.map((comment: Comments) => {
                    return (
                      <div className="post_comments_replies">
                        <div className="post_user">
                          <div>
                            <img
                              className="detail_post_profile"
                              src={comment.user.profile_image}
                              alt="no image"
                            />
                          </div>
                          <div
                            className="post_username"
                            style={{ width: "100%" }}
                          >
                            <span>
                              <strong>{comment.user.username}</strong>
                            </span>
                            &nbsp;
                            <span>{comment.comment}</span>
                            {PostDetails.user.id === state.id ? (
                              <span className="delete_comment">
                                <AiFillDelete
                                  onClick={() =>
                                    deleteComment(PostDetails.id, comment.id)
                                  }
                                />
                              </span>
                            ) : (
                              comment.user.id === state.id && (
                                <span className="delete_comment">
                                  <AiFillDelete
                                    onClick={() =>
                                      deleteComment(PostDetails.id, comment.id)
                                    }
                                  />
                                </span>
                              )
                            )}
                            <p
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setReplies(PostDetails.id, comment.id)
                              }
                            >
                              <small>
                                <strong>Reply</strong>
                              </small>
                            </p>
                          </div>
                        </div>
                        {PostDetails.replies.map((reply: Replies) => {
                          if (comment.id === reply.comment_id) {
                            return (
                              <div className="post_user ml-5">
                                <div>
                                  <img
                                    className="detail_post_profile"
                                    src={reply.user.profile_image}
                                    alt="no image"
                                  />
                                </div>
                                <div
                                  className="post_username"
                                  style={{ width: "100%" }}
                                >
                                  <span>
                                    <strong>{reply.user.username}</strong>
                                  </span>
                                  &nbsp;
                                  <span>{reply.reply}</span>
                                  {PostDetails.user.id === state.id ? (
                                    <span className="delete_comment">
                                      <AiFillDelete
                                        onClick={() =>
                                          deleteReply(PostDetails.id, reply.id)
                                        }
                                      />
                                    </span>
                                  ) : (
                                    reply.user.id === state.id && (
                                      <span className="delete_comment">
                                        <AiFillDelete
                                          onClick={() =>
                                            deleteReply(
                                              PostDetails.id,
                                              reply.id
                                            )
                                          }
                                        />
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <h6
                  style={{
                    textAlign: "center",
                    marginTop: "20vh",
                    marginBottom: "20vh",
                  }}
                >
                  comments turned off
                </h6>
              )}

              {/* like save */}
              <hr className="mt-0 mb-0" />
              <div className="post_icon margin">
                {PostDetails.likes.filter(
                  (like) => like.user_id === state.id || 0
                ).length &&
                PostDetails.likes.filter(
                  (like) => like.user_id === state.id || 0
                )[0].user_id === state.id ? (
                  <AiFillHeart
                    className="mr-2"
                    style={{ color: "red" }}
                    onClick={() => submitLike(PostDetails.id)}
                  />
                ) : (
                  <AiOutlineHeart
                    className="mr-2"
                    onClick={() => submitLike(PostDetails.id)}
                  />
                )}
                {PostDetails.saved_posts.filter(
                  (post) => post.user_id === state.id || 0
                ).length &&
                PostDetails.saved_posts.filter(
                  (post) => post.user_id === state.id || 0
                )[0].user_id === state.id ? (
                  <AiFillSave
                    className="mr-2"
                    onClick={() => savePost(PostDetails.id)}
                  />
                ) : (
                  <AiOutlineSave
                    className="mr-2"
                    onClick={() => savePost(PostDetails.id)}
                  />
                )}
              </div>

              {/* likes */}
              <div className="likes_count margin">
                <Link
                  to="#"
                  onClick={() => {
                    setLikesData({ isOpen: true, AllLikes: PostDetails.likes });
                  }}
                >
                  <strong>{PostDetails.likes.length}</strong>&nbsp;
                  <strong>likes</strong>
                </Link>
              </div>

              {/* add comment and reply */}
              {IsReply && PostDetails.comments_enabled ? (
                <div
                  className="input-group"
                  style={{
                    position: "absolute",
                    bottom: "0px",
                  }}
                >
                  <input
                    style={{ height: "auto", padding: "15px 10px" }}
                    type="text"
                    className="form-control"
                    placeholder="reply"
                    value={ReplyDetails.reply}
                    onChange={(e) => handleReplyChange(e)}
                  />
                  <div className="input-group-append_post_page ">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => submitReply()}
                    >
                      Post
                    </button>
                  </div>
                </div>
              ) : (
                PostDetails.comments_enabled && (
                  <div
                    className="input-group"
                    style={{
                      position: "absolute",
                      bottom: "0px",
                    }}
                  >
                    <input
                      style={{ height: "auto", padding: "15px 10px" }}
                      type="text"
                      className="form-control"
                      placeholder="Add a comment"
                      value={Comment}
                      onChange={(e) => handleChange(e)}
                    />
                    <div className="input-group-append_post_page ">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => submitComment(PostDetails.id)}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </Modal>
        <ModalContext.Provider value={{ LikesData, setLikesData }}>
          <LikesModel />
        </ModalContext.Provider>
      </div>
    </>
  );
};

export default DetailProductPage;
