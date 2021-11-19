export const getCurrentUser = (currentUser) => {
	return {
		type: "CURRENT_USER",
		payload: currentUser,
	};
};
