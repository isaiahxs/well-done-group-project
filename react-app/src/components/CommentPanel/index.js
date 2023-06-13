import { useContext, useEffect, useState } from 'react';
import Comments from '../Comments';
import { useSelector } from 'react-redux';
import './CommentPanel.css'; 
import { WindowContext } from '../../context/WindowContext';
import comment from '../../public/comment.svg';

const CommentPanel = ({ showComments, setShowComments, story}) => {


    const userId = useSelector(state => state.session.user?.id);
    const [commentBtnText, setCommentBtnText] = useState('Comments')
    const {commentRef} = useContext(WindowContext)

    useEffect(()=>{
        // setCommentBtnText(story.comments.length ? `Comments ${story.comments.length}` : 'Comments')
        setCommentBtnText(story.comments.length)
    }, [story])

    return (
        <div>
            <button className="comment-button" onClick={() => setShowComments(!showComments)}>
                <img src={comment} alt="comment" className="comment-icon" />
                {commentBtnText}
            </button> 

            <div className={`comment-panel ${showComments ? 'comment-panel-open' : 'comment-panel-closed'}`}>
                <Comments storyId={story?.id} authorInfo={story?.authorInfo} userId={userId} setShowComments={setShowComments}/>
                <div ref={commentRef}></div>
            </div>
        </div>
    );
};

export default CommentPanel;
