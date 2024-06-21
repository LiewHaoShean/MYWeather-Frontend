import { FaSearch } from "react-icons/fa";
import Navbar from "../homepage/navbar";
import cloudyVid from './CloudVid.mp4';
import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useState } from "react";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentWeather, getWeeklyWeather } from "../../redux/slices/weather/weatherSlice";
import "../../typingAnimation.css";
import "../../index.css";
import { useGeolocation } from "@uidotdev/usehooks";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorMsg from "../global/erroMsg";
import NotifyMsg from "../global/notifyMsg";

export default function ForecastPage(){

    useEffect(() => {
        // Add the custom class to the body element
        document.body.style.overflow = 'hidden';
    
        // Cleanup function to remove the class when the component is unmounted
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, []);
    
    const dispatch = useDispatch();

    const [location, setLocation] = useState("");

    const state = useGeolocation();

    useEffect(()=>{
        dispatch(getCurrentWeather(`${state.latitude},${state.longitude}`));
    },[state]);

    const {loading, currentWeatherData, forecastWeatherData, isAdded} = useSelector(state=>state?.weather);

    const currentLocation = currentWeatherData?.data?.location;

    useEffect(()=>{
        if(currentLocation?.region){
            dispatch(getWeeklyWeather(currentLocation.region))
        }
    },[currentLocation])


    const onChangeHandler = (e) =>{
        setLocation(e.target.value);
    };

    const submitBtnHandler = (e) => {
        e.preventDefault();
        dispatch(getWeeklyWeather(location));
    };    
      
    const [expandedForecasts, setExpandedForecasts] = useState([]);

    const toggleForecast = (index) => {
        setExpandedForecasts((prevExpandedForecasts) => {
        const newExpandedForecasts = [...prevExpandedForecasts];
        newExpandedForecasts[index] = !newExpandedForecasts[index];
        return newExpandedForecasts;
        });
    };

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const getNextDays = () => {
        const today = new Date();
        let startDay = today.getDay();// Get current day index (0-6)
        startDay += 1
        const nextDays = [];

        for (let i = 0; i < 7; i++) {
            const dayIndex = (startDay + i) % 7; // Calculate the day index for each of the next 7 days
            nextDays.push(daysOfWeek[dayIndex]);
        }

        return nextDays;
    };

    const dayNames = getNextDays();

    const isNotNull = (value) => {
        return value === "No matching location found.";
    };

    console.log(forecastWeatherData?.weeklyWeatherForecast.length === 0);

    return (
        <>
            <Navbar />
            {isNotNull(currentWeatherData?.data?.error?.message) && <ErrorMsg message={currentWeatherData?.data?.error?.message}/>}
            <video autoPlay loop muted id='video' className="absolute  z-[-1] w-full left-0 cloud-video-scale">
                <source src={cloudyVid} className="z-[-1]" type="video/mp4"/>
            </video>
            <div className="mt-14 flex flex-col flex-wrap h-screen">
                <header className="bg-transparent flex h-1/6 flex-row flex-wrap justify-center content-center w-full mt-3">
                    <div className="w-fit px-4 py-6 sm:px-6 lg:px-8 flex flex-row">
                        <RiCalendarScheduleLine className="text-5xl mt-1 text-white"/>
                        <h1 className="text-5xl font-bold tracking-tight text-white ">7-Days Weather Forecast</h1>
                    </div>
                    <div className="relative flex flex-row flex-wrap justify-center content-center">
                        <button className="absolute right-0 top-5 mt-1.5 mr-1.5 w-12 h-12 text-white bg-transparent focus:outline-none flex flex-row flex-wrap content-center justify-center">
                            <FaSearch onClick={submitBtnHandler}/>
                        </button>
                        <input
                            type="text"
                            className="h-12  p-2 text-lg outline-none pr-10 text-white placeholder-white placeholder-opacity-50 w-72 bg-transparent border-t-0 border-l-0 border-r-0 border-b-2 focus:border-none border-white rounded-none focus:outline-none"
                            placeholder="Search location..."
                            onChange={onChangeHandler}
                        />
                    </div>
                </header>
                <div className="w-full h-[36rem] flex flex-col flex-wrap justify-start content-center overflow-hidden">
                    {loading ? (
                    <div className="mt-20">
                        <Stack sx={{ color: 'white' }} spacing={2} direction="row">
                            <CircularProgress color="inherit" size={80}/>
                        </Stack>
                    </div>) : (
                    <div className="w-fit h-full flex flex-col justify-normal content-center overflow-y-auto scrollable-content-y">
                        {(forecastWeatherData?.weeklyWeatherForecast.length===0) ? (<NotifyMsg message="Please enter an valid location" title="No matching location found!"/>) : (
                        forecastWeatherData?.weeklyWeatherForecast[0]?.forecast.map((weeklyWeather, index) => (
                            <div key={index} className="bg-slate-700/50 rounded-lg shadow-lg p-6 w-[50rem] mt-4">
                                <div className="flex justify-between items-center w-full">
                                <div>
                                    <h1 className="text-3xl font-bold text-white">{dayNames[index]}</h1>
                                    <p className="text-lg text-white">{weeklyWeather.datetime}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex flex-col">
                                    <span className="text-4xl text-center pl-2 text-white">{weeklyWeather.daily_info.day_temp.toFixed(0)}°</span>
                                    <span className="text-sm text-slate-300">temperature</span>
                                    </div>
                                    <span className="text-7xl font-thin text-white">/</span>
                                    <div className="flex flex-col">
                                    <span className="text-sm text-slate-300">humidity</span>
                                    <span className="text-4xl text-center pr-2 text-white">{weeklyWeather.daily_info.day_humidity.toFixed(0)}%</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <img src={`${weeklyWeather.daily_info.condition.icon}`} alt="weather icon" className="w-12 h-12" />
                                    <span className="text-3xl font-semibold text-white w-32 text-center">{weeklyWeather.daily_info.condition.prediction}</span>
                                </div>
                                <button onClick={() => toggleForecast(index)} className="focus:outline-none">
                                    {expandedForecasts[index] ? <IoIosArrowUp className="w-6 h-6" /> : <IoIosArrowDown className="w-6 h-6" />}
                                </button>
                                </div>
                                {expandedForecasts[index] && (
                                <div className="mt-4 ">
                                    <div className="bg-slate-600 rounded-md shadow-md2">
                                        <div className="max-h-96 overflow-y-auto scrollable-content-y">
                                            <div className="sticky top-0  px-4 py-2 rounded-md bg-slate-600 text-white">
                                                <div className="flex justify-between p-2 border-b last:border-0">
                                                    <span className="w-[12.5%] text-center text-xl font-bold underline">Time</span>
                                                    <span className="w-[12.5%] text-center text-xl font-bold underline">Temp</span>
                                                    <span className="w-[12.5%] text-center text-xl font-bold underline">FeelsLike</span>
                                                    <span className="w-[12.5%] text-center text-xl font-bold underline">Precip</span>
                                                    <span className="w-[12.5%] text-center text-xl font-bold underline">Hum</span>
                                                    <span className="w-[12.5%] text-center text-xl font-bold underline">Visibility</span>
                                                    <span className="w-[25%] text-center text-xl font-bold underline">Condition</span>
                                                </div>
                                            </div>
                                            {weeklyWeather.hourly.map((hourly) => (
                                            <div className="px-4 py-2" key={hourly.time}>
                                                <div className="flex justify-between p-2 border-b last:border-0 text-white text-lg text-center">
                                                    <span className="w-[12.5%] ">{hourly.time.split(":")[0]}:{hourly.time.split(":")[1]}</span>
                                                    <span className="w-[12.5%]">{hourly.info.temp.toFixed(1)}°</span>
                                                    <span className="w-[12.5%]">{hourly.info.feelslike.toFixed(1)}°</span>
                                                    <span className="w-[12.5%]">{hourly.info.precip.toFixed(2)}mm</span>
                                                    <span className="w-[12.5%]">{hourly.info.humidity.toFixed(1)}%</span>
                                                    <span className="w-[12.5%]">{hourly.info.visibility.toFixed(1)}km</span>
                                                    <span className="w-[25%] text-center flex flex-row justify-center"><img src={`${hourly.info.condition.icon}`} alt="weather icon" className="w-8 h-8" /><h1 className="mt-1 px-2 text-lg">{hourly.info.condition.prediction}</h1></span>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>
                        )))}
                    </div>)}
                </div>
            </div>
        </>
    )
}
