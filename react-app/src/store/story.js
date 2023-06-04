// constants
const GET_STORIES = "story/GET_STORIES";

const getStoriesAction = (stories) => ({
	type: GET_STORIES,
	payload: stories,
});

const INITIAL_LOAD = "story/INITIAL_LOAD";

const initialLoadAction = (data) => ({
	type: INITIAL_LOAD,
	payload: data,
});



const initialState = { stories: [], tags: [] };

export const initialLoad = () => async (dispatch) => {

	// const response = await fetch("/api/story", {
	const response = await fetch("/api/init/", {
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






export default function reducer(state = initialState, action) {
	const newState = {...state}
	switch (action.type) {
		case GET_STORIES:
			return {stories: action.payload.stories };
		case INITIAL_LOAD:
			console.log(action.payload);
			return {...newState};
			
		default:
			return state;
	}
}