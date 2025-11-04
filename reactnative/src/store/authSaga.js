import {call, put, takeLatest} from 'redux-saga/effects';
import {authenticateUser} from '../api/authApi';
import {loginFailure, loginRequest, loginSuccess} from './authSlice';

function* handleLogin(action) {
  try {
    const credentials = action.payload;
    const data = yield call(authenticateUser, credentials);
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}

export default authSaga;
