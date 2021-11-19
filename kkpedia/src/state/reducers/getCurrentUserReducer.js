const getCurrentUserReducer = (state = {}, action) => {
	switch (action.type) {
		case "CURRENT_USER":
			return (state = action.payload);
		default:
			return state;
	}
};

export default getCurrentUserReducer;
