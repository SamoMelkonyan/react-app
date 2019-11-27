import { combineReducers } from "redux";
import companies from "./companies";
import employees from "./employees";

export default combineReducers({
    companies,
    employees
});