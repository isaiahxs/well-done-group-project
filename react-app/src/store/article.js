// constants
const GET_ARTICLES = "article/GET_ARTICLES";

const getArticlesAction = (articles) => ({
	type: GET_ARTICLES,
	payload: articles,
});



const initialState = { articles: [] };


export const getArticles = () => async (dispatch) => {
	const response = await fetch("/api/articles/all", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(getArticlesAction(data));
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
	switch (action.type) {
		case GET_ARTICLES:
			return { articles: action.payload };
		default:
			return state;
	}
}