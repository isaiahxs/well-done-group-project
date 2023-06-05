import React, { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom';
import './LoginModal.css';
import { ModalContext } from '../../context/ModalContext';
import * as sessionActions from '../../store/session';


function LoginModal() {

  const { modal, openModal, closeModal, updateObj, setUpdateObj} = useContext(ModalContext);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const formRef = useRef(null);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [signInErrors, setSignInErrors] = useState({});


  const [disabledButton, setDisabledButton] = useState(false);
  const [buttonClass, setButtonClass] = useState('signin-div-button button button2 ');
  const [buttonText, setButtonText] = useState('Log In');


  const handleForgotPassword = () => {
    closeModal();
    history.push('/forgotPassword');
  };

  const handleSignUp = () => {
    closeModal();
    openModal('signup');
  };

  useEffect(() => {
    const errors = {};
    const loginErrors = {};

    if (!credential.length) errors['credential'] = 'Please enter a username';
    if (!password.length) errors['password'] = 'Please enter a password';

    if (credential.length < 4) {
      errors['credential'] = 'Please enter a username';
      loginErrors['credential'] = 'Username must be at least 4 characters';
    }
    if (password.length < 6) {
      errors['password'] = 'Please enter a password';
      loginErrors['password'] = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    setSignInErrors(loginErrors);
  }, [credential, password]);

  
  useEffect(() => {
    if (Object.keys(signInErrors).length > 0) {
      setButtonClass('signin-div-button disabled disabled2');
    } else {
      setButtonClass('signin-div-button button button2');
    }
  }, [signInErrors]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, response } = await dispatch(
        sessionActions.login({ credential, password })
      );

      if (response.ok) {
        setUpdateObj(null)
        closeModal()
      };
    } catch (error) {
      console.error(error);
      setDisabledButton(true);
      setButtonClass('signin-div-button disabled disabled2');
      setButtonText('The provided credentials were invalid');
      setTimeout(() => {
        setDisabledButton(false);
        setButtonClass('signin-div-button button button2');
        setButtonText('Log In');
      }, 3000);
    }
  };


  const demoUser = async (e) => {
    e.preventDefault();
    const { response } = await dispatch(
      sessionActions.login({ credential:'demo@aa.io', password:'password' })
    );
    if (response.ok) {
      setUpdateObj(null)
      closeModal()
    };
  };
  
  useEffect(() => {
    if(updateObj !== 'noUser'){
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }
  }, [updateObj]);




  return (
    <div className="signin-form-page-container" ref={formRef}>
      <div className="signin-header-container flexcenter">
        <div className="signin-header header-text">Welcome back.</div>
      </div>
      <div className="signin-close-button" onClick={closeModal}>
      <i className="fa-solid fa-x"></i>
      </div>

      <form onSubmit={handleSubmit} className="signin-div">
        <label className="user">
          Username
          <input
            className="userField"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder={validationErrors['credential'] || ''}
          />
        </label>
        <label className="pass">
          Password
          <input
            className="passwordField"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={validationErrors['password'] || ''}
          />
        </label>
        <button
          type="submit"
          className={buttonClass}
          disabled={Object.keys(signInErrors).length > 0 || disabledButton}
        >
          {buttonText}
        </button>
      </form>
      <div className="alt-links">


        <div className='login-no-account-container flexcenter'>
          <div className='flexcenter memo-text'>
            No account?<div onClick={1===2 ? handleSignUp : false} className='create-one'>Create One</div>  
          </div>
          
        </div>



        <div className='login-forgot-account-container flexcenter'>

          <div>Forgot email or trouble signing in?</div>
          <div className="login-forgot-password-link link" onClick={handleForgotPassword}>
            Get help.
          </div>
          
        </div>

    




        <div>
          <div>Click “Sign In” to agree to Medium’s Terms of Service and acknowledge that Medium’s Privacy Policy applies to you.</div>
        </div>

        <div className="demo-user-singin link" onClick={demoUser}>
        Demo User
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
