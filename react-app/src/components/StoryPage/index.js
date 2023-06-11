import React, { useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import './StoryPage.css';
import { WindowContext } from '../../context/WindowContext';
import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { updateClapCount, removeClap } from '../../store/story';
import CommentPanel from '../CommentPanel';
import * as storyActions from '../../store/story';

const StoryPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams()

  const stories = useSelector(state => state.story.stories);
  const story = useSelector(state => state.story.currentStory);
  const [date, setDate] = useState('')
  const [sortedContent, setSortedContent] = useState([])
  const [isCommentPanelOpen, setCommentPanelOpen] = useState(false);


  const handleClapClick = async () => {
    const response = await dispatch(updateClapCount(story)) //dispatching the action to update the clap count

    if (response && response.error) {
      alert("Sorry, you cannot clap your own stories.")
    }
  }

  const handleUnclapClick = async () => {
    const response = await dispatch(removeClap(story.id));

    if (response && response.message) {
      alert("Sorry, you do not have any claps to remove.")
    }
  }


  useEffect(() => {

    if(!story){
      dispatch(storyActions.getStoryById(id))
    }

    if (story) {
      setDate(story?.createdAt.slice(0, 16))

    }
  }, [story])




  useEffect(()=>{
    if(story){


      console.log(story);

      let tempArr =  [];
      let lastPosition = 0;  

      story.images.forEach((image, i) => { 
        console.log(image.position);
 
        let text = story.content.slice(lastPosition, image.position).trim();


        console.log(text);




        let img = image.url;
        let altTag = image.altTag
        tempArr.push({text, image: img, altTag});

        lastPosition = image.position;  
      });
 // Check if there's remaining content
//  console.log(lastPosition);
      if (lastPosition < story.content.length) { 
        let remainingText = story.content.slice(lastPosition); 
        // console.log(remainingText); 
        tempArr.push({text: remainingText});  
      } 

      setSortedContent(tempArr);
    }
  }, [story]);


  const renderTags = () => {
    return story.tags.map(tag => (
      <button key={tag.id} className='main-page-tag memo-text story-tag'>{tag.tag}</button>
    ))
  }

  console.log(sortedContent);
 
  return (
    <>
    <div className="story-page">
      {story && (
        <>
          <h4 className='member-only'>Member-only story</h4>

          <h1 className="story-title">{story.title}</h1>

          <div className='author-section'>
            <img src={story.authorInfo.profileImage} alt='author-image' className='author-image'/>
            <div className='author-information'>
              <div className="story-author">
                {story.authorInfo.firstName} {story.authorInfo.lastName} ·
                <a className='follow'> Follow</a>
                <p className='time'>{story.timeToRead} min read · {date}</p>
              </div>
            </div>
          </div>

          <div className='options-bar'>
            <button className='clap-button' onClick={handleClapClick}>Clap</button>
            <button className='unclap-button' onClick={handleUnclapClick}>Unclap</button>
            <button className='clap-count'>Claps {story.claps}</button>
            <CommentPanel isOpen={isCommentPanelOpen} comments={story.comments} storyId={story.id} onClose={() => setCommentPanelOpen(false)} />

            {/* {isCommentPanelOpen && <div className="overlay" onClick={() => setCommentPanelOpen(false)}></div>} */}
            
            <div className={`overlay ${isCommentPanelOpen ? 'active' : ''}`} onClick={() => setCommentPanelOpen(false)}></div>

          </div>

          {/* this is where the options will appear under a certain width */}
          {/* <div className='alt-options'>
            <button>Listen</button>
            <button>Share</button>
            <button>... More</button>
          </div> */}

          <div className="story-content">
            {sortedContent && sortedContent.map((item, index) => (
                <div key={index}>
                    {item.text && <div className='memo-text'>{parse(item.text)}</div>}
                    {item.image && <img src={item.image} alt={item?.altTag} className="story-image" />}
                    </div>
            ))}
          </div>

          <div className='main-page-tag-container'>
            {renderTags()}
          </div>

          <div className='options-bar'>
            <button className='clap-button'>Clap {story.claps}</button>
            <button className='comment-button'>Comment {story.comments.length}</button>
          </div>

          <div className='footer'>
            <div className='author-section'>
              <img src={story.authorInfo.profileImage} alt='author-image' className='author-image'/>
              <div className='author-information'>
                <div className="story-author">
                  {story.authorInfo.firstName} {story.authorInfo.lastName} ·
                  <a className='follow'> Follow</a>
                  <p className='time'>{story.timeToRead} min read · {date}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!story && <div className="loading-message">Loading...</div>}
    </div>
    </>
  )  
};
export default StoryPage;
