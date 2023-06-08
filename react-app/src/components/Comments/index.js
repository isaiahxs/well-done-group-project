import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {postComment} from '../../store/story'
import './Comments.css'

const Comments = ({ storyId, comments, authorInfo }) => {
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(postComment(storyId, commentText));
      setCommentText('');
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
          />
          <button type="submit">Submit</button>
        </form>
  
        <div>
          {comments.map((comment) => (
            <div className='comment-tile'>
                <img src={comment.author.profileImage} alt='comment-author-image' className='comment-author-image'/>
                <p key={comment.id}>{comment.author.firstName} {comment.author.lastName}: "{comment.content}"</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Comments;