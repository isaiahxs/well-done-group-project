import React, { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom';
import './SignupModal.css';
import { ModalContext } from '../../context/ModalContext';
import * as sessionActions from '../../store/session';
import openBook from '../../public/open-book.png';
import quill from '../../public/quill.png';
import userOutline from '../../public/user-outline.png';
import fountainPen from '../../public/fountain-pen.png';

function SignupModal() {
  const { modal, openModal, closeModal, updateObj, setUpdateObj } =
    useContext(ModalContext);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const formRef = useRef(null);
  const [credential, setCredential] = useState('');
  const [emailText, setEmailText] = useState('Please enter an email');
  const [emailClass, setEmailClass] = useState('emailField');

  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState({ url: '', alt: '' });

  const [validationErrors, setValidationErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});

  const [disabledButton, setDisabledButton] = useState(false);
  const [buttonClass, setButtonClass] = useState(
    'signup-div-button button button2 '
  );
  const [buttonText, setButtonText] = useState('Sign Up');
  const [glowing, setGlowing] = useState(false);

  const handleForgotPassword = () => {
    closeModal();
    history.push('/forgotPassword');
  };

  const handleSignIn = () => {
    closeModal();
    openModal('signin');
  };

  useEffect(() => {
    const errors = {};
    const signupErrors = {};

    if (!credential.length) errors['credential'] = 'Please enter a username';
    if (!password.length) errors['password'] = 'Please enter a password';

    if (credential.length < 4) {
      errors['credential'] = 'Please enter email';
      signupErrors['credential'] = 'Username must be at least 4 characters';
    }
    if (password.length < 6) {
      errors['password'] = 'Please enter password';
      signupErrors['password'] = 'Password must be at least 6 characters';
    }
    if (!firstName.length) {
      errors['firstName'] = 'Please enter first name';
      signupErrors['firstName'] = 'Please include first name';
    }

    if (!lastName.length) {
      errors['lastName'] = 'Please enter last name';
      signupErrors['lastName'] = 'Please include last name';
    }

    if (profileImage.url.length === 0) {
      errors['profileImage'] = 'Please select profile image';
      signupErrors['profileImage'] = 'Please select profile image';
    }

    setValidationErrors(errors);
    setSignupErrors(signupErrors);
  }, [credential, password, firstName, lastName, profileImage]);

  useEffect(() => {
    if (Object.keys(signupErrors).length > 0) {
      setButtonClass('signin-div-button disabled disabled2');
    } else {
      setButtonClass('signin-div-button button button2');
    }
  }, [signupErrors]);

  console.log(typeof profileImage.url);


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(profileImage.url);
    let credentials = {
      email: credential,
      password,
      firstName,
      lastName,
      profileImage:profileImage.url,
      username: `${firstName + '#' + Math.floor(Math.random() * 1000)} `,
    };
    try {
      const response = await dispatch(sessionActions.signUp(credentials));
      console.log('here');
      console.log(response);

      if (response.status == 401) {
        if (response.errors && response.errors[0].slice(0, 5) === 'email') {
          console.log('yes');
          setCredential('The provided email is invalid');
          setEmailClass('email-field-invalid');

          setDisabledButton(true);
          setButtonClass('signin-div-button disabled disabled2');
          setButtonText('Invalid');
          setTimeout(() => {
            setEmailClass('');
            setDisabledButton(false);
            setButtonClass('signin-div-button button button2');
            setButtonText('Sign Up');
            setCredential(emailText);
          }, 3000);
        }
      }

      if (response.status === 202) {
        closeModal();
        history.push('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (updateObj !== 'noUser') {
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

  const handleSubmitEnter = () => {
    if (validationErrors['profileImage']) {
      setGlowing(true);
      setTimeout(() => {
        setGlowing(false);
      }, 3000);
    }
  };

  return (
    <div className="signup-form-page-container" ref={formRef}>
      <div className="signup-header-container flexcenter">
        <div className="signup-header header-text">Join Medium.</div>
      </div>
      <div className="signup-close-button" onClick={closeModal}>
        <i className="fa-solid fa-x"></i>
      </div>

      <form onSubmit={handleSubmit} className="signup-div">
        <label className="credential">
          Email
          <input
            className={emailClass}
            type="text"
            value={credential}
            onChange={(e) => {
              setCredential(e.target.value);
              setEmailText(e.target.value);
            }}
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

        <label className="firstName">
          First name
          <input
            className="firstNameField"
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder={validationErrors['firstName'] || ''}
          />
        </label>

        <label className="lastName">
          Last name
          <input
            className="lastNameField"
            type="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder={validationErrors['lastName'] || ''}
          />
        </label>
        {openBook && fountainPen && userOutline && quill &&(<div className="profile-image-buttons-container">
          <div className="profile-image-buttons-header align-left">
            Select a Profile Image{' '}
            <div className="profile-image-buttons-header-note">
              (you can update this later in your settings)
            </div>
          </div>

          <div className="profile-image-buttons">
            <div
              className={`profile-image-button ${glowing ? 'glowing' : ''} ${
                profileImage.alt === 'openBook' ? 'selected' : ''
              }`}
              onClick={() =>{
                setProfileImage({ url: 'open-book', alt: 'openBook' })
                setGlowing(false)

              }}
            >
              <img
                className="profile-image-button-img"
                src={openBook}
                alt="openBook"
              ></img>
            </div>
            
            <div
              className={`profile-image-button ${glowing ? 'glowing' : ''} ${
                profileImage.alt === 'quill' ? 'selected' : ''
              }`}
              onClick={() =>{ 
                setProfileImage({ url: 'quill', alt: 'quill' })
                setGlowing(false)

            }}
            >
              <img
                className="profile-image-button-img"
                src={quill}
                alt="quill"
              ></img>
            </div>
            <div
              className={`profile-image-button ${glowing ? 'glowing' : ''} ${
                profileImage.alt === 'user-outline' ? 'selected' : ''
              }`}
              onClick={() =>{
                setProfileImage({ url: 'user-outline', alt: 'user-outline' })
                setGlowing(false)

              }}
            >
              <img
                className="profile-image-button-img"
                src={userOutline}
                alt="userOutline"
              ></img>
            </div>
          <div
            className={`profile-image-button ${glowing ? 'glowing' : ''} ${
              profileImage.alt === 'fountain-pen' ? 'selected' : ''
            }`}
            onClick={() =>{
              setProfileImage({ url: 'fountain-pen', alt: 'fountain-pen' })
              setGlowing(false)
            
            }}
            >
            <img
            className="profile-image-button-img"
            src={fountainPen}
            alt="fountainPen"
            ></img>
          </div>
          </div>
        </div>)}
        <div onMouseEnter={handleSubmitEnter}>
          <button
            type="submit"
            className={buttonClass}
            disabled={Object.keys(signupErrors).length > 0 || disabledButton}
          >
            {buttonText}
          </button>
        </div>
      </form>
      <div className="alt-links">
        <div className="signup-no-account-container flexcenter">
          <div className="flexcenter memo-text">
            Already have an account?
            <div onClick={handleSignIn} className="create-one">
              Sign in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// npm install react-html-parser

// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

// const string = 'This is a <b>bold</b> text';

// return <div>{ReactHtmlParser(string)}</div>;




export default SignupModal;
