import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './StoryFeed.css';
import { WindowContext } from '../../context/WindowContext';
import { ModalContext } from '../../context/ModalContext';
import * as sessionActions from '../../store/session';
import StoryTileTwo from '../StoryTileTwo';
import AuthorTile from '../AuthorTile';
import StoryTileTwoSkeleton from '../StoryTileTwoSkeleton';



const StoryFeed = () => {
  const dispatch = useDispatch()
  const stories = useSelector(state=>state.story.stories)
  const subscribedStories = useSelector(state=>state.session.subscribedStories)
  const searchResults = useSelector(state=>state.session.search)
  const currentFeed = useSelector(state=>state.session.currentFeed)

  const { scrollPosition, windowSize, searchInputRef } = useContext(WindowContext);


  const [selected, setSelected] = useState('stories')
  const [feedContent, setFeedContent] = useState(null)
  const [showHeader, setShowHeader] = useState(false)

  useEffect(()=>{
    console.log(currentFeed);

    if(stories && !currentFeed){
      dispatch(sessionActions.setFeed('stories'))
    }
    if(currentFeed === 'for you' || currentFeed === 'stories'){
      setShowHeader(false)
      setFeedContent(stories)
      setSelected('stories')

    }
    if(currentFeed === 'following'){
      setShowHeader(false)
      setFeedContent(subscribedStories)
      setSelected('stories')

    }

    if(currentFeed && searchResults[currentFeed]){
      setShowHeader(true)
      setFeedContent(searchResults[currentFeed].stories)
    }

  },[currentFeed])




const handleSelectFeed = (feed) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });


  if(feed==='stories'){
      setSelected('stories')
      setFeedContent(searchResults[currentFeed].stories)
      return 
  }
  if(feed==='authors'){
      setSelected('authors')
      setFeedContent(searchResults[currentFeed].authors)
      return 
  }
  if(feed==='taggedStories'){
    setSelected('taggedStories')
    setFeedContent(searchResults[currentFeed].taggedStories)
    return 
}



  dispatch(sessionActions.setFeed(feed))



}

const handleRemoveSearch = (e, searchQuery) => {
  e.preventDefault();
  e.stopPropagation();
  dispatch(sessionActions.setFeed('for you'));
  dispatch(sessionActions.removeSearch(searchQuery));
};


  return (
    <div className='storyfeed-container'>

        <nav className={`feed-nav flexcenter`}>
          <div className='feed-select-container'>
            
            <div className={`feed-select small memo-text flexcenter ${currentFeed === '+' ? 'selected' : ''}`} onClick={()=>{
                 window.scrollTo({ top: 0, behavior: 'smooth' })
                 searchInputRef.current.focus();

                 }}>
              <div className='add-container flexcenter'>
              <i className="fa-solid fa-magnifying-glass"></i>

              </div>
             
            </div>
            <div className={`feed-select med memo-text flexcenter ${currentFeed === 'for you' ? 'selected' : ''}`} onClick={()=>handleSelectFeed('for you')}>For you</div>
            <div className={`feed-select large memo-text flexcenter ${currentFeed === 'following' ? 'selected' : ''}`} onClick={()=>handleSelectFeed('following')}>Following</div>

            {searchResults && Object.keys(searchResults).map((searchQuery,i) => (
              <div key={i}>
                <div className={`feed-select dyna memo-text flexcenter ${currentFeed === searchQuery ? 'selected' : ''}`} 
                    onClick={()=>handleSelectFeed(searchQuery)}>
                    <div className='search-close-tab' onClick={(e) => handleRemoveSearch(e, searchQuery)}>x</div>
                    {searchQuery}
                </div>
              </div>
            ))}
          </div>
   
        </nav>


    {/* {showHeader && ( */}
      <div className={`feed-header ${showHeader ? 'extended' : ''}`}>
        <nav className={`search-nav flexcenter`}>
          <div className='feed-select-container'>
            
            <div className={`feed-select med memo-text flexcenter ${selected === 'stories' ? 'selected' : ''}`} onClick={()=>handleSelectFeed('stories')}>Stories</div>
            <div className={`feed-select large memo-text flexcenter ${selected === 'authors' ? 'selected' : ''}`} onClick={()=>handleSelectFeed('authors')}>Authors</div>
            <div className={`feed-select large memo-text flexcenter ${selected === 'taggedStories' ? 'selected' : ''}`} onClick={()=>handleSelectFeed('taggedStories')}>Tags</div>

          </div>
   
        </nav>
      </div>
    {/* )} */}



    {!currentFeed && !feedContent && (
      <div>
        <StoryTileTwoSkeleton />
        <StoryTileTwoSkeleton />
        <StoryTileTwoSkeleton />
        <StoryTileTwoSkeleton />
        <StoryTileTwoSkeleton />
        <StoryTileTwoSkeleton />
        <StoryTileTwoSkeleton />
        <StoryTileTwoSkeleton />
      </div>
    )}






      {selected === 'taggedStories' && currentFeed && feedContent && feedContent.map((story, i) => (
        <StoryTileTwo key={i} story={story}/>
      ))}


      {selected === 'stories' && currentFeed && feedContent && feedContent.map((story, i) => (
        <StoryTileTwo key={i} story={story}/>
      ))}


      {selected === 'authors' && currentFeed && feedContent && feedContent.map((author, i) => (
        <AuthorTile key={i} author={author}/>
      ))}




    </div>
  )
}
export default StoryFeed