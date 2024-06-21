import { Link } from "react-router-dom";
import Navbar from "../homepage/navbar";
import weatherImg from  "./weatherImg2.jpg";
import { IoPlayCircleOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { useRef, useState } from "react";
import Modal from "../forum/model";
import Payment from "./payment";


export default function Package(){
    const targetRef = useRef(null);

    const scrollToDiv = () => {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amount, setAmount] = useState(null);
    const [paymentType, setPaymentType] = useState(null)

    const handlePaymentClick = (amount, paymentType) => {
        setAmount(amount);
        setPaymentType(paymentType);
        console.log(paymentType);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Navbar/>
            <div className="p-10 mt-14 px-20 w-full flex flex-row justify-center h-[25rem]">
                <div className="p-6">
                    <img src={weatherImg} alt="weather" className="h-64 w-96"/>
                </div>
                <div className="h-full p-6 w-3/6">
                    <div className="flex flex-col justify-between">
                        <h1 className="text-3xl font-light">All About <span className="font-semibold text-gray-800">MYWeather</span></h1>
                        <div className="h-36 flex items-center">
                            <p className="text-slate-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        </div>
                        <div className="flex flex-row pt-7 justify-start">
                            <div className="w-48 h-12 mr-4 bg-gray-800 text-center text-white py-3 hover:cursor-pointer hover:scale-105" onClick={scrollToDiv}>Join MYWeather Family</div>
                            <div className="w-36 h-12 text-gray-800 flex flex-row flex-wrap content-center hover:cursor-pointer hover:scale-105">
                                <IoPlayCircleOutline className="text-2xl"/>
                                <p className="font-bold">How it Works</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full p-10 px-20 pb-20" ref={targetRef}
            >
                <div className="px-20">
                    <div className="flex flex-row h-96 justify-evenly">
                        <div className="w-80 h-96 border-2 border-gray-800 relative">
                            <div className="absolute top-[-1rem] left-28 h-10 w-20 bg-white flex justify-center">
                                <h1 className="text-xl font-bold">FREE</h1>
                            </div>
                            <div className="absolute bottom-[-2rem] left-24 w-28 bg-gray-800 h-14 flex items-center justify-center">
                                <h1 className="text-white text-lg">Current</h1>
                            </div>
                            <div className="h-96 w-full px-6 py-8">
                                <div className="w-full h-full">
                                    <div className="w-full flex justify-center items-center py-4">
                                        <h1 className="text-5xl">$0</h1>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">Locate Your Location</p>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">Current Weather</p>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">Hourly Weather Forecast</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-96 w-80 border-2 border-gray-800 relative hover:scale-105">
                            <div className="absolute top-[-1rem] left-24 h-10 w-28 bg-white flex justify-center">
                                <h1 className="text-xl font-bold">MONTHLY</h1>
                            </div>
                            <div className="h-96 w-full px-6 py-8">
                                <div className="w-full h-full">
                                    <div className="w-full flex justify-center items-center py-4">
                                        <h1 className="text-5xl">$39</h1>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">Current Weather</p>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">Hourly Weather Forecasting</p>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">7-days Weather Forecasting</p>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">7-days Hourly Weather Forecasting</p>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">Permanent Premium</p>
                                    </div>
                                </div>
                            </div>
                            <Link className="absolute bottom-[-2rem] left-24 w-28 bg-gray-800 h-14 flex items-center justify-center hover:scale-105" onClick={()=> handlePaymentClick(39, "monthly")}>
                                <h1 className="text-white text-lg">Upgrade</h1>
                            </Link>
                        </div>
                        <div className="h-96 w-80 border-2 border-gray-800 relative hover:scale-105">
                            <div className="absolute top-[-1rem] left-24 h-10 w-28 bg-white flex justify-center">
                                <h1 className="text-xl font-bold">LIFETIME</h1>
                            </div>
                            <div className="h-96 w-full px-6 py-8">
                                <div className="w-full h-full">
                                    <div className="w-full flex justify-center items-center py-4">
                                        <h1 className="text-5xl">$139</h1>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">Current Weather</p>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">Hourly Weather Forecasting</p>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">7-days Weather Forecasting</p>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">7-days Hourly Weather Forecasting</p>
                                    </div>
                                    <div className="flex flex-row py-1">
                                        <TiTick className="text-3xl"/>
                                        <p className="text-lg font-semibold">Permanent Premium</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-[-2rem] left-24 w-28 bg-gray-800 h-14 flex items-center justify-center hover:scale-105 hover:cursor-pointer" onClick={()=> handlePaymentClick(139, "lifeTime")}>
                                <h1 className="text-white text-lg">Upgrade</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} width='w-96' top='top-1'>
                {amount && <Payment amount={amount} paymentType={paymentType}/>}
            </Modal>
        </>
    )
}