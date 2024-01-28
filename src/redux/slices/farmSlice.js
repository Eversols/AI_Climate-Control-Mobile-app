
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../utils/axios';



const initialState = {

  farmData: null,
  farmList: [],
  loading: false,
  error: null,
}

const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    storeFarmData: (state, { payload }) => {
      console.log("payload...", payload)
      state.farmData = payload
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(signUpAsync.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })

  },
});

export const { storeFarmData } = farmSlice.actions;

export default farmSlice.reducer;