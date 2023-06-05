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
  const isMobileView = windowSize <= 765;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogoClick = () => {
    history.push('/');
  };

  const insertImagesInContent = (content) => {
    const image1 = story.images[0];
    const image2 = story.images[1];
    const contentArray = content.split('\n'); //split the content by new lines

    //insert the first image at the halfway point
    const halfwayIndex = Math.floor(contentArray.length / 2);
    contentArray.splice(
      halfwayIndex,
      0,
      `<img src="${image1.url}" alt="${image1.altTag}" class="story-image">`
    );

    //insert the second image at the end
    contentArray.push(
      `<img src="${image2.url}" alt="${image2.altTag}" class="story-image">`
    );

    //join the content array back into a string
    return contentArray.join('\n');
  }

  // will iterate over spot images that story has and store that number as amount of splits and split content by that. take image sources and put them in the middle of the content

  //map over storyImages?
  // let tempArray = []
  // storyImages.map(image => (
  //   tempArray.push(
  //     {content: content.slice(0, image.position),
  //       image: image.url,
  //     }
  //     )
  // ))

  //randomizing time and date
  // const [readTime, setReadTime] = useState(4)
  // useEffect(()=>{
  //   if(story){
  //     setDate(story?.createdAt.slice(0,16))
  //   }
  //   setReadTime(Math.floor(Math.random() * (20) + 4))
  // },[story])

  const renderStoryContent = (content) => {
    const paragraphs = content.split('\n');

    return paragraphs.map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
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
            <div className='author-image'>insert author's image here</div>
            <div className="story-author">{story.authorInfo.firstName} {story.authorInfo.lastName}</div>
            <a className='follow'>Follow</a>
            {/* here we can come up with a way to randomize the duration length and use the date created to know how long it has been */}
            <p className='time'>X min read · X days ago</p>
          </div>

          <div className='alt-options'>
            <button>Listen</button>
            <button>Share</button>
            <button>... More</button>
          </div>

          {/* splice the content, character number, separate content into two diff divs, where the gap is, insert image */}

          {/* <div className="story-content">{story.content}</div>
          {story.images.map(image => (
            <img
              key={image.id}
              src={image.url}
              alt={image.altTag}
              className="story-image"
            />
          ))} */}
          <div className="story-content" dangerouslySetInnerHTML={{ __html: insertImagesInContent(story.content) }}>
            {/* {renderStoryContent(story.content)} */}
          </div>
        </>
      )}
      {!story && <div className="loading-message">Loading...</div>}
    </div>
    </>
  )  
};
export default StoryPage;
