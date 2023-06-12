import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addCommentClap, postComment} from '../../store/story'
import {editComment} from '../../store/story'
import {deleteComment} from '../../store/story'
import { removeCommentClap } from '../../store/story';
import './Comments.css'

const Comments = ({ userId, storyId, authorInfo }) => {
    // console.log('THIS IS OUR USER IDDDDDDDD', userId)
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState('');
    const dispatch = useDispatch();
    // const comments = useSelector(state => state.story.stories.find(story => story.id === storyId).comments)
    // const comments = useSelector(state => {
    //   const story = state.story.currentStory
    // })
    const comments = useSelector(state => state.story.currentStory.comments)
    const user = useSelector(state => state.session.user)

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

    const handleDelete = (storyId, commentId) => {
        dispatch(deleteComment(storyId, commentId));
    }

    const handleClap = async (commentId) => {
        // dispatch (addCommentClap(commentId));

        const response = await dispatch(addCommentClap(commentId));

        if (response && response.error) {
          alert('Sorry, you cannot clap this comment.')
        }
    }

    const handleUnclap = async (commentId) => {
        // dispatch (removeCommentClap(commentId));

        const response = await dispatch(removeCommentClap(commentId));

        if (response && response.error) {
          alert('Sorry, you do not have any claps to remove on this comment.')
        }
    }

    return (
      <div>
        <h1 className='responses'>Responses ({comments?.length})</h1>

        {userId && userId !== authorInfo?.id &&
          <form className='new-comment' onSubmit={handleSubmit}>
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
            />
            <button type="submit">Submit</button>
          </form>
        }

        {!userId &&
          <div className='signed-out'>Sign in to leave a comment!</div>
        }

        <div className='posted-comments'>
            <div className='most-relevant'>Most Relevant</div>
          {comments?.map((comment) => (
            // console.log('THIS IS OUR COMMENT AUTHOR ID', comment.userId),
            <div className='comment-tile' key={comment?.id}>
                <div>
                    <img src={comment?.author?.profileImage} alt='comment-author-image' className='comment-author-image'/>
                    <p>{comment?.author?.firstName} {comment?.author?.lastName}</p>
                    <p className='time'>{comment?.createdAt.slice(0, 16)}</p>
                    {/* <p key={comment.id}>{comment.content}</p> */}
                    <p>
                        {editingCommentId === comment?.id ?
                            <form onSubmit={(e) => handleEditSubmit(e, comment?.id)}>
                                <input 
                                value={editText} 
                                onChange={(e) => setEditText(e.target.value)} 
                                required
                                />
                                <button type="submit">Submit Edit</button>
                            </form>
                        :
                        comment?.content
                        }
                    </p>
                    <p>Claps: {comment?.clapCount}</p> {/* Show clap count */}
                    {userId && userId !== comment?.userId &&
                      <div>
                        <button onClick={() => handleClap(comment?.id)}>Clap</button>
                        <button onClick={() => handleUnclap(comment?.id)}>Remove Clap</button>
                      </div>
                    }

                    {userId && userId === comment?.userId && editingCommentId !== comment?.id &&
                        <div>
                        <button onClick={() => handleEdit(comment?.id, comment?.content)}>Edit</button>
                    
                        <button onClick={() => handleDelete(storyId, comment?.id)}>Delete</button>
                        </div>
                    }
                </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Comments;