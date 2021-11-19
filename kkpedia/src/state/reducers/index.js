import { combineReducers } from "redux";
import getCurrentUserReducer from "./getCurrentUserReducer";

const allReducers = combineReducers({
	currentUser: getCurrentUserReducer,
});

export default allReducers;
