import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './FeedPage.css' 
import StoryFeed from '../StoryFeed';
import SidePanel from '../SidePanel';

import { WindowContext } from '../../context/WindowContext';




const FeedPage = () => {
  const history = useHistory()
  const { scrollPosition, windowSize } = useContext(WindowContext);
  const user = useSelector(state=>state.session.user)

  useEffect(()=>{
    if(!user){
      history.push('/')
    }
  },[user])

  return (
    <div>

      <StoryFeed/>

      {windowSize > 750 &&(
        <SidePanel/>
      )}
    </div>

  )
}
export default FeedPage