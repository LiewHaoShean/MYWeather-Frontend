import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateOtpAction, validateOtpCodeAction } from "../../redux/slices/users/userSlice";
import SuccessNotification from "../global/successNotification";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const OtpInputBox = ({ length, label, loadingOtp, onComplete }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = useState([...Array(length)].map(() => ""));
    const inputs = useRef([]);

    const processInput = (e, slot) => {
        const num = e.target.value;
        if (/[^0-9]/.test(num)) return;
        const newCode = [...code];
        newCode[slot] = num;
        setCode(newCode);
        if (slot !== length - 1) {
        inputs.current[slot + 1].focus();
        }
        if (newCode.every(num => num !== "")) {
        onComplete(newCode.join(""));
        }
    };

    const onKeyUp = (e, slot) => {
        if (e.keyCode === 8 && !code[slot] && slot !== 0) {
        const newCode = [...code];
        newCode[slot - 1] = "";
        setCode(newCode);
        inputs.current[slot - 1].focus();
        }
    };

    const submitBtnHandler = (e) => {
        e.preventDefault();
        const otpNumber = parseInt(code.join(''), 10);
        dispatch(validateOtpCodeAction(otpNumber));
    }

    const {loading, isOtpValidated, user} = useSelector((state)=>state?.users);

    useEffect(()=> {
        if(isOtpValidated){
            navigate("/changePassword")
        }
    }, [dispatch, isOtpValidated]);

    return (
        <>
            {isOtpValidated && <SuccessNotification message={user?.message} time={50000}/>}
            <div className="h-80 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <div className="flex flex-col flex-wrap items-start h-full justify-center">
                    <label className="mb-4 text-4xl font-bold">{label}</label>
                    <p className="mb-4 text-slate-400">Please enter the OTP code sent to your email!</p>
                    <div className="flex">
                        {code.map((num, idx) => {
                        return (
                            <input
                            key={idx}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={num}
                            autoFocus={!code[0].length && idx === 0}
                            readOnly={loadingOtp}
                            onChange={e => processInput(e, idx)}
                            onKeyUp={e => onKeyUp(e, idx)}
                            ref={ref => inputs.current[idx] = ref}
                            className="w-12 h-16 text-3xl text-center border-2 border-gray-700 rounded-lg mx-1 focus:outline-none focus:border-sky-800"
                            />
                        );
                        })}
                    </div>
                    <div className="w-full pt-4">
                    {loading ? (
                    <button type="submit" class="w-full flex justify-center bg-sky-800  hover:bg-sky-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500" onClick={submitBtnHandler}>
                        <Stack sx={{ color: 'white' }} spacing={2} direction="row">
                            <CircularProgress color="inherit" size={20}/>
                        </Stack>
                    </button>) : (
                        <button type="submit" class="w-full flex justify-center bg-sky-800  hover:bg-sky-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500" onClick={submitBtnHandler}>Submit</button>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtpInputBox;