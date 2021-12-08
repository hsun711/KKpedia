const getCurrentUserReducer = (state = {}, action) => {
	switch (action.type) {
		case "CURRENT_USER":
			return action.payload;
		default:
			return state;
	}
};

export default getCurrentUserReducer;
