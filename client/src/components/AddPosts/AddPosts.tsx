import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { RootStore } from "../..";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";

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

const AddPosts = () => {
  const token: string = window.sessionStorage.getItem("token")!;
  const state = useSelector((state: RootStore) => state.mainReducer.auth!);
  const [ProfileImg, setProfileImg] = useState<Image>({ profileImg: "" });
  const [DataToSubmit, setDataToSubmit] = useState<submitData>({
    userId: 0,
    caption: "",
    tagged_users: [],
    attachment_url: "",
    comments_enabled: true,
    archive: false,
  });
  const [SearchedUser, setSearchedUser] = useState<string>("");
  const [Check, setCheck] = useState(false);
  const [Users, setUsers] = useState<UserProfile[]>([]);
  const [TaggedUsers, setTaggedUsers] = useState<string[]>([]);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const Auth = () => {
    window.sessionStorage.removeItem("token");
    window.location.replace("/login");
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files && e.target.files[0];
    if (fileList) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (reader.result) {
            setProfileImg({ profileImg: reader.result });
          }
        }
      };
      reader.readAsDataURL(fileList);
      const formData = new FormData();
      formData.append("file", fileList);
      axios
        .post("/api/post/addPostImages", formData, config)
        .then((response) => {
          if (response.data.status) {
            setDataToSubmit({
              ...DataToSubmit,
              attachment_url: "http://localhost:5000/" + response.data.image,
            });
          } else {
            Auth();
          }
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataToSubmit({
      ...DataToSubmit,
      [e.target.name]: e.target.value,
      userId:state.id ||0
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

//   useEffect(() => {
//     console.log("users", TaggedUsers);
//   }, [TaggedUsers]);

  const addTags = (name: string) => {
    setDataToSubmit({...DataToSubmit,tagged_users:[...DataToSubmit.tagged_users,name]})
  };
  const removeTag = (index: number) => {
    const newTags = [...DataToSubmit.tagged_users];
    newTags.splice(index, 1);
    setDataToSubmit({...DataToSubmit,tagged_users:newTags})
  };

  //   useEffect(() => {
  //     setProfileImg({ profileImg: state.profileImage! });
  //     setDataToSubmit({
  //       bio: state.bio!,
  //       fullName: state.full_name!,
  //       image: state.profileImage!,
  //       isPrivate: state.isPrivate!,
  //     });
  //   }, [state]);

  const submitForm = () => {
      console.log('data',DataToSubmit)
    axios.post("/api/post/addPost", DataToSubmit, config).then((response) => {
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
          src={ProfileImg.profileImg ? ProfileImg.profileImg : "/insta.png"}
          alt="noimage"
        />
      </div>
      <div className="update_user">
        <Form>
          <Form.Label>Add Post Images</Form.Label>
          <Form.File
            type="file"
            accept="image/*"
            name="file"
            id="custom-file-translate-scss"
            label="upload image"
            lang="en"
            custom
            onChange={handleImgChange}
          />
          <Form.Group>
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              name="caption"
              placeholder="caption"
              onChange={handleChange}
              value={DataToSubmit.caption}
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
            {DataToSubmit.tagged_users.map((user: string, index: number) => {
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

          {/*
          <Form.Check
            checked={DataToSubmit.isPrivate}
            onChange={() =>
              setDataToSubmit({
                ...DataToSubmit,
                isPrivate: !DataToSubmit.isPrivate,
              })
            }
            type="switch"
            id="custom-switch"
            label={
              DataToSubmit.isPrivate
                ? "remove private account"
                : "make private account"
            }
          /> */}
          <Button variant="primary" onClick={submitForm}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddPosts;
