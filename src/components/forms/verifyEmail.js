import { useDispatch } from "react-redux";
import ConfirmMsg from "../global/confirmMsg";
import { useEffect, useState } from "react";
import { verifyUserEmail } from "../../redux/slices/users/userSlice";
import { Link, useParams } from "react-router-dom";
import { Transition } from "@headlessui/react";

export default function VerifyEmail(){
    const dispatch = useDispatch();

    const {token} = useParams();
    useEffect(()=>{
        dispatch(verifyUserEmail(token));
    });


    return (
        <>
            <ConfirmMsg message={"Click the button below to verify your gmail."}/>
            <div className="relative overflow-hidden h-screen">
                <div className="bg-blue-800 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-blue-700 bottom-0 leading-5 h-full w-full overflow-hidden z-10 "></div>
                    <Link to="/login"><div class="absolute w-[600px] left-96 top-[400px]  z-20 h-[600px] rounded-full bg-amber-200 shadow-amber-300 shadow-3xl border-4 border-amber-300 hover:transition-all hover:translate-x-20 hover:translate-y-[-200px] hover:duration-[8s]"></div></Link>
                <div className="relative sm:flex sm:flex-row justify-center h-96">
                    <div class="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md absolute top-96 right-64 z-40">
                        <div class="self-start hidden lg:flex flex-col  text-gray-300">
                            <h1 class="my-3 font-semibold text-4xl">Click on the moon!</h1>
                            <p class="pr-3 text-sm opacity-75">Lorem ipsum is placeholder text commonly used in the graphic, print,
                            and publishing industries for previewing layouts and visual mockups</p>
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