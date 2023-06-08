import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './SidePanel.css';
import { WindowContext } from '../../context/WindowContext';
import { ModalContext } from '../../context/ModalContext';
import * as sessionActions from '../../store/session';

import StoryTileThree from '../StoryTileThree';



const SidePanel = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const [showTags, setShowtags] = useState(false);
  const tags = useSelector((state) => state.story.tags);
  const stories = useSelector(state=>state.story.stories)

  const searchTag = (tag) => {
    console.log(tag);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    dispatch(sessionActions.search(tag))
  }



  return (
       <div className="sidepanel-container">
          <div className='sidepanel-banner-cover'></div>

        <div className="sidepanel-staff-picks-container flexcenter align-left">

          <div className="sidepanel-staff-picks-header flexcenter align-left memo-text">
            <div >Staff Picks of the Month:</div>
          </div>
          
          <div className="sidepanel-staff-picks-content flex">
            <StoryTileThree story={stories[7]}/>
            <StoryTileThree story={stories[8]}/>
            <StoryTileThree story={stories[9]}/>
            <StoryTileThree story={stories[12]}/>
            <StoryTileThree story={stories[11]}/>
          </div>
          

        </div>



        <div className="sidepanel-tags-container">          
        <div className='flexcenter'>
          <div className={`sidepanel-tag-header  memo-text ${showTags ? 'extended' : ''}`}>
            Discover more of what matters to you
          </div>

        </div>

        <div className={showTags ? 'sidepanel-tags-extended' : 'sidepanel-tags'}>
          {tags && tags.map((tag, i) => {
            return <div key={i} className="main-page-tag memo-text" onClick={()=>searchTag(tag)}>{tag}</div>;
          })}
        </div>

        <div className="see-more-topics" onClick={() => setShowtags(!showTags)}>
          {showTags ? 'See less topics' : 'See more topics'}
        </div>


        <div className="sidepanel-footer">
          <div className="main-page-footer-item">Help</div>
          <div className="main-page-footer-item">Status</div>
          <div className="main-page-footer-item">Writers</div>
          <div className="main-page-footer-item">Blog</div>
          <div className="main-page-footer-item">Careers</div>
          <div className="main-page-footer-item">Privacy</div>
          <div className="main-page-footer-item">Terms</div>
          <div className="main-page-footer-item">About</div>
        </div>

      </div>

      </div> 
  );
};
export default SidePanel;

