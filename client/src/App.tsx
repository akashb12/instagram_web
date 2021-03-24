import React, { Suspense, lazy, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Auth from './auth/Auth';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import { SearchedUsers } from './Context/Context';
import ProfilePage from './components/ProfilePage/ProfilePage';
import UpdateUser from './components/UpdateUser/UpdateUser';

const App: React.FC = () => {

  // {
  //   id: 0,
  //   profileImage: "",
  //   full_name: "",
  //   username:""
  // }
  const [Users, setUsers] = useState<UserProfile[]>([]);
  return (
    <>
      <Suspense fallback={<div style={{ display: "flex", justifyContent: "center" }}>
        <h3>Loading...</h3>

      </div>}>
        <Router>
          <SearchedUsers.Provider value={{ Users, setUsers }}>
            <NavBar />
            <Switch>
              <div >
              <Route exact path="/" component={Auth(HomePage, true)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)} />
              <Route exact path="/profile/:id" component={Auth(ProfilePage, true)} />
              <Route exact path="/updateUser/:id" component={Auth(UpdateUser, true)} />
              </div>

            </Switch>
          </SearchedUsers.Provider>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
