
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../utils/axios';



const initialState = {

  pestImage: null,
  loading: false,
  error: null,
}

const pestSlice = createSlice({
  name: "pest",
  initialState,
  reducers: {
    setPestImage: (state, { payload }) => {
      console.log("payloadlllllllllllllllllllllllll", payload)
      state.pestImage = payload
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

export const { setPestImage } = pestSlice.actions;

export default pestSlice.reducer;