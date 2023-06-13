import React, { useEffect, useContext } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './FeedPage.css' 
import StoryFeed from '../StoryFeed';
import SidePanel from '../SidePanel';

import { WindowContext } from '../../context/WindowContext';
import { authenticate } from '../../store/session';
import * as storyActions from '../../store/story';



const FeedPage = () => {
  // const history = useHistory()
  // const location = useLocation();
  const dispatch = useDispatch();

  const { windowSize } = useContext(WindowContext);
  // const user = useSelector(state=>state.session.user)


  useEffect(() => {
    dispatch(authenticate())
      .then(() => {
        dispatch(storyActions.initialLoad());
      })
  }, [dispatch]);



    useEffect(()=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },[])
 
  return (
    <>

      {windowSize < 960 &&(
        <div className='feedpage-container flex'>
          <StoryFeed className={`storyfeed-wrapper wide`}/>
        </div>
      )}

      {windowSize > 959 &&(
        <div className='feedpage-container flex'>
          <div className='storyfeed-wrapper'> <StoryFeed/> </div>
          <div className='sidepanel-wrapper'> <SidePanel/> </div>
        </div>
      )}

    </>
  )
}
export default FeedPage




