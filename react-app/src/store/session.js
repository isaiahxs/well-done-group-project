// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const USER_SEARCH = "session/USER_SEARCH";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const userSearch = (data) => ({
	type: USER_SEARCH,
	payload: data,

});

const initialState = { user: null, search: null };

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
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const search = (searchQuery) => async (dispatch) => {
	console.log('searching');
	console.log('searching');
	console.log('searching');
	console.log('searching');
	const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
	if (response.ok) {
		console.log('ye sok');
		const data = await response.json();
		dispatch(userSearch(data));
	}
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
			return {...newState, user: action.payload.user };
		case REMOVE_USER:
			return {...newState, user: null };
		case USER_SEARCH:
			return {...newState, search: action.payload };		


		default:
			return newState;
	}
}