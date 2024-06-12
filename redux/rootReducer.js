import { reducer } from "./reducer";
import { combineReducers } from "redux";
import WorkSheetReducer from "./slices/worksheetSlice";


export default combineReducers({
    reducer, WorkSheetReducer
});