import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {postComment} from '../../store/story'
import {editComment} from '../../store/story'
import './Comments.css'

const Comments = ({ userId, storyId, comments, authorInfo }) => {
    console.log('THIS IS OUR USER IDDDDDDDD', userId)
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState('');
    const dispatch = useDispatch();
    const [date, setDate] = useState('')

    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(postComment(storyId, commentText));
      setCommentText('');
    };

    const handleEdit = (commentId, content) => {
        setEditingCommentId(commentId);
        setEditText(content);
    }

    const handleEditSubmit = async (event, commentId) => {
        event.preventDefault();
        await dispatch(editComment(storyId, commentId, editText));
        setEditingCommentId(null);
        setEditText('');
    }

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
            console.log('THIS IS OUR COMMENT AUTHOR ID', comment.userId),
            <div className='comment-tile'>
                <div>
                    <img src={comment.author.profileImage} alt='comment-author-image' className='comment-author-image'/>
                    <p key={comment.id}>{comment.author.firstName} {comment.author.lastName}</p>
                    <p className='time'>{comment.createdAt.slice(0, 16)}</p>
                    {/* <p key={comment.id}>{comment.content}</p> */}
                    <p key={comment.id}>
                        {editingCommentId === comment.id ?
                            <form onSubmit={(e) => handleEditSubmit(e, comment.id)}>
                                <input 
                                value={editText} 
                                onChange={(e) => setEditText(e.target.value)} 
                                required
                                />
                                <button type="submit">Submit Edit</button>
                            </form>
                        :
                        comment.content
                        }
                    </p>
                    {userId && userId === comment.userId && editingCommentId !== comment.id &&
                        <button onClick={() => handleEdit(comment.id, comment.content)}>Edit</button>}

                </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Comments;