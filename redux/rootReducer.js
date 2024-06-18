import { reducer } from "./reducer";
import { combineReducers } from "redux";
import WorkSheetReducer from "./slices/worksheetSlice";
import GuestListReducer from "./slices/guestListSlice";
import NoticeListReducer from "./slices/noticeListSlice";
import SeminarListReducer from "./slices/seminarListSlice";
import TargetAndAchiveReducer from "./slices/targetAndAchiveSlice";


export default combineReducers({
    reducer, 
    WorkSheetReducer, 
    GuestListReducer,
    NoticeListReducer,
    SeminarListReducer,
    TargetAndAchiveReducer,
});