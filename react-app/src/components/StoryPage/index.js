import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './StoryPage.css';
import parse from 'html-react-parser';
import CommentPanel from '../CommentPanel';
import * as sessionActions from '../../store/session';
import * as storyActions from '../../store/story';
import { ModalContext } from '../../context/ModalContext';
import claps from '../../public/claps.svg';
import shining_star from '../../public/shining_star.svg';
import triple_dots_icon from '../../public/triple_dots_icon.svg';
import StoryPageSkeleton from '../StoryPageSkeleton';

const StoryPage = () => {
  const { openModal } = useContext(ModalContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortedContent, setSortedContent] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const story = useSelector((state) => state.story.currentStory);
  const user = useSelector((state) => state.session.user);
  const followedAuthorIds = useSelector(
    (state) => state.session.followedAuthorIds
  );
  // const currentUserId = useSelector(state => state.session.user?.id);

  const [following, setFollowing] = useState(false);

  const author = useSelector((state) => state.story.currentStory?.authorInfo);

  const handleClapClick = async () => {
    const response = await dispatch(storyActions.clapStory(id)); //dispatching the action to update the clap count

    if (response && response.error) {
      alert('Sorry, you cannot clap your own stories.');
    }
  };

  const handleUnclapClick = async () => {
    const response = await dispatch(storyActions.unclapStory(id));

    if (response && response.message) {
      alert('Sorry, you do not have any claps to remove.');
    }
  };

  useEffect(() => {
    setFollowing(followedAuthorIds.includes(author?.id));
  }, [author]);




  useEffect(() => {
    if (!story) {
      dispatch(storyActions.getStoryById(id));
    }
    
    if (story) {
      setIsLoading(false);
      setDate(story?.createdAt.slice(0, 16));
    }
  }, [story, id]);

  
  useEffect(() => {
    const loadStory = async () => {
      setIsLoading(true);
      await dispatch(storyActions.getStoryById(id));
      setIsLoading(false);
    };
    loadStory();
  }, [id, dispatch]);




  useEffect(() => {
    dispatch(storyActions.getStoryById(id));
  }, [id]);

  useEffect(() => {
    if (story) {
      let tempArr = [];
      let lastPosition = 0;

      story.images.forEach((image, i) => {
        let text = story.content.slice(lastPosition, image.position);

        let img = image.url;

        let altTag = image.altTag;
        tempArr.push({ text, image: img, altTag });
        lastPosition = image.position;
      });
      // Check if there's remaining content
      if (lastPosition < story.content.length) {
        let remainingText = story.content.slice(lastPosition);
        tempArr.push({ text: remainingText });
      }

      setSortedContent(tempArr);
    }
  }, [story]);

  useEffect(() => {
    return () => {
      dispatch(storyActions.removeCurrentStory());
    };
  }, []);




  const navToFeed = (search, subFeed) => {
    dispatch(sessionActions.search(search))
    dispatch(sessionActions.setFeed(search))
    dispatch(sessionActions.setSubFeed(subFeed))
    history.push('/home');
    return
  }

  

  const renderTags = () => {
    return story?.tags?.map((tag) => (
      <button
        onClick={() => navToFeed(tag.tag)}
        key={tag.id}
        className="main-page-tag memo-text story-tag"
      >
        {tag.tag}
      </button>
    ));
  };

  const handleFollow = async () => {
    if(!user) return
    if (following) {
      await dispatch(storyActions.unfollowAuthor(author.id));
    } else {
      await dispatch(storyActions.followAuthor(author.id));
    }

    setFollowing(!following);
  };

  return (
    <>
      {!story || isLoading && (
      <div>
        <StoryPageSkeleton/>
      </div>
      )}

      <div className="story-page">
        {story && (
        // {1==2 && (
          <>
            <h4 className="member-only">
              <img
                src={shining_star}
                alt="shining-star"
                className="shining-star"
              />
              Member-only story
            </h4>

            <h1 className="story-title">{story.title}</h1>

            <div className="author-section flex">
              <img
                src={story?.authorInfo?.profileImage}
                alt="author profile icon"
                className="author-image"
                onClick={()=>navToFeed(`${story?.authorInfo?.firstName} ${story?.authorInfo?.lastName}`, 'authors')}
              />
              <div className="author-information memo-text">
                <div className='author-name-and-follow'>
                  <div onClick={()=>navToFeed(`${story?.authorInfo?.firstName} ${story?.authorInfo?.lastName}`, 'authors')}>
                    {story?.authorInfo?.firstName} {story?.authorInfo?.lastName}
                  </div>

                  {user && user?.id !== story?.authorInfo?.id && (
                    <button
                      className="follow-unfollow-button"
                      onClick={handleFollow}
                    >
                      {following ? ' · Unfollow' : ' · Follow'}
                    </button>
                  )}

                </div>
                <div>
                <div className="story-author">


                  <p className="time">
                    {story.timeToRead} min read · {date}
                  </p>
                </div>

                </div>
              </div>
            </div>

            {/* changed original options bar to hide ability to clap/unclap your own stories + show ... only if you're the author of the story you're on */}
            <div className="options-bar">
              <div className="clap-container">
                {user?.id !== story?.authorInfo?.id && (
                  <button className="unclap-button" onClick={handleUnclapClick}>
                    -
                  </button>
                )}
                <div className="clap-content">
                  <img src={claps} alt="claps" className="claps-icon" />
                  <div className="claps-count">{story.claps}</div>
                </div>
                {user?.id !== story?.authorInfo?.id && (
                  <button className="clap-button" onClick={handleClapClick}>
                    +
                  </button>
                )}
              </div>

              <CommentPanel
                showComments={showComments}
                setShowComments={setShowComments}
                story={story}
              />
              {user?.id === story?.authorInfo?.id && (
                <img
                  src={triple_dots_icon}
                  alt="triple-dots-icon"
                  className="triple-dots-icon"
                  onClick={() => openModal('storyOptionsModal')}
                />
              )}

              <div
                className={`overlay ${showComments ? 'active' : ''}`}
                onClick={() => setShowComments(!showComments)}
              ></div>
            </div>

            <div className="story-content">
              {/* {!user && (
                  <div className='members-only-div flexcenter memo-text'>
                    <div>Sign up to view this content</div>
                  </div>
                )} */}

              {sortedContent &&
                sortedContent.map((item, index) => (
                  <div key={index}>
                    {item.text && (
                      // <div className={`memo-text ${!user && index > 0 ? 'blur' : '' }`}>{parse(item.text)}</div>
                      <div className={`memo-text`}>{parse(item.text)}</div>
                    )}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item?.altTag}
                        // className={`story-image ${!user ? 'blur' : '' }`}
                        className={`story-image`}
                      />
                    )}
                  </div>
                ))}
            </div>

            <div className="main-page-tag-container">{renderTags()}</div>

            <div className="options-bar">
              <div className="clap-container">
                {user?.id !== story?.authorInfo?.id && (
                  <button className="unclap-button" onClick={handleUnclapClick}>
                    -
                  </button>
                )}
                <div className="clap-content">
                  <img src={claps} alt="claps" className="claps-icon" />
                  <div className="claps-count">{story.claps}</div>
                </div>
                {user?.id !== story?.authorInfo?.id && (
                  <button className="clap-button" onClick={handleClapClick}>
                    +
                  </button>
                )}
              </div>

              <CommentPanel
                showComments={showComments}
                setShowComments={setShowComments}
                story={story}
              />
              {user?.id === story?.authorInfo?.id && (
                <img
                  src={triple_dots_icon}
                  alt="triple-dots-icon"
                  className="triple-dots-icon"
                  onClick={() => openModal('storyOptionsModal')}
                />
              )}
              <div
                className={`overlay ${showComments ? 'active' : ''}`}
                onClick={() => setShowComments(!showComments)}
              ></div>
            </div>

            <div className="author-section flex">
              <img
                src={story?.authorInfo?.profileImage}
                alt="author profile icon"
                className="author-image"
                onClick={()=>navToFeed(`${story?.authorInfo?.firstName} ${story?.authorInfo?.lastName}`, 'authors')}
              />
              <div className="author-information memo-text">
                <div className='author-name-and-follow'>
                  <div onClick={()=>navToFeed(`${story?.authorInfo?.firstName} ${story?.authorInfo?.lastName}`, 'authors')}>
                    {story?.authorInfo?.firstName} {story?.authorInfo?.lastName}
                  </div>

                  {user && user?.id !== story?.authorInfo?.id && (
                    <button
                      className="follow-unfollow-button"
                      onClick={handleFollow}
                    >
                      {following ? ' · Unfollow' : ' · Follow'}
                    </button>
                  )}

                </div>
                <div>
                <div className="story-author">


                  <p className="time">
                    {story.timeToRead} min read · {date}
                  </p>
                </div>

                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default StoryPage;
