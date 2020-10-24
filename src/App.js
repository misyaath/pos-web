import React, {useEffect} from 'react';
import '../dist/css/style.css';
import {BrowserRouter as Router} from "react-router-dom";
import Authentication from "./app/Authentication";
import AuthContext from "./app/AuthContext";
import PrivateRoute from "./app/PrivateRoute";
import Dashboard from "./Dashboard";

export default function App() {

  useEffect(() => {
    document.body.classList.add('c-app')
  })

  const auth = new Authentication();
  return (
    <Router>
      <AuthContext.Provider value={auth}>
        <PrivateRoute path='/' component={Dashboard} auth={auth}/>
      </AuthContext.Provider>
    </Router>
  )

}
