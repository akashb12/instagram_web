import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { RootStore } from "../..";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { Link, useParams } from "react-router-dom";

interface Image {
  profileImg: any;
}

interface submitData {
  caption: string;
  tagged_users: string[];
  attachment_url: string;
  comments_enabled: boolean;
  archive: boolean;
  userId: number;
}

interface Posts {
  id: number;
  attachment_url: string;
  caption: string;
  user: PostsUser;
  tagged_users: string[];
  archive: boolean;
  comments_enabled: boolean;
}
interface PostsUser {
  id: number;
  username: string;
  profile_image: string;
}

const EditPost = () => {
  const token: string = window.sessionStorage.getItem("token")!;
  const state = useSelector((state: RootStore) => state.mainReducer.auth!);
  const [SearchedUser, setSearchedUser] = useState<string>("");
  const [Check, setCheck] = useState(false);
  const [Users, setUsers] = useState<UserProfile[]>([]);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const id = useParams<Params>().id;
  const [PostDetails, setPostDetails] = useState<Posts>({
    id: 0,
    attachment_url: "",
    caption: "",
    comments_enabled: true,
    user: {
      id: 0,
      username: "",
      profile_image: "",
    },
    tagged_users: [],
    archive: false,
  });
  const Auth = () => {
    window.sessionStorage.removeItem("token");
    window.location.replace("/login");
  };

  useEffect(() => {
    getFeeds();
  }, [state]);

  const getFeeds = () => {
    axios
      .post(`/api/post/getEditablePost/${id}`, null, config)
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          setPostDetails({
            id: response.data.post.id,
            attachment_url: response.data.post.attachment_url,
            comments_enabled: response.data.post.comments_enabled,
            archive: response.data.post.archive,
            caption: response.data.post.caption,
            user: {
              id: response.data.post.user.id,
              username: response.data.post.user.username,
              profile_image: response.data.post.user.profile_image,
            },
            tagged_users: response.data.post.tagged_users,
          });
        } else if (response.data.error.name === "TokenExpiredError") {
          Auth();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostDetails({
      ...PostDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedUser(e.target.value);
    if (e.target.value.length >= 1) {
      setCheck(true);
    } else {
      setCheck(false);
      setUsers([]);
    }
  };
  useEffect(() => {
    if (Check) {
      const delayDebounceFn = setTimeout(() => {
        axios
          .post("/api/user/searchUser", { name: SearchedUser }, config)
          .then((response) => {
            setUsers(response.data.users);
          });
      }, 3000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [SearchedUser]);

  const addTags = (name: string) => {
    setPostDetails({
      ...PostDetails,
      tagged_users: [...PostDetails.tagged_users, name],
    });
  };
  const removeTag = (index: number) => {
    const newTags = [...PostDetails.tagged_users];
    newTags.splice(index, 1);
    setPostDetails({ ...PostDetails, tagged_users: newTags });
  };

  const submitForm = () => {
    console.log("data", PostDetails);
    axios
      .post("/api/post/editPost/" + PostDetails.id, PostDetails, config)
      .then((response) => {
        if (response.data.status) {
          console.log("data", response.data);
        } else {
          Auth();
        }
      });
  };
  return (
    <>
      <NavBar />
      <div className="profile_image">
        <img
          style={{ width: "35vw", height: "40vh" }}
          src={PostDetails.attachment_url}
          alt="noimage"
        />
      </div>
      <div className="update_user">
        <Form>
          <Form.Group>
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              name="caption"
              placeholder="caption"
              onChange={handleChange}
              value={PostDetails.caption}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tag Users</Form.Label>
            <Form.Control
              name="tagged_users"
              type="text"
              placeholder="tag users"
              onChange={handleSearchChange}
              value={SearchedUser}
            />
          </Form.Group>
          <div className="tags">
            {PostDetails.tagged_users.map((user: string, index: number) => {
              return (
                <span>
                  <span>{user}</span>
                  <span className="mr-2">
                    <AiFillCloseCircle onClick={() => removeTag(index)} />
                  </span>
                </span>
              );
            })}
          </div>
          {/* display users */}
          <div className="container">
            <div
              className="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="col-12 col-sm-8 col-lg-5">
                <ul className="list-group">
                  {Users &&
                    Users.map((user: UserProfile, index: number) => {
                      return (
                        <Link to="#" onClick={() => addTags(user.username)}>
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
          <Form.Check
            checked={PostDetails.archive}
            onChange={() =>
              setPostDetails({
                ...PostDetails,
                archive: !PostDetails.archive,
              })
            }
            type="switch"
            id="archive"
            label={PostDetails.archive ? "remove from archive" : "archive post"}
          />
          <Form.Check
            checked={PostDetails.comments_enabled}
            onChange={() =>
              setPostDetails({
                ...PostDetails,
                comments_enabled: !PostDetails.comments_enabled,
              })
            }
            type="switch"
            id="comments_enabled"
            label={
              PostDetails.comments_enabled
                ? "disable comments"
                : "enable comments"
            }
          />
          <Button variant="primary" onClick={submitForm}>
            Update Post
          </Button>
        </Form>
      </div>
    </>
  );
};

export default EditPost;
