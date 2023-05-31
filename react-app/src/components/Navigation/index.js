// frontend/src/components/Navigation/index.js
import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Router, Switch, NavLink } from 'react-router-dom';
import './Navigation.css';
import { WindowContext } from '../../context/WindowContext';

function Navigation(){
  const history = useHistory()
  const dispatch = useDispatch();
  const location = useLocation();

  const {scrollPosition, windowSize} = useContext(WindowContext)
  console.log(scrollPosition);
  console.log(windowSize);


  const colorSchemes = {
    '/': ['nav-yellow', 'nav-white', 'button-black', 'button-green'],
    '/write': ['nav-red', 'nav-white', 'button-black', 'button-black'],
    '/about': ['nav-white', 'nav-white', 'button-black', 'button-black'],
    'default': ['nav-white', 'nav-white', 'button-black', 'button-black']
  }

  // const [colorScheme, setColorScheme] = useState(colorSchemes[location.pathname] || colorSchemes.default);
  const colorScheme = useRef(colorSchemes[location.pathname] || colorSchemes.default);
  const [navColor, setNavColor] = useState(colorScheme[0]);
  const [buttonStyle, setButtonStyle] = useState(colorScheme[2]);

  
  useEffect(() => {
    console.log(scrollPosition);

    console.log('scrollin');

      const colors = colorScheme.current; 
      
      if(scrollPosition <= 400){
        setNavColor(colors[0])
        setButtonStyle(colors[2])
      }
      if(scrollPosition > 400){
        setNavColor(colors[1])
        setButtonStyle(colors[3])
      }

  }, [scrollPosition]);




  useEffect(()=>{
    const newColorScheme = colorSchemes[location.pathname] || colorSchemes.default;
    colorScheme.current = newColorScheme;
    setNavColor(newColorScheme[0]);
    setButtonStyle(newColorScheme[2]);
  },[location.pathname]);




  const handleLogoClick = () => {
    history.push('/');
    colorScheme.current = colorSchemes['/'];
  };

  const handleStoryClick = () => {
    history.push('/about');
    colorScheme.current = colorSchemes['/about'];
  };

  const handleWriteClick = () => {
    history.push('/write');
    colorScheme.current = colorSchemes['/write'];
  };


  return (
    <>
      <nav className={`nav-bar flexcenter ${navColor}`}>

        <div className='logo' onClick={handleLogoClick}>SHMEDIUM</div>

        <div className='nav-buttons memo-text'>
          <div className='nav-button' onClick={handleStoryClick}>Our Story</div>
          <div className='nav-button' onClick={handleLogoClick}>Demo User</div>
          <div className='nav-button' onClick={handleWriteClick}>Write</div>
          <div className='sign-in-nav-button nav-button2' onClick={handleLogoClick}>Sign In</div>
          <div className={`get-started button ${buttonStyle}`}>Get started</div>
        </div>

      </nav>
    </>
  );
}

export default Navigation;
