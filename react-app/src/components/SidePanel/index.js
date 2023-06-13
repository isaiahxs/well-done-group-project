import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './SidePanel.css';
// import { WindowContext } from '../../context/WindowContext';
// import { ModalContext } from '../../context/ModalContext';
import * as sessionActions from '../../store/session';

import StoryTileThree from '../StoryTileThree';
import StoryTileTwoSkeleton from '../StoryTileTwoSkeleton';


const SidePanel = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const [showTags, setShowtags] = useState(false);
  const tags = useSelector((state) => state.story.tags);
  const stories = useSelector(state=>state.story.stories)
  const loaded = useSelector(state=>state.story.loaded)

  const searchTag = (tag) => {
    // console.log(tag);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    dispatch(sessionActions.search(tag))
    dispatch(sessionActions.setFeed(tag))
    dispatch(sessionActions.setSubFeed('taggedStories'))
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
      {!loaded || !stories && (
      <div className="sidepanel-container">
      <div className='sidepanel-banner-cover'></div>

    <div className="sidepanel-staff-picks-container flexcenter align-left">

      <div className="sidepanel-staff-picks-header flexcenter align-left memo-text">
        <div >Staff Picks of the Month:</div>
      </div>


        <div className="sidepanel-staff-picks-content flex">
          <StoryTileTwoSkeleton />
          <StoryTileTwoSkeleton />
          <StoryTileTwoSkeleton />
          <StoryTileTwoSkeleton />
          <StoryTileTwoSkeleton />
          <StoryTileTwoSkeleton />
          <StoryTileTwoSkeleton />

        </div>
  
      

    </div>



    <div className="sidepanel-tags-container">          
    <div className='flexcenter'>
      <div className={`sidepanel-tag-header  memo-text ${showTags ? 'extended' : ''}`}>
        Discover more of what matters to you
      </div>

    </div>

    <div className={showTags ? 'sidepanel-tags-extended' : 'sidepanel-tags'}>
            {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="skeleton-tag"></div>
                  ))}
    </div>

    <div className="see-more-topics" onClick={() => setShowtags(!showTags)}>
      {showTags ? 'See less topics' : 'See more topics'}
    </div>


    <div className="sidepanel-footer">
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
    {loaded && (
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
          <StoryTileThree story={stories[13]}/>
          <StoryTileThree story={stories[14]}/>
          <StoryTileThree story={stories[15]}/>
          <StoryTileThree story={stories[16]}/>
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
    
    </>
       
  );
};
export default SidePanel;

