// constants
const GET_STORIES = "story/GET_STORIES";

const getStoriesAction = (stories) => ({
	type: GET_STORIES,
	payload: stories,
});

const INITIAL_LOAD = "story/INITIAL_LOAD";

//used to have `payload: data,` after type but then changed it so payload has stories and currentStory
const initialLoadAction = (data) => ({
	type: INITIAL_LOAD,
	payload: data
});

//what i tried, but then realized we might not need to do a currentStory since we can key into stories
// payload: {
// 	stories: data.stories,
// 	currentStory: data.currentStory, //this is the current story
// }

const initialState = { stories: [], tags: [], loaded: false };

export const initialLoad = () => async (dispatch) => {
	// const response = await fetch("/api/story", {
	const response = await fetch("/api/story/initialize", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (response.ok) {
		const data = await response.json();

		console.log(data);
 
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

export const updateClapAction = (data) => ({
	type: "UPDATE_CLAP_COUNT",
	payload: data
});

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

export const removeClap = (storyId ) => async (dispatch) => {
	const response = await fetch(`/api/story/${storyId}/clap`, {
		method: "DELETE",
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

//define new action type
const POST_COMMENT = "story/POST_COMMENT";

//create an action creator function
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



//first version
export default function reducer(state = initialState, action) {
	const newState = {...state}
	switch (action.type) {
		case GET_STORIES:
			return {stories: action.payload.stories };
		case INITIAL_LOAD:
			console.log(action.payload);
			return {stories: action.payload.stories, tags: action.payload.tags, loaded: true };

			return {...newState};
		
		case 'UPDATE_CLAP_COUNT':
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

		case 'REMOVE_CLAP': {
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

		case 'POST_COMMENT': {
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

		default:
			return state;
	}
}