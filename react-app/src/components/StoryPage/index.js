import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import './StoryPage.css';
import parse from 'html-react-parser';
import CommentPanel from '../CommentPanel';
import OpenModalButton from '../OpenModalButton';
import StoryOptionsModal from '../StoryOptionsModal';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import * as storyActions from '../../store/story';
import { ModalContext } from '../../context/ModalContext';
import claps from '../../public/claps.svg';
import shining_star from '../../public/shining_star.svg';
import triple_dots_icon from '../../public/triple_dots_icon.svg';

const StoryPage = () => {
  const { modal, openModal, closeModal, needsRerender, setNeedsRerender } = useContext(ModalContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams()

  const [date, setDate] = useState('')
  const [sortedContent, setSortedContent] = useState([])
  const [showComments, setShowComments] = useState(false);
  const story = useSelector(state => state.story.currentStory);
  const user = useSelector(state => state.session.user);
  const followedAuthorIds = useSelector(state => state.session.followedAuthorIds);
  const currentUserId = useSelector(state => state.session.user?.id);

  const [following, setFollowing] = useState(false);
  
  const author = useSelector(state => state.story.currentStory?.authorInfo);

  const isFollowingAuthor= () => {
    //check if followedAuthorIds includes the authorId of the story
    if (followedAuthorIds?.includes(story?.authorId)) {
      return true;
  }
  return false;
  }


  // console.log(story?.claps);


  const handleClapClick = async () => {
    const response = await dispatch(storyActions.clapStory(id)) //dispatching the action to update the clap count

    if (response && response.error) {
      alert("Sorry, you cannot clap your own stories.")
    }
  }

  const handleUnclapClick = async () => {
    const response = await dispatch(storyActions.unclapStory(id));

    if (response && response.message) {
      alert("Sorry, you do not have any claps to remove.")
    }
  }

  const handleEditStory = () => {
    // history.push(`/stories/${id}/edit`)
    // console.log('hi')
  }

  const handleDeleteStory = async () => {
    const result = await dispatch(storyActions.deleteStory(id));
    if (result && result.message) {
      history.push('/home');
    }
  }

  useEffect(() => {
    setFollowing(() => {
      if(followedAuthorIds) {
        // return followedAuthorIds.find(id => currentUserId === id)
        return followedAuthorIds.includes(author?.id)
      } else {
        return false
      }
    })
  }, [author])

  useEffect(() => {

    if(!story){
      dispatch(storyActions.getStoryById(id))
    }

    if (story) {
      setDate(story?.createdAt.slice(0, 16))

    }
  }, [story, id ])

  useEffect(() => {

    dispatch(storyActions.getStoryById(id))
   
  }, [id])





  useEffect(()=>{
    if(story){


      let tempArr =  [];
      let lastPosition = 0;  

      story.images.forEach((image, i) => { 
 
        let text = story.content.slice(lastPosition, image.position)
        
        let img = image.url

        let altTag = image.altTag
        tempArr.push({text, image: img, altTag});
        lastPosition = image.position;  
      });
 // Check if there's remaining content
      if (lastPosition < story.content.length) { 
        let remainingText = story.content.slice(lastPosition); 
        tempArr.push({text: remainingText});  
      } 

      setSortedContent(tempArr);
    }
  }, [story]);

  const navToFeed = (tag) => {
    // console.log(tag);
    dispatch(sessionActions.search(tag))
    dispatch(sessionActions.setFeed(tag))
    dispatch(sessionActions.setSubFeed('taggedStories'))
    history.push('/home');

    return
  }

  const renderTags = () => {
    return story?.tags?.map(tag => (
      <button onClick={()=>navToFeed(tag.tag)} key={tag.id} className='main-page-tag memo-text story-tag'>{tag.tag}</button>
    ))
  }


  const handleFollow = async () => {
    if(following) {
      await dispatch(storyActions.unfollowAuthor(author.id))
    } else {
      await dispatch(storyActions.followAuthor(author.id))
    }

    const updatedAuthor = await dispatch(storyActions.getAuthorById(author.id))

    // if (updatedAuthor) {
    //   setAuthorData(updatedAuthor)
    // }
    setFollowing(!following)
  }


  return (
    <>
    <div className="story-page">
      {story && (
        <>
          <h4 className='member-only'>
            <img src={shining_star} alt='shining-star' className='shining-star'/>
            Member-only story
          </h4>

          <h1 className="story-title">{story.title}</h1>

          <div className='author-section'>
            <img src={story?.authorInfo?.profileImage} alt='author-image' className='author-image'/>
            <div className='author-information'>
              <div className="story-author">
                {story?.authorInfo?.firstName} {story?.authorInfo?.lastName} ·
                {user?.id !== story?.authorInfo?.id && (
                // <a className='follow'> · Follow</a>
                // <button className='follow-author' onClick={handleFollowClick}>Follow</button>
                // <button className='unfollow-author' onClick={handleUnfollowClick}>Unfollow</button>

                // <a>
                //   {isFollowingAuthor() ? " · Unfollow" : " · Follow"}
                // </a>

                <button className='follow-unfollow-button' onClick={handleFollow}>{following ? 'Unfollow' : 'Follow'}</button>
                )}
                <p className='time'>{story.timeToRead} min read · {date}</p>
              </div>
            </div>
          </div>

          {/* changed original options bar to hide ability to clap/unclap your own stories + show ... only if you're the author of the story you're on */}
          <div className='options-bar'>



{/* 
            {user?.id !== story?.authorInfo?.id && (
              <>
                <button className='clap-button' onClick={handleClapClick}>
                  <img src={claps} alt='claps' className='claps-icon'/>
                  {story.claps}
                </button>
                {story.hasClapped &&
                  <button className='unclap-button' onClick={handleUnclapClick}>Unclap</button>
                }
              </>
            )} */}

            {/* {user?.id !== story?.authorInfo?.id && ( */}
                <div className='clap-container'>
                    {user?.id !== story?.authorInfo?.id && (
                    <button className='unclap-button' onClick={handleUnclapClick}>-</button>
                    )}
                    <div className='clap-content'>
                        <img src={claps} alt='claps' className='claps-icon'/>
                        <div className='claps-count'>{story.claps}</div>
                    </div>
                    {user?.id !== story?.authorInfo?.id && (
                    <button className='clap-button' onClick={handleClapClick}>+</button>
                    )}
                </div>
            {/* )} */}


            <CommentPanel showComments={showComments} setShowComments={setShowComments} story={story} />
            {user?.id === story?.authorInfo?.id && (
              <img src={triple_dots_icon} alt='triple-dots-icon' className='triple-dots-icon' onClick={() => openModal('storyOptionsModal')}/>
              // <button className='additional-options' onClick={() => openModal('storyOptionsModal')}>...</button>
              // <OpenModalButton
              //   modalComponent={<StoryOptionsModal onEdit={handleEditStory} onDelete={handleDeleteStory} />}
              //   buttonText='...'
              // />
            )}

            {/* test to have modal appear closer to ...*/}
            {/* <CommentPanel showComments={showComments} setShowComments={setShowComments} story={story} />
            {currentUser?.id === story?.authorInfo?.id && (
            <div className='options-button-container'>
              <button className='additional-options' onClick={() => openModal('storyOptionsModal')}>...</button>
              {modal === 'storyOptionsModal' && <StoryOptionsModal />}
            </div>
            )} */}

            <div className={`overlay ${showComments ? 'active' : ''}`} onClick={() => setShowComments(!showComments)}></div>
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
          {user?.id !== story?.authorInfo?.id && (
                <div className='clap-container'>
                    <button className='unclap-button' onClick={handleUnclapClick}>-</button>
                    <div className='clap-content'>
                        <img src={claps} alt='claps' className='claps-icon'/>
                        <div className='claps-count'>{story.claps}</div>
                    </div>
                    <button className='clap-button' onClick={handleClapClick}>+</button>
                </div>
            )}

            {/* <CommentPanel showComments={showComments} setShowComments={setShowComments} story={story} />
            {currentUser?.id === story?.authorInfo?.id && (
              <button className='additional-options' onClick={() => openModal('storyOptionsModal')}>...</button>
              // <OpenModalButton
              //   modalComponent={<StoryOptionsModal onEdit={handleEditStory} onDelete={handleDeleteStory} />}
              //   buttonText='...'
              // />
            )} */}

            {/* <CommentPanel showComments={showComments} setShowComments={setShowComments} story={story} />
            {currentUser?.id === story?.authorInfo?.id && (
            <div className='options-button-container'>
              <button className='additional-options' onClick={() => openModal('storyOptionsModal')}>...</button>
              {modal === 'storyOptionsModal' && <StoryOptionsModal />}
            </div>
            )} */}

            <CommentPanel showComments={showComments} setShowComments={setShowComments} story={story} />
            {user?.id === story?.authorInfo?.id && (
              <img src={triple_dots_icon} alt='triple-dots-icon' className='triple-dots-icon' onClick={() => openModal('storyOptionsModal')}/>
              // <button className='additional-options' onClick={() => openModal('storyOptionsModal')}>...</button>
              // <OpenModalButton
              //   modalComponent={<StoryOptionsModal onEdit={handleEditStory} onDelete={handleDeleteStory} />}
              //   buttonText='...'
              // />
            )}

            <div className={`overlay ${showComments ? 'active' : ''}`} onClick={() => setShowComments(!showComments)}></div>
          </div>

          <div className='footer'>
            <div className='author-section'>
              <img src={story?.authorInfo?.profileImage} alt='author-image' className='author-image'/>
              <div className='author-information'>
                <div className="story-author">
                  {story?.authorInfo?.firstName} {story?.authorInfo?.lastName}
                  {user?.id !== story?.authorInfo?.id && (
                  <a className='follow'> · Follow</a>
                  )}
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
