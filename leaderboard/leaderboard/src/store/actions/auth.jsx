import { createActions } from 'redux-actions';
import {
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from '../types/auth';
  
export const {
    loginRequesting,
    loginSuccess,
    loginFailure,
    logout
} = createActions(
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
);