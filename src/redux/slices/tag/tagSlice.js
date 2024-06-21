import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrAction, resetSuccessAction } from "../globalAction/globalActions";

const initialState = {
    tagLoading: false,
    tagError: false,
    isTagCreated: false,
    tag: null,
    tags: [],
    isTagDeleted: false,
}

export const createTagAction = createAsyncThunk(
    "tag/createTag",
    async(payload, {rejectWithValue, getState, dispatch})=> {
        try{
            const {color, name} = payload;
            const token = getState().users.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            };
            const {data} = await axios.post(`${baseURL.serverURL}/tag/createTag`,
                {color, name},
                config
            )
            return data
        }catch(error){
            return rejectWithValue(error?.response.data)
        }
    }
);

export const getAllTagAction = createAsyncThunk(
    "tag/fetchAllTag",
    async(payload, {rejectWithValue, getState, dispatch})=>{
        try{
            const {data} = await axios.get(`${baseURL.serverURL}/tag/fetchAllTag`)
            return data
        }catch(error){
            return rejectWithValue(error?.response.data);
        }
    }
)

export const deleteTagAction = createAsyncThunk(
    "tag/removeTag",
    async(payload, {rejectWithValue, getState, dispatch})=>{
        try{
            const tagId = payload
            const token = getState().users.userAuth.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            };
            const {data} = await axios.post(`${baseURL.serverURL}/tag/removeTag`,
                {tagId},
                config
            )
            return data
        }catch(error){
            return rejectWithValue(error?.response.data);
        }
    }
)

const tagSlice = createSlice({
    name: "tag",
    initialState,
    extraReducers: (builder) =>{
        //createTag
        builder.addCase(createTagAction.pending, (state)=>{
            state.tagLoading = true;
        });
        builder.addCase(createTagAction.fulfilled, (state, action)=>{
            state.tagLoading = false;
            state.tagError = null;
            state.tag = action.payload;
            state.isTagCreated = true;
        });
        builder.addCase(createTagAction.rejected, (state, action)=>{
            state.tagLoading = false;
            state.tag =  null;
            state.tagError = action.payload;
            state.isTagCreated = false;
        });
        builder.addCase(resetSuccessAction.pending, (state, action)=>{
            state.isTagCreated = false;
            state.isTagDeleted = false;
        });
        //reset error action
        builder.addCase(resetErrAction.pending, (state)=>{
            state.tagError = null;
        });
        //getAllTag
        builder.addCase(getAllTagAction.pending, (state)=>{
            state.tagLoading = true;
        });
        builder.addCase(getAllTagAction.fulfilled, (state, action)=>{
            state.tagLoading = false;
            state.tagError = null;
            state.tags = action.payload;
        });
        builder.addCase(getAllTagAction.rejected, (state, action)=>{
            state.tagLoading = false;
            state.tags =  null;
            state.tagError = action.payload;
        });
        //removeTag
        builder.addCase(deleteTagAction.pending, (state)=>{
            state.tagLoading = true;
        });
        builder.addCase(deleteTagAction.fulfilled, (state, action)=>{
            state.tagLoading = false;
            state.tagError = null;
            state.tag = action.payload;
            state.isTagDeleted = true;
        });
        builder.addCase(deleteTagAction.rejected, (state, action)=>{
            state.tagLoading = false;
            state.tag =  null;
            state.tagError = action.payload;
            state.isTagDeleted = false;
        });
    }
});

const tagReducer = tagSlice.reducer;
export default tagReducer;