import { put, takeLatest, all } from 'redux-saga/effects/';
import UserService from '../services/api/UserService';
import ThreadService from '../services/api/ThreadService';


function* userLogin(payload) {
  const response = yield UserService.userLogin(payload);
  if (response.status === 200) {
    const token = response.data.token;
    localStorage.setItem('token', token);
    yield put({ type: 'USER_LOGIN_DONE', user: response.data });
  } else {
    yield put({ type: 'USER_LOGIN_FAILED', resource: response.status });
  }
}


function* userSignup(payload) {
  const response = yield UserService.create(payload);
  if (response.status === 201) {
    yield put({ type: 'USER_SIGNUP_DONE', user: payload.data });
  } else {
    yield put({ type: 'USER_SIGNUP_FAILED', userSignupError: response.data.error });
  }
}

function* getUserDetails(payload) {
  const response = yield UserService.getUser(payload);
  if (response.status === 200) {
    yield put({ type: 'GET_USER_DETAILS_DONE', user: response.data });
  } else {
    yield put({ type: 'GET_USER_DETAILS_FAILED' });
  }
}

function* fetchThreads() {
  const response = yield ThreadService.getAllThreads();
  if (response.status === 200) {
    yield put({ type: 'FETCH_THREADS_DONE', threads: response.data.threads });
  } else {
    yield put({ type: 'FETCH_THREADS_FAILD'});
  }
}

function* createThread(payload) {
  const response = yield ThreadService.createThread(payload);
  if (response.status === 201) {
    yield put({ type: 'CREATE_THREAD_DONE', thread: response.data });
  } else {
    yield put({ type: 'CREATE_THREAD_FAILED' });
  }
}

function* actionWatcher() {
  yield takeLatest('USER_LOGIN', userLogin);
  yield takeLatest('USER_SIGNUP', userSignup);
  yield takeLatest('GET_USER_DETAILS', getUserDetails);
  yield takeLatest('FETCH_THREADS', fetchThreads);
  yield takeLatest('CREATE_THREAD', createThread);
}


export default function* rootSage() {
  yield all([
    actionWatcher(),
  ]);
}