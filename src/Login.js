import React, {useEffect, useState} from 'react'
import userIcon from '@coreui/icons/sprites/free.svg'
import iconLocked from '@coreui/icons/sprites/free.svg'
import axios from "axios";
import validator from 'validator'
import Alert from "./components/Alert";
import getErrors from "./app/ErrorResponse";
import {useHistory} from 'react-router-dom';
import Button from "./components/Button";


export default function Login({auth}) {
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated()) {
      history.push('/')
    }
    document.body.classList.add('flex-row')
    document.body.classList.add('align-items-center');
  })

  const validateFields = () => {
    const validationErrors = [];
    setValidationError([]);
    if (validator.isEmpty(email)) {
      setValidationError(prevState => [...prevState, 'Email is required'])
      validationErrors.push('email_empty_error')
    }
    if (!validator.isEmail(email)) {
      setValidationError(prevState => [...prevState, 'Invalid Email'])
      validationErrors.push('invalid_email_error')
    }
    if (validator.isEmpty(password)) {
      setValidationError(prevState => [...prevState, 'Password is required'])
      validationErrors.push('password_empty_error')
    }
    return validationErrors;
  }

  const onSubmitHandler = () => {

    setLoading(true);
    const validationErrors = validateFields();

    if (validationErrors.length === 0) {
      axios.post('/login', {
        email,
        password,
        device_name: 'browser',
      }).then(response => {
        const login = auth.login(response.data)
        if (login) {
          history.push("/")
        } else {
          setValidationError(prevState => [...prevState, 'Unable to Login Try again'])
        }
        setLoading(false);
      }).catch(errors => {
        if (errors.response !== undefined) {
          setValidationError(getErrors(errors.response.data));
        }
        setLoading(false);
      });
    } else {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Alert display={validationError.length === 0 ? 'none' : 'block'} message={validationError}/>
          <div className="card-group">
            <div className="card p-4">
              <div className="card-body">
                <h1>Login</h1>
                <p className="text-muted">Sign In to your account</p>
                <div className="input-group mb-3">
                  <div className="input-group-prepend"><span className="input-group-text">
                      <svg className="c-icon">
                        <use xlinkHref={userIcon}/>
                      </svg></span></div>
                  <input className="form-control" type="email" required={true} placeholder="Username" name='email'
                         onChange={(e) => {
                           setEmail(e.target.value)
                         }}/>
                </div>
                <div className="input-group mb-4">
                  <div className="input-group-prepend"><span className="input-group-text">
                      <svg className="c-icon">
                        <use xlinkHref={iconLocked}></use>
                      </svg></span></div>
                  <input className="form-control" type="password" placeholder="Password" name='password'
                         onChange={(e) => {
                           setPassword(e.target.value)
                         }}/>
                </div>
                <div className="row">
                  <div className="col-6">
                    <Button onClickHandler={onSubmitHandler} text='Login' loading={loading}/>
                  </div>
                  <div className="col-6 text-right">
                    <button className="btn btn-link px-0" type="button">Forgot password?</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
              <div className="card-body text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                  <button className="btn btn-lg btn-outline-light mt-3" type="button">Register Now!</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
