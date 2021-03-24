import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { RootStore } from '../..';
import { useSelector } from 'react-redux';
import './UpdateUser.css'

interface Image {
  profileImg: any
}

interface submitData {
  bio: string,
  fullName: string,
  image: string,
  isPrivate: boolean
}

const UpdateUser = () => {
  const token: string = window.sessionStorage.getItem('token')!;
  const state = useSelector((state: RootStore) => state.mainReducer.auth!);
  const [ProfileImg, setProfileImg] = useState<Image>({ profileImg: "" });
  const [DataToSubmit, setDataToSubmit] = useState<submitData>({
    bio: "",
    fullName: "",
    image: "",
    isPrivate: false
  });
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files && e.target.files[0];
    if (fileList) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          if (reader.result) {
            setProfileImg({ profileImg: reader.result })
          }
        }
      }
      reader.readAsDataURL(fileList)
      const formData = new FormData();
      formData.append('file', fileList);
      axios.post("/api/user/updateProfilePicture?token=" + token, formData).then((response) => {
        console.log('data', response.data.image.path)
        setDataToSubmit({
          ...DataToSubmit, image: "http://localhost:5000/" + response.data.image.path
        });
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataToSubmit({
      ...DataToSubmit, [e.target.name]: e.target.value
    });
  }
  useEffect(() => {
    setProfileImg({ profileImg: state.profileImage! })
    setDataToSubmit({
      bio: state.bio!,
      fullName: state.full_name!,
      image: state.profileImage!,
      isPrivate: state.isPrivate!
    })
  }, [state]);



  const submitForm = () => {
    axios.post("/api/user/updateUserDetails?token=" + token, DataToSubmit).then((response) => {
      console.log('data', response.data)
    });
  }
  return (
    <>
      <div className="profile_image">
        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={ProfileImg.profileImg} alt="noimage" />
      </div>
      <div className="update_user">
        <Form>
          <Form.Label>Update Profile</Form.Label>
          <Form.File
            type="file" accept="image/*" name="file"
            id="custom-file-translate-scss"
            label="upload image"
            lang="en"
            custom
            onChange={handleImgChange}
          />
          <Form.Group>
            <Form.Label>Bio</Form.Label>
            <Form.Control type="text" name="bio" placeholder="bio" onChange={handleChange} value={DataToSubmit.bio} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Full name</Form.Label>
            <Form.Control name="fullName" type="text" placeholder="full name" onChange={handleChange} value={DataToSubmit.fullName} />
          </Form.Group>
          <Form.Check
            checked={DataToSubmit.isPrivate}
            onChange={() => setDataToSubmit({ ...DataToSubmit, isPrivate: !DataToSubmit.isPrivate })}
            type="switch"
            id="custom-switch"
            label={DataToSubmit.isPrivate ? "remove private account" : "make private account"}
          />
          <Button variant="primary" onClick={submitForm}>
            Submit
  </Button>
        </Form>
      </div>
    </>
  )
}

export default UpdateUser
