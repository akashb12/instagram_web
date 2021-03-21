import React,{ Suspense,lazy } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

const App:React.FC =()=> {
  return (
    <>
    <Suspense fallback={  <div style={{display:"flex",justifyContent:"center"}}>
    <h3>Loading...</h3>

					  </div>}>
        <Router>
        <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        </Switch>
        </Router>
    </Suspense>
    </>
  );
}

export default App;
