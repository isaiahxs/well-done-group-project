import React, { useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import './StoryPage.css';
import { WindowContext } from '../../context/WindowContext';
import parse from 'html-react-parser';

const StoryPage = () => {

  const { id } = useParams()
  const stories = useSelector(state => state.story.stories);
  const story = stories.find(story => story.id === Number(id));
  const [date, setDate] = useState('')
  const [readTime, setReadTime] = useState(4)
  const [sortedContent, setSortedContent] = useState([])
  // const [readTime, setReadTime] = useState(readTime);
  // const {readTime} = useContext(WindowContext)

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


  console.log(story);

  useEffect(()=>{
    if(story){

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
            <button className='clap-button'>Clap {story.claps}</button>
            <button className='comment-button'>Comment {story.comments.length}</button>
          </div>

          {/* this is where the options will appear under a certain width */}
          {/* <div className='alt-options'>
            <button>Listen</button>
            <button>Share</button>
            <button>... More</button>
          </div> */}

          {/* <div className="story-content" dangerouslySetInnerHTML={{ __html: insertImagesInContent(story.content) }}>
            {renderStoryContent(story.content)}
          </div> */}

          <div className="story-content">
            {sortedContent && sortedContent.map((item, index) => (
                <div key={index}>
                    {item.text && <div className='memo-text'>{parse(item.text)}</div>}
                    {item.image && <img src={item.image} alt="description" className="story-image" />}
                    </div>
            ))}
          </div>

          {/* <div>
            {parse(story.content)}
          </div> */}

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
