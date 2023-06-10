// constants
const GET_STORIES = "story/GET_STORIES";
const INITIAL_LOAD = "story/INITIAL_LOAD";
const CREATE_STORY = "story/CREATE_STORY";
const FOLLOW_AUTHOR = "story/FOLLOW_AUTHOR";
const UNFOLLOW_AUTHOR = "story/UNFOLLOW_AUTHOR";
const IMAGE_TEST = "story/IMAGE_TEST";
export const SUBSCRIBED_STORIES = "story/SUBSCRIBED_STORIES";

const getStoriesAction = (stories) => ({
	type: GET_STORIES,
	payload: stories,
});
const getSubscribedStoriesAction = (stories) => ({
	type: SUBSCRIBED_STORIES,
	payload: stories.subscribedStories,
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
const imageTestAction = (data) => ({
	type: IMAGE_TEST,
	payload: data
});

const initialState = { stories: [], tags: [], loaded: false };

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
    const { title, images, tags, content, authorId } = createStoryObj
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


		const response = await fetch("/api/story/create", {
			method: "POST",
			body: formData
	});

	console.log(response);

	if (response.ok) {
		const data = await response.json();
		dispatch(createStoryAction(data));
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

//define new action type
const UPDATE_CLAP_COUNT = "story/UPDATE_CLAP_COUNT";

// //create an action creator function
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


export const storyImageTest = () => async (dispatch) => {
	const response = await fetch("/api/story/imagetest", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(imageTestAction(data));
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

export const updateClapAction = (data) => ({
	type: UPDATE_CLAP_COUNT,
	payload: data,
})

export const updateClapCount = (storyId) => async (dispatch) => {
	const response = await fetch(`/api/story/${storyId}/clap`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		}
	})
	if (response.ok) {
		const data = await response.json();
		dispatch(updateClapAction({ storyId, claps: data.totalClaps }));
		return null;
	// } else if (response.status < 500) {
	// 	const data = await response.json();
	// 	if (data.errors) {
	// 		return data.errors;
	// 	}
	// } else {
	// 	return ["An error occurred. Please try again."];
	// }
	} else {
		const data = await response.json();
		return data;
	}
}

const REMOVE_CLAP = "story/REMOVE_CLAP";

const removeClapAction = (payload) => ({
	type: REMOVE_CLAP,
	payload,
})


export const removeClap = (storyId ) => async (dispatch) => {
	const response = await fetch(`/api/story/${storyId}/clap`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	})
	if (response.ok) {
		const data = await response.json();
		dispatch(removeClapAction({ storyId, claps: data.totalClaps }));
		return null;
	// } else if (response.status < 500) {
	// 	const data = await response.json();
	// 	if (data.errors) {
	// 		return data.errors;
	// 	}
	// } else {
	// 	return ["An error occurred. Please try again."];
	// }
	} else {
		const data = await response.json();
		return data;
	}
}

//define new action type
const POST_COMMENT = "story/POST_COMMENT";

// //create an action creator function
const postCommentAction = (comment) => ({
	type: POST_COMMENT,
	payload: comment,
})


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

//define new action type
const EDIT_COMMENT = "story/EDIT_COMMENT";

//create an action creator function
const editCommentAction = (comment) => ({
	type: EDIT_COMMENT,
	payload: comment,
})

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


//define new action type
const DELETE_COMMENT = "story/DELETE_COMMENT";

//create an action creator function
const deleteCommentAction = (commentId) => ({
	type: DELETE_COMMENT,
	payload: commentId,
})

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


export const followAuthor = (id) => async (dispatch) => {
	const response = await fetch(`/api/follow/${id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		}
	});
	if (response.ok) {
		const data = await response.json();
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

//define new action type
const ADD_COMMENT_CLAP = "story/ADD_COMMENT_CLAP";

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


//define new action type
const REMOVE_COMMENT_CLAP = "story/REMOVE_COMMENT_CLAP";

//create an action creator function
const removeCommentClapAction = (payload) => ({
	type: REMOVE_COMMENT_CLAP,
	payload,
})

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

		
		case IMAGE_TEST:
			console.log(action.payload);
			return {image: action.payload.image, image2: action.payload.image2 };




		case GET_STORIES:
			return {stories: action.payload.stories };

		case INITIAL_LOAD:
			console.log(action.payload);
			return {stories: action.payload.stories, userStories: action.payload.userStories, tags: action.payload.tags, loaded: true };

			return {...newState};
		
		case UPDATE_CLAP_COUNT:
			const {storyId, claps} = action.payload;
			const updatedStories = state.stories.map((story) => {
				if (story.id === storyId) {
					return {
						...story,
						claps: claps
					};
				}
				return story;
			})
			return {
				...state,
				stories: updatedStories
			}

		case REMOVE_CLAP: {
			const {storyId, claps} = action.payload;
			const updatedStories = state.stories.map((story) => {
				if (story.id === storyId) {
					return {
						...story,
						claps: claps
					};
				}
				return story;
			})
			return {
				...state,
				stories: updatedStories
			}
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