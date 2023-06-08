import { useEffect, useState } from 'react';
import Comments from '../Comments';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CommentPanel.css';  // CSS for sliding animation

const CommentPanel = ({ isOpen, comments, onClose, storyId }) => {
    const {id} = useParams();
    const [showComments, setShowComments] = useState(false);
    const stories = useSelector(state => state.story.stories);
    const story = stories.find(story => story.id === Number(storyId));
    const userId = useSelector(state => state.session.user?.id);

    useEffect(() => {
        setShowComments(isOpen);
    }, [isOpen])

    return (
        <div>
            <button onClick={() => setShowComments(!showComments)}>Comments {story.comments.length}</button>            

            {/* <button onClick={onClose}>Comments {story.comments.length}</button> */}

            <div className={`comment-panel ${showComments ? 'comment-panel-open' : 'comment-panel-closed'}`}>
                <Comments storyId={story.id} comments={story.comments} authorInfo={story.authorInfo} userId={userId}/>
            </div>
        </div>
    );
};

export default CommentPanel;