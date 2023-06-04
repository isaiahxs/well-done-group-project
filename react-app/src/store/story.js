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





//first version
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
//map over array, have an accum which is an object, stick a key on that object of whatever you're iterating over's id, story.id into the accumulator
// instead of user, it'll be story and story.id to get a dictionary of normalized data
// so we could key into it at the state level

//don's suggestion
// users: conversation.users.reduce((userAcc, user) => {
// 	userAcc[user.username] = user;
// 	return userAcc;
//   }, {}),

//second version modified with currentStory
// export default function reducer(state = initialState, action) {
// 	switch (action.type) {
// 		case GET_STORIES:
// 			return { ...state, stories: action.payload.stories };

// 		case INITIAL_LOAD:
// 			return {
// 				...state,
// 				stories: action.payload.stories,
// 				currentStory: action.payload.currentStory, // Add this line to update the current story
// 			};

// 		default:
// 			return state;
// 	}
// }


//initialLoadAction is responsible for updating the 'stories' state in the Redux store. we can modify it to include currentStory property and set it to the desired story.

//in the reducer, we can modify the INITIAL_LOAD case to update the 'stories' and 'currentStory' properties in the state