import {
    USER_LOGIN_INITIATED,
    USER_LOGIN_FAILED,
    USER_LOGIN_SUCCESS,
    USER_REGISTRATION_INITIATED,
    USER_REGISTRATION_FAILED,
    USER_REGISTRATION_SUCCESS,
    LOAD_USER_INITIATED,
    LOAD_USER_FAILED,
    LOAD_USER_SUCCESS,
    NEW_TRANSACTION_INITIATED,
    NEW_TRANSACTION_FAILED,
    NEW_TRANSACTION_SUCCESS,
    SET_HEADERS_AUTHTOKEN,
    LOAD_USERSTO_FAILED,
    LOAD_USERSTO_SUCCESS,
    LOAD_USERSTO_INITIATED,
    LOGOUT_USER,
} from '../../types';

const initialState = {
    error: "",
    initiated: "false",
    signedup: "false",
    loggedin: localStorage.getItem('loggedin'),
    name: localStorage.getItem('name'),
    mobileno: "",
    email: "",
    token: localStorage.getItem('authtoken'),
    txs: [{
        to: "",
        from: "",
        amount: "",
        txid: "",
        txat: ""
    }],
    usersto: [],
}

const userops = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_INITIATED: {
            state = {
                ...state,
                initiated: "true",
                error: "",
            }
            return state;
        }
        case LOAD_USER_FAILED: {
            state = {
                ...state,
                initiated: "false",
                error: "LOAD_USER_FAILED"
            }
            return state;
        }
        case LOAD_USER_SUCCESS: {

            state = {
                ...state,
                initiated: "false",
                loggedin: "true",
                error: "",
                name: action.payload.name,
                mobileno: action.payload.mobileno,
                email: action.payload.email,
                token: action.payload.authtoken,
                txs: action.payload.txs
            }

            return state;
        }
        case USER_REGISTRATION_INITIATED: {
            state = {
                ...state,
                initiated: "true",
                signedup: "false",
                error: "",
            }
            return state;
        }
        case USER_REGISTRATION_FAILED: {
            state = {
                ...state,
                initiated: "false",
                signedup: "false",
                error: "USER_REGISTRATION_FAILED"
            }
            return state;
        }
        case USER_REGISTRATION_SUCCESS: {
            state = {
                ...state,
                initiated: "false",
                signedup: "true",
                error: "",
            }
            return state;
        }
        case USER_LOGIN_INITIATED: {
            state = {
                ...state,
                initiated: "true",
                loggedin: "false",
                error: "",
            }
            return state;
        }
        case USER_LOGIN_FAILED: {
            state = {
                ...state,
                initiated: "false",
                loggedin: "false",
                error: "USER_LOGIN_FAILED"
            }
            return state;
        }
        case USER_LOGIN_SUCCESS: {
            // console.log("dsfsdfdfdfdfdfdfdfd");

            localStorage.setItem('loggedin', 'true')
            localStorage.setItem('authtoken', action.payload.authtoken)
            localStorage.setItem('name', action.payload.name)
            state = {
                ...state,
                initiated: "false",
                loggedin: "true",
                error: "",
                name: action.payload.name,
                mobileno: action.payload.mobileno,
                email: action.payload.email,
                token: action.payload.authtoken,
                txs: action.payload.txs
            }
            console.log('stt', state);

            return state;
        }
        case SET_HEADERS_AUTHTOKEN: {
            state = {
                ...state,
            }
            return state;
        }
        case NEW_TRANSACTION_INITIATED: {
            state = {
                ...state,
                initiated: "true"
            }
            return state;
        }
        case NEW_TRANSACTION_FAILED: {
            state = {
                ...state,
                initiated: "false",
                error: "NEW_TRANSACTION_FAILED"
            }
            return state;
        }
        case NEW_TRANSACTION_SUCCESS: {

            return state;
        }
        case LOAD_USERSTO_INITIATED: {
            state = {
                ...state,
                usersto: []
            }
            return state;
        }
        case LOAD_USERSTO_FAILED: {
            state = {
                ...state,
                usersto: []
            }
            return state;
        }
        case LOAD_USERSTO_SUCCESS: {
            state = {
                ...state,
                usersto: action.payload.result
            }
            return state;
        }
        case LOGOUT_USER: {

            localStorage.clear();
            state = initialState;
            return state;
        }
        default:
            return state;
    }
}

export default userops;