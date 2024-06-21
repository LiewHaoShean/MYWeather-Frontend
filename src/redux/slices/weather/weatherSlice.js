import axios from 'axios';
import baseURL from '../../../utils/baseURL';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resetErrAction } from '../globalAction/globalActions';


const initialState = {
    loading: false,
    error: null,
    isAdded: false,
    currentWeatherData : null,
    forecastWeatherData: null,
    dailyWeatherData: null,
}


//getCurrentWeather
export const getCurrentWeather = createAsyncThunk(
    "weather/currentWeather",
    async(location, {rejectWithValue, getState, dispatch})=>{
        try{
            //make request

            const {data} = await axios.post(`${baseURL.serverURL}/weather/currentWeather`, {
                location
            });
            return data
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
);

//getDailyWeather
export const getDailyWeather = createAsyncThunk(
    "weather/dailyWeather",
    async(location, {rejectWithValue, getState, dispatch})=>{
        console.log(location);
        try{
            //make request
            const {data} = await axios.post(`${baseURL.serverURL}/weather/dailyWeather`, {
                location
            });
            return data
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const getWeeklyWeather = createAsyncThunk(
    "weather/weeklyWeather",
    async(location, {rejectWithValue, getState, dispatch})=>{
        try{
            //make request
            const {data} = await axios.post(`${baseURL.serverURL}/weather/weeklyWeather`,{
                location
            })
            return data
        }catch(error){
            return rejectWithValue(error?.response?.data);
        }
    }
)



const weatherSlice = createSlice({
    name: "weather",
    initialState,
    extraReducers: (builder)=>{
        //currentWeather
        builder.addCase(getCurrentWeather.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(getCurrentWeather.fulfilled, (state, action)=>{
            state.currentWeatherData = action.payload;
            state.loading = false;
        });
        builder.addCase(getCurrentWeather.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        //dailyWeather
        builder.addCase(getDailyWeather.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(getDailyWeather.fulfilled, (state, action)=>{
            state.dailyWeatherData = action.payload;
            state.loading = false;
        });
        builder.addCase(getDailyWeather.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        //weeklyWeather
        builder.addCase(getWeeklyWeather.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(getWeeklyWeather.fulfilled, (state, action)=>{
            state.forecastWeatherData = action.payload;
            state.loading = false;
            state.isAdded = true;
        });
        builder.addCase(getWeeklyWeather.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        //reset error action
        builder.addCase(resetErrAction.pending, (state)=>{
            state.currentWeatherData = null;
            state.error = null;
            state.loading = true;
            state.forecastWeatherData = null;
        });
    }
})

const weatherReducer = weatherSlice.reducer;

export default weatherReducer