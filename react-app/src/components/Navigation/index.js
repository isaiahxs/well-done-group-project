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
import blackBellIcon from '../../public/black-bell.svg';
import magnifyGlass from '../../public/magnify-glass.svg';
import magnifyGlassBlack from '../../public/magnify-glass-black.svg';

const colorSchemes = {
  '/': ['nav-yellow', 'nav-white', 'button-black', 'button-green'],
  '/home': ['nav-white', 'nav-white', 'button-black', 'button-green'],
  '/write': ['nav-red', 'nav-white', 'button-black', 'button-black'],
  '/about': ['nav-white', 'nav-white', 'button-black', 'button-black'],
  default: ['nav-white', 'nav-white', 'button-black', 'button-black'],
};

const profileImages = {
  quill: quill,
  'user-outline': userOutline,
  'open-book': openBook,
  'fountain-pen': fountainPen,
};

function Navigation() {
  const { modal, openModal, closeModal, updateObj, setUpdateObj } =
    useContext(ModalContext);

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [buttonStylings, setButtonStylings] = useState('');
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const state = useSelector((state) => state);
  const user = useSelector((state) => state.session.user);
  const searchResults = useSelector((state) => state.session.search);

  const { scrollPosition, windowSize, searchInputRef } =
    useContext(WindowContext);

  const colorScheme = useRef(
    colorSchemes[location.pathname] || colorSchemes.default
  );
  const [navColor, setNavColor] = useState(colorScheme[0]);
  const [buttonStyle, setButtonStyle] = useState(colorScheme[2]);
  const [profileImageSrc, setProfileImageSrc] = useState('');
  const [isTagUrl, setIsTagUrl] = useState(false);
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [showWriteButton, setShowWriteButton] = useState(true);

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
    setIsLoaded(false);
    setIsLandingPage(false);

    if (location.pathname === '/') {
      setIsLandingPage(true);
    }

    // Initialize with the default color scheme
    let newColorScheme =
      colorSchemes[location.pathname] || colorSchemes.default;

    if (colorSchemes[location.pathname]) {
      newColorScheme = colorSchemes[location.pathname];
    }

    console.log(newColorScheme);

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

    if (location.pathname.slice(0, 7) === '/create') {
      setShowWriteButton(false);
    } else {
      setShowWriteButton(true);
    }

    setIsLoaded(true);
  }, [location.pathname, user]);

  const getProfileImageSrc = (profileImage) => {
    return profileImages[profileImage] || profileImage;
  };

  useEffect(() => {
    if (user) {
      setProfileImageSrc(getProfileImageSrc(user.profileImage));
    }
  }, [user]);

  const handleLogoClick = () => {
    colorScheme.current = colorSchemes['/'];
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(sessionActions.setFeed('for you'));
    dispatch(sessionActions.setSubFeed('stories'));
    if (user) {
      history.push('/home');
      return;
    }
    history.push('/');
    return;
  };

  const handleStoryClick = () => {
    history.push('/about');
    colorScheme.current = colorSchemes['/about'];
  };

  const handleWriteClick = () => {
    if (!user) {
      history.push('/write');
    }
    if (user) {
      history.push('/create');
    }
  };

  const handleSigninClick = () => {
    openModal('signin');
  };

  const handleSignupClick = () => {
    openModal('signup');
  };
  const handleProfileClick = () => {
    if(!user){
      openModal('signup');
    }
    if(user){
      openModal('profileModal');
    }
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
    dispatch(sessionActions.search(search));
    dispatch(sessionActions.setFeed(search));
    dispatch(sessionActions.setSubFeed('stories'));
    if (location.pathname !== '/home') {
      history.push(`/home`);
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {/* // For user logged in */}
      {user && (
        <nav
          className={`nav-bar ${
            location.pathname === '/home' ? 'logged' : ''
          } flexcenter ${navColor}`}
        >
          <div className={`nav-buttons memo-text ${buttonStylings}`}>
            <div className="flexcenter">
              <div className="logo small" onClick={handleLogoClick}>
                <img src={mediumLogoSmall} alt="medium cirlce logo" />
              </div>
              
              <div className={`nav-search ${isLandingPage ? 'black' : ''}`}>
                <div className="maginfy-container" onClick={newSearch}>
                  <img src={magnifyGlass} alt="medium cirlce logo" />

                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    newSearch();
                    setSearch('');
                  }}
                >
                  <label>
                    <input
                      ref={searchInputRef}
                      className={`search-field ${isLandingPage ? 'black' : ''}`}
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      required
                      placeholder={'Search Medium'}
                    />
                  </label>
                </form>
              </div>
            </div>

            {location.pathname === '/write' ? (
               <div className={`nav-user-buttons `}>
               <div className={`nav-bell`} onClick={demoUser}></div>
               <div
                 className={`nav-write ${!showWriteButton ? 'hidden' : ''} ${
                   location.pathname === '/write' ? 'black' : ''
                 }`}
                 onClick={handleWriteClick}
               >
                 <div className={`write-icon-container`}>
                 
                 </div>

                 <div className=" memo-text "></div>
               </div>
               <div className="bell-icon-container">
 
               </div>

               <div
                 className={`nav-user-profile-div`}
                 onClick={handleProfileClick}
               >
                 {user && user.profileImage && (
                   <div className={`profile-div`} onClick={handleProfileClick}>
                     <img src={profileImageSrc} alt="user profile picture" />
                   </div>
                 )}

                 {user && !user.profileImage && (
                   <div className={`profile-div`} onClick={handleProfileClick}>
                     <img src={quill} alt="user profile picture" />
                   </div>
                 )}

                 {!user && (
                   <div className={`profile-div`} onClick={userOutline}>
                     <img src={profileImageSrc} alt="user profile picture" />
                   </div>
                 )}
               </div>
             </div>
            ) : (
              <div className={`nav-user-buttons `}>
                <div className={`nav-bell`} onClick={demoUser}></div>
                <div
                  className={`nav-write ${!showWriteButton ? 'hidden' : ''} ${
                    location.pathname === '/write' ? 'black' : ''
                  }`}
                  onClick={handleWriteClick}
                >
                  <div className={`write-icon-container`}>
                    <img
                      className={`write-icon`}
                      src={writeIcon}
                      alt="write symbol"
                    ></img>
                  </div>

                  <div className=" memo-text ">Write</div>
                </div>
                <div className="bell-icon-container">
                  {showWriteButton && (
                    <img src={bellIcon} alt="write symbol"></img>
                  )}
                </div>

                <div
                  className={`nav-user-profile-div`}
                  onClick={handleProfileClick}
                >
                  {user && user.profileImage && (
                    <div className={`profile-div`} onClick={handleProfileClick}>
                      <img src={profileImageSrc} alt="user profile picture" />
                    </div>
                  )}

                  {user && !user.profileImage && (
                    <div className={`profile-div`} onClick={handleProfileClick}>
                      <img src={quill} alt="user profile picture" />
                    </div>
                  )}

                  {!user && (
                    <div className={`profile-div`} onClick={userOutline}>
                      <img src={profileImageSrc} alt="user profile picture" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      )}

      {/* // For no user and on any page other than landing */}

      {!user && !isLandingPage && (
        <nav className={`nav-bar logged flexcenter ${navColor}`}>
          <div className={`nav-buttons memo-text ${buttonStylings}`}>
            <div className="flexcenter">
              <div className="logo small" onClick={handleLogoClick}>
                <img src={mediumLogoSmall} alt="medium cirlce logo" />
              </div>

              {windowSize > 700 && (
                <div className={`nav-search ${location.pathname === '/write' ? 'black' : ''}`}>





                  {location.pathname === '/write' && (
                  <div className="maginfy-container scaled-down" onClick={newSearch}>
                  
                  <img src={magnifyGlassBlack} alt="medium cirlce logo" />
                  </div>
                  
                  
                  )}
                  {location.pathname !== '/write' && (
                                    <div className="maginfy-container" onClick={newSearch}>
                                      <img className='' src={magnifyGlass} alt="medium cirlce logo" />
                                    </div>
                  
                  
                  )}



                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      newSearch();
                      setSearch('');
                    }}
                  >
                    <label>
                      <input
                        ref={searchInputRef}
                        className={`search-field ${location.pathname === '/write' ? 'black' : ''}`}
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
            {location.pathname === '/write' ? (
               <div className={`nav-user-buttons `}>
               <div className={`nav-bell`} onClick={demoUser}></div>
               <div
                 className={`nav-write ${!showWriteButton ? 'hidden' : ''} ${
                   location.pathname === '/write' ? 'black' : ''
                 }`}
                 onClick={handleWriteClick}
               >
                 <div className={`write-icon-container`}>
      
                 </div>

                 <div className=" memo-text "></div>
               </div>
               <div className="bell-icon-container">
           
               </div>

               <div
                 className={`nav-user-profile-div`}
                 onClick={handleProfileClick}
               >
                
                   <div className={`profile-div`} onClick={handleProfileClick}>
                     <img src={userOutline} alt="user profile picture" />
                   </div>
                

               </div>
             </div>
            ) : (
              <div className={`nav-user-buttons `}>
                <div className={`nav-bell`} onClick={demoUser}></div>
                <div
                  className={`nav-write ${!showWriteButton ? 'hidden' : ''} ${
                    location.pathname === '/write' ? 'black' : ''
                  }`}
                  onClick={handleWriteClick}
                >
                  <div className={`write-icon-container`}>
                    <img
                      className={`write-icon`}
                      src={writeIcon}
                      alt="write symbol"
                    ></img>
                  </div>

                  <div className=" memo-text ">Write</div>
                </div>
                <div className="bell-icon-container">
                  {showWriteButton && (
                    <img src={bellIcon} alt="write symbol"></img>
                  )}
                </div>

                <div
                  className={`nav-user-profile-div`}
                  onClick={handleProfileClick}
                >
                    <div className={`profile-div`} onClick={handleProfileClick}>
                      <img src={userOutline} alt="user profile picture" />
                    </div>

                
                </div>
              </div>
            )}
            {/* <div className={`nav-user-buttons flex`}>
              <div
                className={`nav-write`}
                onClick={() => {
                  if (!user) {
                    handleSignupClick();
                  } else {
                    handleWriteClick();
                  }
                }}
              >
                <div className="write-icon-container">
                  <img src={writeIcon} alt="write symbol"></img>
                </div>
                <div className=" memo-text ">Write</div>
              </div>

              <div className="signup-button-container flexcenter">
                <div
                  className="signup-button flexcenter"
                  onClick={handleSignupClick}
                >
                  Sign up
                </div>
              </div>

              <div className="signin-button-container flexcenter">
                <div
                  className="signin-button flexcenter"
                  onClick={handleSigninClick}
                >
                  Sign In
                </div>
              </div>

              <div
                className={`nav-user-profile-div`}
                onClick={handleSigninClick}
              >
                {!user && userOutline && (
                  <div className={`profile-div`} onClick={handleProfileClick}>
                    <img src={userOutline} alt="user profile picture" />
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </nav>
      )}

      {/* // For no user and at landing page */}
      {!user && isLandingPage && (
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
                onClick={handleSigninClick}
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
