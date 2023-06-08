import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {postComment} from '../../store/story'
import './Comments.css'

const Comments = ({ storyId, comments, authorInfo }) => {
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();
    const [date, setDate] = useState('')
  
    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(postComment(storyId, commentText));
      setCommentText('');
    };

    // useEffect(() => {
    //     if (comments) {
    //         setDate(comments?.createdAt.slice(0, 16))
    //     }
    // }, [comments])
  
    return (
      <div>
        <h1 className='responses'>Responses ({comments.length})</h1>
        <form className='new-comment' onSubmit={handleSubmit}>
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
          />
          <button type="submit">Submit</button>
        </form>
  
        <div className='posted-comments'>
            <div className='most-relevant'>Most Relevant</div>
          {comments.map((comment) => (
            <div className='comment-tile'>
                <div>
                    <img src={comment.author.profileImage} alt='comment-author-image' className='comment-author-image'/>
                    <p key={comment.id}>{comment.author.firstName} {comment.author.lastName}</p>
                    <p className='time'>{comment.createdAt.slice(0, 16)}</p>
                    <p key={comment.id}>{comment.content}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Comments;