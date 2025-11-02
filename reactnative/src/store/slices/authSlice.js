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
    loginRequested(state) {
      state.status = 'loading';
      state.error = null;
    },
    loginSucceeded(state, action) {
      state.status = 'succeeded';
      state.user = action.payload?.user ?? null;
      state.error = null;
    },
    loginFailed(state, action) {
      state.status = 'failed';
      state.error = action.payload?.message ?? 'Unable to sign in right now.';
    },
    resetAuth() {
      return initialState;
    },
  },
});

export const {loginRequested, loginSucceeded, loginFailed, resetAuth} =
  authSlice.actions;

export default authSlice.reducer;

