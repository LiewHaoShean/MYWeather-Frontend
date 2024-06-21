import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrAction, resetSuccessAction } from "../globalAction/globalActions";


const initialState = {
    loading: false,
    error: null,
    users: [],
    user: {},
    isNotVerify: null,
    profile: {},
    userAuth: {
        loading: false,
        isLoggedIn: false,
        error: null,
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    },
    isEdited: false,
    isOtpSent: false,
    isOtpValidated: false,
    isPasswordChange: false,
};

//register action
export const registerUserAction = createAsyncThunk(
    "users/register",
    async({fullname, email, password, phoneNumber, age}, {rejectWithValue, getState, dispatch})=>{
        try{
            //make http request
            const {data} = await axios.post(`${baseURL.serverURL}/users/register`,{
                fullname, email, password, phoneNumber, age
            });
            return data;
            // return window.open(`${baseURL.clientURL}/users/`)
        }catch (error){
            return rejectWithValue(error?.response?.data);
            
        }
    }
);

export const loginUserAction = createAsyncThunk(
    "users/login",
    async({email, password}, {rejectWithValue, getState, dispatch})=>{
        try{
            const {data} = await axios.post(`${baseURL.serverURL}/users/login`, {
                email, password
            });
            localStorage.setItem('userInfo', JSON.stringify(data))
            return data;
        }catch(error){
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const verifyUserEmail = createAsyncThunk(
    "users/verify-email",
    async(token, {rejectWithValue, getState, dispatch})=> {
        try{
            const {data} = await axios.get(`${baseURL.serverURL}/users/verify-email/${token}`, {
                token
            });
            return data;
        }catch(error){
            console.log(error)
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const logoutUserAction = createAsyncThunk(
    "user/logout",
    async(payload, {rejectWithValue, getState, dispatch})=> {
        try{
            localStorage.removeItem('userInfo')
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const fetchAllUserAction = createAsyncThunk(
    "user/getAllUser",
    async(payload, {rejectWithValue, getState, dispatch})=>{
        try{
            const {data} = await axios.get(`${baseURL.serverURL}/users/allUser`);
            return data
        }catch(error){
            return rejectWithValue(error?.response?.data)
        }
    }
);

export const getUserProfileAction = createAsyncThunk(
    "user/userProfile",
    async(payload, {rejectWithValue, getState, dipatch})=>{
        try{
            const token = getState().users.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.get(`${baseURL.serverURL}/users/profile`,
                config
            );
            return data;
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const editUserProfileAction = createAsyncThunk(
    "user/editUserProfile",
    async(payload, {rejectWithValue, getState, dispatch})=>{
        try{
            console.log(payload)
            const {fullname, email, age, phoneNumber} = payload;
            const token = getState().users.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.put(`${baseURL.serverURL}/users/editUser`,
                {fullname, email, age, phoneNumber},
                config
            );
            return data;
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const generateOtpAction = createAsyncThunk(
    "user/generateOtp",
    async({email}, {rejectWithValue, getState, dispatch})=>{
        try{
            const {data} = await axios.post(`${baseURL.serverURL}/users/generateOtp`, {
                email
            });
            return data
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const validateOtpCodeAction = createAsyncThunk(
    "user/validateOtp",
    async(otpNumber, {rejectWithValue, getState, dispatch})=>{
        try{
            const email = getState().users?.user?.data?.email;
            const {data} = await axios.post(`${baseURL.serverURL}/users/validateOtp`, {
                email, otpNumber
            });
            return data
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const changePasswordAction = createAsyncThunk(
    "user/changePassword",
    async({password}, {rejectWithValue, getState, dispatch})=>{
        try{
            const email = getState().users?.user?.data?.email;
            const {data} = await axios.post(`${baseURL.serverURL}/users/changePassword`, {
                email, password
            });
            return data
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
)

//userSlice
const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder)=>{
        //login
        builder.addCase(loginUserAction.pending, (state, action)=>{
            state.userAuth.loading = true;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth.userInfo = action.payload;
            state.userAuth.loading = false;
            state.userAuth.isLoggedIn = true;
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userAuth.error = action.payload;
            state.userAuth.loading = false;
            state.userAuth.isLoggedIn = true;
        });
        //register
        builder.addCase(registerUserAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.isNotVerify = true;
        });
        builder.addCase(registerUserAction.rejected, (state, action)=>{
            state.error = action.payload;
            state.loading = false;
        });
        //reset error action
        builder.addCase(resetErrAction.pending, (state)=>{
            state.userAuth.error = null;
            state.error = null;
        });
        //reset success
        builder.addCase(resetSuccessAction.pending, (state)=>{
            state.userAuth.isLoggedIn = false;
            state.isEdited = false;
            state.isOtpSent = false;
            state.isOtpValidated = true;
            state.isPasswordChange = true;
        })
        //verify-email
        builder.addCase(verifyUserEmail.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(verifyUserEmail.fulfilled, (state, action)=>{
            state.loading = false;
            state.isNotVerify = false;
            state.user = action.payload;
        });
        builder.addCase(verifyUserEmail.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        });
        //logout
        builder.addCase(logoutUserAction.fulfilled, (state, action)=> {
            state.userAuth.userInfo = null;
        })
        //getAllUser
        builder.addCase(fetchAllUserAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchAllUserAction.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchAllUserAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        //getUserProfile
        builder.addCase(getUserProfileAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(getUserProfileAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        //editProfile
        builder.addCase(editUserProfileAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(editUserProfileAction.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.isEdited = true;
        });
        builder.addCase(editUserProfileAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.isEdited = false;
        });
        //generateOtp
        builder.addCase(generateOtpAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(generateOtpAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.isOtpSent = true;
            state.user = action.payload;
        });
        builder.addCase(generateOtpAction.rejected, (state, action)=> {
            state.loading = false;
            state.isOtpSent = false;
            state.error = action.payload;
        });
        //vallidateOtp
        builder.addCase(validateOtpCodeAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(validateOtpCodeAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.isOtpValidated = true;
            state.user = action.payload;
        });
        builder.addCase(validateOtpCodeAction.rejected, (state, action)=> {
            state.loading = false;
            state.isOtpValidated = false;
            state.error = action.payload;
        });
        //changePassword
        builder.addCase(changePasswordAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(changePasswordAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.isPasswordChange = true;
            state.user = action.payload;
        });
        builder.addCase(changePasswordAction.rejected, (state, action)=> {
            state.loading = false;
            state.isPasswordChange = false;
            state.error = action.payload;
        });
    }
});

const userReducer = userSlice.reducer;

export default userReducer;
