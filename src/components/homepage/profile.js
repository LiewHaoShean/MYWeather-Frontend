import { useDispatch, useSelector } from "react-redux";
import Navbar from "./navbar";
import { useEffect, useState } from "react";
import { editUserProfileAction, getUserProfileAction } from "../../redux/slices/users/userSlice";
import SuccessNotification from "../global/successNotification";

export default function Profile(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserProfileAction())
    },[dispatch]);

    const {loading, error, user, isEdited} = useSelector((state)=>state?.users);

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        age: "",
    });

    useEffect(() => {
        if (user?.userFound) {
          setFormData({
            fullname: user.userFound.fullname || '',
            email: user.userFound.email || '',
            phoneNumber: user.userFound.phoneNumber || '',
            age: user.userFound.age || ''
          });
        }
      }, [user]);

    const onChangeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    };
    const onClickHandler = (e) => {
        e.preventDefault();
        dispatch(editUserProfileAction(formData));
    };

    useEffect(()=>{
        dispatch(getUserProfileAction())
    },[isEdited]);
    return (
        <>
            {isEdited && <SuccessNotification message={user?.message} time={5000}/>}
            <Navbar />
            <section className="h-screen bg-gray-100">
                <div className="container py-5 h-full">
                    <div className="flex justify-center items-center h-full">
                        <div className="w-full md:w-1/2 mb-4 h-[75%]">
                            <div className="bg-white shadow-md rounded-lg overflow-hidden h-full w-full">
                                <div className="flex flex-col md:flex-row h-full w-full">
                                    <div className="bg-gradient-to-b from-gray-800 to-blue-900 text-center text-white pt-20 p-4 md:rounded-l-lg h-full flex flex-col items- w-2/6">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar"
                                            className="w-32 h-32 rounded-full mx-auto my-5"
                                        />
                                        <h5 className="text-xl font-medium">{user?.userFound?.fullname}</h5>
                                        <p className="text-sm">{user?.userFound?.idPremium ? ("Premium Member") : ("Non-premium User")}</p>
                                        <i className="far fa-edit mb-5">Welcome!</i>
                                    </div>
                                    <div className="w-4/6 flex flex-col flex-wrap items-center justify-center">
                                        <div className="p-4 pt-10 w-fit h-full ">
                                            <div className="mb-6">
                                                <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                                <input type="text" name="fullname" id="full_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required defaultValue={user?.userFound?.fullname} onChange={onChangeHandler}/>
                                            </div>
                                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                                <div>
                                                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                                    <input type="tel" name="phoneNumber" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required defaultValue={user?.userFound?.phoneNumber} onChange={onChangeHandler}/>
                                                </div>
                                                <div>
                                                    <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                                    <input type="number" name="age" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required defaultValue={user?.userFound?.age} />
                                                </div>
                                            </div>
                                            <div class="mb-6">
                                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                                <input type="email" id="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required defaultValue={user?.userFound?.email} onChange={onChangeHandler}/>
                                            </div> 
                                            <div class="flex items-start mb-6">
                                                <div class="flex items-center h-5">
                                                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required defaultChecked/>
                                                </div>
                                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500" >terms and conditions</a>.</label>
                                            </div>
                                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onClickHandler}>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}