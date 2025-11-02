import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  loginFailed,
  loginRequested,
  loginSucceeded,
} from '../slices/authSlice';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function* handleLogin(action) {
  try {
    const {username} = action.payload ?? {};
    const trimmedUsername = username?.trim() || 'Bret';
    const response = yield call(axios.get, API_URL, {
      params: {username: trimmedUsername},
    });

    const user = Array.isArray(response.data) && response.data.length > 0
      ? response.data[0]
      : {
          id: Date.now(),
          username: trimmedUsername,
          name: 'Guest User',
          email: `${trimmedUsername || 'guest'}@example.com`,
        };

    yield put(loginSucceeded({user}));
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || 'Unknown error occurred';
    yield put(loginFailed({message}));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequested.type, handleLogin);
}

