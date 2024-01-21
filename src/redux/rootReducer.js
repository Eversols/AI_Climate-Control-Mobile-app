import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../../src/redux/slices/authSlice'

const rootReducer = combineReducers({
     authReducer, 
  });
export default rootReducer;
