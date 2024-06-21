import { useEffect, useState } from "react"
import Navbar from "../homepage/navbar"
import { useDispatch, useSelector } from "react-redux";
import { generateOtpAction, loginUserAction } from "../../redux/slices/users/userSlice";
import ErrorMsg from "../global/erroMsg";
import { Link, useNavigate } from "react-router-dom";
import SuccessNotification from "../global/successNotification";
import Modal from "../forum/model";
import OtpInputBox from "./otpCodeBox";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function ForgorPassword(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dataForm, setDataForm] = useState({
        email: ""
    });

    const onChangeHandler = (e) => {
        setDataForm({...dataForm, [e.target.name]: e.target.value});
    }

    const submitBtnHandler = (e) => {
        e.preventDefault();
        dispatch(generateOtpAction(dataForm));
    }

    const {loading, error, user, isOtpSent} = useSelector((state)=> state?.users);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(()=> {
        if(isOtpSent){
            handleOpenModal();
        }
    }, [dispatch, isOtpSent]);


    const [loadingOtp, setLoading] = useState(false);

    return (
        <>
            {error && <ErrorMsg message={error?.message}/>}
            {isOtpSent && <SuccessNotification message={user?.message} time={50000}/>}
            <Navbar />
            <div className="relative overflow-hidden h-[715px] mt-16">
                <div className="bg-blue-800 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-blue-700 bottom-0 leading-5 h-full w-full overflow-hidden z-10"></div>
                <div class="absolute w-[600px] top-[-300px] left-[-280px] z-20 h-[600px] rounded-full bg-amber-200 shadow-amber-300 shadow-2xl"></div>
                <div className="relative sm:flex sm:flex-row justify-center h-96">
                    <div class="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md absolute top-80 left-80 z-40">
                        <div class="self-start hidden lg:flex flex-col  text-gray-300">
                            <h1 class="my-3 font-semibold text-4xl">Welcome back</h1>
                            <p class="pr-3 text-sm opacity-75">Lorem ipsum is placeholder text commonly used in the graphic, print,
                            and publishing industries for previewing layouts and visual mockups</p>
                        </div>
                    </div>
                    <div class="flex justify-center self-center absolute top-20 right-96 z-40 ">
                        <div class="p-12 bg-white mx-auto rounded-3xl w-96 shadow-2xl">
                            <div class="mb-7">
                                <h3 class="font-semibold text-2xl text-gray-800">Account Verification </h3>
                                <p class="text-gray-400 font-semibold">Enter your email for verification purpose.</p>
                            </div>
                            {/* login error */}
                            {/* {error && <ErrorMsg message={error?.message}/>} */}
                            <div class="space-y-6">
                                <div class="">
                                    <input class=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-sky-400" type="" placeholder="Email" onChange={onChangeHandler} name="email" autoComplete="off"/>
                                </div>
                                <div>
                                    {loading ? (
                                    <button type="submit" class="w-full flex justify-center bg-sky-800  hover:bg-sky-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500" onClick={submitBtnHandler}>
                                        <Stack sx={{ color: 'white' }} spacing={2} direction="row">
                                            <CircularProgress color="inherit" size={20}/>
                                        </Stack>
                                    </button>) : (
                                        <button type="submit" class="w-full flex justify-center bg-sky-800  hover:bg-sky-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500" onClick={submitBtnHandler}>Verify</button>
                                    )}
                                </div>

                                <div class="flex items-center justify-center space-x-2 my-5">
                                    <span class="h-px w-16 bg-gray-100"></span>
                                    <span class="text-gray-300 font-normal">or</span>
                                    <span class="h-px w-16 bg-gray-100"></span>
                                </div>
                                
                                <div class="flex justify-center gap-5 w-full ">
                                    <button type="submit" class="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500">
                                        <svg  class="w-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/><path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/></svg>
                                        <span>Google</span>
                                    </button>
                                    <button type="submit" class="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500 px-">
                                        <svg class="w-4 mr-2 fill-blue-500" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                        <span>Facebook</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-sky-950 absolute w-96 bottom-[-150px] left-[-200px] z-20 h-96 rounded-full"></div>
                <div class="bg-sky-950 absolute w-[600px] left-20 z-20 h-[600px] rounded-full"></div>
                <div class="bg-sky-950 absolute w-[400px] bottom-[-200px] left-[500px] z-20 h-[400px] rounded-full"></div>
                <div class="bg-sky-950 absolute w-[500px] bottom-[-250px] left-[800px] z-20 h-[500px] rounded-full"></div>
                <div class="bg-sky-950 absolute w-[500px] bottom-[-250px] right-[-50px] z-20 h-[500px] rounded-full"></div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} width='w-96' top="top-2">
                <OtpInputBox
                    length={6}
                    label="Otp Verification"
                    loading={loadingOtp}
                    onComplete={code => {
                      setLoading(true);
                      setTimeout(() => setLoading(false), 10000);
                    }}
                />
            </Modal>
        </>
    )
}