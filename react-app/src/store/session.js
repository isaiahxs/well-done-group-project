
// constants
import {SUBSCRIBED_STORIES, FOLLOW_AUTHOR, UNFOLLOW_AUTHOR} from './story'
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const NEW_SEARCH = "session/NEW_SEARCH";
const REMOVE_SEARCH = "session/REMOVE_SEARCH";
const SET_FEED = "session/SET_FEED";
const SET_SUB_FEED = "session/SET_SUB_FEED";


export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

console.log('here');
console.log('here');
console.log('here');
console.log('here');
console.log('here');
console.log('here');
console.log('here');
console.log('here');
console.log('here');


const removeUser = () => ({
	type: REMOVE_USER,
});

const newSearch = (data) => ({
	type: NEW_SEARCH,
	payload: data,
});

const removeSearchAction = (searchQuery) => ({
	type: REMOVE_SEARCH,
	payload: searchQuery,
});

const setFeedAction = (feed) => ({
	type: SET_FEED,
	payload: feed,
});

const setSubFeedAction = (subFeed) => ({
	type: SET_SUB_FEED,
	payload: subFeed,
});



const initialState = { user: null, search: {}, currentFeed: 'for you', subFeed: null, subscribedStories: [] };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const signin = (credentials) => async (dispatch) => {
	const { email, password } = credentials
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
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

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const search = (searchQuery) => async (dispatch) => {

	const response = await fetch(`/api/search?q=${searchQuery}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(newSearch(data));
		dispatch(setFeedAction(searchQuery))

	}
};

export const removeSearch = (searchQuery) => async (dispatch) => {
	dispatch(removeSearchAction(searchQuery));
};

export const setFeed = (feed) => async (dispatch) => {
	dispatch(setFeedAction(feed));
};

export const setSubFeed = (subFeed) => async (dispatch) => {
	console.log(subFeed);
	dispatch(setSubFeedAction(subFeed));
};

export const signUp = (credentials) => async (dispatch) => {
	const {email, password, firstName, lastName, profileImage, username} = credentials

	console.log(email, password, firstName, lastName, profileImage, username);
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		}, 
		body: JSON.stringify({
			username,
			email,
			password,
			first_name:firstName,
			last_name:lastName,
			profile_image:profileImage
		}),
	});
 
	console.log(response);

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			console.log(data.errors);
			return data;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	const newState = {...state}
	switch (action.type) {
		case SET_USER:
			return {...newState, user: action.payload.user, subscribedStories: action.payload.subscribedStories, userStories: action.payload.userStories, followedAuthorIds:action.payload.followedAuthorIds, };		
		case FOLLOW_AUTHOR: {
				const {authorId} = action.payload;
				let newFollowedAuthorIds = [...newState.followedAuthorIds];  
				if(!newFollowedAuthorIds.includes(authorId)) {  
					newFollowedAuthorIds.push(authorId);  
				}
				return {...newState, followedAuthorIds: newFollowedAuthorIds};
		}
		case UNFOLLOW_AUTHOR: {
				const {authorId} = action.payload;
				let newFollowedAuthorIds = newState.followedAuthorIds.filter(id => id !== authorId); 
				return {...newState, followedAuthorIds: newFollowedAuthorIds};
		}
		case REMOVE_USER:
			return initialState;
		case NEW_SEARCH:
			const newSearch = {...newState.search}
			newSearch[action.payload.search] = action.payload
			return {...newState, search: newSearch};		
		case REMOVE_SEARCH:{
			const newSearch = {...newState.search}
			delete newSearch[action.payload]
			return {...newState, search: newSearch };		
		}
		case SET_FEED:{
			return {...newState, currentFeed: action.payload };		
		}
		case SET_SUB_FEED:{
			return {...newState, subFeed: action.payload };		
		}
		case SUBSCRIBED_STORIES:
			console.log('here');
			return {...newState, subscribedStories: action.payload};		
		

		default:
			return newState;
	}
}