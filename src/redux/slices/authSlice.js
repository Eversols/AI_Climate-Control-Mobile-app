
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../utils/axios';

const BASE_URL = 'http://restapi.adequateshop.com/api';

export const signUpAsync = createAsyncThunk('auth/signUp', async (userData) => {
  try {
    const response = await post(`${BASE_URL}/authaccount/registration`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Unknown error';
  }
});

export const signInAsync = createAsyncThunk('auth/signIn', async (userData) => {
  try {
    const response = await post(`${BASE_URL}/authaccount/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Unknown error';
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload ? action.payload.token : null;
      state.user = action.payload ? action.payload.user : null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      })
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
