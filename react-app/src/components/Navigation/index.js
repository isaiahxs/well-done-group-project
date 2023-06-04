// frontend/src/components/Navigation/index.js
import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navigation.css';
import { WindowContext } from '../../context/WindowContext';

function Navigation(){
  const history = useHistory()
  const dispatch = useDispatch();
  const location = useLocation();
  const [buttonStylings, setButtonStylings] = useState('')
  
  
  const state = useSelector(state=>state)
  const user = useSelector(state=>state.session.user)

  console.log(state);
  console.log(user);

  

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

      console.log(colors[3]);
      
      if(scrollPosition <= 370){
        setNavColor(colors[0])
        setButtonStyle(colors[2])
      }
      if(scrollPosition > 370){
        setNavColor(colors[1])
        setButtonStyle(colors[3])
      }

  }, [scrollPosition]);




  useEffect(()=>{
    const newColorScheme = colorSchemes[location.pathname] || colorSchemes.default;
    colorScheme.current = newColorScheme;
    setNavColor(newColorScheme[0]);
    setButtonStyle(newColorScheme[2]);


  
    if(!user){
      if(location.pathname === '/write' || location.pathname === '/about'){
        setButtonStylings('show')
      } else {
        setButtonStylings('')
      }
    }


  },[location.pathname]);




  const handleLogoClick = () => {
    history.push('/');
    colorScheme.current = colorSchemes['/'];
    window.scrollTo({top:0, behavior:'smooth'});
  };

  const handleStoryClick = () => {
    history.push('/about');
    colorScheme.current = colorSchemes['/about'];
  };

  const handleWriteClick = () => {
    history.push('/write');
    colorScheme.current = colorSchemes['/write'];
  };

  console.log(buttonStylings);


  return (
    <>
      <nav className={`nav-bar flexcenter ${navColor}`}>


        <div className={`nav-buttons memo-text ${buttonStylings}`}>
          <div className='logo' onClick={handleLogoClick}>SHMEDIUM</div>
          <div className={`nav-link-buttons ${buttonStylings}`}>
            <div className={`nav-button ${buttonStylings}`} onClick={handleStoryClick}>Our Story</div>
            <div className={`nav-button ${buttonStylings}`} onClick={handleLogoClick}>Demo User</div>
            <div className={`nav-button ${buttonStylings}`} onClick={handleWriteClick}>Write</div>
            <div className={`sign-in-nav-button nav-button2 ${buttonStylings}`} onClick={handleLogoClick}>Sign In</div>
            <div className={`get-started button ${buttonStyle}`}>Get started</div>
          </div>
        </div>

      </nav>
    </>
  );
}

export default Navigation;
