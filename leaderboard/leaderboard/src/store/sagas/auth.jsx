import { call, put, takeLatest } from 'redux-saga/effects';
import Apis from '../../utils/Apis'
import {
    LOGIN_REQUESTING,
} from '../types/auth';
import {
    loginSuccess,
    loginFailure,
} from '../actions/auth'

export function * loginSaga({payload}) {
    try {
        const response = yield call(Apis.login, payload);
        console.log("loginSaga response", response);
        if(response.status === 200) {
            yield put(loginSuccess(response.data));
        }
    } catch(e) {
        yield put(loginFailure(e.response.data));
    }
}

export const authSagas = [
    takeLatest(LOGIN_REQUESTING, loginSaga)
];