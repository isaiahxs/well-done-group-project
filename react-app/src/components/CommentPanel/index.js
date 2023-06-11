import { useEffect, useRef, useState } from 'react';
import Comments from '../Comments';
import { useSelector } from 'react-redux';
import './CommentPanel.css'; 

const CommentPanel = ({ showComments, setShowComments, story}) => {

    const userId = useSelector(state => state.session.user?.id);
    const [commentBtnText, setCommentBtnText] = useState('Comments')

    useEffect(()=>{
        setCommentBtnText(story.comments.length ? `Comments ${story.comments.length}` : 'Comments')
        
    }, [story])

    return (
        <div>
            <button onClick={() => setShowComments(!showComments)}>{commentBtnText}</button> 

            <div className={`comment-panel ${showComments ? 'comment-panel-open' : 'comment-panel-closed'}`}>
            <button onClick={()=>setShowComments(!showComments)}>x</button>
                <Comments storyId={story.id} comments={story.comments} authorInfo={story.authorInfo} userId={userId}/>
            </div>
        </div>
    );
};

export default CommentPanel;
