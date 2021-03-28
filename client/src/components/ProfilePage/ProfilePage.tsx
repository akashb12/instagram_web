import React, { useEffect, useState } from 'react'
import './ProfilePage.css';
import axios from 'axios';
import { RootStore } from '../..';
import { useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
const ProfilePage = () => {


  const token: string = window.sessionStorage.getItem('token')!;
  const state = useSelector((state: RootStore) => state.mainReducer.auth!);
  const id = useParams<Params>().id;
  const [ProfileDetails, setProfileDetails] = useState<UserDetails>({
    profileName: "",
    profileImage: "",
    bio: "",
    followers: 0,
    following: 0,
    postsCount: 0
  });
  const [PostImages, setPostImages] = useState<UserPosts[]>([{
    id: 0,
    attachment_url: ""
  }]);
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };


  useEffect(() => {
    axios.post(`/api/user/getProfile/${state?.id}/${id}`, null, config).then((response) => {
      setPostImages(response.data.posts)
      setProfileDetails({
        profileName: response.data.name,
        profileImage: response.data.profileImage,
        bio: response.data.bio,
        followers: response.data.followers,
        following: response.data.following,
        postsCount: response.data.postCount,
      })
    });
  }, [state]);




  return (
    <>
    <NavBar />
    <div className="profile_page">
      <div className="profile_page_details">
        <div>
          <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={ProfileDetails.profileImage ? ProfileDetails.profileImage : "/user.png"} alt="noimage" />
        </div>
        <div>
          <h4>{ProfileDetails.profileName}</h4>
          <div className="profile_details">
            <h6>{ProfileDetails.postsCount} posts</h6>
            <h6>{ProfileDetails.followers} followers</h6>
            <h6>{ProfileDetails.following} following</h6>
          </div>
          <div className="bio">
            <p> {ProfileDetails.bio}</p>
          </div>
          <div>
            {
              state?.id === Number(id) &&
              <Link to={"/updateUser/" + state?.id} className="profile_button">Edit Profile</Link>
            }
          </div>
        </div>
      </div>
      <div className="profile_page_images">
        {
        PostImages &&  PostImages.length >= 1 && PostImages.map((post: UserPosts) => {
            return (
              <img className="image_gallery" src={post.attachment_url} alt="no image" />
            )
          })
        }</div>
    </div>
    </>
  )
}

export default ProfilePage
