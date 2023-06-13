import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addCommentClap, postComment, editComment, deleteComment, removeCommentClap} from '../../store/story'
import './Comments.css'
import { WindowContext } from '../../context/WindowContext';
import { ModalContext } from '../../context/ModalContext';

const Comments = ({ userId, storyId, authorInfo, setShowComments }) => {
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState('');
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const story = useSelector(state => state.story.currentStory)
    // const user = useSelector(state => state.session.user)
    const {commentRef} = useContext(WindowContext)
    const {openModal} = useContext(ModalContext)
    const [userHasCommented, setUserHasCommented] = useState(false)


    const handleSigninClick = () => {
      openModal('signin')
      setShowComments(false)
    }


    useEffect(()=>{
      if(story){
        setComments(story.comments)
        const userComment = story.comments.find(comment => comment.userId === userId)
        setUserHasCommented(!!userComment)
      }
    }, [story, userId])



    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(postComment(storyId, commentText));


      setCommentText('');



      setTimeout(() => {
        commentRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 500);


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

        {userId && userId !== authorInfo?.id && !userHasCommented &&
          <form className='new-comment' onSubmit={handleSubmit}>
            <input
              className='comment-input'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
            />
            <button className='submit-comment' type="submit">Submit</button>
          </form>
        }

        {!userId &&
          <div className='signed-out flex'><div onClick={handleSigninClick} className='comments-sign-in'>Sign in </div><div className='comments-to-leave'> to leave a comment!</div></div>
        }

        <div className='posted-comments'>
            <div className='most-relevant'>Most Relevant</div>
          {comments?.map((comment) => (
            // console.log('THIS IS OUR COMMENT AUTHOR ID', comment.userId),
            <div className='comment-tile' key={comment?.id}>
                <div>
                  <div className='comment-panel-author-info'>
                    <img src={comment?.author?.profileImage} alt='comment-author-icon' className='comment-author-image'/>
                    <div className='author-name-created'>
                      <p>{comment?.author?.firstName} {comment?.author?.lastName}</p>
                      <p className='time comment-panel-time'>{comment?.createdAt.slice(0, 16)}</p>
                      {/* <p key={comment.id}>{comment.content}</p> */}
                    </div>
                  </div>
                    <p className='comment-content'>
                        {editingCommentId === comment?.id ?
                            <form onSubmit={(e) => handleEditSubmit(e, comment?.id)}>
                                <input 
                                className='comment-input'
                                value={editText} 
                                onChange={(e) => setEditText(e.target.value)} 
                                required
                                />
                                <button className='submit-comment' type="submit">Submit Edit</button>
                            </form>
                        :
                        comment?.content
                        }
                    </p>
                    <p className='number-of-comment-claps'>Claps: {comment?.clapCount}</p> {/* Show clap count */}
                    {userId && userId !== comment?.userId &&
                      <div className='comment-claps-buttons'>
                        <button className='clap-comment-button' onClick={() => handleClap(comment?.id)}>Clap</button>
                        <button className='unclap-comment-button' onClick={() => handleUnclap(comment?.id)}>Remove Clap</button>
                      </div>
                    }

                    {userId && userId === comment?.userId && editingCommentId !== comment?.id &&
                        <div>
                        <button className='edit-comment-button' onClick={() => handleEdit(comment?.id, comment?.content)}>Edit</button>
                    
                        <button className='delete-comment-button' onClick={() => handleDelete(storyId, comment?.id)}>Delete</button>
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