import {
    USER_REGISTRATION_INITIATED,
    USER_REGISTRATION_FAILED,
    USER_REGISTRATION_SUCCESS,
    USER_LOGIN_INITIATED,
    USER_LOGIN_FAILED,
    USER_LOGIN_SUCCESS,
    LOAD_USER_INITIATED,
    LOAD_USER_FAILED,
    LOAD_USER_SUCCESS,
    LOAD_USERSTO_FAILED,
    LOAD_USERSTO_INITIATED,
    LOAD_USERSTO_SUCCESS,
    LOGOUT_USER,
} from '../../types';


export const usersignup = (name, email, mobileno, password) => async (dispatch, getState) => {
    //console.log("name, email, mobileno, password", name, email, mobileno, password);

    const url = "http://192.168.43.57:8080/newuser"
    console.log("...", url);

    const header = {
        'Content-Type': 'application/json'
    }

    const body = {
        "name": name,
        "email": email,
        "mobileno": mobileno,
        "password": password
    }

    dispatch({
        type: USER_REGISTRATION_INITIATED
    })

    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.ok) {
            response.json()
        } else {
            dispatch({
                type: USER_REGISTRATION_FAILED
            })
        }
    }).then((data) => {
        dispatch({
            type: USER_REGISTRATION_SUCCESS,
        })
    }).catch((err) => {
        dispatch({
            type: USER_REGISTRATION_FAILED
        })
    })

}

export const userlogin = (email, mobileno, password) => async (dispatch, getState) => {
    //console.log("email, mobileno, password", email, mobileno, password);


    const url = "http://192.168.43.57:8080/login"
    const header = {
        'Content-Type': 'application/json'
    }

    const body = {
        "email": email,
        "mobileno": mobileno,
        "password": password
    }

    dispatch({
        type: USER_LOGIN_INITIATED
    })

    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.ok) {
            console.log("respooo", response);
            return response.json()
        }
        else {
            dispatch({
                type: USER_LOGIN_FAILED
            })
        }
    }).then((data) => {
        console.log("data", data);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.result
        })
    }).catch((err) => {
        console.log("errr", err);

    })
}

export const loaduser = (token) => async (dispatch, getState) => {
    const url = "http://192.168.43.57:8080/loaduser"

    const header = {
        'Content-Type': 'application/json'
    }

    const body = {
        "token": token
    }

    dispatch({
        type: LOAD_USER_INITIATED
    })

    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            dispatch({
                type: LOAD_USER_FAILED,
                error: "LOAD_USER_FAILED"
            })
        }
    }).then((data) => {
        if (data) {
            // console.log('data',data);

            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: data.result
            })
        }
    }).catch((err) => {
        console.log("err", err);
    })
}

export const searchUserForTo = (mobileno) => async (dispatch, getState) => {

    if (mobileno.length > 3) {
        const url = "http://192.168.43.57:8080/loadusersto"

        const header = {
            'Content-Type': 'application/json',
            'authtoken': getState().user.token
        }

        const body = {
            "mobileno": mobileno
        }

        dispatch({
            type: LOAD_USERSTO_INITIATED
        })

        fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                dispatch({
                    type: LOAD_USERSTO_FAILED
                })
            }
        }).then((data) => {
            // console.log(data);

            if (data) {
                dispatch({
                    type: LOAD_USERSTO_SUCCESS,
                    payload: data.result
                })
            }
        }).catch((err) => {
            console.log(err);

        })
    } else if (mobileno.length <= 3) {
        dispatch({
            type: LOAD_USERSTO_INITIATED
        })
    } else if (mobileno.length > 10) {
        dispatch({
            type: LOAD_USERSTO_FAILED,
            "error": "USER NOT FOUND"
        })
    }
}

export const logout = () => async (dispatch, getState) => {
    dispatch({
        type: LOGOUT_USER
    })
}