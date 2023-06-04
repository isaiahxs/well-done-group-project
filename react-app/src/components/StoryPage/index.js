import React, { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import './StoryPage.css';
import { WindowContext } from '../../context/WindowContext';

const StoryPage = () => {

  const { id } = useParams()
  const stories = useSelector(state => state.story.stories);
  const story = stories.find(story => story.id === Number(id));

  const history = useHistory();

  useEffect(() => {
    // Fetch the current story based on the ID from the URL or Redux store
    // You can dispatch an action or make an API call to fetch the story data
    // and update the Redux store accordingly
  }, [])

//map over 
//use params to get the id from the url
//const story = story.find(story => story.id === id)

//page will take in a prop of the story and selector to get the info out of the state
//key into the id that matches

  const {scrollPosition, windowSize} = useContext(WindowContext)
  console.log(scrollPosition);
  console.log(windowSize);

  const isMobileView = windowSize <= 765;




  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <>
    <div className="story-page">
      {story && (
        <>
          <h4 className='member-only'>Member-only story</h4>

          <h1 className="story-title">{story.title}</h1>

          <div className='author-section'>
            <div className='author-image'>insert author's image here</div>
            <div className="story-author">{story.authorInfo.firstName} {story.authorInfo.lastName}</div>
            <a className='follow'>Follow</a>
            {/* here we can come up with a way to randomize the duration length and use the date created to know how long it has been */}
            <p>X min read · X days ago</p>
          </div>

          <div className='alt-options'>
            <button>listen</button>
            <button>share</button>
            <button>... More</button>
          </div>

          {/* splice the content, character number, separate content into two diff divs, where the gap is, insert image */}

          <div className="story-content">{story.content}</div>
          {story.images.map(image => (
            <img
              key={image.id}
              src={image.url}
              alt={image.altText}
              className="story-image"
            />
          ))}
        </>
      )}
      {!story && <div className="loading-message">Loading...</div>}
      {/* <h1>hi</h1>
      <h1>hi</h1>
      <h1>hi</h1>
      <h1>hi</h1>
      <h1>hi</h1>
      <h1>hi</h1> */}
    </div>
    </>
  )  
};
export default StoryPage;
