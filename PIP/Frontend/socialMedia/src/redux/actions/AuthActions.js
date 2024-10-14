import { LOGOUT, POST_LOGIN_FAILURE, POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS ,POST_REGISTER_FAILURE,POST_REGISTER_REQUEST, POST_REGISTER_SUCCESS} from "../types"


export const loginRequest= () => {
    return{
        type:POST_LOGIN_REQUEST
    }
}

export const loginSuccess = (payload) => {
    return{
        type:POST_LOGIN_SUCCESS,
        payload
    }
}

export const loginFailure= () => {
    return{
        type:POST_LOGIN_FAILURE
    }
}

export const RegisterRequest= () => {
    return{
        type:POST_REGISTER_REQUEST
    }
}

export const RegisterSuccess = (payload) => {
    return{
        type:POST_REGISTER_SUCCESS,
        payload
    }
}

export const RegisterFailure= () => {
    return{
        type:POST_REGISTER_FAILURE
    }
}

export const Logout = () => {
    return {
        type:LOGOUT
    }
}