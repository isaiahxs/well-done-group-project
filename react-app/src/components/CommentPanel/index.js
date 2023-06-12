import { useContext, useEffect, useRef, useState } from 'react';
import Comments from '../Comments';
import { useSelector } from 'react-redux';
import './CommentPanel.css'; 
import { WindowContext } from '../../context/WindowContext';

const CommentPanel = ({ showComments, setShowComments, story}) => {

    const userId = useSelector(state => state.session.user?.id);
    const [commentBtnText, setCommentBtnText] = useState('Comments')
    const {commentRef} = useContext(WindowContext)

    useEffect(()=>{
        setCommentBtnText(story?.comments?.length ? `Comments ${story?.comments?.length}` : 'Comments')
        
    }, [story])

    return (
        <div>
            <button onClick={() => setShowComments(!showComments)}>{commentBtnText}</button> 

            <div className={`comment-panel ${showComments ? 'comment-panel-open' : 'comment-panel-closed'}`}>
                <Comments storyId={story?.id} authorInfo={story?.authorInfo} userId={userId}/>
                <div ref={commentRef}></div>
            </div>
        </div>
    );
};

export default CommentPanel;
