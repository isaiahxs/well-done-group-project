// constants
const GET_STORIES = "story/GET_STORIES";
const GET_STORY_BY_ID = "story/GET_STORY_BY_ID";
const GET_USER_STORIES = "story/GET_USER_STORIES";
const INITIAL_LOAD = "story/INITIAL_LOAD";
const CREATE_STORY = "story/CREATE_STORY";
export const FOLLOW_AUTHOR = "story/FOLLOW_AUTHOR";
export const UNFOLLOW_AUTHOR = "story/UNFOLLOW_AUTHOR";
const CLAP_STORY = "story/CLAP_STORY";
const ADD_COMMENT_CLAP = "story/ADD_COMMENT_CLAP";
const UNCLAP_STORY = "story/UNCLAP_STORY";
const POST_COMMENT = "story/POST_COMMENT";
const EDIT_COMMENT = "story/EDIT_COMMENT";
const DELETE_COMMENT = "story/DELETE_COMMENT";
const REMOVE_COMMENT_CLAP = "story/REMOVE_COMMENT_CLAP";
export const SUBSCRIBED_STORIES = "story/SUBSCRIBED_STORIES";
const GET_AUTHOR = "story/GET_AUTHOR";

const getStoriesAction = (stories) => ({
	type: GET_STORIES,
	payload: stories,
});
const getUserStoriesAction = (stories) => ({
	type: GET_USER_STORIES,
	payload: stories,
});

const getSubscribedStoriesAction = (stories) => ({
	type: SUBSCRIBED_STORIES,
	payload: stories.subscribedStories,
});

const getStoryByIdAction = (story) => ({
	type: GET_STORY_BY_ID,
	payload: story,
});

const initialLoadAction = (data) => ({
	type: INITIAL_LOAD,
	payload: data
});

const createStoryAction = (data) => ({
	type: CREATE_STORY,
	payload: data
});

const followAuthorAction = (data) => ({
	type: FOLLOW_AUTHOR,
	payload: data
});
const unfollowAuthorAction = (data) => ({
	type: UNFOLLOW_AUTHOR,
	payload: data
});


export const clapStoryAction = (data) => ({
	type: CLAP_STORY,
	payload: data,
})

const unclapStoryAction = (payload) => ({
	type: UNCLAP_STORY,
	payload,
})

const postCommentAction = (comment) => ({
	type: POST_COMMENT,
	payload: comment,
})

const editCommentAction = (comment) => ({
	type: EDIT_COMMENT,
	payload: comment,
})


const deleteCommentAction = (commentId) => ({
	type: DELETE_COMMENT,
	payload: commentId,
})

const removeCommentClapAction = (payload) => ({
	type: REMOVE_COMMENT_CLAP,
	payload,
})

const initialState = { stories: [], tags: [], loaded: false, currentStory: null};

