import React, { Suspense, lazy } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Auth from './auth/Auth';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div style={{ display: "flex", justifyContent: "center" }}>
        <h3>Loading...</h3>

      </div>}>
        <Router>
        <NavBar />
          <Switch>
            <Route exact path="/" component={Auth(HomePage, true)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
          </Switch>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
