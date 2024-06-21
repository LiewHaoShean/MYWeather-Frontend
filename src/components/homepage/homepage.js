import React, { useRef, useEffect, useState, Fragment } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../homepage/navbar";
import { Transition } from "@headlessui/react";
import { useTimeoutFn, useWindowScroll } from "react-use";
import { GlobeAsiaAustraliaIcon, MapPinIcon, PlayCircleIcon, ServerStackIcon } from "@heroicons/react/24/outline";
import Footer from "../homepage/footer";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useDispatch, useSelector } from "react-redux";
import { giveFeedbackAction } from "../../redux/slices/feedback/feedbackSlice";
import ErrorMsg from "../global/erroMsg";
import SuccessMsg from "../global/successMsg";
import SuccessNotification from "../global/successNotification";

export default function HomePage(){
    const dispatch = useDispatch();
    const [background, setBackground] = useState(20);

    const parallaxRef = useRef(null);
    const mountain3 = useRef(null);
    const mountain2 = useRef(null);
    const mountain1 = useRef(null);
    const cloudsBottom = useRef(null);
    const cloudsLeft = useRef(null);
    const cloudsRight = useRef(null);
    const stars = useRef(null);
    const sun = useRef(null);
    const copy = useRef(null);
    const btn = useRef(null);

    let [isShowing, setIsShowing] = useState(true);
    let [, , resetIsShowing] = useTimeoutFn(()=> setIsShowing(true), 500);
    const {y: scrollY} = useWindowScroll();

    const triggerAnimation = () =>{
        if(scrollY > 3500){
            setIsShowing(false);
            resetIsShowing();
        }
    }
    React.useEffect(()=>{
        // console.log(scrollY);
        window.addEventListener('scroll', triggerAnimation());
        return () => {
            window.removeEventListener('scroll', triggerAnimation);
        }
    },[scrollY]);

    const [showWeDo, setShowWeDo] = useState(false);

    useEffect(() => {
        const timeout2 = setTimeout(()=>{
            setShowWeDo(true)
        }, 200)

        let ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);
            var tl = gsap.timeline({
                defaults: { duration: 1 },
                scrollTrigger: {
                    trigger: parallaxRef.current,
                    start: "top top",
                    end: "5000 bottom",
                    scrub: true,
                    pin: true,
                    onUpdate: (self) => {
                        setBackground(Math.ceil(self.progress * 100 + 20));
                    },
                },
            });
            tl.to(
                mountain3.current,
                {
                    y: "-=80",
                },
                0
            );
            tl.to(
                mountain2.current,
                {
                    y: "-=30",
                },
                0
            );
            tl.to(
                mountain1.current,
                {
                    y: "+=50",
                },
                0
            );
            tl.to(
                stars.current,
                {
                    top: 0,
                },
                0.5
            );
            tl.to(
                cloudsBottom.current,
                {
                    opacity: 0,
                    duration: 0.5
                },
                0
            );
            tl.to(
                cloudsLeft.current,
                {
                    x: "-20%",
                    opacity: 0,
                },
                0
            );
            tl.to(
                cloudsRight.current,
                {
                    x: "20%",
                    opacity: 0,
                },
                0
            );
            tl.to(
                sun.current,
                {
                    y: "+=210",
                },
                0
            );
            tl.to(
                copy.current,
                {
                    y: "-225%",
                    opacity: 1
                },
                0
            );
            tl.to(
                btn.current,
                {
                    opacity: 1,
                },
                1.5
            );
        });
        return () => ctx.revert();
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useState(()=>{
      localStorage.getItem('userInfo') ? setIsLoggedIn(true) : setIsLoggedIn(false)
    }, []);

    const [feedbackForm, setFeedbackForm] = useState({
        description: "",
        rating: "",
    });

    const onChangeHandler = (e) => {
        setFeedbackForm({...feedbackForm, [e.target.name]: e.target.value});
        console.log(feedbackForm);
    }

    const StyledRating = styled(Rating)(({ theme }) => ({
        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
          color: theme.palette.action.disabled,
        },
      }));
      
      const customIcons = {
        1: {
            icon: (
                <span className="w-12 h-12 flex justify-center items-center">
                  <SentimentVeryDissatisfiedIcon style={{ fontSize: '2.5rem' }} color="error" />
                </span>
              ),
              label: 'Very Dissatisfied',
        },
        2: {
            icon: (
                <span className="w-12 h-12 flex justify-center items-center">
                  <SentimentDissatisfiedIcon style={{ fontSize: '2.5rem' }} color="error" />
                </span>
              ),
              label: 'Dissatisfied',
        },
        3: {
            icon: (
                <span className="w-12 h-12 flex justify-center items-center">
                  <SentimentSatisfiedIcon style={{ fontSize: '2.5rem' }} color="warning" />
                </span>
              ),
              label: 'Neutral',
        },
        4: {
            icon: (
                <span className="w-12 h-12 flex justify-center items-center">
                  <SentimentSatisfiedAltIcon style={{ fontSize: '2.5rem' }} color="success" />
                </span>
              ),
              label: 'Satisfied',
        },
        5: {
            icon: (
                <span className="w-12 h-12 flex justify-center items-center">
                  <SentimentVerySatisfiedIcon style={{ fontSize: '2.5rem' }} color="success" />
                </span>
              ),
              label: 'Very Satisfied',
        },
    };
      
    function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }
      
    IconContainer.propTypes = {
        value: PropTypes.number.isRequired,
    };

    const [ratingValue, setRatingValue] = useState(2);

    const handleRatingChange = (e, newValue) => {
        setRatingValue(newValue);
        setFeedbackForm({...feedbackForm, [e.target.name]: newValue});
    };

    const submitBtnHandler = (e) => {
        e.preventDefault();
        dispatch(giveFeedbackAction(feedbackForm));
        setFeedbackForm("")
    }

    const {loading, isCompleted, error, feedback } = useSelector((state)=>state?.feedback)
    
    const { userAuth } = useSelector((state)=>state?.users)
    return (
        <>
            { userAuth?.isLoggedIn && (
                <SuccessNotification message={userAuth?.userInfo?.message} time={5000}/>
            )}
            <Navbar />
            {error && <ErrorMsg message={error.message}/>}
            {isCompleted && <SuccessNotification message={feedback.message} time={5000}/>}
            <div className="overflow-hidden mt-16 mb-0">
                <div ref={parallaxRef} style={{ background: `linear-gradient(#0F2B9C, #673D7D ${background}%, #A74A67, #EDFC54 )` }} className="relative h-[110vh] w-full">
                    <img ref={mountain3} className="absolute w-full bottom-[-40px] z-30" src="/parallax/mountain-3.svg" />
                    <img ref={mountain2} className="absolute w-full bottom-5 z-20" src="/parallax/mountain-2.svg" />
                    <img ref={mountain1} className="absolute w-full bottom-10 z-10" src="/parallax/mountain-1.svg" />
                    <img ref={sun} className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] " src="/parallax/sun.svg" />
                    <img ref={cloudsBottom} className="absolute bottom-0 w-full" src="/parallax/cloud-bottom.svg" />
                    <img ref={cloudsLeft} className="absolute left-0 w-[20%]" src="/parallax/clouds-left.svg" />
                    <img ref={cloudsRight} className="absolute right-0 w-[20%]" src="/parallax/clouds-right.svg" />
                    <img ref={stars} className="absolute top-[-550px] left-0 w-full" src="/parallax/stars.svg" />
                    <div ref={copy} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0 flex flex-col items-center justify-center text-secondaryColor opacity-0">
                        <h1 className="text-white font-poetsen text-9xl font-semibold my-4 "><span className="text-black font-lobster pr-1">MY</span>Weather</h1>
                        <Link to="/weather" className="mt-4">
                            <span ref={btn} className=" text-black hover:border-2 bg-white hover:border-white transition duration-1000 ease-in-out hover:scale-110 p-4 font-bold rounded-2xl opacity-0 text-2xl ">Explore Now</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="h-[38rem] w-full bg-primaryColor ">
                <div className="w-full h-32 bg-transparent flex flex-col ">
                        <Transition
                        show={showWeDo}
                        enter="transition-opacity duration-2000 ease-out transform"
                        enterFrom="opacity-0 translate-y-[-50px]"
                        enterTo="opacity-100 translate-y-0"
                        >
                            <div className="py-8 flex justify-center">
                                <h1 className="text-white italic text-7xl font-semibold font-caveat">What do we do?</h1>
                            </div>

                            <div className="flex flex-row content-center justify-center flex-wrap pb-10">
                                <Transition
                                as={Fragment}
                                show={isShowing}
                                enter="transform transition duration-[1000ms]"
                                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                                enterTo="opacity-100 rotate-0 scale-100"
                                leave="transform duration-200 transition ease-in-out"
                                leaveFrom="opacity-100 rotate-0 scale-100 "
                                leaveTo="opacity-0 scale-95 "
                                >
                                    <Link to="/forecast">
                                        <div className="h-64 w-72 bg-gray-800 flex flex-col justify-around flex-wrap content-center mx-4">
                                            <div className="m-auto">
                                                <GlobeAsiaAustraliaIcon className="w-32 h-32 text-white"/>
                                            </div>
                                            <h1 className="font-poetsen text-3xl font-semibold text-center text-white mb-2">Advance Weather Forecast</h1>
                                        </div>
                                    </Link>
                                </Transition>

                                <Transition
                                as={Fragment}
                                show={isShowing}
                                enter="transform transition duration-[1000ms]"
                                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                                enterTo="opacity-100 rotate-0 scale-100"
                                leave="transform duration-200 transition ease-in-out"
                                leaveFrom="opacity-100 rotate-0 scale-100 "
                                leaveTo="opacity-0 scale-95 "
                                >
                                    <Link to="weather">
                                        <div className="h-64 w-72 bg-gray-800 flex flex-col justify-around flex-wrap content-center mx-4">
                                            <div className="m-auto">
                                                <MapPinIcon className="w-32 h-32 text-white"/>
                                            </div>
                                            <h1 className="font-poetsen text-3xl font-semibold text-center text-white mb-2">View Current Location Weather</h1>
                                        </div>
                                    </Link>
                                </Transition>
                                
                                <Transition
                                as={Fragment}
                                show={isShowing}
                                enter="transform transition duration-[1000ms]"
                                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                                enterTo="opacity-100 rotate-0 scale-100"
                                leave="transform duration-200 transition ease-in-out"
                                leaveFrom="opacity-100 rotate-0 scale-100 "
                                leaveTo="opacity-0 scale-95 "
                                >
                                    <Link to="forum">
                                        <div className="h-64 w-72 bg-gray-800 flex flex-col justify-around flex-wrap content-center mx-4">
                                            <div className="m-auto">
                                                <ServerStackIcon className="w-32 h-32 text-white"/>
                                            </div>
                                            <h1 className="font-poetsen text-3xl font-semibold text-center text-white mb-2">Interactive<br></br>Weather Forum</h1>
                                        </div>
                                    </Link>
                                </Transition>
                                
                                <Transition
                                as={Fragment}
                                show={isShowing}
                                enter="transform transition duration-[1000ms]"
                                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                                enterTo="opacity-100 rotate-0 scale-100"
                                leave="transform duration-200 transition ease-in-out"
                                leaveFrom="opacity-100 rotate-0 scale-100 "
                                leaveTo="opacity-0 scale-95 "
                                >
                                    <Link to="weather">
                                        <div className="h-64 w-72 bg-gray-800 flex flex-col justify-around flex-wrap content-center mx-4">
                                            <div className="m-auto">
                                                <PlayCircleIcon className="w-32 h-32 text-white"/>
                                            </div>
                                            <h1 className="font-poetsen text-3xl font-semibold text-center mb-2 text-white">Activity <br></br>Suggestion</h1>
                                        </div>
                                    </Link>
                                </Transition>
                                
                            </div>
                        </Transition>
                </div>
            </div>
                <div className="w-full bg-primaryColor h-[25rem] pb-40 flex flex-row flex-wrap justify-center content-center ">
                    <div className="w-3/6 h-[30rem] flex flex-col px-10 flex-wrap justify-center content-center">
                        <div className="h-1/6 w-full pt-3">
                            <h1 className="text-5xl text-white font-caveat h-full">Leave us your feedback!</h1>
                        </div>
                        <div className="flex flex-col px-10 flex-wrap justify-center content-center rounded-2xl bg-gray-800 h-5/6">
                            <div className="h-20 w-full text-white flex flex-col flex-wrap justify-evenly">
                                <h1 className="text-xl">Rate Our System</h1>
                                <StyledRating
                                    name="rating"
                                    value={ratingValue}
                                    IconContainerComponent={IconContainer}
                                    getLabelText={(value) => customIcons[value].label}
                                    highlightSelectedOnly
                                    onChange={handleRatingChange}

                                />
                            </div>
                            <div className="h-3/6 w-full flex flex-col flex-wrap justify-evenly">
                                <h1 className="text-white text-xl pb-2">Description</h1>
                                <textarea className="h-40 w-full bg-slate-50 rounded-xl pl-2 pt-2 text-lg focus:outline-none shadow-md2 outline-none" placeholder="Write down your description here." name="description" onChange={onChangeHandler}></textarea>
                            </div>
                            <div className="h-1/6 w-full py-4">
                                {loading ? (<button type="submit" className="h-10 w-20 bg-yellow-200 rounded-3xl shadow-md2l shadow-white" onClick={submitBtnHandler}>Loading...</button>) :
                                            <button type="submit" className="h-10 w-20 bg-yellow-200 rounded-3xl shadow-md2l shadow-white" onClick={submitBtnHandler}>Submit</button>}
                            </div>
                        </div>
                    </div>
                    <div className="w-96 h-96 ml-6 mt-14">
                        <div className="p-6 ">
                            <h2 className="text-slate-300 text-xl">Say Hello</h2>
                            <h1 className="text-white text-3xl">Get in touch, send us <br></br> e-mail or call us</h1>
                            <p className="py-2 text-slate-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        </div>
                        <div className="p-6 pt-2">
                            <h2 className="text-blue-500 text-xl">Call us on</h2>
                            <h1 className="text-black text-3xl">012-3456789</h1>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}