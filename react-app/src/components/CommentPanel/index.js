import { useEffect, useRef, useState } from 'react';
import Comments from '../Comments';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CommentPanel.css';  // CSS for sliding animation

const CommentPanel = ({ isOpen, comments, onClose, storyId }) => {
    const {id} = useParams();
    const [showComments, setShowComments] = useState(false);
    const stories = useSelector(state => state.story.stories);
    const story = useSelector(state => state.story.currentStory);
    const userId = useSelector(state => state.session.user?.id);

    const panelRef = useRef()



    useEffect(() => {
        const handleClickOutside = (event) => {
          if (panelRef.current && !panelRef.current.contains(event.target)) {
            setShowComments(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [panelRef]);


    useEffect(() => {
        setShowComments(isOpen);
    }, [isOpen])

    console.log(story);

    return (
        <div>
            <button onClick={() => setShowComments(!showComments)}>Comments</button> 


            <div ref={panelRef} className={`comment-panel ${showComments ? 'comment-panel-open' : 'comment-panel-closed'}`}>
            <button onClick={()=>setShowComments(!showComments)}>x</button>
                <Comments storyId={story.id} comments={story.comments} authorInfo={story.authorInfo} userId={userId}/>
            </div>
        </div>
    );
};

export default CommentPanel;

// {story.comments ? story.comments.length : 0}