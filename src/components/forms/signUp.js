import {Checkbox, Typography} from "@material-tailwind/react";
import Navbar from "../homepage/navbar";
import { useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { registerUserAction, verifyUserEmail } from "../../redux/slices/users/userSlice";
import NotifyMsg from "../global/notifyMsg";
import ErrorMsg from "../global/erroMsg";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Register(){
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        phoneNumber: "",
        age: "",
    });

    const onChangeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    }


    const submitBtnHandler = (e) => {
        e.preventDefault();
        dispatch(registerUserAction(formData));
    }

    const {loading, error, isNotVerify, user} = useSelector((state)=> state?.users)
    return (
        <>
            {error && <ErrorMsg message={error.message}/>}
            {isNotVerify && <NotifyMsg title="Verify Your Email Now!" message="An email has sent to your account for verification purpose."/>}
            <Navbar />
            <div className="relative overflow-hidden h-screen mt-16">
                <div className="bg-blue-800 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-blue-700 bottom-0 leading-5 h-full w-full overflow-hidden z-10"></div>
                <div class="absolute w-[600px] top-[-300px] left-[-280px] z-20 h-[600px] rounded-full bg-amber-200 shadow-amber-300 shadow-2xl"></div>
                <div className="relative sm:flex sm:flex-row justify-center h-96">
                    <div class="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md absolute top-96 right-64 z-40">
                        <div class="self-start hidden lg:flex flex-col  text-gray-300">
                            <h1 class="my-3 font-semibold text-4xl">Register Now!</h1>
                            <p class="pr-3 text-sm opacity-75">Lorem ipsum is placeholder text commonly used in the graphic, print,
                            and publishing industries for previewing layouts and visual mockups</p>
                        </div>
                    </div>
                    <div class="flex justify-center self-center absolute top-6 left-96 z-40 w-[450px]">
                        <div class="p-12 bg-white mx-auto rounded-3xl shadow-2xl w-full">
                            <div class="mb-7">
                                <h1 class="font-semibold text-4xl text-gray-800 pb-2">Register</h1>
                                <p class="text-gray-400 font-semibold">Already have an account? <a href="/login"
                                        class="text-sm text-sky-800 hover:text-sky-950 underline">Sign In</a></p>
                            </div>
                            <div class="space-y-6">
                                <div class="">
                                    <input class=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-sky-400" onChange={onChangeHandler} name="fullname" type="" placeholder="Fullname" />
                                </div>

                                <div class="">
                                    <input class=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-sky-400" onChange={onChangeHandler} name="email" type="email" placeholder="Email" />
                                </div>

                                <div class="relative" x-data="{ show: true }">
                                    <input placeholder="Password" name="password" className="text-sm text-gray-200 px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-sky-400" onChange={onChangeHandler}/>
                                </div>

                                <div class="">
                                    <input class=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-sky-400" name="phoneNumber" type="" placeholder="Phone Number" onChange={onChangeHandler}/>
                                </div>

                                <div class="">
                                    <input class=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-sky-400" type="number" name="age" placeholder="Age" onChange={onChangeHandler}/>
                                </div>

                                <div className="">
                                    <Checkbox className="w-4 h-4 bg-blue-50" 
                                        label={
                                                <Typography
                                                variant="small"
                                                color="gray"
                                                className="flex items-center font-normal"
                                                >
                                                I agree the
                                                <a
                                                    href="#"
                                                    className="font-medium transition-colors hover:text-gray-900"
                                                >
                                                    &nbsp;Terms and Conditions
                                                </a>
                                                </Typography>
                                            }                     
                                        defaultChecked/>
                                </div>

                                <div>
                                    {loading ? (
                                    <button type="submit" class="w-full flex justify-center bg-sky-800  hover:bg-sky-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500" onClick={submitBtnHandler}>
                                        <Stack sx={{ color: 'white' }} spacing={2} direction="row">
                                            <CircularProgress color="inherit" size={20}/>
                                        </Stack>
                                    </button>) : (
                                        <button type="submit" class="w-full flex justify-center bg-sky-800  hover:bg-sky-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500" onClick={submitBtnHandler}>Sign Up</button>
                                    )}
                                </div>

                            
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-sky-950 absolute w-96 bottom-[-150px] left-[-200px] z-20 h-96 rounded-full"></div>
                <div class="bg-sky-950 absolute w-[600px] bottom-[] left-20 z-20 h-[600px] rounded-full"></div>
                <div class="bg-sky-950 absolute w-[400px] bottom-[-200px] left-[500px] z-20 h-[400px] rounded-full"></div>
                <div class="bg-sky-950 absolute w-[500px] bottom-[-250px] left-[800px] z-20 h-[500px] rounded-full"></div>
                <div class="bg-sky-950 absolute w-[500px] bottom-[-250px] right-[-50px] z-20 h-[500px] rounded-full"></div>
            </div>
        </>
    )
}