import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { makePaymentAction } from "../../redux/slices/payment/paymentSlice";
import ErrorMsg from "../global/erroMsg";
import SuccessMsg from "../global/successMsg";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

export default function Payment({amount, paymentType}){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dataForm, setDataForm] = useState({
        cardNumber: "",
        cardHolderName: "",
        amount: amount,
        type: paymentType,
    });

    const onChangeHandler = (e) => {
        setDataForm({...dataForm, [e.target.name]: e.target.value});
        console.log(dataForm);
    }

    const onClickHandler = (e) => {
        e.preventDefault();
        dispatch(makePaymentAction(dataForm));
        navigate("/weather");
    }

    const {loading, payment, isCompleted, error} = useSelector((state)=>state?.payment);

    return (
        <>
            {error && <ErrorMsg message={error?.message}/>}
            {isCompleted && <SuccessMsg message={payment?.message}/>}
            <div className="w-full h-[30rem] bg-white">
                <div className="w-full h-[45%] p-8">
                    <h1 className="text-xl font-bold">Summary</h1>
                    <div className="flex justify-between p-1">
                        <p className="text-slate-400">Qty</p>
                        <p>1</p>
                    </div>
                    <div className="flex justify-between p-1">
                        <p className="text-slate-400">Subtotal</p>
                        <p>${amount}</p>
                    </div>
                    <div className="flex justify-between p-1">
                        <p className="text-slate-400">Shipping</p>
                        <p>Free</p>
                    </div>
                    <div className="flex justify-between p-1">
                        <p className="text-slate-400">Total</p>
                        <p className="text-xl font-bold">${amount}</p>
                    </div>
                </div>
                <div className="w-full h-[45%] bg-gray-100 p-8 pt-4">
                    <h1 className="text-xl font-bold">Payment Details</h1>
                    <div className="grid grid-cols-2 gird-rows-2 gap-4 h-full w-full">
                        <div className="h-full w-full">
                            <p className="text-slate-400">Card Number</p>
                            <input className="w-full bg-gray-100 border-b-2 outline-none text-xs" name="cardNumber" onChange={onChangeHandler}></input>
                        </div>
                        <div className="h-full w-full">
                            <p className="text-slate-400">Expires</p>
                            <input className="w-full bg-gray-100 border-b-2 outline-none text-xs" name="expire"></input>
                        </div>
                        <div className="h-full w-full">
                            <p className="text-slate-400">Cardholder Name</p>
                            <input className="w-full bg-gray-100 border-b-2 outline-none text-xs" name="cardHolderName" onChange={onChangeHandler}></input>
                        </div>
                        <div className="h-full w-full">
                            <p className="text-slate-400">CVC</p>
                            <input className="w-full bg-gray-100 border-b-2 outline-none text-xs" name="cvc"></input>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[10%]">
                    {loading ? (
                        <div className="w-full h-full bg-gray-800 flex flex-row items-center justify-center group hover:cursor-pointer " onClick={onClickHandler}>
                            <Stack sx={{ color: 'white' }} spacing={2} direction="row">
                                <CircularProgress color="inherit" size={80}/>
                            </Stack>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gray-800 flex flex-row items-center justify-center group hover:cursor-pointer " onClick={onClickHandler}>
                            <h1 className="text-white text-xl px-2">Purchase</h1>
                            <FaArrowRight className="text-white text-xl mt-1 rotate-icon" />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}