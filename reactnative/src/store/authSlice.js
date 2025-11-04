import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess(state, action) {
      state.status = 'succeeded';
      state.user = action.payload;
      state.error = null;
    },
    loginFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
      state.user = null;
    },
    resetAuth() {
      return initialState;
    },
  },
});

export const {loginRequest, loginSuccess, loginFailure, resetAuth} = authSlice.actions;

export default authSlice.reducer;
