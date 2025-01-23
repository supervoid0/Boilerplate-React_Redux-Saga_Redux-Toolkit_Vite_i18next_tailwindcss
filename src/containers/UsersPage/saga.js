import { api } from '../../utils';
import { generateAuthHeader } from '../../utils/functions';
import { buildQuery } from '../../utils/queryBuilder';
import { showError } from '../App/reducer';
import { makeSelectToken } from '../App/selectors';
import {
  getUsers,
  createUser,
  editUser,
  deleteUser,
  getUsersSuccess,
  getUsersFailed,
  deleteUserSuccess,
  editUserSuccess,
  editUserFailed,
  createUserSuccess,
  createUserFailed,
  deleteUserFailed,
} from './reducer';
import { call, put, select, takeLatest } from 'redux-saga/effects';

function* getUsersWorker() {
  const token = yield select(makeSelectToken());
  const authHeader = yield call(generateAuthHeader, token);
  const query = {};
  const queryString = buildQuery(query);
  try {
    const { users } = yield call(api.user.getUsers, queryString, authHeader);
    yield put(getUsersSuccess(users));
  } catch (error) {
    yield put(getUsersFailed());
    yield put(showError(error));
  }
}

function* deleteUserWorker({ payload }) {
  const userID = payload;
  const token = yield select(makeSelectToken());
  const authHeader = yield call(generateAuthHeader, token);
  try {
    const { user } = yield call(api.user.deleteAnotherUser, userID, authHeader);
    yield put(deleteUserSuccess(user));
    yield put(getUsers());
  } catch (error) {
    yield put(deleteUserFailed(error));
    yield put(showError(error));
  }
}

function* createUserWorker({ payload }) {
  const token = yield select(makeSelectToken());
  const authHeader = yield call(generateAuthHeader, token);
  const form = { ...payload };
  try {
    const { user } = yield call(api.user.createUser, form, authHeader);
    yield put(createUserSuccess(user));
    yield put(getUsers());
  } catch (error) {
    yield put(createUserFailed(error));
    yield put(showError(error));
  }
}

function* updateUserWorker({ payload }) {
  const form = payload;
  const { userID } = form;
  const token = yield select(makeSelectToken());
  const authHeader = yield call(generateAuthHeader, token);
  try {
    const { user } = yield call(
      api.user.updateAnotherUser,
      authHeader,
      userID,
      form,
    );
    yield put(editUserSuccess(user));
    yield put(getUsers());
  } catch (error) {
    yield put(editUserFailed(error));
    yield put(showError(error));
  }
}

export default function* usersPageSaga() {
  yield takeLatest(getUsers.type, getUsersWorker);
  yield takeLatest(editUser.type, updateUserWorker);
  yield takeLatest(deleteUser.type, deleteUserWorker);
  yield takeLatest(createUser.type, createUserWorker);
}
