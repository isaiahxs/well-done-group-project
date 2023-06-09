import React, { useEffect, useContext, useState } from 'react';
// import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './StoryFeed.css';
import { WindowContext } from '../../context/WindowContext';
// import { ModalContext } from '../../context/ModalContext';
import * as sessionActions from '../../store/session';
import * as storyActions from '../../store/story';
import StoryTileTwo from '../StoryTileTwo';
import AuthorTile from '../AuthorTile';
import StoryTileFourSkeleton from '../StoryTileFourSkeleton';
import magnifyGlass from '../../public/magnify-glass.svg';





const StoryFeed = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.stories);
  const userStories = useSelector((state) => state.session.userStories);
  const loaded = useSelector((state) => state.story.loaded);
  const subscribedStories = useSelector((state) => state.session.subscribedStories);
  const searchResults = useSelector((state) => state.session.search);
  const currentFeed = useSelector((state) => state.session.currentFeed);
  const subFeed = useSelector((state) => state.session.subFeed);
  // const user = useSelector(state=>state.session.user)

  const { searchInputRef } = useContext(WindowContext);

  const [feedContent, setFeedContent] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState(false);


  //handles showing subquery
  useEffect(() => {
      const updateFeedContent = () => {
          if (currentFeed === 'for you') {
              dispatch(sessionActions.setSubFeed(null));
              setFeedContent(stories);
          } else if (currentFeed === 'by you') {
              dispatch(sessionActions.setSubFeed(null));
              setFeedContent(userStories);
          } else if (currentFeed === 'following') {
              dispatch(sessionActions.setSubFeed(null));
              setFeedContent(subscribedStories);
          } else if (searchResults[currentFeed] && subFeed) {
              setFeedContent(searchResults[currentFeed][subFeed]);
          }
      };

      if (currentFeed && searchResults[currentFeed]) {
          setShowSubMenu(true);
      }

      if (currentFeed === 'for you' || currentFeed === 'by you' || currentFeed === 'following') {
          setShowSubMenu(false);
      }


      updateFeedContent();
  }, [currentFeed, subFeed, searchResults, stories, userStories, subscribedStories, dispatch]);



  const handleSelectFeed = (feed) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(sessionActions.setFeed(feed));
    dispatch(sessionActions.setSubFeed('stories'));
  };


  const handleSelectSubFeed = (subFeed) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(sessionActions.setSubFeed(subFeed));
  };


  const handleRemoveSearch = (e, searchQuery) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(sessionActions.setFeed('for you'));
    dispatch(sessionActions.removeSearch(searchQuery));
  };



  return (
    <div className="storyfeed-container">

      <nav className={`feed-nav flexcenter`}>
        <div className="feed-select-container">
          <div
            className={`feed-select small memo-text flexcenter`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              searchInputRef.current.focus();
            }}
          >
            <div className="add-container flexcenter">
              <img src={magnifyGlass} alt="medium cirlce logo" />

            </div>
          </div>
          <div
            className={`feed-select med memo-text flexcenter ${
              currentFeed === 'for you' ? 'selected' : ''
            }`}
            onClick={() => handleSelectFeed('for you')}
          >
            For you
          </div>


          <div
            className={`feed-select med memo-text flexcenter ${
              currentFeed === 'by you' ? 'selected' : ''
            }`}
            onClick={() => {
              handleSelectFeed('by you')
              dispatch(storyActions.getUserStories())

          
          }}
          >
            By you
            
          </div>

          <div
            className={`feed-select large memo-text flexcenter ${
              currentFeed === 'following' ? 'selected' : ''
            }`}
            onClick={() => {
              handleSelectFeed('following')
              dispatch(storyActions.getSubscribedStories())
            }}
          >
            Following
          </div>

          {searchResults &&
            Object.keys(searchResults).map((searchQuery, i) => (
              <div key={i}>
                <div
                  className={`feed-select dyna memo-text flexcenter ${
                    currentFeed === searchQuery ? 'selected' : ''
                  }`}
                  onClick={() => handleSelectFeed(searchQuery)}
                >
                  <div
                    className="search-close-tab"
                    onClick={(e) => handleRemoveSearch(e, searchQuery)}
                  >
                    x
                  </div>
                  {searchQuery}
                </div>
              </div>
            ))}
        </div>
      </nav>
      <div className={`feed-header ${showSubMenu ? 'extended' : 'hidden'}`}>
        <nav className={`search-nav flexcenter`}>
          <div className="feed-select-container">
            <div
              className={`feed-select med memo-text flexcenter ${
                subFeed === 'stories' ? 'selected' : ''
              }`}
              onClick={() => {
                handleSelectSubFeed('stories')
                // setFadeTrigger(prevState => !prevState); 

              }}
            >
              Stories
            </div>
            <div
              className={`feed-select large memo-text flexcenter ${
                subFeed === 'authors' ? 'selected' : ''
              }`}
              onClick={() => handleSelectSubFeed('authors')}
            >
              Authors
            </div>
            <div
              className={`feed-select large memo-text flexcenter ${
                subFeed === 'taggedStories' ? 'selected' : ''
              }`}
              onClick={() => {
                handleSelectSubFeed('taggedStories')
                // setFadeTrigger(prevState => !prevState); 

            }}
            >
              Tags
            </div>
          </div>
        </nav>
      </div>

      {!loaded && (
        <div>
          <StoryTileFourSkeleton />
          <StoryTileFourSkeleton />
          <StoryTileFourSkeleton />
          <StoryTileFourSkeleton />
          <StoryTileFourSkeleton />
          <StoryTileFourSkeleton />
          <StoryTileFourSkeleton />
          <StoryTileFourSkeleton />
        </div>
      )}

      {loaded && subFeed === 'authors' &&
        currentFeed &&
        feedContent &&
        feedContent.map((author) => <AuthorTile key={author.id} author={author} />
      )}

      {loaded && subFeed !== 'authors' &&
        currentFeed &&
        feedContent &&
        feedContent.map((story, i) => <StoryTileTwo key={i} story={story} />



      )}



    </div>
  );
};
export default StoryFeed;
