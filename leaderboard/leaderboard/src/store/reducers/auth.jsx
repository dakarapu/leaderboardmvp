import { handleActions } from 'redux-actions';
import { 
    loginRequesting,
    loginSuccess,
    loginFailure,
    logout
} from '../actions/auth';

  
const initialState = () => {
    const access_token = localStorage.getItem('access_token');
    return ({
        requesting: false,
        user: {},
        message: {},
        error: {},
    })
};

export default handleActions(
    {
        [loginRequesting]: (state) => {
            return {
                ...state,
                email: '',
                message: { body: 'Logging in...', time: new Date() },
                error: {},
            }
        },

        [loginSuccess]: (state, {payload}) => {
            localStorage.setItem('access_token', payload.email);
            console.log("access_token", payload.email);
            return {
                ...state,
                requesting: false,
                authenticated: 1,
                email: payload.email,
                message: {},
                error: {},
            }
        },

        [loginFailure]: (state, {payload}) => {
            console.log("loginFailure -------", payload);
            return {
                ...state,
                requesting: false,
                authenticated: -1,
                message: {},
                error: {
                    body: payload,
                    time: new Date(),
                },
            }
        },

        [logout]: (state) => {
            localStorage.removeItem('access_token');
  
            return {
                ...state, authenticated: 0
            }
        },
        
        // [resetPassword]: (state, {payload}) => {
        //     return {
        //         ...state, resetPassword: true,
        //    }
        // },
    },
    initialState()
);