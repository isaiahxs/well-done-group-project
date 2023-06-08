import { useState } from 'react';
import Comments from '../Comments';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CommentPanel.css';  // CSS for sliding animation

const CommentPanel = ({ isOpen, comments, onClose, storyId }) => {
    const {id} = useParams();
    const [showComments, setShowComments] = useState(false);
    const stories = useSelector(state => state.story.stories);
    const story = stories.find(story => story.id === Number(storyId));

    return (
        <div>
            <button onClick={() => setShowComments(!showComments)}>Comment</button>            
            <div className={`comment-panel ${showComments ? 'comment-panel-open' : 'comment-panel-closed'}`}>
                <Comments storyId={story.id} comments={story.comments} authorInfo={story.authorInfo} />
            </div>
        </div>
    );
};

export default CommentPanel;