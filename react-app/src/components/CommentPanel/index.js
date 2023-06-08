import { useState } from 'react';
import Comments from '../Comments';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CommentPanel.css';  // CSS for sliding animation

const Comment = ({comment}) => {
    return (
        <div className='comment'>
            {/* <h4>{comment.author}</h4> */}
            <p>{comment.content}</p>
        </div>
    )
}

const CommentPanel = ({ isOpen, comments, onClose, storyId }) => {
    const {id} = useParams();
    const [showComments, setShowComments] = useState(false);
    const stories = useSelector(state => state.story.stories);
    const story = stories.find(story => story.id === Number(storyId));

    return (
        <div>
        <button onClick={() => setShowComments(!showComments)}>Comment</button>
        {showComments && (
            <div className="comment-panel">
            <Comments storyId={story.id} comments={story.comments} />
            </div>
        )}
        </div>
    );
};

export default CommentPanel;