export const getCurrentUser = (currentUser) => {
  return {
    type: "CURRENT_USER",
    payload: currentUser,
  };
};

export const getCategories = (categories) => {
  return {
    type: "ALL_CATEGORIES",
    payload: categories,
  };
};
