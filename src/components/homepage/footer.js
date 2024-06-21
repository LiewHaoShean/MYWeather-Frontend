import { faFacebook, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"


export default function Footer() {
    return (
        <>
            <footer class="relative bg-gray-800 pt-8 pb-6">
                <div class="container mx-auto px-4">
                    <div class="flex flex-wrap text-left lg:text-left">
                        <div class="w-full lg:w-6/12 px-4">
                            <h4 class="text-3xl fonat-semibold text-white">Let's keep in touch!</h4>
                            <h5 class="text-lg mt-2 mb-2 text-white">
                            Find us on any of these platforms, we respond 1-2 business days.
                            </h5>
                            <div class="mt-6 lg:mb-0 mb-6">
                                <button class="bg-white text-lightBlue-400 shadow-md2 font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 shadow-white" type="button"><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></button>
                                <button className="bg-white text-lightBlue-600 shadow-md2 font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none shadow-white mr-2" type="button"><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></button>
                                <button className="bg-white text-lightBlue-600 shadow-md2 font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none shadow-white mr-2" type="button"><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon></button>
                            </div>
                        </div>
                    <div class="w-full lg:w-6/12 px-4">
                        <div class="flex flex-wrap items-top mb-6">
                        <div class="w-full lg:w-4/12 px-4 ml-auto">
                            <span class="block uppercase text-white text-lg font-semibold mb-2">Useful Links</span>
                            <ul class="list-unstyled">
                                <li>
                                    <Link class="text-gray-500 hover:text-black font-semibold block pb-2 text-md transition duration-500" to="/weather">Weather</Link>
                                </li>
                                <li>
                                    <Link class="text-gray-500 hover:text-black font-semibold block pb-2 text-md transition duration-500" to="/forum">Forum</Link>
                                </li>
                                <li>
                                    <Link class="text-gray-500 hover:text-black font-semibold block pb-2 text-md transition duration-500" to="/forecast">Forecast</Link>
                                </li>
                                <li>
                                    <Link class="text-gray-500 hover:text-black font-semibold block pb-2 text-md transition duration-500" to="/admin">Admin</Link>
                                </li>
                            </ul>
                        </div>
                        <div class="w-full lg:w-4/12 px-4">
                            <span class="block uppercase text-blueGray-500 text-lg text-white font-semibold mb-2">Other Resources</span>
                            <ul class="list-unstyled">
                                <li>
                                    <Link class="text-gray-500 hover:text-black font-semibold block pb-2 text-md transition duration-500" to="">License</Link>
                                </li>
                                <li>
                                    <Link class="text-gray-500 hover:text-black font-semibold block pb-2 text-md transition duration-500" to="">Terms &amp; Conditions</Link>
                                </li>
                                <li>
                                    <Link class="text-gray-500 hover:text-black font-semibold block pb-2 text-md transition duration-500" to="">Feedback</Link>
                                </li>
                                <li>
                                    <Link class="text-gray-500 hover:text-black font-semibold block pb-2 text-md transition duration-500" to="">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                    <hr class="my-6 border-white" />
                    <div class="flex flex-wrap items-center md:justify-between justify-center">
                    <div class="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div class="text-sm text-white text-blueGray-500 font-semibold py-1">
                        Copyright © <span id="get-current-year">2024</span><a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank"/> Develepors Of 
                        <a href="https://www.creative-tim.com?ref=njs-profile" class="text-blueGray-500 hover:text-blueGray-800"> MYWeather</a>.
                        </div>
                    </div>
                    </div>
                </div>
            </footer>
        </>
    )
}