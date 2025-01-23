import { api } from '../../utils';
import { loginFailure, loginSuccess, showMiscError } from '../App/reducer';
import { attemptLogin, setLoading } from './reducer';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* loginWorker({ payload }) {
  try {
    const form = payload;
    const {
      payload: { user, token },
    } = yield call(api.user.login, form);
    yield put(loginSuccess({ user, token }));
  } catch (err) {
    yield put(loginFailure(err));
    yield put(showMiscError(err));
  } finally {
    yield put(setLoading(false));
  }
}

export default function* LoginSaga() {
  yield takeLatest(attemptLogin.type, loginWorker);
}
