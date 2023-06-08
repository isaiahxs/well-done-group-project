import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './FeedPage.css' 
import StoryFeed from '../StoryFeed';
import SidePanel from '../SidePanel';

import { WindowContext } from '../../context/WindowContext';



const FeedPage = () => {
  const history = useHistory()
  const location = useLocation();

  const { scrollPosition, windowSize } = useContext(WindowContext);
  const user = useSelector(state=>state.session.user)


  useEffect(() => {
     if(!user){ 
      history.push('/')
    }

    window.scrollTo(0, 0);

  }, [user]);



    useEffect(()=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },[])
 
  return (
    <>

      {windowSize < 900 &&(
        <div>
          <StoryFeed className='storyfeed-wrapper wide'/>
        </div>
      )}

      {windowSize > 899 &&(
        <div className='feedpage-container flex'>
          <div className='storyfeed-wrapper'> <StoryFeed/> </div>
          <div className='sidepanel-wrapper'> <SidePanel/> </div>
        </div>
      )}

    </>
  )
}
export default FeedPage