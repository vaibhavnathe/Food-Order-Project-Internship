import axios from "axios";
import { 
    CLEAR_ERRORS, 
    FORGOT_PASSWORD_FAIL, 
    FORGOT_PASSWORD_REQUEST, 
    FORGOT_PASSWORD_SUCCESS, 
    LOAD_USER_FAIL, 
    LOAD_USER_REQUEST, 
    LOAD_USER_SUCCESS, 
    LOGIN_FAIL, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT_FAIL, 
    LOGOUT_SUCCESS, 
    NEW_PASSOWRD_FAIL, 
    NEW_PASSOWRD_REQUEST, 
    NEW_PASSOWRD_SUCCESS, 
    REGISTER_USER_FAIL, 
    REGISTER_USER_REQUEST, 
    REGISTER_USER_SUCCESS, 
    UPDATE_PASSWORD_FAIL, 
    UPDATE_PASSWORD_REQUEST, 
    UPDATE_PASSWORD_SUCCESS, 
    UPDATE_PROFILE_FAIL, 
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS} from "../constants/userConstant"

export const login = (email, password) => async(dispatch) => {

    try{
        dispatch({type:LOGIN_REQUEST});
        const config = {
            headers:{
                "Content-Type" : "application/json",
            } 
        };

        const {data} = await axios.post(
            "/api/v1/users/login", 
            {email, password},
            config
        );

        dispatch({
            type:LOGIN_SUCCESS, 
            payload: data.data.user,
        });


    }catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: "Login Failed"
        })
    }
}


// Register
export const register = (userData)=> async(dispatch) => {
    
    try{

        dispatch({type: REGISTER_USER_REQUEST});
        const config = {
            headers:{"Content-Type" : "multipart/fprm-data"},
        };

        const {data} = await axios.post('/api/v1/users/signup', userData, config);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.data.user,
        });

        return data.data.user; // useful if the calling function needs this data

    }catch(error){
        dispatch({type:REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Load User Action

export const loadUser = () => async(dispatch) =>{
    try{

        dispatch({type: LOAD_USER_REQUEST});

        const {data} = await axios.get('/api/v1/users/me')
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload:data.user
        });

    }catch(error){
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.response.data.message
        })
    }
}

// Update User
export const updateProfile = (userData) => async(dispatch) => {
    try{
        dispatch({type: UPDATE_PROFILE_REQUEST});
        const config = {
            headers:{
                "Content-Type" : "multipart/form-data",
            }, 
        };

        const {data} = await axios.put("/api/v1/users/me/update", userData, config);
        dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success});
    }
    catch(error){
        dispatch({type: UPDATE_PROFILE_FAIL, payload: error.response.data.message})
    }
}


// Logout Action
export const logout = () => async(dispatch) => {
    try{
        await axios.get('/api/v1/users/logout');
        dispatch({
            type: LOGOUT_SUCCESS,
        });

    }catch(error){
        dispatch({
            type:LOGOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Clear Errors
export const clearErrors = () => async(dispatch) =>{

    dispatch({
        type: CLEAR_ERRORS,
    });
};

// Forgot Password
export const updatePassword = (passwords) => async(dispatch) => {
    try{
        dispatch({type: UPDATE_PASSWORD_REQUEST});
        const config = ({
            headers:{
                "Content-Type" : "application/json"
            },
        });
        const {data} = await axios.put("/api/v1/users/password/update", passwords,config);

        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        });
    }
    catch(error){
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Forgot Password
export const forgotPassword = (email) => async(dispatch) => {
    try{
        dispatch({type: FORGOT_PASSWORD_REQUEST});
        const config = {
            headers: {
                "Content-Type" : "application/json",
            }
        };

        const {data} = await axios.post("/api/v1/users/forgetPassword", email, config);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Reset Password
export const resetPassword = (token, passwords) => async(dispatch) => {
    try{
        dispatch({type:NEW_PASSOWRD_REQUEST});
        const config = {
            headers: {
                "Content-Type" : "application/json",
            }
        };

        const {data} = await axios.patch(`/api/v1/users/resetPassword/${token}`, passwords, config);

        dispatch({
            type: NEW_PASSOWRD_SUCCESS,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: NEW_PASSOWRD_FAIL,
            payload: error.response.data.message,
        })
    }
}