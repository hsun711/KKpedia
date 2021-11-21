import { combineReducers } from "redux";
import getCurrentUserReducer from "./getCurrentUserReducer";
import getCategoriesReducer from "./getCategoriesReducer";

const allReducers = combineReducers({
	currentUser: getCurrentUserReducer,
	allCategories: getCategoriesReducer,
});

export default allReducers;
