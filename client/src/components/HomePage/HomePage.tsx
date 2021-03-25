import React, { useContext, useEffect, useState } from "react";
import { SearchedUsers } from "../../Context/Context";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { RootStore } from "../..";
import { useSelector } from 'react-redux';
import axios from 'axios';
const HomePage: React.FC = () => {

  interface PostsUser {
    id: number,
    username: string,
    profileImage: string
  }

  interface Posts {
    id: number,
    attachment_url: string,
    caption: string,
    user: PostsUser,
    comments: Comments[]

  }

  interface Comments {
    id: number,
    comment: string,
    userId: number,
    user: PostsUser
  }

  const { Users, setUsers } = useContext(SearchedUsers);
  const token: string = window.sessionStorage.getItem('token')!;
  const state = useSelector((state: RootStore) => state.mainReducer.auth!);
  const [Posts, setPosts] = useState<Posts[]>([]);
  const [Comment, setComment] = useState("");
  const [AllComments, setAllComments] = useState<Comments[]>([]);
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  // get posts
  useEffect(() => {
    axios.post(`/api/post/getFeeds/${state?.id}`,null, config).then((response) => {
      setPosts(response.data.posts)
    });
  }, [state]);


  // get comments
  // useEffect(() => {
  //   if (!AllComments.length || Check) {
  //     setCheck(false)
  //     axios.post(`/api/comment/getAllComments?token=` + token, { ids: CommentIds }).then((response) => {

  //       setAllComments(response.data.comments)
  //     });
  //   }
  // }, [CommentIds]);



  const submitComment = (id: number) => {
    axios.post(`/api/comment/addComment/${id}?token=` + token, { comment: Comment }).then((response) => {

      setAllComments([...AllComments, response.data.insertData])
    });
  }
  return (
    <>
      <div className="container">
        <div className="row" style={{ display: "flex", justifyContent: "center" }}>
          <div className="col-12 col-sm-8 col-lg-5">
            <ul className="list-group">
              {Users &&
                Users.map((user: UserProfile) => {
                  return (
                    <Link to={"/profile/" + user.id}>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        {user.username}
                        <div className="image-parent">
                          <img
                            src={user.profileImage}
                            className="img-fluid"
                            alt="quixote"
                          />
                        </div>
                      </li>
                    </Link>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      <div className="home">
        {
          Posts.length && Posts.map((post: Posts) => {
            return (
              <div className="card home-card">
                <div style={{ marginTop: "10px" }}>
                  <Link to={"/profile/" + post.user.id}><img className="post_profile" src={post.user.profileImage ? post.user.profileImage : "/user.png"} alt="no image" />
                    <span className="post_user_name">{post.user.username}</span>
                  </ Link>
                </div>
                <div className="card-image">
                  <img src={post.attachment_url} alt="no image" />
                </div>
                <div className="card-content">
                  <div className="post_content">
                    <p><span><strong>{post.user.username}</strong></span>&nbsp; {post.caption} </p>
                  </div>
                  <div>
                    <div>
                      <span><strong>{post.comments[0].user.username}</strong></span>
                      <span>{post.comments[post.comments.length - 1].comment}</span>
                    </div>
                  </div>
                  <div className="input-group">
                    <input style={{ height: "auto" }} type="text" className="form-control" placeholder="add a comment" value={Comment} onChange={(e) => setComment(e.target.value)} />
                    <div className="input-group-append">
                      <button className="btn" type="button" onClick={() => submitComment(post.id)}>Post</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export default HomePage;
