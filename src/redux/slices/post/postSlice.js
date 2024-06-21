import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrAction, resetSuccessAction } from "../globalAction/globalActions";

const initialState = {
    loading: false,
    error: null,
    isCreated: false,
    post: null,
    posts: [],
    isFound: false,
    userLikes: [],
    mostLikePost: null,
}

export const createPostAction = createAsyncThunk(
    "post/createPost",
    async(payload, {rejectWithValue, getState, dispatch})=>{
        try{
            const {title, description, tag, files} = payload;
            //make req
            const token = getState().users.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            };
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('tag', tag);

            files.forEach((image)=>{
                formData.append("files", image);
            })
            console.log(formData)
            const {data} = await axios.post(`${baseURL.serverURL}/post/createPost`,
                formData,
                config
            );
            return data
        } catch (error){
            console.log(error);
            return rejectWithValue(error?.response.data);
        }
    }
);

export const fetchOwnPostAction = createAsyncThunk(
    "post/getOwnPost",
    async(payload, {rejectWithValue, getState, dispatch})=>{
        try{
            //make req
            const token = getState().users.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const {data} = await axios.get(`${baseURL.serverURL}/post/fetchOwnPost`,
                config
            );
            return data
        } catch (error) {
            return rejectWithValue(error?.response.data);
        }
    }
)
 
export const fetchAllPostAction = createAsyncThunk(
    "post/getAllPost",
    async(payload, {rejectWithValue, getState, dispatch})=>{
        try{
            const token = getState().users.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.get(`${baseURL.serverURL}/post/fetchAllpost`,
                config
            );
            return data
        } catch (error) {
            return rejectWithValue(error?.response.data);
        }
    }
);

export const fetchOnePostAction = createAsyncThunk(
    "post/getOnePost",
    async(postId, {rejectWithValue, getState, dispatch})=>{
        const token = getState().users.userAuth.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try{
            const {data} = await axios.get(`${baseURL.serverURL}/post/fetchOnePost/${postId}`,
                config
            );
            return data
        }catch (error) {
            return rejectWithValue(error?.response.data);
        }
    }
);

export const fetchMostLikePostAction = createAsyncThunk(
    "post/getMostLikePost",
    async(payload, {rejectWithValue, getState, dispatch})=>{
        const token = getState().users.userAuth.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try{
            const {data} = await axios.get(`${baseURL.serverURL}/post/fetchMostLikePost`,
                config
            );
            return data
        }catch(error){
            return rejectWithValue(error?.response.data);
        }
    }
)

const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        //create
        builder.addCase(createPostAction.pending, (state)=>{
            state.loading = true;
        });
        builder.addCase(createPostAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.post = action.payload;
            state.isCreated = true;
        });
        builder.addCase(createPostAction.rejected, (state, action)=>{
            state.loading = false;
            state.post = null;
            state.isCreated = false;
            state.error = action.payload;
        });
        // reset success
        builder.addCase(resetSuccessAction.pending, (state, action)=>{
            state.isCreated = false;
        });
        //reset error action
        builder.addCase(resetErrAction.pending, (state)=>{
            state.error = null;
        });
        ///getOwnPost
        builder.addCase(fetchOwnPostAction.pending, (state)=>{
            state.loading = true;
        });
        builder.addCase(fetchOwnPostAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.posts = action.payload;
            state.error = null;
            state.isFound = true;
        });
        builder.addCase(fetchOwnPostAction.rejected, (state, action)=>{
            state.loading = false;
            state.posts = null;
            state.error = action.payload;
            state.isFound = false;
        });
        ///getAllPost
        builder.addCase(fetchAllPostAction.pending, (state)=>{
            state.loading = true;
        });
        builder.addCase(fetchAllPostAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.posts = action.payload;
            state.error = null;
            state.isFound = true;
        });
        builder.addCase(fetchAllPostAction.rejected, (state, action)=>{
            state.loading = false;
            state.posts = null;
            state.error = action.payload;
            state.isFound = false;
        });
        ///getOnePost
        builder.addCase(fetchOnePostAction.pending, (state)=>{
            state.loading = true;
        });
        builder.addCase(fetchOnePostAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.post = action.payload;
            state.error = null;
            state.isFound = true;
        });
        builder.addCase(fetchOnePostAction.rejected, (state, action)=>{
            state.loading = false;
            state.post = null;
            state.error = action.payload;
            state.isFound = false;
        });
        ///getMostLikePost
        builder.addCase(fetchMostLikePostAction.pending, (state)=>{
            state.loading = true;
        });
        builder.addCase(fetchMostLikePostAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.mostLikePost = action.payload;
            state.error = null;
        });
        builder.addCase(fetchMostLikePostAction.rejected, (state, action)=>{
            state.loading = false;
            state.mostLikePost = null;
            state.error = action.payload;
        });
    }
});

const postReducer = postSlice.reducer;

export default postReducer;