export const initialLoad = () => async (dispatch) => {
	const response = await fetch("/api/story/initialize", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(initialLoadAction(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {

			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const createStory = (createStoryObj) => async (dispatch) => {
	
	console.log(createStoryObj);
	console.log('here');
    const { title, slicedIntro, timeToRead, images, tags, content, authorId } = createStoryObj
		const formData = new FormData();

    if (images) {
			for (let i = 0; i < images.length; i++) {
					formData.append("images", images[i].file);
					formData.append(`altTag${i}`, images[i].altTag);
					formData.append(`position${i}`, images[i].position);
			}
		}
    if (tags) {
			for (let i = 0; i < tags.length; i++) {
					formData.append("tags", tags[i].id);
			}
		}

		formData.append('content', content)
		formData.append('authorId', authorId)
		formData.append('title', title)
		formData.append('slicedIntro', slicedIntro)
		formData.append('timeToRead', timeToRead)


		const response = await fetch("/api/story/create", {
			method: "POST",
			body: formData
	});

	console.log(response);

	if (response.ok) {
		console.log('yes ok');

		const data = await response.json();
		console.log(data);
		dispatch(createStoryAction(data));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export const getStories = () => async (dispatch) => {
	const response = await fetch("/api/story/", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getStoriesAction(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const getUserStories = () => async (dispatch) => {
	const response = await fetch("/api/story/curr", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getUserStoriesAction(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const getStoryById = (id) => async (dispatch) => {

	const response = await fetch(`/api/story/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getStoryByIdAction(data));
		console.log(data);
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export const getSubscribedStories = () => async (dispatch) => {
	const response = await fetch("/api/story/subscribed", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getSubscribedStoriesAction(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};





export const clapStory = (id) => async (dispatch) => {
	const response = await fetch(`/api/story/${id}/clap`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		}
	})
	if (response.ok) {
		const data = await response.json();
		console.log(data);
		dispatch(clapStoryAction({ id, claps: data.totalClaps }));
		return null;
	}
	if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		const data = await response.json();
		return data;
	}
}


export const unclapStory = (id ) => async (dispatch) => {
	const response = await fetch(`/api/story/${id}/clap`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	})
	if (response.ok) {
		const data = await response.json();
		console.log(data);


		dispatch(unclapStoryAction({ id, claps: data.totalClaps }));
		return null;
	}
		if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
	
	} else {
		const data = await response.json();
		return data;
	}
}




//dispatch action in postComment thunk after we receive response
export const postComment = (storyId, comment) => async (dispatch) => {
	const response = await fetch(`/api/story/${storyId}/comment`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ content: comment })
	})
	if (response.ok) {
		const data = await response.json();
		dispatch(postCommentAction(data)); //dispatch the action
		return data;
	} else {
		const data = await response.json();
		return data;
	}
}



//dispatch action in editComment thunk after we receive response
export const editComment = (storyId, commentId, comment) => async (dispatch) => {
	const response = await fetch(`/api/comment/${commentId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			},
		body: JSON.stringify({ content: comment })
	})
	if (response.ok) {
		const data = await response.json();
		dispatch(editCommentAction(data)); //dispatch the action
		return data;
	} else {
		const data = await response.json();
		return data;
	}
}




//dispatch action in deleteComment thunk after we receive response
export const deleteComment = (storyId, commentId) => async (dispatch) => {
	const response = await fetch(`/api/comment/${commentId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	})
	if (response.ok) {
		dispatch(deleteCommentAction(commentId));
		return commentId;
	} else {
		const data = await response.json();
		return data;
	}
}

export const getAuthorById = (id) => async (dispatch) => {
	const response = await fetch(`/api/follow/${id}/followers`);
	if (response.ok) {
	  const data = await response.json();
	  return data;
	} else if (response.status < 500) {
	  const data = await response.json();
	  if (data.errors) {
		return data.errors;
	  }
	} else {
	  return ["An error occurred. Please try again."];
	}
  };

export const followAuthor = (id) => async (dispatch) => {
	const response = await fetch(`/api/follow/${id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id })
	});
	if (response.ok) {
		const data = await response.json();
		console.log('THIS IS OUR DATATATATATATA', data)
		dispatch(followAuthorAction(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const unfollowAuthor = (id) => async (dispatch) => {
	const response = await fetch(`/api/follow/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(unfollowAuthorAction(data));

		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


//create an action creator function
const addCommentClapAction = (payload) => ({
	type: ADD_COMMENT_CLAP,
	payload,
})

export const addCommentClap = (commentId) => async (dispatch) => {

	const response = await fetch(`/api/comment/${commentId}/clap`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		}
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(addCommentClapAction(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};




export const removeCommentClap = (commentId) => async (dispatch) => {
	const response = await fetch(`/api/comment/${commentId}/clap`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(removeCommentClapAction(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};




//first version
export default function reducer(state = initialState, action) {
	const newState = {...state}
	switch (action.type) {

		


		case GET_STORIES:
			return {...newState, stories: action.payload.stories };

		case GET_USER_STORIES:
			return {...newState, userStories: action.payload.stories };
		case GET_STORY_BY_ID:
			return {...newState, currentStory: action.payload };
	

		case INITIAL_LOAD:
			console.log(action.payload);
			return {stories: action.payload.stories, userStories: action.payload.userStories, tags: action.payload.tags, loaded: true };

		
		case CLAP_STORY:
				const { storyId, claps } = action.payload;
				const updatedCurrentStory = newState.currentStory
				updatedCurrentStory.claps = claps

				return {
					...state,
					currentStory: updatedCurrentStory
				};

		case UNCLAP_STORY: {
			const {storyId, claps} = action.payload;
			const updatedCurrentStory = newState.currentStory
			updatedCurrentStory.claps = claps
				
			return {
				...state,
				currentStory: updatedCurrentStory
			};
		}
		case POST_COMMENT: {
			const newComment = action.payload;
			const updatedStories = state.stories.map((story) => {
				if (story.id === newComment.storyId) {
					return {
						...story,
						comments: [...story.comments, newComment]
					};
				}
				return story;
			})
			return {
				...state,
				stories: updatedStories
			}
		}

		case EDIT_COMMENT: {
			const updatedComment = action.payload;
			const updatedStories = state.stories.map((story) => {
				if (story.id === updatedComment.storyId) {
					return {
						...story,
						comments: story.comments.map((comment) =>
							comment.id === updatedComment.id ? updatedComment : comment
						),
					}
				}
				return story;
			})
			return {
				...state,
				stories: updatedStories
			}
		}

		case DELETE_COMMENT: {
			const commentIdToDelete = action.payload;
			const updatedStories = state.stories.map((story) => {
				//filter out comments we want to delete
				return {
					...story,
					comments:story.comments.filter(
						(comment) => comment.id !== commentIdToDelete
					)
				}
			})
			return {
				...state,
				stories: updatedStories
			}
		}

		case ADD_COMMENT_CLAP: {
			const {commentId, claps} = action.payload;
			const updatedStories = state.stories.map((story) => {
				return {
					...story,
					comments: story.comments.map((comment) => {
						if (comment.id === commentId) {
							return {
								...comment,
								clapCount: claps
							};
						}
						return comment;
					}),
				}
			})
			return {
				...state,
				stories: updatedStories
			}
		}

		case REMOVE_COMMENT_CLAP: {
			const {commentId, claps} = action.payload;
			const updatedStories = state.stories.map((story) => {
				return {
					...story,
					comments: story.comments.map((comment) => {
						if (comment.id === commentId) {
							return {
								...comment,
								clapCount: claps
							};
						}
						return comment;
					}),
				}
			})
			return {
				...state,
				stories: updatedStories
			}
		}
		
		default:
			return state;
	}
}