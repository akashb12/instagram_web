import React, { Suspense, lazy, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Auth from "./auth/Auth";
import HomePage from "./components/HomePage/HomePage";


import ProfilePage from "./components/ProfilePage/ProfilePage";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import SavedPosts from "./components/SavedPosts/SavedPosts";
import DetailProductPage from "./components/DetailProductPage/DetailProductPage";
import AddPosts from "./components/AddPosts/AddPosts";
import EditPost from "./components/EditPost/EditPost";

const App: React.FC = () => {
  // {
  //   id: 0,
  //   profileImage: "",
  //   full_name: "",
  //   username:""
  // }

  return (
    <>
      <Suspense
        fallback={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Loading...</h3>
          </div>
        }
      >
        <Router>

            <Switch>
              <div>
                <Route exact path="/" component={Auth(HomePage, true)} />
                <Route exact path="/login" component={Auth(LoginPage, false)} />
                <Route
                  exact
                  path="/register"
                  component={Auth(RegisterPage, false)}
                />
                <Route
                  exact
                  path="/profile/:id"
                  component={Auth(ProfilePage, true)}
                />
                <Route
                  exact
                  path="/updateUser/:id"
                  component={Auth(UpdateUser, true)}
                />
                <Route
                  exact
                  path="/savedPosts"
                  component={Auth(SavedPosts, true)}
                />
                <Route
                  exact
                  path="/detailProductPage/:id"
                  component={Auth(DetailProductPage, true)}
                />
                <Route
                  exact
                  path="/addPost/"
                  component={Auth(AddPosts, true)}
                />
                 <Route
                  exact
                  path="/editPost/:id"
                  component={Auth(EditPost, true)}
                />
              </div>
            </Switch>
        </Router>
      </Suspense>
    </>
  );
};

export default App;
