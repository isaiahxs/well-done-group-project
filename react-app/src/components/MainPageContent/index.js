import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './MainPageContent.css';
import { WindowContext } from '../../context/WindowContext';

import StoryTileTwo from '../StoryTileTwo';
import StoryTileTwoSkeleton from '../StoryTileTwoSkeleton';
import mediumLogoLarge from '../../public/medium-logo-with-cirlces.svg';
import * as sessionActions from '../../store/session';
import mediumLogoCircles from '../../public/medium-logo-circles.jpeg';

const MainPageContent = () => {
  const { windowSize } = useContext(WindowContext);

  const isMobileView = windowSize <= 900;
  const [isExtended, setIsExtended] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.story.tags);
  const stories = useSelector((state) => state.story.stories);
  const loaded = useSelector((state) => state.story.loaded);
  const user = useSelector((state) => state.session.user);


  const handleLogoClick = () => {
    if (user) {
      history.push('/home');
    }
    history.push('/');
  };


  const navToFeed = (tag) => {
    dispatch(sessionActions.search(tag))
    dispatch(sessionActions.setFeed(tag))
    dispatch(sessionActions.setSubFeed('taggedStories'))
    history.push('/home');
    return
  }


  const navToOurStory = (tag) => {
    history.push('/about');
    return
  }

  const navToFeedStory = (tag) => {
    dispatch(sessionActions.setFeed('for you'))
    dispatch(sessionActions.setSubFeed(null))
    history.push('/home');
    return
  }




  return (
    <>
      {!loaded && (
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

                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="skeleton-tag shimmer"></div>
                ))}
              </div>

              <div className="divider-line"></div>

              <div className="main-page-small-feed">
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
              </div>

              <div className="main-page-small-view-footer">
                <div className="footer-logo" onClick={handleLogoClick}>
                  <img src={mediumLogoLarge} alt="medium cirlce logo"></img>

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
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
                <StoryTileTwoSkeleton />
              </div>

              <div className="main-page-footer-tags-container">
                <div
                  className={`main-page-tag-header  memo-text ${isExtended ? 'extended' : ''
                    }`}
                >
                  Discover more of what matters to you
                </div>
                <div className='main-page-tags-wrapper'>

                  <div
                    className={
                      isExtended ? 'main-page-tags-extended' : 'main-page-tags'
                    }
                  >
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="skeleton-tag shimmer"></div>
                    ))}
                  </div>

                </div>

                <div
                  className="see-more-topics"
                  onClick={() => setIsExtended(!isExtended)}
                >
                  {isExtended ? 'See less topics' : 'See more topics'}
                </div>

                <div className="main-page-footer">
                  <div className="main-page-footer-item" onClick={navToOurStory}>Help</div>
                  <div className="main-page-footer-item" onClick={navToOurStory}>Status</div>
                  <div className="main-page-footer-item" onClick={navToFeedStory}>Writers</div>
                  <div className="main-page-footer-item" onClick={navToFeedStory}>Blog</div>
                  <div className="main-page-footer-item" onClick={navToOurStory}>Careers</div>
                  <div className="main-page-footer-item" onClick={navToOurStory}>Privacy</div>
                  <div className="main-page-footer-item" onClick={navToOurStory}>Terms</div>
                  <div className="main-page-footer-item" onClick={navToOurStory}>About</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {loaded && (
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

                {tags &&
                  tags.map((tag, i) => {
                    return <div
                      key={i}
                      className="main-page-tag memo-text"
                      onClick={() => {
                        navToFeed(tag)
                      }}>{tag} </div>;
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
                {stories &&
                  stories.map((story, i) => {
                    return (
                      <StoryTileTwo
                        key={i}
                        className="main-page-feed-article"
                        story={story}
                      />
                    );
                  })}
              </div>

              <div className="main-page-small-view-footer">
                <div className="footer-logo" onClick={handleLogoClick}>
                  <img src={mediumLogoCircles} alt="medium cirlce logo"></img>

                </div>
                <div className="main-page-small-view-footer-item" onClick={navToOurStory}>About</div>
                <div className="main-page-small-view-footer-item" onClick={navToOurStory}>Help</div>
                <div className="main-page-small-view-footer-item" onClick={navToOurStory}>Terms</div>
                <div className="main-page-small-view-footer-item" onClick={navToOurStory}>Privacy</div>
              </div>
            </div>
          ) : (
            <div className="wide-view">
              <div className="main-page-content-header"></div>

              <div className="main-page-wide-feed">
                {stories &&
                  stories.map((story, i) => {
                    return (
                      <StoryTileTwo
                        key={i}
                        className="main-page-feed-article"
                        story={story}
                      />
                    );
                  })}
              </div>


              <div className="main-page-footer-tags-container">
                <div
                  className={`main-page-tag-header  memo-text ${isExtended ? 'extended' : ''
                    }`}
                >
                  Discover more of what matters to you
                </div>


                <div className='main-page-tags-wrapper loaded'>

                  <div
                    className={
                      isExtended ? 'main-page-tags-extended loaded' : 'main-page-tags loaded'
                    }
                  >
                    {tags &&
                      tags.map((tag, i) => {
                        return (
                          <div key={i} className="main-page-tag memo-text" onClick={() => navToFeed(tag)}>{tag}</div>
                        );
                      })}
                  </div>
                </div>




                <div
                  className="see-more-topics"
                  onClick={() => setIsExtended(!isExtended)}
                >
                  {isExtended ? 'See less topics' : 'See more topics'}
                </div>

                <div className="main-page-footer">
                  <div className="main-page-footer-item" onClick={navToOurStory}>Help</div>
                  <div className="main-page-footer-item" onClick={navToOurStory}>Status</div>
                  <div className="main-page-footer-item" onClick={navToOurStory}>Writers</div>
                  <div className="main-page-footer-item" onClick={navToFeedStory}>Blog</div>
                  <div className="main-page-footer-item" onClick={navToOurStory}>Careers</div>
                  <div className="main-page-footer-item" onClick={navToOurStory}>Privacy</div>
                  <div className="main-page-footer-item" onClick={navToOurStory}>Terms</div>
                  <div className="main-page-footer-item" onClick={navToOurStory}>About</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MainPageContent;
