import { LOGOUT, POST_LOGIN_FAILURE, POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS } from "../types"

const initLogin = {
    isAuth:false,
    token:"",
    isLoading:false,
    isError:false
}

 
export const AuthReducer  = (state = initLogin, { type , payload }) => {
    switch(type){
        case POST_LOGIN_REQUEST : {
            return{
                ...state,
                isLoading:true,
                isError:false,
                isAuth:false
            }
        }
        case POST_LOGIN_SUCCESS : {
            return{
                ...state,
                isAuth:true,
                isLoading:false,
                isError:false,
                token:payload,
            }
        }
        case POST_LOGIN_FAILURE : {
            return{
                ...state,
                isError:true,
                isLoading:false,
                token:""
            }
        }
        case LOGOUT : {
            return {
                ...state,
                isError:false,
                isLoading:false,
                token:""
            }
        }
        default:
            return state
    }
}