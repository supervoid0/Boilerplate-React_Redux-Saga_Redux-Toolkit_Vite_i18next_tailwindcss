import { api } from '../../utils';
import { generateAuthHeader } from '../../utils/functions';

import {
  loadUser,
  attemptLogout,
  authError,
  onLoadUserSuccess,
  attemptLogoutSuccess,
  attemptLogoutFailed,
  showMiscError,
  showError,
} from './reducer';
import { makeSelectToken } from './selectors';
import { call, put, takeLatest, select } from 'redux-saga/effects';

function* logout() {
  const token = yield select(makeSelectToken());
  const authHeader = yield call(generateAuthHeader, token);
  try {
    try {
      if (localStorage.getItem('token'))
        yield call(api.user.logout, authHeader);
    } catch (error) {
      yield put(
        showMiscError(
          'Could not complete API call for logout. Check your connection or contact support',
        ),
      );
    }
    yield put(attemptLogoutSuccess());
  } catch (error) {
    yield put(attemptLogoutFailed());
    yield put(showError(error));
  }
}

function* loadingUser() {
  const token = yield select(makeSelectToken());
  const authHeader = yield call(generateAuthHeader, token);
  try {
    const { user } = yield call(api.user.loadUser, authHeader);
    if (user) yield put(onLoadUserSuccess(user));
    else yield put(authError('No user found'));
  } catch (error) {
    yield put(
      authError(error.response ? error.response.data.message : error.message),
    );
  }
}

export default function* appSaga() {
  yield takeLatest(loadUser.type, loadingUser);
  yield takeLatest(attemptLogout.type, logout);
}
