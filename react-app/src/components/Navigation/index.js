// frontend/src/components/Navigation/index.js
import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './Navigation.css';
import { WindowContext } from '../../context/WindowContext';
import { ModalContext } from '../../context/ModalContext';
import * as sessionActions from '../../store/session';
import mediumLogoSmall from '../../public/medium-logo-circles-white.svg';
import mediumLogoLarge from '../../public/medium-logo-with-cirlces.svg';

import openBook from '../../public/open-book.png';
import quill from '../../public/quill.png';
import userOutline from '../../public/user-outline.png';
import fountainPen from '../../public/fountain-pen.png';

import writeIcon from '../../public/write-icon.svg';
import bellIcon from '../../public/bell-icon.svg';

function Navigation() {
  const { modal, openModal, closeModal, updateObj, setUpdateObj } =
    useContext(ModalContext);

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [buttonStylings, setButtonStylings] = useState('');
  const [search, setSearch] = useState('');

  const state = useSelector((state) => state);
  const user = useSelector((state) => state.session.user);
  const searchResults = useSelector((state) => state.session.search);

  const { scrollPosition, windowSize } = useContext(WindowContext);

  const colorSchemes = {
    '/': ['nav-yellow', 'nav-white', 'button-black', 'button-green'],
    '/write': ['nav-red', 'nav-white', 'button-black', 'button-black'],
    '/about': ['nav-white', 'nav-white', 'button-black', 'button-black'],
    default: ['nav-white', 'nav-white', 'button-black', 'button-black'],
  };

  // const [colorScheme, setColorScheme] = useState(colorSchemes[location.pathname] || colorSchemes.default);
  const colorScheme = useRef(
    colorSchemes[location.pathname] || colorSchemes.default
  );
  const [navColor, setNavColor] = useState(colorScheme[0]);
  const [buttonStyle, setButtonStyle] = useState(colorScheme[2]);
  const [profileImageSrc, setProfileImageSrc] = useState('');

  useEffect(() => {
    const colors = colorScheme.current;
    if (scrollPosition <= 370) {
      setNavColor(colors[0]);
      setButtonStyle(colors[2]);
    }
    if (scrollPosition > 370) {
      setNavColor(colors[1]);
      setButtonStyle(colors[3]);
    }
  }, [scrollPosition]);

  useEffect(() => {
    const newColorScheme =
      colorSchemes[location.pathname] || colorSchemes.default;
    colorScheme.current = newColorScheme;
    setNavColor(newColorScheme[0]);
    setButtonStyle(newColorScheme[2]);

    if (!user) {
      if (location.pathname === '/write' || location.pathname === '/about') {
        setButtonStylings('show');
      } else {
        setButtonStylings('');
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user && user.profileImage) {
      if (user.profileImage === 'quill') {
        setProfileImageSrc(quill);
      } else if (user.profileImage === 'user-outline') {
        setProfileImageSrc(userOutline);
      } else if (user.profileImage === 'open-book') {
        setProfileImageSrc(openBook);
      } else if (user.profileImage === 'fountain-pen') {
        setProfileImageSrc(fountainPen);
      } else {
        setProfileImageSrc(user.profileImage);
      }
    }
  }, [user]);

  const handleLogoClick = () => {
    colorScheme.current = colorSchemes['/'];
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (user) {
      history.push('/home');
    }
    history.push('/');
  };

  const handleStoryClick = () => {
    history.push('/about');
    colorScheme.current = colorSchemes['/about'];
  };

  const handleWriteClick = () => {
    history.push('/write');
    colorScheme.current = colorSchemes['/write'];
  };

  const handleLoginClick = () => {
    openModal('signin');
  };
  const handleSignupClick = () => {
    openModal('signup');
  };
  const handleProfileClick = () => {
    openModal('profileModal');
  };
  
  const demoUser = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      sessionActions.signin({ email: 'demo@aa.io', password: 'password' })
    );
    if (response.status === 200) {
      setUpdateObj(null);
      closeModal();
      history.push('/home');
    }
  };

  const newSearch = async () => {
    console.log('searching');
    const searchResults = await dispatch(sessionActions.search(search))
    if(searchResults){
      console.log(searchResults);
    }

    return
  }


  return (
    <>
      {user && (
        <nav className={`nav-bar logged flexcenter ${colorSchemes['/'][1]}`}>
          <div className={`nav-buttons memo-text ${buttonStylings}`}>
            <div className="flexcenter">
              <div className="logo small" onClick={handleLogoClick}>
                <img src={mediumLogoSmall} alt="medium cirlce logo" />
              </div>

              {windowSize > 60000 && (
                <div className={`nav-search`}>
                  <div
                    className="maginfy-container"
                    onClick={() => dispatch(sessionActions.search(search))}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(sessionActions.search(search));
                      setSearch('');
                    }}
                  >
                    <label>
                      <input
                        className="searchField"
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        required
                        placeholder={'Search Medium'}
                      />
                    </label>
                  </form>
                </div>
              )}
              {windowSize > 1 && (
                 <div className={`nav-search`}>
                 <div
                   className="maginfy-container"
                   onClick={newSearch}
                 >
                   <i className="fa-solid fa-magnifying-glass"></i>
                 </div>
                 <form
                   onSubmit={(e) => {
                     e.preventDefault();
                     newSearch()
                     setSearch('');
                   }}
                 >
                   <label>
                     <input
                       className="searchField"
                       type="search"
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                       required
                       placeholder={'Search Medium'}
                     />
                   </label>
                 </form>
               </div>
              )}
            </div>

            <div className={`nav-user-buttons `}>
              <div className={`nav-bell`} onClick={demoUser}>
        
              </div>
              <div
                className={`nav-write`}
                onClick={handleWriteClick}
              >
                <div className="write-icon-container">
                  <img src={writeIcon} alt="write symbol"></img>
                </div>

                <div className=" memo-text ">Write</div>

              </div>
              <div className="bell-icon-container">
                  <img src={bellIcon} alt="write symbol"></img>
                </div>
              <div className={`nav-user-profile-div`} onClick={handleProfileClick}>
                {user && user.profileImage && (
                  <div className={`profile-div`}  onClick={handleProfileClick}>
                    <img src={profileImageSrc} alt="user profile picture" />
                  </div>
                )}

                {user && !user.profileImage && (
                  <div
                    className={`profile-div`}
                    onClick={handleProfileClick}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      {!user && (
        <nav className={`nav-bar flexcenter ${navColor}`}>
          <div className={`nav-buttons memo-text ${buttonStylings}`}>
            <div className="logo large" onClick={handleLogoClick}>
              <img src={mediumLogoLarge} alt="medium cirlce logo"></img>
            </div>
            <div className={`nav-link-buttons ${buttonStylings}`}>
              <div
                className={`nav-button ${buttonStylings}`}
                onClick={handleStoryClick}
              >
                Our Story
              </div>
              <div
                className={`nav-button ${buttonStylings}`}
                onClick={demoUser}
              >
                Demo User
              </div>
              <div
                className={`nav-button ${buttonStylings}`}
                onClick={handleWriteClick}
              >
                Write
              </div>
              <div
                className={`sign-in-nav-button nav-button2 ${buttonStylings}`}
                onClick={handleLoginClick}
              >
                Sign In
              </div>
              <div
                className={`get-started button ${buttonStyle}`}
                onClick={handleSignupClick}
              >
                Get started
              </div>
            </div>
          </div>
        </nav>
      )}






    </>
  );
}

export default Navigation;
