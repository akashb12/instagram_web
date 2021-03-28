import React, { useContext, useEffect, useState } from "react";
import { SearchedUsers, ModalContext } from "../../Context/Context";
import "./HomePage.css";
import { AiOutlineHeart, AiFillHeart, AiOutlineSave, AiFillSave } from 'react-icons/ai';
import { Modal } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { RootStore } from "../..";
import { useSelector } from 'react-redux';
import axios from 'axios';
import NavBar from "../NavBar/NavBar";
import LikesModel from "./LikesModel";
const HomePage: React.FC = () => {

  interface PostsUser {
    id: number,
    username: string,
    profile_image: string
  }

  interface Posts {
    id: number,
    attachment_url: string,
    caption: string,
    likesCount: number,
    likes: Likes[]
    user: PostsUser,
    comments: Comments[],
    saved_posts: SavedPost[]

  }

  interface SavedPost {
    id: number,
    user_id: number,
    post_id: number,
  }

  interface Comments {
    comment: string,
    user: PostsUser
  }
  interface LikesUser {
    username: string,
    profile_image: string
  }

  const { Users, setUsers } = useContext(SearchedUsers);
  const token: string = window.sessionStorage.getItem('token')!;
  const state = useSelector((state: RootStore) => state.mainReducer.auth!);
  const [Posts, setPosts] = useState<Posts[]>([]);
  const [Comment, setComment] = useState("");
  const [AllComments, setAllComments] = useState<Comments[]>([]);
  let check: Likes[] = []
  let checkSavedPosts: SavedPost[] = [];
  const [isOpen, setIsOpen] = React.useState(false);
  const [LikesData, setLikesData] = useState<LikesDataType>({
    isOpen: false,
    AllLikes: []
  });


  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  // get posts
  useEffect(() => {
    getFeeds()
  }, [state]);

  const getFeeds = () => {
    axios.post(`/api/post/getFeeds/${state?.id}`, null, config).then((response) => {
      setPosts(response.data.posts)
    });
  }

  const submitComment = (id: number) => {
    axios.post(`/api/comment/addComment/${id}`, { comment: Comment }, config).then((response) => {


      setAllComments([{
        comment: response.data.insertData.comment,
        user: response.data.insertData.user
      }])
    });
  }
  const submitLike = (id: number) => {
    axios.post(`/api/like/addLike/${id}`, null, config).then((response) => {
      if (response.data.added) {
        getFeeds()
      }
      else if (response.data.removed) {
        getFeeds()

      }
    });
  }

  // save post data
  const savePost = (id: number) => {
    axios.post(`/api/post/savePost/${id}`, null, config).then((response) => {
      if (response.data.added) {
        getFeeds()
      }
      else if (response.data.removed) {
        getFeeds()
      }
    });
  }
  console.log('isopen', isOpen)
  return (
    <>
      <NavBar />
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
                            src={user.profile_image}
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
          Posts.length ? Posts.map((post: Posts) => {
            check = post.likes.filter(like => like.user_id === state.id || 0);
            checkSavedPosts = post.saved_posts.filter(post => post.user_id === state.id || 0);

            return (
              <div className="card home-card">
                <div style={{ marginTop: "10px" }}>
                  <Link to={"/profile/" + post.user.id}><img className="post_profile" src={post.user.profile_image ? post.user.profile_image : "/user.png"} alt="no image" />
                    <span className="post_user_name">{post.user.username}</span>
                  </ Link>
                </div>
                <div className="card-image">
                  <img src={post.attachment_url} alt="no image" />
                </div>
                <div className="card-content">
                  <div className="post_icon margin">
                    {
                      check.length && check[0].user_id === state.id ?
                        <AiFillHeart style={{ color: 'red' }} onClick={() => submitLike(post.id)} /> :
                        <AiOutlineHeart onClick={() => submitLike(post.id)} />
                    }
                    {
                      checkSavedPosts.length && checkSavedPosts[0].user_id === state.id ?
                        <AiFillSave onClick={() => savePost(post.id)} /> :
                        <AiOutlineSave onClick={() => savePost(post.id)} />

                    }
                  </div>
                  <div className="likes_count margin">
                    <Link to="" onClick={() => { setLikesData({ isOpen: true, AllLikes: post.likes }) }} > <strong>{post.likesCount}</strong>&nbsp;<strong>likes</strong></Link>
                  </div> <div className="post_content margin">
                    <p ><span><strong>{post.user.username}</strong></span>&nbsp; {post.caption} </p>
                  </div>
                  <div>
                    <div className="post_comment margin">
                      <span ><strong>{AllComments.length ? AllComments[0].user.username : post && post.comments.length >= 1 && post.comments[0].user.username}</strong></span>
                      &nbsp;
                      <span>{AllComments.length ? AllComments[0].comment : post && post.comments.length >= 1 && post.comments[post.comments.length - 1].comment}</span>
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
          }) :
            <h2>no posts</h2>
        }
        <ModalContext.Provider value={{ LikesData, setLikesData }}>
          <LikesModel />
        </ModalContext.Provider>
      </div>
    </>
  );
};

export default HomePage;
