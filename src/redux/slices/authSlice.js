
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../utils/axios';
import { storeToken } from '../../utils/StorageToken';

const BASE_URL = 'http://climate.axiscodingsolutions.com/api/v1';

export const signUpAsync = createAsyncThunk('auth/signUp', async (userData) => {
  try {
    const response = await post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
});

export const signInAsync = createAsyncThunk('auth/signIn', async (userData) => {
  try {
    const response = await post(`${BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    fields: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      role: 'User',
      occupation: '',
    },
    loading: false,
    error: null,
  },
  reducers: {
    resetFields: (state) => {
      state.fields = {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        role: 'User',
        occupation: '',
      };
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
        state.fields = {
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
          role: 'User',
          occupation: '',
        };
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        console.log('Action Payload:', action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        storeToken(action.payload.token)

        // state.fields = {
        //   email: '',
        //   password: '',
        // };
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetFields } = authSlice.actions;

export default authSlice.reducer;