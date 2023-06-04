// constants
const GET_STORIES = "story/GET_STORIES";

const getStoriesAction = (stories) => ({
	type: GET_STORIES,
	payload: stories,
});



const initialState = { stories: [] };


export const getStories = () => async (dispatch) => {

	const response = await fetch("/api/stories", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (response.ok) {
		const data = await response.json();
		console.log(data);
		dispatch(getStoriesAction(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			console.log('errors');
			console.log(data.errors);
			

			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_STORIES:
			return { stories: action.payload };
		default:
			return state;
	}
}