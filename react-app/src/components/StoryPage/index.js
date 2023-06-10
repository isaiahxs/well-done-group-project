import React, { useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import './StoryPage.css';
import { WindowContext } from '../../context/WindowContext';
import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { updateClapCount, removeClap } from '../../store/story';
import CommentPanel from '../CommentPanel';

const StoryPage = () => {

  const { id } = useParams()
  const stories = useSelector(state => state.story.stories);
  const story = stories.find(story => story.id === Number(id));
  const [date, setDate] = useState('')
  const [readTime, setReadTime] = useState(4)
  const [sortedContent, setSortedContent] = useState([])
  // const [readTime, setReadTime] = useState(readTime);
  // const {readTime} = useContext(WindowContext)
  const dispatch = useDispatch();
  //track whether comment panel is open or not
  const [isCommentPanelOpen, setCommentPanelOpen] = useState(false);


  const handleClapClick = async () => {
    const response = await dispatch(updateClapCount(story.id)) //dispatching the action to update the clap count

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

  const history = useHistory();

  useEffect(() => {
    // Fetch the current story based on the ID from the URL or Redux store
    // You can dispatch an action or make an API call to fetch the story data
    // and update the Redux store accordingly
    if (story) {
      setDate(story?.createdAt.slice(0, 16))
      // setReadTime(readTime)
    }
    setReadTime(Math.floor(Math.random() * (20) + 4))
  }, [story])


  const {scrollPosition, windowSize} = useContext(WindowContext)
  const isMobileView = windowSize <= 765;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogoClick = () => {
    history.push('/');
  };


  // console.log(story);

  useEffect(()=>{
    if(story){


      console.log(story);

      let tempArr =  [];
      let lastPosition = 0;  

      story.images.forEach((image, i) => { 
        console.log(       image.position);
 
        let text = story.content.slice(lastPosition, image.position).trim();
        console.log(text);
        let img = image.url;
        tempArr.push({text, image: img});

        lastPosition = image.position;  
      });
 // Check if there's remaining content
 console.log(lastPosition);
      if (lastPosition < story.content.length) { 
        let remainingText = story.content.slice(lastPosition); 
        console.log(remainingText); 
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
                <p className='time'>{readTime} min read · {date}</p>
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
                    {item.image && <img src={item.image} alt={item.text} className="story-image" />}
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
                  <p className='time'>{readTime} min read · {date}</p>
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
