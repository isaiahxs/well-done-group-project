import React, { useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import './StoryPage.css';
import { WindowContext } from '../../context/WindowContext';

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

  //--------------------------------------------------------------
  //first images in content mod
  // const insertImagesInContent = (content) => {
  //   const image1 = story.images[0];
  //   const image2 = story.images[1];
  //   const contentArray = content.split('\n'); //split the content by new lines

  //   //insert the first image at the halfway point
  //   const halfwayIndex = Math.floor(contentArray.length / 2);
  //   contentArray.splice(
  //     halfwayIndex,
  //     0,
  //     `<img src="${image1.url}" alt="${image1.altTag}" class="story-image">`
  //   );

  //   //insert the second image at the end
  //   contentArray.push(
  //     `<img src="${image2.url}" alt="${image2.altTag}" class="story-image">`
  //   );

  //   //join the content array back into a string
  //   return contentArray.join('\n');
  // }
  //--------------------------------------------------------------

// first version --------------------------------------------------------------
  // const insertImagesInContent = (content) => {
  //   let updatedContent = content;
  
  //   story.images.forEach((image) => {
  //     console.log('-----IMAGE POSITION-----', image.position)
  //     const imageTag = `<img src="${image.url}" alt="${image.altTag}" class="story-image">`;
  //     const insertionIndex = image.position; //originally had + imageTag.length

  //     // updatedContent = updatedContent.slice(0, insertionIndex) + imageTag + updatedContent.slice(insertionIndex);

  //     updatedContent = updatedContent.slice(0, image.position) + imageTag + updatedContent.slice(image.position);
  //   });

  //   //check content length and if it is bigger than 0, will have to remove that last part
  
  //   return updatedContent;
  // };
  //--------------------------------------------------------------

//second version--------------------------------------------------------------
  const insertImagesInContent = (content) => {

    console.log(content);
    let updatedContent = content.trim();
    const sortedImages = story.images.sort((a, b) => a.position - b.position);
    let offset = 0;
  
    sortedImages.forEach((image) => {
      console.log('-----IMAGE POSITION-----', image.position)

      const imageTag = `<img src="${image.url}" alt="${image.altTag}" class="story-image">`;
      const insertionIndex = image.position + offset;


  
      updatedContent = updatedContent.slice(0, insertionIndex) + imageTag + updatedContent.slice(insertionIndex);
      offset += imageTag.length;
    });
  
    return updatedContent;
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
        let remainingText = story.content.slice(lastPosition,story.content.length-1); 
        console.log(remainingText); 
        tempArr.push({text: remainingText});  
      } 

      setSortedContent(tempArr);
    }
  }, [story]);

  console.log(sortedContent);

console.log(``);

let str = `Front-end development continues to evolve rapidly, with new technologies and trends emerging regularly. Staying up to date with the latest front-end development trends is crucial for developers to deliver cutting-edge user experiences and maintain their competitive edge. As summer approaches, let's explore some of the top front-end development trends that are expected to make an impact in the coming months. Progressive Web Apps (PWAs): Progressive Web Apps are gaining popularity for their ability to provide a native app-like experience within web browsers. PWAs combine the best of web and mobile app technologies, offering offline functionality, push notifications, and seamless performance. As the demand for mobile-friendly and cross-platform experiences grows, investing in PWAs can be a game-changer. Responsive Web Design: Responsive web design has been a trend for some time, but its importance remains constant. With an increasing variety of devices and screen sizes, creating websites that adapt seamlessly to different resolutions and orientations is crucial. This summer, focus on building responsive designs that prioritize user experience across all devices. Micro Frontends: Micro Frontends are an architectural approach that enables breaking down a front-end monolith into smaller, manageable components. Each component represents a self-contained functionality, making it easier to develop, test, and deploy. By adopting Micro Frontends, development teams can work independently on different parts of a project, leading to faster development cycles and improved scalability. Low-Code Development: The rise of low-code development platforms empowers front-end developers to build applications with minimal coding. These platforms offer intuitive interfaces, drag-and-drop functionality, and pre-built components, enabling developers to focus on higher-level tasks and accelerate development speed. Embracing low-code tools can significantly streamline front-end development processes. Motion Design and Animations: Incorporating motion design and animations into web interfaces can enhance user engagement and provide delightful experiences. By leveraging CSS animations, SVG, or JavaScript libraries, developers can create interactive and visually appealing elements that capture users' attention. With the growing demand for engaging user interfaces, mastering motion design is a valuable skill. Voice User Interfaces (VUIs): As voice assistants and smart speakers become increasingly common, Voice User Interfaces (VUIs) are gaining traction. Integrating VUIs into web applications allows users to interact with the interface using voice commands.`

  // let content = insertImagesInContent(story)
console.log('Once upona  time'.slice(0,2));
  const items = [
    { 
      text: 'This is some text.', 
      image: 'https://images.pexels.com/photos/356372/pexels-photo-356372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
    },
    { 
      text: 'This is more text.', 
      image: 'https://images.pexels.com/photos/356372/pexels-photo-356372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
    },
    { 
      text: 'Yet more text.', 
      image: 'https://hips.hearstapps.com/hmg-prod/images/how-to-write-a-love-letter-1608316069.png' 
    },
    { 
      text: 'This is the last bit of text with an image.', 
      image: 'https://images.pexels.com/photos/356372/pexels-photo-356372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
 
    },
    { 
      text: 'This text does not have an associated image.' 
    },
    { 
      text: 'Neither does this text.' 
    }
  ];







  //--------------------------------------------------------------

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

  //splice paragraph where they decide where to put picture

  //randomizing time and date
  // const [readTime, setReadTime] = useState(4)
  // useEffect(()=>{
  //   if(story){
  //     setDate(story?.createdAt.slice(0,16))
  //   }
  //   setReadTime(Math.floor(Math.random() * (20) + 4))
  // },[story])

  //when user goes to insert image, take character length up until that point
  // content.splice(0, 20)
  //save their position from last picture

  const renderStoryContent = (content) => {
    const paragraphs = content.split('\n');

    return paragraphs.map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
    ))
  }

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
            {/* <div className='author-image'>{story.authorInfo.profileImage}</div> */}
            <img src={story.authorInfo.profileImage} alt='author-image' className='author-image'/>
            <div className='author-information'>
              <div className="story-author">
                {story.authorInfo.firstName} {story.authorInfo.lastName} ·
                <a className='follow'> Follow</a>
                <p className='time'>{readTime} min read · {date}</p>
              </div>
            </div>
            {/* here we can come up with a way to randomize the duration length and use the date created to know how long it has been */}
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
          {/* <div className="story-content" dangerouslySetInnerHTML={{ __html: insertImagesInContent(story.content) }}>
            {renderStoryContent(story.content)}
          </div> */}

          <div className="story-content">
            {sortedContent && sortedContent.map((item, index) => (
                <div key={index}>
                    {item.text && <div className='memo-text'>{item.text}</div>}
                    {item.image && <img src={item.image} alt="description" className="story-image" />}
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
              {/* here we can come up with a way to randomize the duration length and use the date created to know how long it has been */}
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
