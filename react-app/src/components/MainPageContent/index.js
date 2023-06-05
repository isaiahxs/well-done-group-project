import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import './MainPageContent.css';
import { WindowContext } from '../../context/WindowContext';

import StoryTileTwo from '../StoryTileTwo';


const MainPageContent = () => {

  const {windowSize} = useContext(WindowContext)


  const isMobileView = windowSize <= 900;
  const [isExtended, setIsExtended] = useState(false);
  const history = useHistory()
  const tags = useSelector(state=> state.story.tags)
  const stories = useSelector(state=> state.story.stories)




  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <div className="main-page-content">
      {isMobileView ? (
        <div className="small-view">
          <div className="main-page-small-view-content-header"></div>

          <div
            className={
              isExtended
                ? 'main-page-small-view-tags-extended'
                : 'main-page-small-view-tags'
            }
          >
            <div className="main-page-small-view-tag-header memo-text">
              Discover more of what matters to you
            </div>

            {tags && tags.map(tag=>{
              return <div className="main-page-tag memo-text">{tag}</div>
            })}
          </div>
          <div
            className="see-more-topics small memo-text"
            onClick={() => setIsExtended(!isExtended)}
          >
            {isExtended ? 'See less topics' : 'See more topics'}
          </div>

          <div className="divider-line"></div>

          <div className="main-page-small-feed">
              {stories && stories.map(story=>{
                  return <StoryTileTwo className="main-page-feed-article" story={story}/>
              })}

          </div>

          <div className="main-page-small-view-footer">
            <div className="footer-logo" onClick={handleLogoClick}>
              SHMEDIUM
            </div>
            <div className="main-page-small-view-footer-item">About</div>
            <div className="main-page-small-view-footer-item">Help</div>
            <div className="main-page-small-view-footer-item">Terms</div>
            <div className="main-page-small-view-footer-item">Privacy</div>
          </div>
        </div>
      ) : (
        <div className="wide-view">
          <div className="main-page-content-header"></div>

            <div className="main-page-wide-feed">
                {stories && stories.map(story=>{
                  return <StoryTileTwo className="main-page-feed-article" story={story}/>
                })}
            </div>


          <div className="main-page-footer-tags-container">
            <div className={`main-page-tag-header  memo-text ${isExtended ? 'extended' : ''}`}>
              Discover more of what matters to you
            </div>

            <div
              className={
                isExtended ? 'main-page-tags-extended' : 'main-page-tags'
              }
            >
              {tags && tags.map(tag=>{
                return <div className="main-page-tag memo-text">{tag}</div>
              })}



            </div>
            <div
              className="see-more-topics"
              onClick={() => setIsExtended(!isExtended)}
            >
              {isExtended ? 'See less topics' : 'See more topics'}
            </div>

            <div className="main-page-footer">
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
      )}
    </div>
  );
};

export default MainPageContent;
