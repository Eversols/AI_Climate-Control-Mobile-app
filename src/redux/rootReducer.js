import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../../src/redux/slices/authSlice'
import farm from '../../src/redux/slices/farmSlice'

const rootReducer = combineReducers({
  authReducer,
  farm
});
export default rootReducer;
