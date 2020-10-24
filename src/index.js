import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from 'axios';
import {BrowserRouter as Router, Route, useHistory} from "react-router-dom";
import Authentication from "./app/Authentication";

axios.defaults.baseURL = 'http://127.0.0.1:3000/api';

if (localStorage.getItem('token') !== null) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const auth = new Authentication();
  if (error.response.status === 401) {
    auth.removeLogins()
  }
  return Promise.reject(error);
});

ReactDOM.render(
  <Router>
    <Route component={App}></Route>
  </Router>,
  document.getElementById('root')
);
