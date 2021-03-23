import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'
import './UpdateUser.css'
const UpdateUser = () => {
  const token: string = window.sessionStorage.getItem('token')!;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files && e.target.files[0];
    if (fileList) {
      console.log(fileList)
      const formData = new FormData();
      formData.append('file', fileList);
      axios.post("/api/user/updateProfilePicture?token=" + token, formData).then((response) => {
        console.log('data', response.data)
      });
    }


  }
  return (
    <div className="update_user">
      <Form>
        <Form.Label>Update Profile</Form.Label>
        <Form.File
          id="custom-file-translate-scss"
          label="upload image"
          lang="en"
          custom
          onChange={handleChange}
        />
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
    </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
  </Button>
      </Form>
    </div>
  )
}

export default UpdateUser
