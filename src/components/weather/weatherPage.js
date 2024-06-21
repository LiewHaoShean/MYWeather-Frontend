import Navbar from "../homepage/navbar";
import "../../typingAnimation.css";
import cloudyMorning from './cloudyMorning.mp4';
import React from 'react';
import { FaSearch, FaYoutube } from 'react-icons/fa';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentWeather, getDailyWeather } from "../../redux/slices/weather/weatherSlice";
import { useGeolocation } from "@uidotdev/usehooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faCloudBolt, faCloudMoon, faCloudRain, faCloudSun, faCompass, faDroplet, faEye, faHourglassHalf, faLocationArrow, faSun, faTemperatureLow, faWind } from "@fortawesome/free-solid-svg-icons";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import "../../index.css";
import ErrorMsg from "../global/erroMsg";
import SuccessMsg from "../global/successMsg";
import MapComponent from "./mapComponent";


export default function WeatherPage() {

    useEffect(() => {
        // Add the custom class to the body element
        document.body.style.overflow = 'hidden';
    
        // Cleanup function to remove the class when the component is unmounted
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, []);

    const state = useGeolocation();

    const dispatch = useDispatch();

    useEffect(()=>{
        // console.log(state.latitude);
        dispatch(getCurrentWeather(`${state.latitude},${state.longitude}`));
    },[state])

      
    const [location, setLocation] = useState("");

    useEffect(()=>{
        dispatch(getCurrentWeather(location))
    }, [])


    const submitBtnHandler = (e) => {
        e.preventDefault();
        dispatch(getCurrentWeather(location));
    };

    const [isHidden, setIsHidden] = useState(false);
    
    const {loading, error, currentWeatherData, dailyWeatherData} = useSelector(state=>state?.weather);
    
    const weatherData = currentWeatherData?.data?.current;

    const currentLocation = currentWeatherData?.data?.location;
    
    const hourlyDailyForecast = dailyWeatherData?.dailyForecast[0]?.forecast;

    const containerRef = useRef(null);

    const [hasValue, setHasValue] = useState(false);

    const onChangeHandler = (e) =>{
        setLocation(e.target.value);
        setHasValue(e.target.value.length > 0);
    };

    const isNotNull = (value) => {
        return value === "No matching location found.";
    };

    useEffect(()=>{
        if(currentLocation?.region){
            dispatch(getDailyWeather(currentLocation.region))
        }
    },[currentLocation]);

    useEffect(() => {
      const handleScroll = () => {
        // Set the scroll level (in pixels) at which you want to hide the div
        const scrollLevel = 79;
  
        if (containerRef?.current?.scrollTop > scrollLevel) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
      };
  
      const container = containerRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
      }
  
      // Cleanup the event listener on component unmount
      return () => {
        if (container) {
          container.removeEventListener('scroll', handleScroll);
        }
      };
    }, [containerRef?.current?.scrollTop]);

    const {isCompleted, payment} = useSelector((state)=>state?.payment);

    const [uvSuggestion, setUvSuggestion] = useState("");
    const [airQualitySuggestion, setAirQualitySuggestion] = useState("");
    const [weatherSuggestion, setWeatherSuggestion] = useState("");

    useEffect(() => {
        const uv = weatherData?.uv;
        if (uv >= 4) {
        setUvSuggestion("Use UV protection");
        } else {
        setUvSuggestion("No UV protection required");
        }

        const airQuality = weatherData?.air_quality;
        if (airQuality >= 150) {
        setAirQualitySuggestion("Wear face mask");
        } else {
        setAirQualitySuggestion("Healthy air quality");
        }

        const condition = weatherData?.condition?.text?.toLowerCase();
        if (condition?.includes('rain') || condition?.includes('fog') || condition?.includes('mist') || condition?.includes('drizzle')) {
            setWeatherSuggestion("Indoor activities, Baking, Yoga, Indoor gym, Board game, Watching movies, Documentaries");
        } else{
            setWeatherSuggestion("Outdoor activities, Car washing, Picnic, Hiking");
        }
    }, [weatherData, hourlyDailyForecast]);

    if (!state?.latitude || !state?.longitude) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {isCompleted && <SuccessMsg message={payment?.message}/>}
            <Navbar />
            {error && <ErrorMsg message={error.message}/>}
            {isNotNull(currentWeatherData?.data?.error?.message) && <ErrorMsg message={currentWeatherData?.data?.error?.message}/>}
            <div className="mt-14 h-screen flex flex-col">
                <video autoPlay loop muted id='video' className="absolute z-[-1] w-full left-0 custom-video-scale">
                    <source src={cloudyMorning} className="z-[-1]" type="video/mp4"/>
                </video>
                <header className="bg-transparent z-50 flex flex-row flex-wrap justify-center content-center fixed w-full h-[15%]">
                    <div className="w-fit px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-5xl font-bold tracking-tight text-white font-inter">Current Weather</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-transparent" >
                        <div className="relative group">
                            <input
                                type="text"
                                className={`p-2 pl-4 w-12 h-12 bg-transparent border-2 border-white rounded-full box-border text-white text-lg outline-none transition-all duration-500 ease-in-out group-hover:w-[350px] focus:border-white group-hover:rounded-xl group-hover:bg-transparent ${hasValue && 'w-[350px] rounded-xl bg-transparent'}`}
                                onChange={onChangeHandler}
                            />
                            <FaSearch className={`absolute top-1/2 right-3.5 transform -translate-y-1/2 text-white text-xl transition-opacity duration-200 ${hasValue && 'right-6'}`} onClick={submitBtnHandler} />
                        </div>
                    </div>
                </header>
                <div className="flex flex-row h-[30%] w-full flex-wrap content-center justify-evenly fixed mt-20 z-20">
                    <div className="flex flex-row flex-wrap content-center justify-evenly w-[95%]">
                        <div className=" h-[15rem] w-[50%]  rounded-lg ml-2 ">
                            <div className="h-full w-full flex flex-col content-center justify-center flex-wrap">
                                {loading ? (
                                    <Stack sx={{ color: 'white' }} spacing={2} direction="row">
                                        <CircularProgress color="inherit" size={80}/>
                                    </Stack>
                                ) : (
                                <>
                                    <div className="h-4/6 z-40">
                                        <div className={`w-fit h-full m-auto flex flex-row content-center justify-center flex-wrap py-4  duration-1000 ${isHidden ? 'border-none' : 'border-white border-b-2'}`}>
                                            <img src={`${weatherData?.condition?.icon}`} className={`text-9xl w-24 text-white duration-1000 ${isHidden ? 'hidden' : 'opacity-100'}`}/>
                                            <div className={`flex flex-col justify-between content-center flex-wrap `}>
                                                <h1 className={`m-auto text-7xl font-poetsen text-white transition-opacity duration-1000 ${isHidden ? 'hidden' : 'opacity-100'}`}>{weatherData?.temp_c} °C</h1>
                                                <h1 className={`font-poetsen m-auto text-5xl text-white ${isHidden ? 'hidden' : 'opacity-100'}`}>{weatherData?.condition?.text.split(" ")[1]} {weatherData?.condition?.text.split(" ")[2]}</h1>
                                                <h1 className={`${isHidden ? 'transition duration-1000 text-5xl text-white font-poetsen' : 'hidden'} text-center`}>{currentLocation?.name}</h1>
                                                <h1 className={`${isHidden ? 'text-3xl text-white m-auto font-poetsen' : 'hidden'}`}> {weatherData?.temp_c} °C | {weatherData?.condition?.text}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`h-2/6 w-full flex flex-col content-center justify-evenly flex-wrap z-10 transition-opacity duration-100 ${isHidden ? 'opacity-0' : 'opacity-100'}`}>
                                        <div className="flex flex-row content-center justify-center flex-wrap w-4/6 text-white text-2xl">
                                            <FontAwesomeIcon icon={faLocationArrow} className="mt-1 mx-2"/>
                                            <h2 className="font-inter font-semibold">{currentLocation?.name}, {currentLocation?.country}</h2>
                                        </div>
                                        <div className="flex flex-row content-center justify-center flex-wrap w-4/6 text-white text-2xl">
                                            <FontAwesomeIcon icon={faCalendarDays} className="mt-1 mx-2"/>
                                            <h2 className="font-inter font-semibold">{currentLocation?.localtime}</h2>
                                        </div>
                                    </div>
                                </>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[12rem] w-full">

                </div>
                <div className="container mx-auto w-full mt-10 z-30 h-[62%]">
                    <div className="relative h-full overflow-hidden ">
                        <div className="absolute inset-0 p-4 overflow-auto text-white scrollable-content-y" ref={containerRef}>
                            <div className="flex flex-row w-full mb-4 mt-24">
                                <div className="w-[60rem] mx h-[13rem] m-auto">
                                        <div className="m-auto bg-sky-100/50 h-[13rem] rounded-2xl flex flex-col ">
                                            <div className="h-1/6 ">
                                                <div className="h-full ml-6 flex flex-row mt-2 border-0 border-b-2 border-white">
                                                    <FontAwesomeIcon icon={faHourglassHalf} className="text-2xl pl-4 pt-1 text-white"/>
                                                    <h1 className="font-inter font-semibold text-2xl h-full text-white pl-2">Hourly ForeCast</h1>
                                                </div>
                                            </div>
                                            <div className="h-5/6 my-4 flex flex-row justify-start content-center overflow-hidden ml-4 relative">
                                                <div className="absolute inset-0 overflow-x-auto overflow-y-hidden flex flex-row scrollable-content">
                                                    {hourlyDailyForecast?.hourly.map((hour)=>{
                                                        return (<div className="h-28 w-48 flex flex-col group px-4">
                                                            <h1 className="text-lg text-center h-2/6">{hour.time.split(":")[0]}:{hour.time.split(":")[1]}</h1>
                                                            <img src={`${hour.info.condition.icon}`} className="text-5xl h-2/6 my-4 transition-opacity duration-1000 group-hover:opacity-0"/>
                                                            <span className="absolute top-10 text-xl p-4 hidden group-hover:inline h-2/6 ">{(hour.info.probability.lightrain_percent * 100).toFixed(0)}%</span>
                                                        <h1 className="text-3xl text-center h-3/6">{hour.info.temp.toFixed(0)}°</h1>
                                                    </div>)
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="w-[30rem] bg-sky-100/50 h-[13rem] m-auto rounded-2xl">
                                    <MapComponent lat={state?.latitude} lng={state?.longitude} />
                                </div>
                            </div>
                                
                            <div className="w-full h-fit flex flex-row">
                                <div className="m-auto bg-sky-100/50 w-[50rem] h-[23rem] rounded-2xl flex flex-col">
                                    <div className="h-1/6 ">
                                        <div className="border-b-2 border-white h-12 mx-6 ">
                                            <h1 className="font-inter font-semibold text-2xl h-full text-white mt-2 pt-2 pl-2">Today Highlights</h1>
                                        </div>
                                    </div>
                                    <div className="h-5/6 my-4">
                                        <div className=" grid mx-6 h-full grid-rows-2 grid-cols-4 py-4 gap-4 ">
                                            <div className="w-full h-full shadow-white shadow-md2 rounded-lg bg-sky-100/50 text-white flex flex-col flex-wrap content-center justify-evenly font-inter font-semibold">
                                                <FontAwesomeIcon icon={faWind} className="text-3xl"/>
                                                <h1 className="text-xl underline">Wind Speed</h1>
                                                <h2 className="text-lg mx-auto">{weatherData?.wind_kph}KM/H</h2>
                                            </div>
                                            <div className="w-full h-full shadow-white shadow-md2 rounded-lg bg-sky-100/50 text-white flex flex-col flex-wrap content-center justify-evenly font-inter font-semibold">
                                                <FontAwesomeIcon icon={faDroplet} className="text-3xl"/>
                                                <h1 className="text-xl underline">Humidity</h1>
                                                <h2 className="text-lg mx-auto">{weatherData?.humidity}%</h2>
                                            </div>
                                            <div className="w-full h-full shadow-white shadow-md2 rounded-lg bg-sky-100/50 text-white flex flex-col flex-wrap content-center justify-evenly font-inter font-semibold">
                                                <FontAwesomeIcon icon={faCloudRain} className="text-3xl"/>
                                                <h1 className="text-xl underline">Precipitation</h1>
                                                <h2 className="text-lg mx-auto">{weatherData?.precip_mm}MM</h2>
                                            </div>
                                            <div className="w-full h-full shadow-white shadow-md2 rounded-lg bg-sky-100/50 text-white flex flex-col flex-wrap content-center justify-evenly font-inter font-semibold">
                                                <FontAwesomeIcon icon={faSun} className="text-3xl"/>
                                                <h1 className="text-xl underline">UV Index</h1>
                                                <h2 className="text-lg mx-auto">{weatherData?.uv} uv</h2>
                                            </div>
                                            <div className="w-full h-full shadow-white shadow-md2 rounded-lg bg-sky-100/50 text-white flex flex-col flex-wrap content-center justify-evenly font-inter font-semibold">
                                                <FontAwesomeIcon icon={faCompass} className="text-3xl"/>
                                                <h1 className="text-xl underline">Wind Direction</h1>
                                                <h2 className="text-lg mx-auto">{weatherData?.wind_dir}</h2>
                                            </div>
                                            <div className="w-full h-full shadow-white shadow-md2 rounded-lg bg-sky-100/50 text-white flex flex-col flex-wrap content-center justify-evenly font-inter font-semibold">
                                                <FontAwesomeIcon icon={faCloudMoon} className="text-3xl"/>
                                                <h1 className="text-lg underline">Cloud Coverage</h1>
                                                <h2 className="text-lg mx-auto">{weatherData?.cloud}%</h2>
                                            </div>
                                            <div className="w-full h-full shadow-white shadow-md2 rounded-lg bg-sky-100/50 text-white flex flex-col flex-wrap content-center justify-evenly font-inter font-semibold">
                                                <FontAwesomeIcon icon={faTemperatureLow} className="text-3xl"/>
                                                <h1 className="text-xl underline">Feels Like</h1>
                                                <h2 className="text-lg mx-auto">{weatherData?.feelslike_c} °C</h2>
                                            </div>
                                            <div className="w-full h-full shadow-white shadow-md2 rounded-lg bg-sky-100/50 text-white flex flex-col flex-wrap content-center justify-evenly font-inter font-semibold">
                                                <FontAwesomeIcon icon={faEye} className="text-3xl"/>
                                                <h1 className="text-xl underline">Visibility</h1>
                                                <h2 className="text-lg mx-auto">{weatherData?.vis_km}KM</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-sky-100/50 rounded-2xl h-[23rem] w-[40rem] flex flex-col m-auto">
                                    <div className="h-1/6 ">
                                        <div className="border-b-2 border-white h-12 mx-6 ">
                                            <h1 className="font-inter font-semibold text-2xl h-full text-white mt-1 pt-2 pl-2">Activity Suggestion</h1>
                                        </div>
                                    </div>
                                    <div className="h-5/6">
                                        <div className="flex flex-row h-full w-40rem mx-6">
                                            <div className="w-full h-full">
                                                <ul className="max-w-md space-y-1 text-white text-xl list-disc list-inside dark:text-gray-400">
                                                    {weatherSuggestion.split(", ").map((cond)=>(
                                                        <li className="ml-4 mt-2">
                                                            {cond}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="w-full h-full">
                                                <ul class="max-w-md space-y-1 text-white text-xl list-inside dark:text-gray-400">
                                                    <li class="flex items-center">
                                                        <svg class="w-5 h-5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                                        </svg>
                                                        {airQualitySuggestion}
                                                    </li>
                                                    <li class="flex items-center">
                                                        <svg class="w-5 h-5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                                        </svg>
                                                        {uvSuggestion}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}