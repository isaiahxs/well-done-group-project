import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import './MainPageContent.css';
import { WindowContext } from '../../context/WindowContext';


const MainPageContent = () => {

  const {windowSize} = useContext(WindowContext)


  const isMobileView = windowSize <= 900;
  const [isExtended, setIsExtended] = useState(false);
  const history = useHistory()


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
            <div className="main-page-small-view-tag-header">
              Discover more of what matters to you
            </div>

            <div className="main-page-tag">Sports</div>
            <div className="main-page-tag">Programming</div>
            <div className="main-page-tag">Data Science</div>
            <div className="main-page-tag">Technology</div>
            <div className="main-page-tag">Self Improvememt</div>
            <div className="main-page-tag">Writing</div>
            <div className="main-page-tag">Relationships</div>
            <div className="main-page-tag">Machine Learning</div>
            <div className="main-page-tag">Productivity</div>
            <div className="main-page-tag">Web Development</div>
            <div className="main-page-tag">JavaScript</div>
            <div className="main-page-tag">Python</div>
            <div className="main-page-tag">Software Development</div>
          </div>
          <div
            className="see-more-topics"
            onClick={() => setIsExtended(!isExtended)}
          >
            {isExtended ? 'See less topics' : 'See more topics'}
          </div>

          <div className="divider-line"></div>

          <div className="main-page-small-feed">
            <div className="main-page-feed-article">Article</div>
            <div className="main-page-feed-article">Article</div>
            <div className="main-page-feed-article">Article</div>
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
            <div className="main-page-feed-article">DDArticle</div>
            <div className="main-page-feed-article">Article</div>
            <div className="main-page-feed-article">Article</div>
            <div className="main-page-feed-article">Article</div>
            <div className="main-page-feed-article">Article</div>
            <div className="main-page-feed-article">Article</div>
            <div className="main-page-feed-article">Article</div>
            <div className="main-page-feed-article">Article</div>
            <div className="main-page-feed-article">Article</div>
            <div className="main-page-feed-article">Article</div>
            <div className="main-page-feed-article">Article</div>
            <div className="main-page-feed-article">Article</div>
          </div>

          <div className="main-page-footer-tags-container">
            <div className="main-page-tag-header">
              Discover more of what matters to you
            </div>

            <div
              className={
                isExtended ? 'main-page-tags-extended' : 'main-page-tags'
              }
            >
              <div className="main-page-tag">Sports</div>
              <div className="main-page-tag">Programming</div>
              <div className="main-page-tag">Data Science</div>
              <div className="main-page-tag">Technology</div>
              <div className="main-page-tag">Self Improvememt</div>
              <div className="main-page-tag">Writing</div>
              <div className="main-page-tag">Relationships</div>
              <div className="main-page-tag">Machine Learning</div>
              <div className="main-page-tag">Productivity</div>
              <div className="main-page-tag">Web Development</div>
              <div className="main-page-tag">JavaScript</div>
              <div className="main-page-tag">Python</div>
              <div className="main-page-tag">Software Development</div>
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
